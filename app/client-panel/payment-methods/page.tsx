"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Plus, CheckCircle2, AlertCircle, Calendar, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SubscriptionStatus {
  hasSubscription: boolean
  status?: string
  nextPaymentDate?: string
  planName?: string
  price?: number
}

export default function PaymentMethodsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("status") === "success") {
      toast({
        title: "✅ Débito automático activado",
        description: "Tu método de pago se configuró correctamente",
      })
      window.history.replaceState({}, "", "/client-panel/payment-methods")
      loadSubscriptionStatus()
    } else {
      loadSubscriptionStatus()
    }
  }, [])

  const loadSubscriptionStatus = async () => {
    try {
      const username = localStorage.getItem("username")
      if (!username) return

      const response = await fetch(`/api/client/subscription/status?username=${username}`)
      const data = await response.json()

      setSubscriptionStatus(data)
    } catch (error) {
      console.error("Error loading subscription status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnectMercadoPago = async () => {
    try {
      setIsProcessing(true)
      const username = localStorage.getItem("username")

      console.log("[v0] Connecting to MercadoPago for user:", username)

      if (!username) {
        toast({
          title: "Error",
          description: "No se pudo identificar el usuario",
          variant: "destructive",
        })
        return
      }

      const response = await fetch("/api/client/subscription/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })

      const data = await response.json()
      console.log("[v0] MercadoPago response:", data)

      if (!response.ok) {
        throw new Error(data.error || "Error al crear suscripción")
      }

      if (data.init_point) {
        console.log("[v0] Redirecting to:", data.init_point)
        window.location.href = data.init_point
      } else {
        throw new Error("No se recibió el link de pago")
      }
    } catch (error) {
      console.error("Error connecting MercadoPago:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al conectar con Mercado Pago",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground mt-4">Cargando métodos de pago...</p>
        </div>
      </div>
    )
  }

  const hasActiveSubscription = subscriptionStatus?.hasSubscription && subscriptionStatus?.status === "authorized"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Métodos de Pago</h1>
        <p className="text-muted-foreground">Gestiona tus métodos de pago y suscripciones automáticas</p>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Débito Automático
          </CardTitle>
          <CardDescription>Configura el débito automático para tus pagos mensuales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Section */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Estado del Débito Automático</p>
                <p className="text-sm text-muted-foreground">{hasActiveSubscription ? "Activo" : "No configurado"}</p>
              </div>
            </div>
            {hasActiveSubscription ? (
              <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Activo
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                <AlertCircle className="mr-1 h-3 w-3" />
                Pendiente
              </Badge>
            )}
          </div>

          {/* Next Payment Date - Only show if subscription is active */}
          {hasActiveSubscription && subscriptionStatus.nextPaymentDate && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex gap-3">
                <Calendar className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-500">Próxima fecha de cobro</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(subscriptionStatus.nextPaymentDate).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Monto: ${subscriptionStatus.price?.toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Section */}
          {!hasActiveSubscription && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Beneficios del Débito Automático</h3>
              <div className="grid gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Pagos automáticos</p>
                    <p className="text-xs text-muted-foreground">
                      Tu suscripción se renueva automáticamente cada mes sin intervención manual
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Sin interrupciones</p>
                    <p className="text-xs text-muted-foreground">
                      Mantén tu servicio activo sin preocuparte por fechas de vencimiento
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Seguro y confiable</p>
                    <p className="text-xs text-muted-foreground">
                      Procesado mediante Mercado Pago, la plataforma de pagos más segura de Latinoamérica
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mercado Pago Section */}
          {!hasActiveSubscription && (
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MP</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Mercado Pago</p>
                    <p className="text-xs text-muted-foreground">Pagos seguros y automáticos</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Recomendado
                </Badge>
              </div>

              <Button onClick={handleConnectMercadoPago} className="w-full" size="lg" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Conectar con Mercado Pago
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-3">
                Al conectar, serás redirigido a Mercado Pago para autorizar el débito automático de forma segura
              </p>
            </div>
          )}

          {/* Active Subscription Info */}
          {hasActiveSubscription && (
            <div className="border-t pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm">Suscripción Activa</p>
                  <p className="text-xs text-muted-foreground">
                    Plan {subscriptionStatus.planName} - ${subscriptionStatus.price?.toLocaleString("es-AR")}/mes
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Tu débito automático está configurado y activo. Los pagos se procesarán automáticamente cada mes.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">¿Necesitas ayuda?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Si tienes problemas para configurar tu método de pago o tienes preguntas sobre la facturación, no dudes en
            contactarnos.
          </p>
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            Contactar Soporte
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
