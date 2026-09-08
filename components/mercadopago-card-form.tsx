"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CreditCard, Shield, ArrowLeft } from "lucide-react"
import { getMercadoPagoPublicKey } from "@/actions/get-mercadopago-config"

declare global {
  interface Window {
    MercadoPago: any
  }
}

interface MercadoPagoCardFormProps {
  userEmail: string
  userName: string
  monthlyAmount: number
  userId: string
  onSuccess: (subscriptionId: string) => void
  onError: (error: string) => void
  onCancel: () => void
}

export function MercadoPagoCardForm({
  userEmail,
  userName,
  monthlyAmount,
  userId,
  onSuccess,
  onError,
  onCancel,
}: MercadoPagoCardFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [mpInstance, setMpInstance] = useState<any>(null)
  const [sdkLoaded, setSdkLoaded] = useState(false)
  const [publicKey, setPublicKey] = useState<string>("")
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    // Get public key from server
    getMercadoPagoPublicKey()
      .then((key) => {
        setPublicKey(key)
        loadMercadoPagoSDK()
      })
      .catch((error) => {
        console.error("Error getting MercadoPago public key:", error)
        setError("Error al obtener la configuración de MercadoPago")
      })
  }, [])

  const loadMercadoPagoSDK = () => {
    // Check if MercadoPago SDK is already loaded
    if (window.MercadoPago) {
      initializeMercadoPago()
      return
    }

    const script = document.createElement("script")
    script.src = "https://sdk.mercadopago.com/js/v2"
    script.async = true
    script.onload = () => {
      setSdkLoaded(true)
      initializeMercadoPago()
    }
    script.onerror = () => {
      setError("Error al cargar el SDK de MercadoPago")
    }
    document.body.appendChild(script)
  }

  const initializeMercadoPago = () => {
    try {
      if (!window.MercadoPago) {
        setError("SDK de MercadoPago no disponible")
        return
      }

      if (!publicKey) {
        setError("Clave pública de MercadoPago no configurada")
        return
      }

      const mp = new window.MercadoPago(publicKey, {
        locale: "es-AR",
      })

      setMpInstance(mp)
      console.log("MercadoPago initialized successfully")
    } catch (error) {
      console.error("Error initializing MercadoPago:", error)
      setError("Error al inicializar MercadoPago")
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!mpInstance) {
      setError("MercadoPago no está inicializado")
      return
    }

    setLoading(true)
    setError("")

    try {
      const formData = new FormData(event.currentTarget)

      // Get form values
      const cardNumber = formData.get("cardNumber") as string
      const cardholderName = formData.get("cardholderName") as string
      const expirationDate = formData.get("expirationDate") as string
      const securityCode = formData.get("securityCode") as string
      const identificationType = formData.get("identificationType") as string
      const identificationNumber = formData.get("identificationNumber") as string

      // Validate required fields
      if (
        !cardNumber ||
        !cardholderName ||
        !expirationDate ||
        !securityCode ||
        !identificationType ||
        !identificationNumber
      ) {
        throw new Error("Por favor completa todos los campos requeridos")
      }

      // Parse expiration date
      const [month, year] = expirationDate.split("/")
      if (!month || !year) {
        throw new Error("Formato de fecha de vencimiento inválido (MM/YY)")
      }

      // Create card token
      const tokenData = {
        cardNumber: cardNumber.replace(/\s/g, ""), // Remove spaces
        cardholderName,
        cardExpirationMonth: month,
        cardExpirationYear: `20${year}`, // Convert YY to YYYY
        securityCode,
        identificationType,
        identificationNumber,
      }

      console.log("Creating token with data:", { ...tokenData, cardNumber: "****", securityCode: "***" })

      const token = await mpInstance.createCardToken(tokenData)

      if (token.error) {
        console.error("Token creation error:", token.error)
        throw new Error(token.error.message || "Error al procesar los datos de la tarjeta")
      }

      if (!token.id) {
        throw new Error("No se pudo generar el token de la tarjeta")
      }

      console.log("Token created successfully:", token.id)

      // Simulate successful subscription creation
      setTimeout(() => {
        onSuccess("subscription_" + Date.now())
        setLoading(false)
      }, 2000)
    } catch (error: any) {
      console.error("Error processing payment:", error)
      let errorMessage = "Error desconocido al procesar el pago"

      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === "string") {
        errorMessage = error
      } else if (error && typeof error === "object") {
        errorMessage = error.message || error.toString() || errorMessage
      }

      setError(errorMessage)
      setLoading(false)
      onError(errorMessage)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-blue-600" />
            <CardTitle>Configurar Débito Automático</CardTitle>
          </div>
          <CardDescription>
            Configura tu tarjeta para débitos automáticos de ${monthlyAmount.toLocaleString()} mensuales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="cardNumber">Número de tarjeta</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  onChange={(e) => {
                    // Format card number with spaces
                    let value = e.target.value.replace(/\s/g, "").replace(/\D/g, "")
                    value = value.replace(/(\d{4})(?=\d)/g, "$1 ")
                    e.target.value = value
                  }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="expirationDate">Fecha de vencimiento</Label>
                <Input
                  id="expirationDate"
                  name="expirationDate"
                  placeholder="MM/YY"
                  maxLength={5}
                  onChange={(e) => {
                    // Format MM/YY
                    let value = e.target.value.replace(/\D/g, "")
                    if (value.length >= 2) {
                      value = value.substring(0, 2) + "/" + value.substring(2, 4)
                    }
                    e.target.value = value
                  }}
                  required
                />
              </div>

              <div>
                <Label htmlFor="securityCode">Código de seguridad</Label>
                <Input
                  id="securityCode"
                  name="securityCode"
                  placeholder="123"
                  maxLength={4}
                  onChange={(e) => {
                    // Only numbers
                    e.target.value = e.target.value.replace(/\D/g, "")
                  }}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="cardholderName">Nombre del titular</Label>
                <Input
                  id="cardholderName"
                  name="cardholderName"
                  placeholder="Nombre como aparece en la tarjeta"
                  required
                />
              </div>

              <div>
                <Label htmlFor="identificationType">Tipo de documento</Label>
                <select
                  id="identificationType"
                  name="identificationType"
                  className="mt-1 h-10 w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                  required
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="DNI">DNI</option>
                  <option value="CI">Cédula de Identidad</option>
                  <option value="LC">Libreta Cívica</option>
                  <option value="LE">Libreta de Enrolamiento</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <Label htmlFor="identificationNumber">Número de documento</Label>
                <Input
                  id="identificationNumber"
                  name="identificationNumber"
                  placeholder="12345678"
                  onChange={(e) => {
                    // Only numbers
                    e.target.value = e.target.value.replace(/\D/g, "")
                  }}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="cardholderEmail">Email del titular</Label>
                <Input id="cardholderEmail" name="cardholderEmail" type="email" defaultValue={userEmail} required />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">Transacción segura</p>
                  <p className="text-blue-700">
                    Tus datos están protegidos por el protocolo de seguridad de MercadoPago. No almacenamos información
                    de tu tarjeta.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button type="submit" disabled={loading || !mpInstance} className="flex-1">
                {loading ? "Procesando..." : `Configurar Débito de $${monthlyAmount.toLocaleString()}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <div className="mt-6 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">¿Cómo funciona?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Se debitará ${monthlyAmount.toLocaleString()} de tu tarjeta cada mes</p>
            <p>• Recibirás una notificación antes de cada débito</p>
            <p>• Puedes cancelar la suscripción en cualquier momento</p>
            <p>• Tus pagos aparecerán como "TuPedido - Suscripción" en tu resumen</p>
          </CardContent>
        </Card>

        <div className="text-xs text-center text-muted-foreground">
          Al continuar, aceptas los términos y condiciones de MercadoPago y autorizas los débitos automáticos mensuales.
        </div>
      </div>
    </div>
  )
}
