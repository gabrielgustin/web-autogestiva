"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, DollarSign, CheckCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"

const plans = [
  { id: "basico", name: "Plan Básico", price: 6500, description: "Funcionalidades básicas" },
  { id: "estandar", name: "Plan Estándar", price: 8500, description: "Funcionalidades avanzadas" },
  { id: "premium", name: "Plan Premium", price: 15000, description: "Todas las funcionalidades" },
]

export default function NewClientPage() {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    plan: "",
    monthlyAmount: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSuccessMessage(`Cliente ${formData.name} creado exitosamente`)
    setIsSubmitting(false)

    // Limpiar formulario
    setFormData({
      name: "",
      email: "",
      username: "",
      plan: "",
      monthlyAmount: 0,
    })

    // Redirigir después de 2 segundos
    setTimeout(() => {
      router.push("/backoffice/clients")
    }, 2000)
  }

  const handlePlanChange = (planName: string) => {
    const selectedPlan = plans.find((p) => p.name === planName)
    setFormData({
      ...formData,
      plan: planName,
      monthlyAmount: selectedPlan?.price || 0,
    })
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/backoffice/clients">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Volver</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Nuevo Cliente</h1>
          <p className="text-gray-600 text-sm lg:text-base">Agregar un nuevo cliente al sistema</p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Información del Cliente</CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ej: juan@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Ej: juanperez"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Plan */}
              <div className="space-y-2">
                <Label htmlFor="plan">Plan</Label>
                <Select value={formData.plan} onValueChange={handlePlanChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.name}>
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">{plan.name}</span>
                            <span className="ml-2 text-sm font-semibold">${plan.price.toLocaleString()}</span>
                          </div>
                          <span className="text-xs text-gray-500">{plan.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Monto Mensual */}
            <div className="space-y-2">
              <Label htmlFor="amount">Monto Mensual</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={formData.monthlyAmount}
                  onChange={(e) => setFormData({ ...formData, monthlyAmount: Number.parseInt(e.target.value) })}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">El monto se actualizará automáticamente al seleccionar un plan</p>
            </div>

            {/* Plan Preview */}
            {formData.plan && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Resumen del Plan Seleccionado</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700 font-medium">Plan</p>
                    <p className="text-blue-900">{formData.plan}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">Monto Mensual</p>
                    <p className="text-blue-900 font-semibold">${formData.monthlyAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">Fecha de Débito</p>
                    <p className="text-blue-900">Día 10 de cada mes</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1 lg:flex-none lg:w-auto">
                {isSubmitting ? "Creando Cliente..." : "Crear Cliente"}
              </Button>
              <Link href="/backoffice/clients" className="flex-1 lg:flex-none lg:w-auto">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Información Importante</CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-6">
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Los clientes serán activados automáticamente al ser creados</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>El débito automático se realizará el día 10 de cada mes</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Los clientes recibirán un email de bienvenida con sus credenciales</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>Puedes modificar la información del cliente después de crearlo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
