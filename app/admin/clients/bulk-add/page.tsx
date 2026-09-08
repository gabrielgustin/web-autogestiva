"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, XCircle, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BulkAddClientsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const clients = [
    { name: "Mara Saul", username: "Mara" },
    { name: "Cambel", username: "Cambel" },
    { name: "Life Gym", username: "Meli" },
    { name: "Boutique", username: "Fortuna" },
    { name: "M&M Relojes", username: "Mateo" },
    { name: "Lulu Deco", username: "Ludmila" },
    { name: "Visual Henderson", username: "Santiago" },
    { name: "Pipet Labor", username: "Alberto" },
    { name: "Sachetto & Asociados", username: "Nicolas" },
  ]

  const handleBulkCreate = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/clients/bulk-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      setResult(data)

      if (data.success) {
        setTimeout(() => {
          router.push("/admin/clients")
        }, 3000)
      }
    } catch (error) {
      console.error("[v0] Error creating clients:", error)
      setResult({
        success: false,
        error: "Error al crear clientes",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Agregar Clientes en Lote</h1>
        <p className="text-muted-foreground mt-2">Agrega múltiples clientes al sistema de una sola vez</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Clientes a Agregar
            </CardTitle>
            <CardDescription>Se crearán {clients.length} clientes con contraseña: 123</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {clients.map((client, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">Usuario: {client.username}</p>
                  </div>
                  {result?.created?.find((c: any) => c.businessName === client.name) && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                  {result?.errors?.find((e: any) => e.businessName === client.name) && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={handleBulkCreate}
              disabled={isLoading || result?.success}
              className="mt-6 w-full"
              size="lg"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {result?.success ? "Clientes Creados ✓" : "Crear Todos los Clientes"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result.success ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                Resultado
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.success ? (
                <div className="space-y-4">
                  <div className="rounded-lg bg-green-50 p-4">
                    <p className="font-medium text-green-900">{result.message}</p>
                  </div>

                  {result.summary && (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold">{result.summary.total}</p>
                        <p className="text-sm text-muted-foreground">Total</p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-green-600">{result.summary.created}</p>
                        <p className="text-sm text-muted-foreground">Creados</p>
                      </div>
                      <div className="rounded-lg border p-3 text-center">
                        <p className="text-2xl font-bold text-red-600">{result.summary.failed}</p>
                        <p className="text-sm text-muted-foreground">Fallidos</p>
                      </div>
                    </div>
                  )}

                  {result.errors && result.errors.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-medium">Errores:</p>
                      {result.errors.map((error: any, index: number) => (
                        <div key={index} className="rounded-lg bg-red-50 p-3">
                          <p className="font-medium text-red-900">{error.businessName || error.email}</p>
                          <p className="text-sm text-red-700">{error.error}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground">Redirigiendo a la lista de clientes en 3 segundos...</p>
                </div>
              ) : (
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="font-medium text-red-900">Error al crear clientes</p>
                  <p className="text-sm text-red-700">{result.error}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
