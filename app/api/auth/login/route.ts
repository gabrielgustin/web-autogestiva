import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"

const TEMP_USERS = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Administrador",
  },
  {
    id: "2",
    username: "meli",
    password: "123",
    role: "client",
    name: "Life Gym",
  },
]

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] POST /api/auth/login - Starting")

    const { username, password } = await request.json()

    console.log("[v0] Login attempt for:", username)

    if (sql) {
      try {
        console.log("[v0] Attempting database authentication with pgcrypto...")

        const users = await sql`
          SELECT id, username, role, password_hash,
                 (password_hash = crypt(${password}, password_hash)) as password_match
          FROM users 
          WHERE username = ${username}
        `

        console.log("[v0] Database query returned:", users.length, "users")

        if (users.length > 0) {
          const user = users[0]
          console.log("[v0] Found user in database:", user.username, "Password match:", user.password_match)

          if (user.password_match) {
            console.log("[v0] Password valid for:", user.username)

            const role = user.role
            const token = `${user.username}|${role}|${Date.now()}`
            const redirectUrl = role === "admin" ? "/admin/dashboard" : "/client-panel/dashboard"

            const response = NextResponse.json({
              success: true,
              redirectUrl,
              message: "Login exitoso",
            })

            response.cookies.set("auth-token", token, {
              httpOnly: false,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            })

            console.log("[v0] Login successful (database), redirecting to:", redirectUrl)

            return response
          } else {
            console.log("[v0] Invalid password for:", username)
          }
        } else {
          console.log("[v0] No user found in database with username:", username)
        }
      } catch (dbError) {
        console.error("[v0] Database query error:", dbError)
        console.log("[v0] Falling back to temporary users")
      }
    } else {
      console.log("[v0] SQL not available, using temp users")
    }

    console.log("[v0] Using temporary users")

    const user = TEMP_USERS.find((u) => u.username === username)

    if (!user || user.password !== password) {
      console.log("[v0] Invalid credentials (temp users)")
      return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 })
    }

    console.log("[v0] User authenticated (temp):", user.username, "Role:", user.role)

    const role = user.role
    const token = `${user.username}|${role}|${Date.now()}`
    const redirectUrl = role === "admin" ? "/admin/dashboard" : "/client-panel/dashboard"

    const response = NextResponse.json({
      success: true,
      redirectUrl,
      message: "Login exitoso (modo temporal)",
    })

    response.cookies.set("auth-token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    console.log("[v0] Login successful (temp), redirecting to:", redirectUrl)

    return response
  } catch (error) {
    console.error("[v0] Error en login:", error)
    return NextResponse.json(
      {
        error: "Error en el servidor",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
