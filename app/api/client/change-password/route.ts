import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, newPassword } = body

    if (!username || !newPassword) {
      return NextResponse.json({ error: "Usuario y contraseña son requeridos" }, { status: 400 })
    }

    if (newPassword.length < 3) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 3 caracteres" }, { status: 400 })
    }

    console.log("[v0] Changing password for user:", username)

    if (!sql) {
      return NextResponse.json({ error: "No hay conexión a la base de datos" }, { status: 500 })
    }

    // Update password using pgcrypto
    const result = await sql`
      UPDATE users
      SET password_hash = crypt(${newPassword}, gen_salt('bf'))
      WHERE username = ${username}
      RETURNING id, username
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    console.log("[v0] Password changed successfully for:", username)

    return NextResponse.json({
      success: true,
      message: "Contraseña actualizada exitosamente",
    })
  } catch (error: any) {
    console.error("[v0] Error changing password:", error)
    return NextResponse.json(
      {
        error: "Error al cambiar la contraseña",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
