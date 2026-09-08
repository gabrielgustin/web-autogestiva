import { neon } from "@neondatabase/serverless"

const databaseUrl =
  process.env.NEON_NEON_NEON_DATABASE_URL ||
  process.env.NEON_POSTGRES_URL ||
  process.env.NEON_NEON_DATABASE_URL ||
  process.env.DATABASE_URL

let sql: ReturnType<typeof neon> | null = null

if (!databaseUrl) {
  console.error("[v0] ❌ No database URL found. Available Neon env vars:")
  console.error(
    "[v0]",
    Object.keys(process.env)
      .filter((k) => k.includes("NEON") || k.includes("DATABASE"))
      .join(", "),
  )
  console.error("[v0] ⚠️  Database connection will not be available.")
  console.error("[v0] 💡 Please check your Neon integration in the Connect section")
} else {
  console.log("[v0] ✅ Neon database URL found, creating connection")
  const maskedUrl = databaseUrl.replace(/:[^:@]+@/, ":****@")
  console.log("[v0] 🔗 Using connection:", maskedUrl.split("?")[0])
  try {
    sql = neon(databaseUrl)
    console.log("[v0] ✅ Neon connection created successfully")
  } catch (error) {
    console.error("[v0] ❌ Error creating Neon connection:", error)
  }
}

export { sql }
