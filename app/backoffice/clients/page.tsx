"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ClientsListSkeleton } from "@/components/skeletons/clients-list-skeleton"
import { Users, Edit, Trash2, CheckCircle, XCircle, DollarSign, Mail, User } from "lucide-react"
import { mockClients } from "@/lib/auth"
import { useIsMobile } from "@/hooks/use-mobile"

const plans = [
  { id: "basico", name: "Plan Básico", price: 6500 },
  { id: "estandar", name: "Plan Estándar", price: 8500 },
  { id: "premium", name: "Plan Premium", price: 15000 },
]

export default function ClientsManagement() {
  const [clients, setClients] = useState(mockClients)
  const [editingClient, setEditingClient] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    // Simular carga inicial de datos de clientes
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <ClientsListSkeleton />
  }

  const handleEditClient = (client: any) => {
    setEditingClient({ ...client })
    setIsEditDialogOpen(true)
  }

  const handleSaveClient = () => {
    if (!editingClient) return

    setClients((prevClients) => prevClients.map((client) => (client.id === editingClient.id ? editingClient : client)))

    setSuccessMessage(`Cliente ${editingClient.name} actualizado correctamente`)
    setIsEditDialogOpen(false)
    setEditingClient(null)

    // Limpiar mensaje después de 3 segundos
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleToggleStatus = (clientId: string) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId ? { ...client, status: client.status === "Activo" ? "Inactivo" : "Activo" } : client,
      ),
    )
  }

  const handleDeleteClient = (clientId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      setClients((prevClients) => prevClients.filter((client) => client.id !== clientId))
      setSuccessMessage("Cliente eliminado correctamente")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getStatusIcon = (status: string) => {
    return status === "Activo" ? CheckCircle : XCircle
  }

  const ClientCard = ({ client }: { client: any }) => {
    const StatusIcon = getStatusIcon(client.status)

    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-blue-700">{client.name.substring(0, 2).toUpperCase()}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-gray-900 truncate">{client.name}</h3>
                <p className="text-sm text-gray-500 truncate">{client.email}</p>
                <p className="text-xs text-gray-400">@{client.username}</p>
              </div>
            </div>
            <Badge className={getStatusColor(client.status)}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {client.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
            <div>
              <p className="text-gray-500">Plan</p>
              <p className="font-medium">{client.plan}</p>
            </div>
            <div>
              <p className="text-gray-500">Monto</p>
              <p className="font-medium">${client.monthlyAmount.toLocaleString()}/mes</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => handleEditClient(client)} className="flex-1">
              <Edit className="w-4 h-4 mr-1" />
              Editar
            </Button>
            <Button
              size="sm"
              variant={client.status === "Activo" ? "destructive" : "default"}
              onClick={() => handleToggleStatus(client.id)}
              className="flex-1"
            >
              {client.status === "Activo" ? (
                <>
                  <XCircle className="w-4 h-4 mr-1" />
                  Desactivar
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Activar
                </>
              )}
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleDeleteClient(client.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
        <p className="text-gray-600 text-sm lg:text-base">Administra y modifica la información de todos los clientes</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Total Clientes</CardTitle>
            <Users className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg lg:text-2xl font-bold">{clients.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Activos</CardTitle>
            <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg lg:text-2xl font-bold text-green-600">
              {clients.filter((c) => c.status === "Activo").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Inactivos</CardTitle>
            <XCircle className="h-3 w-3 lg:h-4 lg:w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg lg:text-2xl font-bold text-red-600">
              {clients.filter((c) => c.status === "Inactivo").length}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium">Ingresos</CardTitle>
            <DollarSign className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg lg:text-2xl font-bold">
              $
              {clients
                .filter((c) => c.status === "Activo")
                .reduce((sum, c) => sum + c.monthlyAmount, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl">Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent className="p-3 lg:p-6">
          {isMobile ? (
            <div className="space-y-4">
              {clients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {clients.map((client) => {
                const StatusIcon = getStatusIcon(client.status)
                return (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">
                          {client.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{client.name}</h3>
                          <Badge className={getStatusColor(client.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {client.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{client.email}</p>
                        <p className="text-xs text-gray-400">@{client.username}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{client.plan}</p>
                        <p className="text-sm text-gray-500">${client.monthlyAmount.toLocaleString()}/mes</p>
                        <p className="text-xs text-gray-400">Débito día 10</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditClient(client)}>
                          <Edit className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant={client.status === "Activo" ? "destructive" : "default"}
                          onClick={() => handleToggleStatus(client.id)}
                        >
                          {client.status === "Activo" ? (
                            <XCircle className="w-4 h-4" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </Button>

                        <Button size="sm" variant="destructive" onClick={() => handleDeleteClient(client.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md mx-4 lg:mx-auto">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>

          {editingClient && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="edit-name"
                    value={editingClient.name}
                    onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingClient.email}
                    onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="edit-username"
                    value={editingClient.username}
                    onChange={(e) => setEditingClient({ ...editingClient, username: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-plan">Plan</Label>
                <Select
                  value={editingClient.plan}
                  onValueChange={(value) => {
                    const selectedPlan = plans.find((p) => p.name === value)
                    setEditingClient({
                      ...editingClient,
                      plan: value,
                      monthlyAmount: selectedPlan?.price || editingClient.monthlyAmount,
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.name}>
                        <div className="flex items-center justify-between w-full">
                          <span>{plan.name}</span>
                          <span className="ml-2 text-sm text-gray-500">${plan.price.toLocaleString()}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-amount">Monto Mensual</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="edit-amount"
                    type="number"
                    value={editingClient.monthlyAmount}
                    onChange={(e) =>
                      setEditingClient({ ...editingClient, monthlyAmount: Number.parseInt(e.target.value) })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Estado</Label>
                <Select
                  value={editingClient.status}
                  onValueChange={(value) => setEditingClient({ ...editingClient, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button onClick={handleSaveClient} className="flex-1">
                  Guardar Cambios
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
