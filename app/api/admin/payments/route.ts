import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_DATABASE_URL!)

export async function GET() {
  try {
    console.log("[v0] Fetching real payment data from database")

    // Query to get all payments with client and plan information
    const payments = await sql`
      SELECT 
        p.id,
        p.amount,
        p.payment_date,
        p.status,
        c.name as client_name,
        c.email as client_email,
        pl.name as plan_name,
        s.id as subscription_id
      FROM payments p
      INNER JOIN subscriptions s ON p.subscription_id = s.id
      INNER JOIN clients c ON s.client_id = c.id
      INNER JOIN plans pl ON s.plan_id = pl.id
      ORDER BY p.payment_date DESC
    `

    console.log("[v0] Successfully fetched payments:", payments.length)

    return NextResponse.json({ payments })
  } catch (error) {
    console.error("[v0] Error fetching payments:", error)
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}
