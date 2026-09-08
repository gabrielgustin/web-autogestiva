"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, CheckCircle, Calendar, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DashboardData {
  client_id: number
  name: string
  email: string | null
  username: string
  app_url: string | null
  plan: {
    id: number
    name: string
    price: string
    features: string
  }
  subscription: {
    id: number
    status: string
    start_date: string
    end_date: string | null
  }
  payment_history: Array<{
    id: number
    amount: string
    payment_date: string
    status: string
  }>
}

export default function ClientDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [availablePlans, setAvailablePlans] = useState<any[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [isChangingPlan, setIsChangingPlan] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchDashboardData()
    fetchAvailablePlans()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const username = localStorage.getItem("username")
      if (!username) return

      console.log("[v0] Fetching dashboard data for:", username)
      const response = await fetch(`/api/client/dashboard?username=${encodeURIComponent(username)}`)
      const data = await response.json()

      if (response.ok) {
        console.log("[v0] Dashboard data loaded:", data.dashboard)
        setDashboardData(data.dashboard)
      } else {
        toast({
          title: "Error",
          description: data.error || "No se pudo cargar el dashboard",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error fetching dashboard:", error)
      toast({
        title: "Error",
        description: "Error al cargar el dashboard",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAvailablePlans = async () => {
    try {
      const response = await fetch("/api/admin/plans")
      const data = await response.json()
      if (response.ok) {
        setAvailablePlans(data.plans || [])
      }
    } catch (error) {
      console.error("[v0] Error fetching plans:", error)
    }
  }

  const handleChangePlan = async () => {
    if (!selectedPlan) return

    try {
      setIsChangingPlan(true)
      const username = localStorage.getItem("username")

      const response = await fetch("/api/client/change-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          new_plan_id: Number.parseInt(selectedPlan),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Plan actualizado correctamente",
        })
        fetchDashboardData()
      } else {
        toast({
          title: "Error",
          description: data.error || "No se pudo cambiar el plan",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error changing plan:", error)
      toast({
        title: "Error",
        description: "Error al cambiar el plan",
        variant: "destructive",
      })
    } finally {
      setIsChangingPlan(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se pudo cargar el dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">¡Bienvenido, {dashboardData.username}!</h1>
            <p className="text-blue-100">Gestiona tu cuenta y servicios desde aquí</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-blue-200 text-sm">Plan Actual</p>
            <div className="flex items-center mt-1">
              <Badge className="bg-white/20 text-white border-white/30 mr-2">{dashboardData.plan.name}</Badge>
              <span className="text-blue-100 text-xs">
                {dashboardData.subscription.status === "active" ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado de Cuenta</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 capitalize">{dashboardData.subscription.status}</div>
            <p className="text-xs text-muted-foreground">
              Desde {new Date(dashboardData.subscription.start_date).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monto Mensual</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Number.parseFloat(dashboardData.plan.price).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{dashboardData.plan.name}</p>
          </CardContent>
        </Card>

        <Card
          className={`md:col-span-2 lg:col-span-1 ${dashboardData.app_url ? "cursor-pointer hover:shadow-lg transition-shadow" : ""}`}
          onClick={dashboardData.app_url ? () => window.open(dashboardData.app_url!, "_blank") : undefined}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gestionar App</CardTitle>
            {dashboardData.app_url ? (
              <ExternalLink className="h-4 w-4 text-blue-500" />
            ) : (
              <ExternalLink className="h-4 w-4 text-gray-400" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-center">
              {dashboardData.app_url ? (
                <p className="text-xs text-muted-foreground">Click para administrar tu aplicación</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No tienes una app configurada aún. Contacta con soporte para configurar tu app.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tu Plan</CardTitle>
              <CardDescription>Gestiona tu plan de suscripción</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Cambiar Plan</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cambiar Plan</DialogTitle>
                  <DialogDescription>Selecciona un nuevo plan para tu cuenta</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Plan Actual: {dashboardData.plan.name}</label>
                    <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePlans.map((plan) => (
                          <SelectItem key={plan.id} value={plan.id.toString()}>
                            {plan.name} - ${Number.parseFloat(plan.price).toLocaleString()}/mes
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleChangePlan} disabled={isChangingPlan || !selectedPlan} className="w-full">
                    {isChangingPlan ? "Cambiando..." : "Confirmar Cambio"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{dashboardData.plan.name}</h3>
              <p className="text-3xl font-bold text-blue-600">
                ${Number.parseFloat(dashboardData.plan.price).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">por mes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Historial de Pagos
          </CardTitle>
          <CardDescription>Últimos pagos realizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>El historial de pagos estará disponible una vez que se procese tu primer pago.</p>
            <p className="text-sm mt-2">Cuando integres Mercado Pago, aquí verás todos tus pagos realizados.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
