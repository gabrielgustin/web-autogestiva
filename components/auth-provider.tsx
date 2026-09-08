"use client"

import type React from "react"

import { useEffect, useState, createContext, useContext } from "react"
import { useAuthStore } from "@/lib/auth"

// Crear un contexto para la autenticación
const AuthContext = createContext<{ isLoaded: boolean }>({ isLoaded: false })

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Marcar que el estado de autenticación se ha cargado
    setIsLoaded(true)
    console.log("Estado de autenticación cargado:", isAuthenticated)
  }, [isAuthenticated])

  return <AuthContext.Provider value={{ isLoaded }}>{children}</AuthContext.Provider>
}
