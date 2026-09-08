"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Calendar, DollarSign, FileText, User, CheckCircle2 } from "lucide-react"

export default function ClientDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [clientData, setClientData] = useState({
    name: "Life Gym",
    email: "info@lifegym.com",
    plan: "Profesional",
    monthlyAmount: 19990,
    status: "active",
    nextPaymentDate: "2024-11-10",
    lastPaymentDate: "2024-10-10",
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl shadow-lg">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{clientData.name}</h1>
                  <p className="text-blue-100 text-sm lg:text-base flex items-center gap-2 mt-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Panel de Cliente
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Badge
                variant="secondary"
                className="w-fit bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 px-4 py-2 text-sm font-semibold"
              >
                Plan {clientData.plan}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estado de Cuenta</CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-green-600">Activo</div>
            <p className="text-xs text-muted-foreground mt-1">Todos los pagos al día</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monto Mensual</CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold">${clientData.monthlyAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Pago mensual</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Próximo Pago</CardTitle>
            <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold">
              {new Date(clientData.nextPaymentDate).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(clientData.nextPaymentDate).toLocaleDateString("es-ES")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Plan Actual</CardTitle>
            <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
              <User className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold">{clientData.plan}</div>
            <p className="text-xs text-muted-foreground mt-1">Suscripción activa</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Historial de Pagos</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[
              { date: "2024-10-10", amount: 19990, status: "Completado" },
              { date: "2024-09-10", amount: 19990, status: "Completado" },
              { date: "2024-08-10", amount: 19990, status: "Completado" },
            ].map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border-2 border-gray-100 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-md"
              >
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">
                    {new Date(payment.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <Badge variant="default" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {payment.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl text-gray-900">${payment.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground font-medium">ARS</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="text-xl">Detalles del Plan</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-5">
            <div className="flex justify-between items-center pb-4 border-b-2 border-gray-100">
              <span className="text-sm font-medium text-muted-foreground">Plan Actual</span>
              <span className="font-bold text-lg text-gray-900">{clientData.plan}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b-2 border-gray-100">
              <span className="text-sm font-medium text-muted-foreground">Monto Mensual</span>
              <span className="font-bold text-lg text-gray-900">${clientData.monthlyAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b-2 border-gray-100">
              <span className="text-sm font-medium text-muted-foreground">Estado</span>
              <Badge variant="default" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                {clientData.status === "active" ? "Activo" : "Inactivo"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Último Pago</span>
              <span className="font-bold text-lg text-gray-900">
                {new Date(clientData.lastPaymentDate).toLocaleDateString("es-ES")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
