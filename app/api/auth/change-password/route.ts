import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"

const TEMP_USERS = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    username: "Mara",
    password: "123",
    role: "client",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, currentPassword, newPassword } = body

    console.log("[v0] Change password request for:", username)

    if (!username || !currentPassword || !newPassword) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Validate new password strength
    if (newPassword.length < 3) {
      return NextResponse.json({ error: "La nueva contraseña debe tener al menos 3 caracteres" }, { status: 400 })
    }

    const tempUser = TEMP_USERS.find((u) => u.username === username)
    if (tempUser) {
      // Verify current password
      if (tempUser.password !== currentPassword) {
        return NextResponse.json({ error: "La contraseña actual es incorrecta" }, { status: 401 })
      }

      // Update password in memory (temporary)
      tempUser.password = newPassword
      console.log("[v0] Password updated successfully for temp user:", username)

      return NextResponse.json({
        success: true,
        message: "Contraseña actualizada exitosamente",
      })
    }

    // If database is available, try to update there using pgcrypto
    if (sql) {
      try {
        const users = await sql`
          SELECT * FROM users WHERE username = ${username}
        `

        if (users.length === 0) {
          return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
        }

        const user = users[0]

        // Verify current password using pgcrypto
        const passwordCheck = await sql`
          SELECT (password_hash = crypt(${currentPassword}, password_hash)) as is_valid
          FROM users
          WHERE username = ${username}
        `

        if (!passwordCheck[0]?.is_valid) {
          return NextResponse.json({ error: "La contraseña actual es incorrecta" }, { status: 401 })
        }

        // Update password in database using pgcrypto
        await sql`
          UPDATE users 
          SET password_hash = crypt(${newPassword}, gen_salt('bf', 10)), 
              updated_at = NOW()
          WHERE username = ${username}
        `

        console.log("[v0] Password updated successfully in database for:", username)

        return NextResponse.json({
          success: true,
          message: "Contraseña actualizada exitosamente",
        })
      } catch (dbError) {
        console.error("[v0] Database error:", dbError)
        return NextResponse.json({ error: "Error al actualizar la contraseña en la base de datos" }, { status: 500 })
      }
    }

    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
  } catch (error) {
    console.error("[v0] Change password error:", error)
    return NextResponse.json({ error: "Error al cambiar la contraseña" }, { status: 500 })
  }
}
