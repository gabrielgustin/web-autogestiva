"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, DollarSign, Search, Download } from "lucide-react"

type Payment = {
  id: number
  client_name: string
  client_email: string | null
  amount: string
  status: string
  payment_date: string
  plan_name: string
  subscription_id: number
}

export function AdminPaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all")
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPayments() {
      try {
        console.log("[v0] Fetching payments from API")
        const response = await fetch("/api/admin/payments")
        const data = await response.json()

        if (data.payments) {
          console.log("[v0] Payments loaded:", data.payments.length)
          setPayments(data.payments)
        }
      } catch (error) {
        console.error("[v0] Error fetching payments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.client_email && payment.client_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      payment.id.toString().includes(searchTerm)

    const matchesFilter = filterStatus === "all" || payment.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const totalAmount = filteredPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + Number.parseFloat(p.amount), 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completado</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Fallido</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Historial de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Cargando pagos...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Historial de Pagos</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Total recaudado: ${totalAmount.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, email o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              Todos
            </Button>
            <Button
              variant={filterStatus === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("completed")}
            >
              Completados
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("pending")}
            >
              Pendientes
            </Button>
          </div>
        </div>

        {/* Payment List */}
        <div className="space-y-3">
          {filteredPayments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <DollarSign className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No se encontraron pagos</p>
            </div>
          ) : (
            filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border bg-white p-4 transition-all hover:shadow-md gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{payment.client_name}</h3>
                    {getStatusBadge(payment.status)}
                    <span className="text-xs text-muted-foreground">ID: {payment.id}</span>
                  </div>
                  {payment.client_email && <p className="text-sm text-muted-foreground">{payment.client_email}</p>}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(payment.payment_date).toLocaleDateString("es-ES")}
                    </span>
                    <span>Plan: {payment.plan_name}</span>
                  </div>
                </div>
                <div className="text-right sm:text-left">
                  <p className="text-xl font-bold text-green-600">
                    ${Number.parseFloat(payment.amount).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">ARS</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
