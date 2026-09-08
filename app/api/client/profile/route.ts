import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

// GET - Obtener perfil del cliente
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Usuario es requerido" }, { status: 400 })
    }

    console.log("[v0] Fetching client profile for:", username)

    if (!sql) {
      return NextResponse.json({ error: "No hay conexión a la base de datos" }, { status: 500 })
    }

    const result = await sql`
      SELECT 
        c.id,
        c.name,
        c.email,
        c.phone,
        c.city,
        c.country,
        u.username,
        c.created_at,
        p.name as plan_name,
        p.price as plan_price,
        s.status as subscription_status
      FROM clients c
      INNER JOIN users u ON c.user_id = u.id
      LEFT JOIN subscriptions s ON c.id = s.client_id AND s.status = 'active'
      LEFT JOIN plans p ON s.plan_id = p.id
      WHERE u.username = ${username}
      LIMIT 1
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 })
    }

    console.log("[v0] Client profile fetched successfully")

    return NextResponse.json({ profile: result[0] })
  } catch (error: any) {
    console.error("[v0] Error fetching client profile:", error)
    return NextResponse.json(
      {
        error: "Error al obtener perfil del cliente",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

// PUT - Actualizar perfil del cliente
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { username, name, email, phone, city, country } = body

    if (!username) {
      return NextResponse.json({ error: "Usuario es requerido" }, { status: 400 })
    }

    console.log("[v0] Updating client profile for:", username)

    if (!sql) {
      return NextResponse.json({ error: "No hay conexión a la base de datos" }, { status: 500 })
    }

    const userResult = await sql`
      SELECT id FROM users WHERE username = ${username} LIMIT 1
    `

    if (userResult.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    const userId = userResult[0].id

    const result = await sql`
      UPDATE clients
      SET 
        name = COALESCE(${name}, name),
        email = COALESCE(${email}, email),
        phone = COALESCE(${phone}, phone),
        city = COALESCE(${city}, city),
        country = COALESCE(${country}, country),
        updated_at = NOW()
      WHERE user_id = ${userId}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 })
    }

    console.log("[v0] Client profile updated successfully")

    return NextResponse.json({
      success: true,
      message: "Perfil actualizado exitosamente",
      profile: result[0],
    })
  } catch (error: any) {
    console.error("[v0] Error updating client profile:", error)
    return NextResponse.json(
      {
        error: "Error al actualizar perfil del cliente",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
