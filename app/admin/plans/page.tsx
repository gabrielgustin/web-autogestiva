"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

interface Plan {
  id: number
  name: string
  price: number
  features: string
  created_at: string
}

export default function PlansManagement() {
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  })

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setIsLoading(true)
      console.log("[v0] Fetching plans...")
      const response = await fetch("/api/admin/plans")

      if (response.ok) {
        const data = await response.json()
        setPlans(data.plans || [])
        console.log("[v0] Plans loaded:", data.plans?.length)
      } else {
        console.error("[v0] Error fetching plans:", await response.text())
      }
    } catch (error) {
      console.error("[v0] Error fetching plans:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (plan?: Plan) => {
    if (plan) {
      setEditingPlan(plan)
      setFormData({
        name: plan.name,
        price: plan.price.toString(),
      })
    } else {
      setEditingPlan(null)
      setFormData({ name: "", price: "" })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingPlan(null)
    setFormData({ name: "", price: "" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingPlan ? `/api/admin/plans/${editingPlan.id}` : "/api/admin/plans"
      const method = editingPlan ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: Number.parseFloat(formData.price),
          features: "", // Send empty string for features
        }),
      })

      if (response.ok) {
        console.log(`[v0] Plan ${editingPlan ? "updated" : "created"} successfully`)
        await fetchPlans()
        handleCloseDialog()
      } else {
        const error = await response.text()
        console.error("[v0] Error saving plan:", error)
        alert("Error al guardar el plan")
      }
    } catch (error) {
      console.error("[v0] Error saving plan:", error)
      alert("Error al guardar el plan")
    }
  }

  const handleDelete = async (planId: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este plan?")) return

    try {
      const response = await fetch(`/api/admin/plans/${planId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        console.log("[v0] Plan deleted successfully")
        await fetchPlans()
      } else {
        const error = await response.text()
        console.error("[v0] Error deleting plan:", error)
        alert("Error al eliminar el plan")
      }
    } catch (error) {
      console.error("[v0] Error deleting plan:", error)
      alert("Error al eliminar el plan")
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando planes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Gestión de Planes</h1>
            <p className="text-purple-100">Administra los planes de suscripción</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="lg" onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingPlan ? "Editar Plan" : "Crear Nuevo Plan"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Plan</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej: Plan Básico"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio Mensual ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="29.99"
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancelar
                  </Button>
                  <Button type="submit">{editingPlan ? "Actualizar" : "Crear"} Plan</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleOpenDialog(plan)}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                  onClick={() => handleDelete(plan.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {plans.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No hay planes creados todavía</p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Plan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
