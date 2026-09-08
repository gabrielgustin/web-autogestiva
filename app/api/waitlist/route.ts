import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    // Validate input
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (!sql) {
      console.error("[v0] ❌ Database connection not available")
      return NextResponse.json(
        { error: "Database connection not available. Please check your environment variables." },
        { status: 500 },
      )
    }

    const existingEntry = await sql`
      SELECT id FROM waitlist WHERE email = ${email.toLowerCase()}
    `

    if (existingEntry.length > 0) {
      return NextResponse.json({ error: "This email is already on the waitlist" }, { status: 409 })
    }

    const result = await sql`
      INSERT INTO waitlist (email, name, created_at)
      VALUES (${email.toLowerCase()}, ${name}, NOW())
      RETURNING id, email, name, created_at
    `

    console.log("[v0] ✅ Successfully added to waitlist:", result[0])

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist!",
        data: result[0],
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] ❌ Error adding to waitlist:", error)
    return NextResponse.json({ error: "Failed to join waitlist. Please try again later." }, { status: 500 })
  }
}
