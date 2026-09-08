"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Calendar, TrendingUp, Users, Download, CheckCircle, Clock } from "lucide-react"
import { mockClients } from "@/lib/auth"
import { useIsMobile } from "@/hooks/use-mobile"

export default function BillingPage() {
  const activeClients = mockClients.filter((client) => client.status === "Activo")
  const totalMonthlyRevenue = activeClients.reduce((sum, client) => sum + client.monthlyAmount, 0)
  const isMobile = useIsMobile()

  // Calcular próxima fecha de débito
  const getNextDebitDate = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    if (today.getDate() > 10) {
      return new Date(currentYear, currentMonth + 1, 10)
    } else {
      return new Date(currentYear, currentMonth, 10)
    }
  }

  const nextDebitDate = getNextDebitDate()
  const daysUntilDebit = Math.ceil((nextDebitDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const ClientBillingCard = ({ client }: { client: any }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-700">{client.name.substring(0, 2).toUpperCase()}</span>
            </div>
            <div>
              <h3 className="font-medium">{client.name}</h3>
              <p className="text-sm text-gray-500">{client.email}</p>
              <p className="text-xs text-gray-400">{client.plan}</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Activo
          </Badge>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div>
            <p className="text-lg font-semibold">${client.monthlyAmount.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Mensual</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Facturación</h1>
          <p className="text-gray-600 text-sm lg:text-base">Gestiona los pagos y cobros del sistema</p>
        </div>
        <Button className="w-full lg:w-auto">
          <Download className="w-4 h-4 mr-2" />
          Exportar Reporte
        </Button>
      </div>

      {/* Billing Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg lg:text-2xl font-bold">${totalMonthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Facturación recurrente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Próximo Cobro</CardTitle>
            <Calendar className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg lg:text-2xl font-bold">{daysUntilDebit} días</div>
            <p className="text-xs text-muted-foreground">Día 10 de cada mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Clientes Activos</CardTitle>
            <Users className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg lg:text-2xl font-bold">{activeClients.length}</div>
            <p className="text-xs text-muted-foreground">Con débito automático</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Tasa de Cobro</CardTitle>
            <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg lg:text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Débito automático</p>
          </CardContent>
        </Card>
      </div>

      {/* Next Billing Cycle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg lg:text-xl">
            <Clock className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
            Próximo Ciclo de Facturación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-900">
                  {nextDebitDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <p className="text-blue-700">En {daysUntilDebit} días</p>
              </div>
              <div className="text-left lg:text-right">
                <p className="text-xl lg:text-2xl font-bold text-blue-900">${totalMonthlyRevenue.toLocaleString()}</p>
                <p className="text-blue-600">Monto total a cobrar</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Billing Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Detalle de Facturación por Cliente</CardTitle>
        </CardHeader>
        <CardContent className="p-3 lg:p-6">
          {isMobile ? (
            <div className="space-y-4">
              {activeClients.map((client) => (
                <ClientBillingCard key={client.id} client={client} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {activeClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-700">
                        {client.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <p className="text-sm text-gray-500">{client.email}</p>
                      <p className="text-xs text-gray-400">{client.plan}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold">${client.monthlyAmount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Mensual</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Activo
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Historial de Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="mx-auto h-8 w-8 lg:h-12 lg:w-12 text-gray-400 mb-4" />
            <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-2">Sin historial de pagos</h3>
            <p className="text-gray-500 text-sm lg:text-base">
              Los pagos aparecerán aquí después del primer ciclo de facturación el día 10.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
