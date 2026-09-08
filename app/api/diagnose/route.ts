import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    sqlConnectionAvailable: sql !== null,
    environmentVariables: {
      NEON_NEON_DATABASE_URL: !!process.env.DATABASE_URL,
      NEON_DATABASE_URL: !!process.env.NEON_DATABASE_URL,
      NEON_POSTGRES_URL: !!process.env.NEON_POSTGRES_URL,
      NEON_NEON_DATABASE_URL: !!process.env.NEON_NEON_DATABASE_URL,
      NEON_PGHOST: !!process.env.NEON_PGHOST,
      NEON_PGUSER: !!process.env.NEON_PGUSER,
      NEON_PGPASSWORD: !!process.env.NEON_PGPASSWORD,
      NEON_PGDATABASE: !!process.env.NEON_PGDATABASE,
    },
    allNeonVars: Object.keys(process.env)
      .filter((k) => k.includes("NEON") || k.includes("DATABASE") || k.includes("PG"))
      .sort(),
  }

  // Test database connection if available
  if (sql) {
    try {
      const result = await sql`SELECT NOW() as current_time, version() as pg_version`
      diagnostics.databaseTest = {
        success: true,
        currentTime: result[0].current_time,
        postgresVersion: result[0].pg_version,
      }

      // Test users table
      try {
        const usersCount = await sql`SELECT COUNT(*) as count FROM users`
        diagnostics.usersTable = {
          exists: true,
          count: usersCount[0].count,
        }

        // Get sample user (without password)
        const sampleUsers = await sql`SELECT id, email, role FROM users LIMIT 3`
        diagnostics.sampleUsers = sampleUsers
      } catch (tableError) {
        diagnostics.usersTable = {
          exists: false,
          error: tableError instanceof Error ? tableError.message : "Unknown error",
        }
      }
    } catch (dbError) {
      diagnostics.databaseTest = {
        success: false,
        error: dbError instanceof Error ? dbError.message : "Unknown error",
      }
    }
  } else {
    diagnostics.databaseTest = {
      success: false,
      error: "SQL connection not available - no database URL found",
    }
  }

  return NextResponse.json(diagnostics, { status: 200 })
}
