import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username) {
      return NextResponse.json({ error: "Username es requerido" }, { status: 400 })
    }

    console.log("[v0] Fetching dashboard data for:", username)

    const result = await sql`
      SELECT 
        c.id as client_id,
        c.name,
        c.email,
        c.app_url,
        u.username,
        p.id as plan_id,
        p.name as plan_name,
        p.price as plan_price,
        p.features as plan_features,
        s.id as subscription_id,
        s.status as subscription_status,
        s.start_date,
        s.end_date,
        (
          SELECT json_agg(
            json_build_object(
              'id', pay.id,
              'amount', pay.amount,
              'payment_date', pay.payment_date,
              'status', pay.status
            )
            ORDER BY pay.payment_date DESC
          )
          FROM payments pay
          WHERE pay.subscription_id = s.id
          LIMIT 10
        ) as payment_history
      FROM users u
      JOIN clients c ON c.user_id = u.id
      LEFT JOIN subscriptions s ON s.client_id = c.id
      LEFT JOIN plans p ON p.id = s.plan_id
      WHERE u.username = ${username}
      LIMIT 1
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 })
    }

    const dashboardData = result[0]
    console.log("[v0] Dashboard data fetched successfully")

    return NextResponse.json({
      dashboard: {
        client_id: dashboardData.client_id,
        name: dashboardData.name,
        email: dashboardData.email,
        username: dashboardData.username,
        app_url: dashboardData.app_url,
        plan: {
          id: dashboardData.plan_id,
          name: dashboardData.plan_name,
          price: dashboardData.plan_price,
          features: dashboardData.plan_features,
        },
        subscription: {
          id: dashboardData.subscription_id,
          status: dashboardData.subscription_status,
          start_date: dashboardData.start_date,
          end_date: dashboardData.end_date,
        },
        payment_history: dashboardData.payment_history || [],
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Error al obtener datos del dashboard" }, { status: 500 })
  }
}
