"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, DollarSign, TrendingUp, Clock, Receipt } from "lucide-react"
import Link from "next/link"
import { AdminPaymentHistory } from "@/components/admin-payment-history"

interface Client {
  id: number
  name: string
  email: string
  phone: string
  city: string
  country: string
  plan_name: string
  status: string
  created_at: string
}

interface Stats {
  totalClients: number
  activeSubscriptions: number
  monthlyRevenue: number
  totalPlans: number
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [clients, setClients] = useState<Client[]>([])
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    totalPlans: 0,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      console.log("[v0] Fetching admin dashboard data...")

      // Fetch clients and stats in parallel
      const [clientsRes, statsRes] = await Promise.all([fetch("/api/admin/clients"), fetch("/api/admin/stats")])

      if (clientsRes.ok) {
        const clientsData = await clientsRes.json()
        console.log("[v0] Response data:", clientsData)
        setClients(clientsData.clients || [])
        console.log("[v0] Clients loaded:", clientsData.clients?.length)
        if (clientsData.error) {
          console.error("[v0] API returned error:", clientsData.error)
        }
      } else {
        const errorText = await clientsRes.text()
        console.error("[v0] Error fetching clients:", errorText)
        setClients([])
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData.stats || stats)
        console.log("[v0] Stats loaded:", statsData.stats)
      } else {
        console.error("[v0] Error fetching stats:", await statsRes.text())
      }
    } catch (error) {
      console.error("[v0] Error fetching dashboard data:", error)
      setClients([])
    } finally {
      setIsLoading(false)
    }
  }

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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 lg:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-blue-100 text-sm lg:text-base">Gestiona tus clientes y servicios</p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/clients/new">
              <Button variant="secondary" size="lg">
                + Nuevo Cliente
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold text-green-600">{stats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Total: {stats.totalClients} clientes</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">${stats.monthlyRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Ingresos recurrentes</p>
          </CardContent>
        </Card>

        <Link href="/admin/plans">
          <Card className="transition-all duration-200 hover:shadow-md cursor-pointer hover:border-purple-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Planes Disponibles</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold">{stats.totalPlans}</div>
              <p className="text-xs text-muted-foreground">Planes activos</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">Clientes registrados</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Clients and Payment History */}
      <Tabs defaultValue="clients" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto">
          <TabsTrigger value="clients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Clientes</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            <span className="hidden sm:inline">Historial de Pagos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Clientes Recientes</CardTitle>
                <Button variant="outline" size="sm" onClick={fetchDashboardData}>
                  Actualizar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {clients.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No hay clientes registrados</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="p-3 font-medium">Nombre del Negocio</th>
                        <th className="p-3 font-medium">Email</th>
                        <th className="p-3 font-medium">Teléfono</th>
                        <th className="p-3 font-medium">Ciudad</th>
                        <th className="p-3 font-medium">Plan</th>
                        <th className="p-3 font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => (
                        <tr key={client.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-3 font-medium">{client.name}</td>
                          <td className="p-3 text-sm">{client.email}</td>
                          <td className="p-3 text-sm">{client.phone || "-"}</td>
                          <td className="p-3 text-sm">{client.city || "-"}</td>
                          <td className="p-3">
                            <Badge variant="outline">{client.plan_name || "Sin plan"}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={client.status === "active" ? "default" : "secondary"}
                              className={client.status === "active" ? "bg-green-100 text-green-800" : ""}
                            >
                              {client.status || "pending"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <AdminPaymentHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
