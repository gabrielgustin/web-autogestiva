import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    console.log("[v0] Starting password fix...")

    if (!sql) {
      return NextResponse.json({ error: "Database connection not available" }, { status: 503 })
    }

    // Hash de las contraseñas
    const adminPassword = await bcrypt.hash("admin123", 10)
    const clientPassword = await bcrypt.hash("123", 10)

    console.log("[v0] Updating admin password...")
    // Actualizar contraseña del admin
    await sql`
      UPDATE users 
      SET password = ${adminPassword}
      WHERE email = 'autogestiva.info@gmail.com'
    `

    console.log("[v0] Updating client password...")
    // Actualizar contraseña del cliente
    await sql`
      UPDATE users 
      SET password = ${clientPassword}
      WHERE email = 'info@lifegym.com'
    `

    console.log("[v0] Verifying users...")
    // Verificar usuarios
    const users = await sql`
      SELECT id, email, role, created_at 
      FROM users 
      ORDER BY created_at
    `

    return NextResponse.json({
      success: true,
      message: "Contraseñas actualizadas correctamente",
      users: users.map((u) => ({
        email: u.email,
        role: u.role,
        created_at: u.created_at,
      })),
    })
  } catch (error) {
    console.error("[v0] Error fixing passwords:", error)
    return NextResponse.json(
      {
        error: "Error al actualizar contraseñas",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
