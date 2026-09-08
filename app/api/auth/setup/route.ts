import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("[v0] Setup completado - usando credenciales hardcodeadas")

    return NextResponse.json({
      success: true,
      message: "Sistema configurado con credenciales hardcodeadas",
    })
  } catch (error) {
    console.error("[v0] Error en setup:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error al configurar usuario",
      },
      { status: 500 },
    )
  }
}
