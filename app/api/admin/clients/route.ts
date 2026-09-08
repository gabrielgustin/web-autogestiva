import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"

const jsonResponse = (data: any, status = 200) => {
  console.log("[v0] jsonResponse called with status:", status, "data keys:", Object.keys(data))
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

const getDatabaseConnection = () => {
  const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL

  console.log("[v0] getDatabaseConnection - checking for database URL...")

  if (!databaseUrl) {
    console.error("[v0] No database URL found in environment variables")
    return null
  }

  try {
    console.log("[v0] Creating Neon connection...")
    return neon(databaseUrl)
  } catch (error) {
    console.error("[v0] Error creating database connection:", error)
    return null
  }
}

export async function GET() {
  console.log("[v0] GET /api/admin/clients - Starting...")

  try {
    const sql = getDatabaseConnection()

    if (!sql) {
      console.log("[v0] Database connection is null, returning error")
      return jsonResponse(
        {
          error: "Database connection failed",
          clients: [],
        },
        503,
      )
    }

    console.log("[v0] Executing SQL query to fetch clients...")

    const clients = await sql`
      SELECT 
        c.id,
        c.name,
        u.username,
        c.email,
        c.phone,
        c.city,
        c.country,
        c.app_url,
        s.status,
        c.created_at
      FROM clients c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN subscriptions s ON c.id = s.client_id
      ORDER BY c.created_at DESC
    `

    console.log("[v0] Query successful, got", clients.length, "clients")

    const formattedClients = clients.map((client) => ({
      ...client,
      username: client.username || "Sin usuario",
      status: client.status || "pending",
    }))

    console.log("[v0] Returning formatted clients")
    return jsonResponse({ clients: formattedClients })
  } catch (error: any) {
    console.error("[v0] Error in GET /api/admin/clients:", error)
    console.error("[v0] Error message:", error?.message)
    console.error("[v0] Error stack:", error?.stack)
    return jsonResponse(
      {
        error: "Error al obtener clientes",
        details: error?.message || "Unknown error",
        clients: [],
      },
      500,
    )
  }
}

export async function POST(request: Request) {
  try {
    const sql = getDatabaseConnection()

    if (!sql) {
      return jsonResponse({ error: "Database connection not available" }, 503)
    }

    const body = await request.json()
    const { name, username, password, email, phone, city, country, plan_id, app_url } = body

    if (!name || !username || !password) {
      return jsonResponse({ error: "Los campos nombre, usuario y contraseña son obligatorios" }, 400)
    }

    const existingUser = await sql`
      SELECT id FROM users WHERE username = ${username}
    `

    if (existingUser.length > 0) {
      return jsonResponse({ error: "El nombre de usuario ya está en uso" }, 400)
    }

    const password_hash = await bcrypt.hash(password, 10)

    const newUser = await sql`
      INSERT INTO users (username, password_hash, role)
      VALUES (${username}, ${password_hash}, 'client')
      RETURNING id
    `

    const user_id = newUser[0].id

    const newClient = await sql`
      INSERT INTO clients (
        name, 
        user_id, 
        email, 
        phone, 
        city, 
        country, 
        app_url,
        created_at
      )
      VALUES (
        ${name}, 
        ${user_id}, 
        ${email || null}, 
        ${phone || null}, 
        ${city || null}, 
        ${country || null}, 
        ${app_url || null},
        NOW()
      )
      RETURNING id
    `

    const client_id = newClient[0].id

    if (plan_id) {
      await sql`
        INSERT INTO subscriptions (client_id, plan_id, status, start_date)
        VALUES (${client_id}, ${plan_id}, 'active', NOW())
      `
    }

    return jsonResponse({
      success: true,
      client_id,
      user_id,
      message: "Cliente creado exitosamente",
    })
  } catch (error: any) {
    console.error("[v0] Error creating client:", error.message)
    return jsonResponse(
      {
        error: "Error al crear cliente",
        details: error?.message || "Unknown error",
      },
      500,
    )
  }
}
