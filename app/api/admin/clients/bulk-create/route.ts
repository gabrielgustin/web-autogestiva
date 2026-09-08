import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    console.log("[v0] Bulk creating clients...")

    const clients = [
      { businessName: "Mara Saul", username: "Mara", email: "mara@marasaul.com", password: "123" },
      { businessName: "Cambel", username: "Cambel", email: "cambel@cambel.com", password: "123" },
      { businessName: "Life Gym", username: "Meli", email: "meli@lifegym.com", password: "123" },
      { businessName: "Boutique", username: "Fortuna", email: "fortuna@boutique.com", password: "123" },
      { businessName: "M&M Relojes", username: "Mateo", email: "mateo@mmrelojes.com", password: "123" },
      { businessName: "Lulu Deco", username: "Ludmila", email: "ludmila@luludeco.com", password: "123" },
      {
        businessName: "Visual Henderson",
        username: "Santiago",
        email: "santiago@visualhenderson.com",
        password: "123",
      },
      { businessName: "Pipet Labor", username: "Alberto", email: "alberto@pipetlabor.com", password: "123" },
      {
        businessName: "Sachetto & Asociados",
        username: "Nicolas",
        email: "nicolas@sachetto.com",
        password: "123",
      },
    ]

    const results = []
    const errors = []

    // Get the first plan (Plan Básico) to assign to all clients
    const [plan] = await sql`SELECT id, price FROM plans ORDER BY id LIMIT 1`

    if (!plan) {
      return NextResponse.json({ error: "No hay planes disponibles en el sistema" }, { status: 400 })
    }

    for (const client of clients) {
      try {
        // Check if user already exists
        const existingUser = await sql`SELECT id FROM users WHERE email = ${client.email}`

        if (existingUser.length > 0) {
          console.log(`[v0] User ${client.email} already exists, skipping...`)
          errors.push({ email: client.email, error: "Usuario ya existe" })
          continue
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(client.password, 10)

        // Create user
        const [user] = await sql`
          INSERT INTO users (email, password, role)
          VALUES (${client.email}, ${hashedPassword}, 'client')
          RETURNING id
        `

        console.log(`[v0] Created user for ${client.businessName} with ID: ${user.id}`)

        // Create client record
        const [clientRecord] = await sql`
          INSERT INTO clients (user_id, business_name)
          VALUES (${user.id}, ${client.businessName})
          RETURNING id
        `

        console.log(`[v0] Created client record for ${client.businessName} with ID: ${clientRecord.id}`)

        // Create subscription
        const [subscription] = await sql`
          INSERT INTO subscriptions (client_id, plan_id, status, start_date)
          VALUES (${clientRecord.id}, ${plan.id}, 'active', NOW())
          RETURNING id
        `

        console.log(`[v0] Created subscription for ${client.businessName} with ID: ${subscription.id}`)

        // Create initial payment record
        await sql`
          INSERT INTO payments (subscription_id, amount, status, payment_method, paid_at, created_at)
          VALUES (${subscription.id}, ${plan.price}, 'completed', 'bank_transfer', NOW(), NOW())
        `

        results.push({
          businessName: client.businessName,
          email: client.email,
          userId: user.id,
          clientId: clientRecord.id,
          subscriptionId: subscription.id,
        })
      } catch (error: any) {
        console.error(`[v0] Error creating client ${client.businessName}:`, error)
        errors.push({
          businessName: client.businessName,
          email: client.email,
          error: error.message,
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Se crearon ${results.length} clientes exitosamente`,
      created: results,
      errors: errors.length > 0 ? errors : undefined,
      summary: {
        total: clients.length,
        created: results.length,
        failed: errors.length,
      },
    })
  } catch (error: any) {
    console.error("[v0] Error in bulk client creation:", error)
    return NextResponse.json(
      {
        error: "Error al crear clientes",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
