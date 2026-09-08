"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function SetupClientsPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const executeScript = async (scriptName: string) => {
    setLoading(true)
    setResult(null)

    try {
      // Fetch the SQL script
      const scriptResponse = await fetch(`/scripts/${scriptName}`)
      const script = await scriptResponse.text()

      // Execute the script
      const response = await fetch("/api/admin/execute-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || "Failed to execute script",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Configuración de Clientes</h1>
        <p className="text-muted-foreground">Ejecuta los scripts SQL para agregar clientes al sistema</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>1. Actualizar Esquema de Base de Datos</CardTitle>
            <CardDescription>Agrega las columnas first_name y last_name a la tabla clients</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => executeScript("update_clients_schema.sql")} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ejecutando...
                </>
              ) : (
                "Ejecutar Actualización de Esquema"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Agregar 9 Clientes</CardTitle>
            <CardDescription>Crea usuarios y clientes con sus credenciales de acceso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold mb-2">Clientes a agregar:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Mara Saul (mara@autogestiva.com)</li>
                  <li>Cambel (cambel@autogestiva.com)</li>
                  <li>Life Gym (meli@autogestiva.com)</li>
                  <li>Boutique (fortuna@autogestiva.com)</li>
                  <li>M&M Relojes (mateo@autogestiva.com)</li>
                  <li>Lulu Deco (ludmila@autogestiva.com)</li>
                  <li>Visual Henderson (santiago@autogestiva.com)</li>
                  <li>Pipet Labor (alberto@autogestiva.com)</li>
                  <li>Sachetto & Asociados (nicolas@autogestiva.com)</li>
                </ul>
                <p className="mt-2 text-xs">Todos con contraseña: 123</p>
              </div>
              <Button onClick={() => executeScript("002_add_clients.sql")} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Ejecutando...
                  </>
                ) : (
                  "Agregar Clientes"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Alert variant={result.success ? "default" : "destructive"}>
            <div className="flex items-start gap-2">
              {result.success ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5" />}
              <div className="flex-1">
                <AlertDescription>
                  <p className="font-semibold mb-2">{result.message || result.error}</p>
                  {result.results && (
                    <div className="mt-2 space-y-1 text-xs">
                      <p>
                        ✅ Exitosos: {result.successCount} | ❌ Errores: {result.errorCount}
                      </p>
                      {result.results
                        .filter((r: any) => !r.success)
                        .map((r: any, i: number) => (
                          <div key={i} className="text-red-600">
                            Error: {r.error}
                          </div>
                        ))}
                    </div>
                  )}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}
      </div>
    </div>
  )
}
