"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, AlertCircle } from 'lucide-react'
import Link from "next/link"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Usuario y contraseña son requeridos")
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username, password }),
          redirect: "manual",
        })

        if (response.status === 307 || response.status === 0 || response.type === "opaqueredirect") {
          const location = response.headers.get("Location")
          if (location) {
            localStorage.setItem("username", username)
            localStorage.setItem("role", "client")
            window.location.href = location
          } else {
            window.location.reload()
          }
          return
        }

        if (response.ok) {
          const contentType = response.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json()
            if (data.success && data.redirectUrl) {
              localStorage.setItem("username", username)
              localStorage.setItem("role", data.redirectUrl.includes("/admin") ? "admin" : "client")
              window.location.href = data.redirectUrl
              return
            }
          }
        }

        if (!response.ok) {
          const contentType = response.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json()
            setError(data.error || "Error al iniciar sesión")
          } else {
            const text = await response.text()
            console.error("[v0] Server error:", text)
            setError(
              "Error del servidor. Por favor, asegúrate de que la base de datos esté configurada visitando /setup",
            )
          }
          return
        }
      } catch (error) {
        console.error("[v0] Login error:", error)
        setError("Error al conectar con el servidor. Verifica que la base de datos esté configurada en /setup")
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Link 
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Volver</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">Ingresa tus credenciales para acceder</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                disabled={isPending}
              />
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
