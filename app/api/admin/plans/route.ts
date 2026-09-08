import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"

// GET - Fetch all plans
export async function GET() {
  try {
    console.log("[v0] Fetching plans from database...")

    // Check if database connection exists
    if (!sql) {
      console.log("[v0] No database connection available")
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 })
    }

    const plans = await sql`
      SELECT id, name, price, features, created_at
      FROM plans
      ORDER BY price ASC
    `

    console.log("[v0] Plans fetched successfully:", plans.length)

    return NextResponse.json({ plans })
  } catch (error: any) {
    console.error("[v0] Error fetching plans:", error)
    return NextResponse.json({ error: "Error al obtener planes", details: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!sql) {
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 })
    }

    const { name, price, features } = await request.json()

    console.log("[v0] Creating new plan:", { name, price })

    const result = await sql`
      INSERT INTO plans (name, price, features)
      VALUES (${name}, ${price}, ${features})
      RETURNING id, name, price, features, created_at
    `

    console.log("[v0] Plan created successfully:", result[0].id)

    return NextResponse.json({ plan: result[0] }, { status: 201 })
  } catch (error: any) {
    console.error("[v0] Error creating plan:", error)
    return NextResponse.json({ error: "Error al crear plan", details: error.message }, { status: 500 })
  }
}
