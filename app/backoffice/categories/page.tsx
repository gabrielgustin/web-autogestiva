"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/lib/auth"
import { useState } from "react"

export default function CategoriesPage() {
  const { user, addCategory, updateCategory, deleteCategory } = useAuth()
  const [newCategoryName, setNewCategoryName] = useState("")
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)
  const [editingCategoryName, setEditingCategoryName] = useState("")

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategoryName) {
      addCategory({ id: Date.now().toString(), name: newCategoryName })
      setNewCategoryName("")
    }
  }

  const handleEditCategory = (id: string) => {
    const category = user?.storeConfig?.categories.find((c) => c.id === id)
    if (category) {
      setEditingCategoryId(id)
      setEditingCategoryName(category.name)
    }
  }

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategoryId && editingCategoryName) {
      updateCategory(editingCategoryId, editingCategoryName)
      setEditingCategoryId(null)
      setEditingCategoryName("")
    }
  }

  const handleDeleteCategory = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta categoría? Se eliminarán los productos asociados.")) {
      deleteCategory(id)
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Categorías</CardTitle>
          <CardDescription>Añade, edita o elimina categorías para organizar tus productos.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCategory} className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="newCategoryName">Nombre de la Categoría</Label>
              <Input
                id="newCategoryName"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Nueva Categoría"
                required
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full">
                Añadir Categoría
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Categorías</CardTitle>
          <CardDescription>Todas las categorías disponibles en tu tienda.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user?.storeConfig?.categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {editingCategoryId === category.id ? (
                      <Input value={editingCategoryName} onChange={(e) => setEditingCategoryName(e.target.value)} />
                    ) : (
                      category.name
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingCategoryId === category.id ? (
                      <Button size="sm" onClick={handleSaveCategory}>
                        Guardar
                      </Button>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditCategory(category.id)}>
                          Editar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteCategory(category.id)}>
                          Eliminar
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
