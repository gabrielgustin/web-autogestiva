"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Loader2, AlertTriangle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Client {
  id: number
  name: string
  username: string
  password_hash: string
  email: string | null
  phone: string | null
  city: string | null
  country: string | null
  app_url: string | null
  plan_name: string | null
  plan_id: number | null
  status: string | null
  created_at: string
}

interface Plan {
  id: number
  name: string
  price: string
  features: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingClient, setEditingClient] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deleteClientId, setDeleteClientId] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [plans, setPlans] = useState<Plan[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchClients()
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/admin/plans")
      const data = await response.json()
      if (response.ok) {
        setPlans(data.plans || [])
      }
    } catch (err) {
      console.error("[v0] Error fetching plans:", err)
    }
  }

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/clients")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al cargar clientes")
      }

      setClients(data.clients || [])
      setError("")
    } catch (err: any) {
      console.error("[v0] Error fetching clients:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      console.log("[v0] Saving client changes...")
      
      const updateData: any = {
        name: editingClient.name,
        email: editingClient.email,
        phone: editingClient.phone,
        city: editingClient.city,
        country: editingClient.country,
        plan_id: editingClient.plan_id,
        app_url: editingClient.app_url,
      }
      
      if (editingClient.newPassword && editingClient.newPassword.trim() !== '') {
        updateData.password = editingClient.newPassword
      }

      const response = await fetch(`/api/admin/clients/${editingClient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar cliente")
      }

      console.log("[v0] Client saved successfully!")
      await fetchClients()
      setIsDialogOpen(false)
      setEditingClient(null)
    } catch (err: any) {
      console.error("[v0] Error updating client:", err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    setDeleteClientId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (deleteClientId === null) return

    try {
      setDeleteLoading(true)
      const response = await fetch(`/api/admin/clients/${deleteClientId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Error al eliminar cliente")
      }

      await fetchClients()
      setIsDeleteDialogOpen(false)
      setDeleteClientId(null)
    } catch (err: any) {
      console.error("[v0] Error deleting client:", err)
      setError(err.message)
      setIsDeleteDialogOpen(false)
    } finally {
      setDeleteLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
            <p className="text-muted-foreground">Administra todos tus clientes</p>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
            <Button onClick={fetchClients} className="mt-4">
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
          <p className="text-muted-foreground">Administra todos tus clientes</p>
        </div>
        <Link href="/admin/clients/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Cliente
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href="/admin/clients/new" className="block">
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Nuevo Cliente
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Todos los Clientes ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="flex items-start justify-between rounded-lg border bg-white p-6 transition-all hover:shadow-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900">{client.name}</h3>
                    <Badge
                      variant={client.status === "active" ? "default" : "secondary"}
                      className={client.status === "active" ? "bg-green-500 text-white" : "bg-gray-300"}
                    >
                      {client.status === "active" ? "Activo" : client.status || "Inactivo"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Usuario:</span> {client.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Contraseña:</span> ••••••• (Click editar para cambiar)
                  </p>
                  {client.email && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {client.email}
                    </p>
                  )}
                  {client.phone && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Teléfono:</span> {client.phone}
                    </p>
                  )}
                  {(client.city || client.country) && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Ubicación:</span>{" "}
                      {[client.city, client.country].filter(Boolean).join(", ")}
                    </p>
                  )}
                  {client.app_url && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">App URL:</span> {client.app_url}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-3 ml-6">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{client.plan_name || "Sin plan"}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Creado: {new Date(client.created_at).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(client)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors shadow-md"
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors shadow-md"
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredClients.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  {searchTerm ? "No se encontraron clientes" : "No hay clientes registrados"}
                </p>
                {!searchTerm && (
                  <Link href="/admin/clients/new">
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Primer Cliente
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>Modifica la información del cliente</DialogDescription>
          </DialogHeader>
          {editingClient && (
            <div className="space-y-4">
              <div>
                <Label>Nombre del Negocio</Label>
                <Input
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Nueva Contraseña (dejar vacío para no cambiar)</Label>
                <Input
                  type="text"
                  value={editingClient.newPassword || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, newPassword: e.target.value })}
                  placeholder="Ingresa nueva contraseña solo si deseas cambiarla"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  La contraseña actual está encriptada por seguridad. Escribe una nueva solo si deseas cambiarla.
                </p>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editingClient.email || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input
                  value={editingClient.phone || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                />
              </div>
              <div>
                <Label>Ciudad</Label>
                <Input
                  value={editingClient.city || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, city: e.target.value })}
                />
              </div>
              <div>
                <Label>País</Label>
                <Input
                  value={editingClient.country || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, country: e.target.value })}
                />
              </div>
              <div>
                <Label>Plan</Label>
                <Select
                  value={editingClient.plan_id?.toString() || ""}
                  onValueChange={(value) => setEditingClient({ ...editingClient, plan_id: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id.toString()}>
                        {plan.name} - ${plan.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Link de la App</Label>
                <Input
                  type="url"
                  value={editingClient.app_url || ""}
                  onChange={(e) => setEditingClient({ ...editingClient, app_url: e.target.value })}
                  placeholder="https://ejemplo.vercel.app"
                />
                <p className="text-xs text-muted-foreground mt-1">Link único para acceder a la app del cliente</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving} className="min-w-[120px]">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <AlertDialogTitle>¿Eliminar cliente?</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-2">
              Esta acción no se puede deshacer. Se eliminará permanentemente el cliente y toda su información asociada,
              incluyendo suscripciones y pagos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              {deleteLoading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
