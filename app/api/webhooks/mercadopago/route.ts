import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Webhook received from MercadoPago:", JSON.stringify(body, null, 2))

    const { type, data } = body

    if (type === "payment") {
      // Notificación de pago
      const paymentId = data.id
      console.log("[v0] Processing payment notification:", paymentId)

      // Aquí obtendrías los detalles del pago desde MP API
      // Por ahora registramos el webhook
      await sql`
        INSERT INTO payments (subscription_id, amount, payment_date, status)
        SELECT 
          s.id,
          p.price,
          CURRENT_TIMESTAMP,
          'completed'
        FROM subscriptions s
        JOIN plans p ON s.plan_id = p.id
        WHERE s.mercadopago_subscription_id = ${data.preapproval_id}
        LIMIT 1
      `

      console.log("[v0] Payment recorded successfully")
    } else if (type === "subscription_preapproval" || type === "preapproval") {
      // Notificación de cambio en suscripción
      const subscriptionId = data.id
      console.log("[v0] Processing subscription update:", subscriptionId)

      // Actualizar estado de la suscripción
      await sql`
        UPDATE subscriptions
        SET 
          mercadopago_status = 'authorized',
          updated_at = CURRENT_TIMESTAMP
        WHERE mercadopago_subscription_id = ${subscriptionId}
      `

      console.log("[v0] Subscription status updated")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error processing webhook:", error)
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: "Webhook endpoint active" })
}
