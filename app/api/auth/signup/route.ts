import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    console.log("[v0] Signup attempt for:", email)

    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUsers.length > 0) {
      console.log("[v0] User already exists:", email)
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUsers = await sql`
      INSERT INTO users (email, password_hash, role)
      VALUES (${email}, ${passwordHash}, 'client')
      RETURNING id, email, role
    `

    const newUser = newUsers[0]

    await sql`
      INSERT INTO clients (user_id, full_name)
      VALUES (${newUser.id}, ${name})
    `

    console.log("[v0] User created:", newUser.email)

    return NextResponse.json({
      success: true,
      message: "Cuenta creada exitosamente",
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    })
  } catch (error) {
    console.error("[v0] Error en signup:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error en el servidor",
        details: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 },
    )
  }
}
