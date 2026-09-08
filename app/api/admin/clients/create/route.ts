import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function POST(request: Request) {
  try {
    console.log("[v0] Creating new client...")

    const body = await request.json()
    console.log("[v0] Request body:", JSON.stringify(body))

    const { name, username, email, phone, city, country, planId, password, appUrl } = body

    if (!name || !username) {
      console.log("[v0] Missing required fields - name:", name, "username:", username)
      return NextResponse.json({ error: "Nombre del negocio y usuario son requeridos" }, { status: 400 })
    }

    if (!sql) {
      console.error("[v0] No database connection available")
      return NextResponse.json({ error: "No hay conexión a la base de datos" }, { status: 500 })
    }

    const userPassword = password || "123"
    console.log("[v0] Creating user with username:", username)

    let user
    try {
      const result = await sql`
        INSERT INTO users (username, password_hash, role)
        VALUES (${username}, crypt(${userPassword}, gen_salt('bf', 10)), 'client')
        RETURNING id
      `
      user = result[0]
      console.log("[v0] User created with ID:", user.id)
    } catch (error: any) {
      console.error("[v0] Error creating user:", error.message)
      if (error.message.includes("duplicate key")) {
        return NextResponse.json({ error: "El nombre de usuario ya existe" }, { status: 400 })
      }
      throw error
    }

    console.log("[v0] Creating client with user_id:", user.id)
    let client
    try {
      const result = await sql`
        INSERT INTO clients (user_id, name, email, phone, city, country, app_url)
        VALUES (${user.id}, ${name}, ${email || null}, ${phone || null}, ${city || null}, ${country || null}, ${appUrl || null})
        RETURNING id
      `
      client = result[0]
      console.log("[v0] Client created with ID:", client.id)
    } catch (error: any) {
      console.error("[v0] Error creating client:", error.message)
      throw error
    }

    const selectedPlanId = planId || 1
    console.log("[v0] Looking for plan with ID:", selectedPlanId)

    let planRecord
    try {
      const result = await sql`
        SELECT id, price FROM plans WHERE id = ${selectedPlanId} LIMIT 1
      `
      planRecord = result[0]

      if (!planRecord) {
        console.error("[v0] Plan not found:", selectedPlanId)
        return NextResponse.json({ error: "Plan no encontrado" }, { status: 400 })
      }
      console.log("[v0] Plan found:", planRecord.id)
    } catch (error: any) {
      console.error("[v0] Error fetching plan:", error.message)
      throw error
    }

    console.log("[v0] Creating subscription for client:", client.id, "plan:", planRecord.id)
    let subscription
    try {
      const result = await sql`
        INSERT INTO subscriptions (client_id, plan_id, status, start_date)
        VALUES (${client.id}, ${planRecord.id}, 'active', NOW())
        RETURNING id
      `
      subscription = result[0]
      console.log("[v0] Subscription created with ID:", subscription.id)
    } catch (error: any) {
      console.error("[v0] Error creating subscription:", error.message)
      throw error
    }

    console.log("[v0] ✅ Client creation completed successfully")
    return NextResponse.json({
      success: true,
      message: "Cliente creado exitosamente",
      data: {
        clientId: client.id,
        userId: user.id,
        subscriptionId: subscription.id,
      },
    })
  } catch (error: any) {
    console.error("[v0] ❌ Error creating client:", error)
    console.error("[v0] Error stack:", error.stack)
    return NextResponse.json(
      {
        error: "Error al crear cliente",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
