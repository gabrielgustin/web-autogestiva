"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, Calendar, CheckCircle, UserPlus, FileText, Activity } from "lucide-react"
import { mockClients } from "@/lib/auth"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"

export default function DashboardPage() {
  const isMobile = useIsMobile()
  const activeClients = mockClients.filter((client) => client.status === "Activo")
  const inactiveClients = mockClients.filter((client) => client.status === "Inactivo")
  const totalMonthlyRevenue = activeClients.reduce((sum, client) => sum + client.monthlyAmount, 0)

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

  const QuickActionCard = ({ title, description, href, icon: Icon, color }: any) => (
    <Link href={href}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )

  const RecentClientCard = ({ client }: { client: any }) => (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-xs font-medium text-blue-700">{client.name.substring(0, 2).toUpperCase()}</span>
        </div>
        <div>
          <p className="font-medium text-sm">{client.name}</p>
          <p className="text-xs text-gray-500">{client.plan}</p>
        </div>
      </div>
      <Badge className={client.status === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
        {client.status}
      </Badge>
    </div>
  )

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 text-sm lg:text-base">Resumen general del sistema de gestión</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Total Clientes</CardTitle>
            <Users className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg lg:text-2xl font-bold">{mockClients.length}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 5) + 1} este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg lg:text-2xl font-bold">${totalMonthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 20) + 5}% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Clientes Activos</CardTitle>
            <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg lg:text-2xl font-bold text-green-600">{activeClients.length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeClients.length / mockClients.length) * 100)}% del total
            </p>
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
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="p-3 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            <QuickActionCard
              title="Nuevo Cliente"
              description="Agregar un cliente al sistema"
              href="/backoffice/new-client"
              icon={UserPlus}
              color="bg-blue-500"
            />
            <QuickActionCard
              title="Ver Facturación"
              description="Revisar pagos y cobros"
              href="/backoffice/billing"
              icon={FileText}
              color="bg-green-500"
            />
            <QuickActionCard
              title="Gestionar Clientes"
              description="Editar información de clientes"
              href="/backoffice/clients"
              icon={Users}
              color="bg-purple-500"
            />
            <QuickActionCard
              title="Reportes"
              description="Ver estadísticas detalladas"
              href="/backoffice/reports"
              icon={Activity}
              color="bg-orange-500"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Cliente {mockClients[0]?.name} activado</span>
                <span className="text-xs text-gray-400 ml-auto">Hace 2 horas</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Pago procesado: ${mockClients[1]?.monthlyAmount.toLocaleString()}</span>
                <span className="text-xs text-gray-400 ml-auto">Hace 4 horas</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Nuevo cliente registrado</span>
                <span className="text-xs text-gray-400 ml-auto">Hace 1 día</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">Plan actualizado para {mockClients[2]?.name}</span>
                <span className="text-xs text-gray-400 ml-auto">Hace 2 días</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Clients */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Clientes Recientes</CardTitle>
          </CardHeader>
          <CardContent className="p-3 lg:p-6">
            <div className="space-y-3">
              {mockClients.slice(0, 4).map((client) => (
                <RecentClientCard key={client.id} client={client} />
              ))}
            </div>
            <div className="mt-4">
              <Link href="/backoffice/clients">
                <Button variant="outline" className="w-full bg-transparent">
                  Ver todos los clientes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Billing Cycle - Mobile Optimized */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg lg:text-xl">
            <Calendar className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
            Próximo Ciclo de Facturación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-blue-900">
                  {nextDebitDate.toLocaleDateString("es-ES", {
                    weekday: isMobile ? undefined : "long",
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
    </div>
  )
}
