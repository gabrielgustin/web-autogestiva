import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"

// PUT - Update plan
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!sql) {
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 })
    }

    const { name, price, features } = await request.json()
    const planId = params.id

    console.log("[v0] Updating plan:", planId)

    const result = await sql`
      UPDATE plans
      SET name = ${name}, price = ${price}, features = ${features}
      WHERE id = ${planId}
      RETURNING id, name, price, features, created_at
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Plan no encontrado" }, { status: 404 })
    }

    console.log("[v0] Plan updated successfully:", planId)

    return NextResponse.json({ plan: result[0] })
  } catch (error: any) {
    console.error("[v0] Error updating plan:", error)
    return NextResponse.json({ error: "Error al actualizar plan", details: error.message }, { status: 500 })
  }
}

// DELETE - Delete plan
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!sql) {
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 })
    }

    const planId = params.id

    console.log("[v0] Deleting plan:", planId)

    // Check if plan has active subscriptions
    const subscriptions = await sql`
      SELECT COUNT(*) as count
      FROM subscriptions
      WHERE plan_id = ${planId} AND status = 'active'
    `

    if (subscriptions[0].count > 0) {
      return NextResponse.json({ error: "No se puede eliminar un plan con suscripciones activas" }, { status: 400 })
    }

    await sql`
      DELETE FROM plans
      WHERE id = ${planId}
    `

    console.log("[v0] Plan deleted successfully:", planId)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Error deleting plan:", error)
    return NextResponse.json({ error: "Error al eliminar plan", details: error.message }, { status: 500 })
  }
}
