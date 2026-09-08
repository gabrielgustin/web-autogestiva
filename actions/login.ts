"use server"

import { mockClients } from "@/lib/auth"

export async function authenticate(formData: FormData | null) {
  if (!formData) {
    return {
      success: false,
      error: "No se recibieron datos del formulario",
    }
  }

  try {
    const username = formData.get("username")?.toString()
    const password = formData.get("password")?.toString()

    if (!username || !password) {
      return {
        success: false,
        error: "Usuario y contraseña son requeridos",
      }
    }

    // Admin login
    if (username === "admin" && password === "admin123") {
      return {
        success: true,
        user: {
          id: "admin",
          username: "admin",
          role: "admin" as const,
        },
      }
    }

    // Client login
    const client = mockClients.find((c) => c.username === username && password === "123")

    if (client) {
      return {
        success: true,
        user: {
          id: client.id,
          username: client.username,
          role: "client" as const,
          name: client.name,
          email: client.email,
          plan: client.plan,
          status: client.status,
          monthlyAmount: client.monthlyAmount,
          joinDate: client.joinDate,
        },
      }
    }

    return {
      success: false,
      error: "Credenciales incorrectas",
    }
  } catch (error) {
    return {
      success: false,
      error: "Error interno del servidor",
    }
  }
}
