import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username requerido" }, { status: 400 })
    }

    console.log("[v0] Getting subscription status for:", username)

    // Obtener estado de la suscripción
    const result = await sql`
      SELECT 
        s.mercadopago_subscription_id,
        s.mercadopago_status,
        s.next_payment_date,
        s.status,
        p.name as plan_name,
        p.price
      FROM subscriptions s
      JOIN clients c ON s.client_id = c.id
      JOIN users u ON c.user_id = u.id
      JOIN plans p ON s.plan_id = p.id
      WHERE u.username = ${username}
      AND s.status = 'active'
      LIMIT 1
    `

    if (result.length === 0) {
      return NextResponse.json({ hasSubscription: false })
    }

    const subscription = result[0]

    return NextResponse.json({
      hasSubscription: !!subscription.mercadopago_subscription_id,
      status: subscription.mercadopago_status,
      nextPaymentDate: subscription.next_payment_date,
      planName: subscription.plan_name,
      price: subscription.price,
    })
  } catch (error) {
    console.error("[v0] Error getting subscription status:", error)
    return NextResponse.json({ error: "Error al obtener estado de suscripción" }, { status: 500 })
  }
}
