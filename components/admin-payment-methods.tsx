"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus, Trash2, Edit, Shield } from "lucide-react"
import { MercadoPagoCardForm } from "@/components/mercadopago-card-form"

// Mock payment methods data
const mockPaymentMethods = [
  {
    id: "PM-001",
    clientName: "Life Gym",
    clientEmail: "contacto@lifegym.com",
    cardBrand: "Visa",
    lastFourDigits: "4532",
    expiryDate: "12/25",
    isDefault: true,
    status: "active",
  },
  {
    id: "PM-002",
    clientName: "Tech Solutions",
    clientEmail: "info@techsolutions.com",
    cardBrand: "Mastercard",
    lastFourDigits: "8765",
    expiryDate: "08/26",
    isDefault: true,
    status: "active",
  },
]

export function AdminPaymentMethods() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  const handleAddPaymentMethod = () => {
    setShowAddForm(true)
  }

  const handleSuccess = (subscriptionId: string) => {
    console.log("Payment method added successfully:", subscriptionId)
    setShowAddForm(false)
    // Aquí podrías recargar la lista de métodos de pago
  }

  const handleError = (error: string) => {
    console.error("Error adding payment method:", error)
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setSelectedClient(null)
  }

  if (showAddForm) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={handleCancel} className="mb-4 bg-transparent">
          ← Volver a métodos de pago
        </Button>
        <MercadoPagoCardForm
          userEmail="admin@autogestiva.com"
          userName="Administrador"
          monthlyAmount={0}
          userId="admin"
          onSuccess={handleSuccess}
          onError={handleError}
          onCancel={handleCancel}
        />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Métodos de Pago</CardTitle>
            <CardDescription>Gestiona las tarjetas de crédito de tus clientes</CardDescription>
          </div>
          <Button onClick={handleAddPaymentMethod}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Método de Pago
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Seguridad de datos</p>
              <p className="text-blue-700">
                Todos los datos de tarjetas son procesados y almacenados de forma segura por MercadoPago. No almacenamos
                información sensible de tarjetas en nuestros servidores.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-3">
          {mockPaymentMethods.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No hay métodos de pago configurados</p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={handleAddPaymentMethod}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar primer método de pago
              </Button>
            </div>
          ) : (
            mockPaymentMethods.map((method) => (
              null
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
