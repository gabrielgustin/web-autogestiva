import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function GET() {
  try {
    console.log("[v0] Fetching company settings from database")

    const settings = await sql`
      SELECT * FROM company_settings WHERE id = 1
    `

    if (settings.length === 0) {
      return NextResponse.json({
        company_name: "Autogestiva",
        email: "",
        phone: "",
      })
    }

    console.log("[v0] Company settings fetched:", settings[0])
    return NextResponse.json(settings[0])
  } catch (error) {
    console.error("[v0] Error fetching company settings:", error)
    return NextResponse.json({ error: "Error al cargar la configuración" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { companyName, email, phone } = body

    console.log("[v0] Updating company settings:", { companyName, email, phone })

    await sql`
      UPDATE company_settings 
      SET 
        company_name = ${companyName},
        email = ${email},
        phone = ${phone},
        updated_at = NOW()
      WHERE id = 1
    `

    console.log("[v0] Company settings updated successfully")

    return NextResponse.json({
      success: true,
      message: "Configuración actualizada exitosamente",
    })
  } catch (error) {
    console.error("[v0] Error updating company settings:", error)
    return NextResponse.json({ error: "Error al actualizar la configuración" }, { status: 500 })
  }
}
