import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function GET() {
  try {
    console.log("[v0] Fetching admin stats from database...")

    // Check if database connection exists
    if (!sql) {
      console.log("[v0] No database connection, using mock data")
      // Return mock data if no database connection
      return NextResponse.json({
        stats: {
          totalClients: 1,
          activeSubscriptions: 1,
          monthlyRevenue: 79.0,
          totalPlans: 3,
        },
      })
    }

    const [clientsCount] = await sql`
      SELECT COUNT(*) as count FROM clients
    `

    const [activeSubsCount] = await sql`
      SELECT COUNT(*) as count 
      FROM subscriptions 
      WHERE status = 'active'
    `

    const [revenueResult] = await sql`
      SELECT COALESCE(SUM(p.price), 0) as revenue
      FROM subscriptions s
      INNER JOIN plans p ON s.plan_id = p.id
      WHERE s.status = 'active'
    `

    const [plansCount] = await sql`
      SELECT COUNT(*) as count 
      FROM plans
    `

    const stats = {
      totalClients: Number.parseInt(clientsCount.count),
      activeSubscriptions: Number.parseInt(activeSubsCount.count),
      monthlyRevenue: Number.parseFloat(revenueResult.revenue),
      totalPlans: Number.parseInt(plansCount.count),
    }

    console.log("[v0] Stats fetched successfully:", stats)

    return NextResponse.json({ stats })
  } catch (error: any) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json(
      {
        error: "Error al obtener estadísticas",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
