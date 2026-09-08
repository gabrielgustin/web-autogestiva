"use client"

// Types
export interface Product {
  id: string
  name: string
  price: number
  description?: string
  image?: string
  category?: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  plan?: string
  status: string
}

export interface User {
  id: string
  email: string
  role: "admin" | "client"
  name?: string
}

// Mock clients data
export const mockClients: Client[] = [
  {
    id: "1",
    name: "Life Gym",
    email: "contacto@lifegym.com",
    phone: "+54 9 11 1234-5678",
    company: "Life Gym",
    plan: "Profesional",
    status: "active",
  },
  {
    id: "2",
    name: "Tech Solutions",
    email: "info@techsolutions.com",
    phone: "+54 9 11 2345-6789",
    company: "Tech Solutions",
    plan: "Empresarial",
    status: "active",
  },
  {
    id: "3",
    name: "Café Central",
    email: "contacto@cafecentral.com",
    phone: "+54 9 11 3456-7890",
    company: "Café Central",
    plan: "Básico",
    status: "inactive",
  },
]

// Simple auth hooks using cookies (client-side)
export const useAuth = () => {
  if (typeof window === "undefined") {
    return { user: null, isAuthenticated: false, logout: () => {} }
  }

  const cookies = document.cookie.split(";")
  const authCookie = cookies.find((c) => c.trim().startsWith("auth-token="))

  if (!authCookie) {
    return { user: null, isAuthenticated: false, logout: async () => {} }
  }

  const token = authCookie.split("=")[1]
  const [email, role] = token.split("|")

  const user: User = {
    id: email,
    email: email,
    role: role as "admin" | "client",
    name: role === "admin" ? "Administrador" : "Cliente",
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/login"
  }

  return { user, isAuthenticated: true, logout }
}

// Deprecated: kept for backward compatibility
export const useAuthStore = () => {
  console.warn("useAuthStore is deprecated, use useAuth instead")
  return useAuth()
}
