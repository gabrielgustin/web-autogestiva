"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangePasswordDialog } from "@/components/change-password-dialog"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const [companySettings, setCompanySettings] = useState({
    companyName: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    loadCompanySettings()
  }, [])

  const loadCompanySettings = async () => {
    try {
      const response = await fetch("/api/admin/company-settings")
      if (response.ok) {
        const data = await response.json()
        setCompanySettings({
          companyName: data.company_name || "",
          email: data.email || "",
          phone: data.phone || "",
        })
      }
    } catch (error) {
      console.error("[v0] Error loading company settings:", error)
    }
  }

  const handleSaveCompanySettings = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/company-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companySettings),
      })

      if (response.ok) {
        toast({
          title: "✅ Cambios guardados",
          description: "La información de la empresa se actualizó correctamente",
          duration: 3000,
        })
      } else {
        toast({
          title: "❌ Error",
          description: "No se pudo guardar la información",
          variant: "destructive",
          duration: 3000,
        })
      }
    } catch (error) {
      console.error("[v0] Error saving company settings:", error)
      toast({
        title: "❌ Error",
        description: "Error de conexión",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Administra la configuración del sistema</p>
      </div>

      {/* Settings Cards */}
      <div className="grid gap-6">
        {/* Security section with password change */}
        <Card>
          <CardHeader>
            <CardTitle>Seguridad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Contraseña</Label>
              <p className="text-sm text-muted-foreground mb-3">Cambia tu contraseña para mantener tu cuenta segura</p>
              <ChangePasswordDialog username="Autogestiva" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información de la Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nombre de la Empresa</Label>
              <Input
                id="company-name"
                value={companySettings.companyName}
                onChange={(e) => setCompanySettings({ ...companySettings, companyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">Email de Contacto</Label>
              <Input
                id="company-email"
                type="email"
                value={companySettings.email}
                onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Teléfono</Label>
              <Input
                id="company-phone"
                value={companySettings.phone}
                onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
              />
            </div>
            <Button onClick={handleSaveCompanySettings} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuración de Pagos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payment-day">Día de Cobro Mensual</Label>
              <Input id="payment-day" type="number" min="1" max="31" defaultValue="10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Moneda</Label>
              <Input id="currency" defaultValue="ARS" disabled />
            </div>
            <Button>Guardar Cambios</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
