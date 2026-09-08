"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Shield, CheckCircle } from "lucide-react"

export default function AdminSetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const createAdminUser = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/setup", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al configurar el usuario")
      }

      setSuccess(true)

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        router.push("/admin/login")
      }, 2000)
    } catch (error: unknown) {
      console.error("[v0] Error en createAdminUser:", error)
      setError(error instanceof Error ? error.message : "Error al crear el usuario")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Configuración Inicial</h1>
            <p className="text-sm text-muted-foreground">Autogestiva</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Crear Usuario Administrador</CardTitle>
              <CardDescription>
                Haz clic en el botón para crear el usuario administrador con las credenciales predefinidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="rounded-lg bg-blue-50 p-4 text-sm">
                  <p className="font-medium text-blue-900 mb-2">Credenciales del administrador:</p>
                  <p className="text-blue-700">Email: autogestiva.info@gmail.com</p>
                  <p className="text-blue-700">Contraseña: 123</p>
                </div>

                {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

                {success && (
                  <div className="rounded-lg bg-green-50 p-4 text-sm flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Usuario configurado exitosamente</p>
                      <p className="text-green-700">Redirigiendo al login...</p>
                    </div>
                  </div>
                )}

                <Button onClick={createAdminUser} className="w-full" disabled={isLoading || success}>
                  {isLoading ? "Configurando..." : success ? "Usuario configurado" : "Configurar Usuario Administrador"}
                </Button>

                <div className="text-center">
                  <Button variant="link" onClick={() => router.push("/admin/login")} className="text-sm">
                    Ya tengo una cuenta, ir a login
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
