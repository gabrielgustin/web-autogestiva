"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"

interface Plan {
  id: number
  name: string
  price: number
  features: string
}

export default function NewClientPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [plans, setPlans] = useState<Plan[]>([])
  const [loadingPlans, setLoadingPlans] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    planId: 0,
    password: "123",
    appUrl: "",
  })

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoadingPlans(true)
        const response = await fetch("/api/admin/plans")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Error al cargar planes")
        }

        setPlans(data.plans || [])
        // Set first plan as default if available
        if (data.plans && data.plans.length > 0) {
          setFormData((prev) => ({ ...prev, planId: data.plans[0].id }))
        }
      } catch (err: any) {
        console.error("[v0] Error fetching plans:", err)
        setError(err.message)
      } finally {
        setLoadingPlans(false)
      }
    }

    fetchPlans()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    console.log("[v0] Submitting new client:", formData)

    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          password: formData.password,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          country: formData.country,
          plan_id: formData.planId,
          app_url: formData.appUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear cliente")
      }

      console.log("[v0] Client created successfully:", data)

      setIsSuccess(true)

      setTimeout(() => {
        console.log("[v0] Redirecting to /admin/clients")
        window.location.href = "/admin/clients"
      }, 800)
    } catch (err: any) {
      console.error("[v0] Error creating client:", err)
      setError(err.message || "Error al crear cliente")
    } finally {
      setIsLoading(false)
    }
  }

  const selectedPlan = plans.find((p) => p.id === formData.planId)

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white rounded-lg p-8 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center animate-in zoom-in duration-500">
              <svg
                className="h-10 w-10 text-green-600 animate-in zoom-in duration-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-semibold text-gray-900">¡Cliente creado exitosamente!</h3>
              <p className="text-sm text-gray-500 mt-1">Redirigiendo...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loadingPlans) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/clients">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Nuevo Cliente</h1>
          <p className="text-muted-foreground">Completa la información del cliente</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Negocio *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Mara Saul"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Usuario (para login) *</Label>
                <Input
                  id="username"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Mara"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="mara@marasaul.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+54 9 11 1234-5678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Buenos Aires"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Argentina"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">Plan *</Label>
                <Select
                  value={formData.planId.toString()}
                  onValueChange={(value) => setFormData({ ...formData, planId: Number.parseInt(value) })}
                  disabled={plans.length === 0}
                >
                  <SelectTrigger id="plan">
                    <SelectValue
                      placeholder={plans.length === 0 ? "No hay planes disponibles" : "Selecciona un plan"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id.toString()}>
                        {plan.name} - ${plan.price.toLocaleString()}/mes
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {plans.length === 0 && (
                  <p className="text-xs text-red-600">No hay planes disponibles. Crea uno primero.</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="123"
                />
                <p className="text-xs text-muted-foreground">Por defecto: 123</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appUrl">Link de la App del Cliente</Label>
                <Input
                  id="appUrl"
                  type="url"
                  value={formData.appUrl}
                  onChange={(e) => setFormData({ ...formData, appUrl: e.target.value })}
                  placeholder="https://ejemplo.vercel.app"
                />
                <p className="text-xs text-muted-foreground">Link único para acceder a la app del cliente</p>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>
            )}

            {selectedPlan && (
              <div className="rounded-lg border bg-blue-50 p-4">
                <h3 className="font-semibold mb-2">Resumen del Plan</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Plan:</span>{" "}
                    <span className="font-medium">{selectedPlan.name}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Monto mensual:</span>{" "}
                    <span className="font-medium">${selectedPlan.price.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isLoading || plans.length === 0}>
                {isLoading ? "Creando..." : "Crear Cliente"}
              </Button>
              <Link href="/admin/clients" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent" disabled={isLoading}>
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
