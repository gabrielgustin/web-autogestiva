import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const clientId = Number.parseInt(params.id)
    const body = await request.json()
    const { name, email, phone, city, country, plan_id, app_url } = body

    if (!sql) {
      return NextResponse.json({ error: "No hay conexión a la base de datos" }, { status: 500 })
    }

    await sql`
      UPDATE clients
      SET 
        name = ${name},
        email = ${email || null},
        phone = ${phone || null},
        city = ${city || null},
        country = ${country || null},
        app_url = ${app_url || null},
        updated_at = NOW()
      WHERE id = ${clientId}
    `

    if (plan_id) {
      await sql`
        UPDATE subscriptions
        SET plan_id = ${plan_id}
        WHERE client_id = ${clientId}
      `
      console.log("[v0] Client plan updated:", clientId, "to plan:", plan_id)
    }

    console.log("[v0] Client updated:", clientId)

    return NextResponse.json({ success: true, message: "Cliente actualizado exitosamente" })
  } catch (error: any) {
    console.error("[v0] Error updating client:", error)
    return NextResponse.json({ error: "Error al actualizar cliente", details: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const clientId = Number.parseInt(params.id)

    if (!sql) {
      return NextResponse.json({ error: "No hay conexión a la base de datos" }, { status: 500 })
    }

    const clientResult = await sql`
      SELECT user_id FROM clients WHERE id = ${clientId}
    `

    if (clientResult.length === 0) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 })
    }

    const userId = clientResult[0].user_id

    await sql`
      DELETE FROM users WHERE id = ${userId}
    `

    console.log("[v0] User and client deleted (with cascade):", userId, clientId)

    return NextResponse.json({ success: true, message: "Cliente eliminado exitosamente" })
  } catch (error: any) {
    console.error("[v0] Error deleting client:", error)
    return NextResponse.json({ error: "Error al eliminar cliente", details: error.message }, { status: 500 })
  }
}
