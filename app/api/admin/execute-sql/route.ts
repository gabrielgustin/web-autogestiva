import { sql } from "@/lib/neon"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { script } = await request.json()

    if (!sql) {
      return NextResponse.json({ error: "Database connection not available" }, { status: 500 })
    }

    if (!script) {
      return NextResponse.json({ error: "No script provided" }, { status: 400 })
    }

    console.log("[v0] Executing SQL script...")

    // Split the script into individual statements
    const statements = script
      .split(";")
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0 && !s.startsWith("--"))

    const results = []
    let successCount = 0
    let errorCount = 0

    for (const statement of statements) {
      try {
        const result = await sql(statement)
        results.push({ success: true, statement: statement.substring(0, 100) })
        successCount++
      } catch (error: any) {
        console.error("[v0] Error executing statement:", error)
        results.push({
          success: false,
          statement: statement.substring(0, 100),
          error: error.message,
        })
        errorCount++
      }
    }

    console.log(`[v0] ✅ Executed ${successCount} statements successfully, ${errorCount} errors`)

    return NextResponse.json({
      success: errorCount === 0,
      message: `Executed ${successCount} statements successfully${errorCount > 0 ? `, ${errorCount} errors` : ""}`,
      results,
      successCount,
      errorCount,
    })
  } catch (error: any) {
    console.error("[v0] Error in execute-sql:", error)
    return NextResponse.json({ error: error.message || "Failed to execute SQL" }, { status: 500 })
  }
}
