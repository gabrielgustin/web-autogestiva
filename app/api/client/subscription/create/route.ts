import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { createMercadoPagoSubscription } from "@/lib/mercadopago"

const sql = neon(process.env.NEON_DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json()

    console.log("[v0] Creating subscription for:", username)

    // Obtener información del cliente y su plan
    const clientData = await sql`
      SELECT 
        c.id as client_id,
        c.name,
        c.email,
        u.username,
        s.id as subscription_id,
        s.plan_id,
        p.price,
        p.name as plan_name
      FROM clients c
      JOIN users u ON c.user_id = u.id
      JOIN subscriptions s ON s.client_id = c.id
      JOIN plans p ON s.plan_id = p.id
      WHERE u.username = ${username}
      AND s.status = 'active'
      LIMIT 1
    `

    if (clientData.length === 0) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 })
    }

    const client = clientData[0]
    console.log("[v0] Client found:", client)

    // Crear suscripción en Mercado Pago
    let mpSubscription: any
    try {
      mpSubscription = await createMercadoPagoSubscription({
        userEmail: client.email || `${client.username}@autogestiva.com`,
        userName: client.name,
        monthlyAmount: Number(client.price),
        userId: client.client_id.toString(),
      })
    } catch (mpError: any) {
      console.error("[v0] MercadoPago API error:", mpError)
      return NextResponse.json(
        {
          error: "Error al crear la suscripción en Mercado Pago",
          details: mpError?.message || "Error desconocido",
        },
        { status: 500 },
      )
    }

    console.log("[v0] MercadoPago subscription created:", mpSubscription?.id)

    const subscriptionId = mpSubscription?.id
    const initPoint = mpSubscription?.init_point
    const mpStatus = mpSubscription?.status || "pending"

    if (!subscriptionId || !initPoint) {
      console.error("[v0] Missing required fields in MP response:", mpSubscription)
      return NextResponse.json({ error: "Respuesta incompleta de Mercado Pago" }, { status: 500 })
    }

    // Calcular próxima fecha de pago (30 días desde hoy)
    const nextPaymentDate = new Date()
    nextPaymentDate.setDate(nextPaymentDate.getDate() + 30)

    // Actualizar suscripción en la base de datos
    await sql`
      UPDATE subscriptions
      SET 
        mercadopago_subscription_id = ${subscriptionId},
        mercadopago_status = ${mpStatus},
        mercadopago_init_point = ${initPoint},
        next_payment_date = ${nextPaymentDate.toISOString()}
      WHERE id = ${client.subscription_id}
    `

    console.log("[v0] Subscription updated in database")

    return NextResponse.json({
      success: true,
      init_point: initPoint,
      subscription_id: subscriptionId,
    })
  } catch (error) {
    console.error("[v0] Error creating subscription:", error)
    return NextResponse.json(
      { error: "Error al crear la suscripción", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
