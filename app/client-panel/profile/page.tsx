"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Save, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProfileData {
  id: number
  name: string
  email: string | null
  phone: string | null
  city: string | null
  country: string | null
  username: string
  created_at: string
  plan_name: string
  plan_price: string
  subscription_status: string
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      const username = localStorage.getItem("username")
      if (!username) {
        toast({
          title: "Error",
          description: "No se encontró el usuario",
          variant: "destructive",
        })
        return
      }

      console.log("[v0] Fetching profile for user:", username)
      const response = await fetch(`/api/client/profile?username=${encodeURIComponent(username)}`)
      const data = await response.json()

      if (response.ok) {
        console.log("[v0] Profile data received:", data)
        setProfileData(data.profile)
      } else {
        toast({
          title: "Error",
          description: data.error || "No se pudo cargar el perfil",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error fetching profile:", error)
      toast({
        title: "Error",
        description: "Error al cargar el perfil",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!profileData) return

    try {
      setIsSaving(true)
      console.log("[v0] Saving profile:", profileData)
      const response = await fetch("/api/client/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: profileData.username,
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          city: profileData.city,
          country: profileData.country,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Perfil actualizado correctamente",
        })
        fetchProfile()
      } else {
        toast({
          title: "Error",
          description: data.error || "No se pudo actualizar el perfil",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error saving profile:", error)
      toast({
        title: "Error",
        description: "Error al guardar el perfil",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!profileData) return

    if (!newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Por favor completa ambos campos de contraseña",
        variant: "destructive",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 3) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 3 caracteres",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSaving(true)
      console.log("[v0] Attempting to change password for:", profileData.username)

      const response = await fetch("/api/client/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: profileData.username,
          newPassword: newPassword,
        }),
      })

      const data = await response.json()
      console.log("[v0] Password change response:", { status: response.status, data })

      if (response.ok) {
        console.log("[v0] Password changed successfully, showing toast")
        setTimeout(() => {
          toast({
            title: "✅ Contraseña actualizada exitosamente",
            description: `Tu nueva contraseña es: ${newPassword}`,
            duration: 8000,
          })
        }, 100)
        setNewPassword("")
        setConfirmPassword("")
      } else {
        console.log("[v0] Password change failed:", data.error)
        toast({
          title: "Error",
          description: data.error || "No se pudo actualizar la contraseña",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error changing password:", error)
      toast({
        title: "Error",
        description: "Error al cambiar la contraseña",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se pudo cargar el perfil</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        <p className="text-muted-foreground">Gestiona tu información personal y configuración de cuenta</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Información Personal
            </CardTitle>
            <CardDescription>Actualiza tu información de contacto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Negocio</Label>
                <Input
                  id="name"
                  value={profileData.name || ""}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Ingresa el nombre de tu negocio"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email || ""}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  placeholder="tu@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  value={profileData.phone || ""}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  placeholder="+54 9 11 1234-5678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Ciudad
                </Label>
                <Input
                  id="city"
                  value={profileData.city || ""}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  placeholder="Buenos Aires"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  value={profileData.country || ""}
                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                  placeholder="Argentina"
                />
              </div>
            </div>

            <Separator />

            <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              Cambiar Contraseña
            </CardTitle>
            <CardDescription>Actualiza tu contraseña de acceso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 3 caracteres"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la contraseña"
                />
              </div>
            </div>

            <Separator />

            <Button onClick={handleChangePassword} disabled={isSaving} variant="secondary" className="w-full sm:w-auto">
              <Lock className="mr-2 h-4 w-4" />
              {isSaving ? "Actualizando..." : "Actualizar Contraseña"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
