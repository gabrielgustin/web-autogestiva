import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, new_plan_id } = body

    if (!username || !new_plan_id) {
      return NextResponse.json({ error: "Username y new_plan_id son requeridos" }, { status: 400 })
    }

    console.log("[v0] Changing plan for user:", username, "to plan:", new_plan_id)

    const result = await sql`
      UPDATE subscriptions s
      SET plan_id = ${new_plan_id}
      FROM clients c
      JOIN users u ON u.id = c.user_id
      WHERE s.client_id = c.id
      AND u.username = ${username}
      RETURNING s.id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "No se pudo actualizar el plan" }, { status: 404 })
    }

    console.log("[v0] Plan changed successfully")

    return NextResponse.json({ message: "Plan actualizado exitosamente" })
  } catch (error) {
    console.error("[v0] Error changing plan:", error)
    return NextResponse.json({ error: "Error al cambiar el plan" }, { status: 500 })
  }
}
