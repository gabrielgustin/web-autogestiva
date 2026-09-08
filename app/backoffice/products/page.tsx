"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/lib/auth"
import { useState } from "react"

export default function ProductsPage() {
  const { user, addProduct, updateProduct, deleteProduct } = useAuth()
  const [newProductName, setNewProductName] = useState("")
  const [newProductPrice, setNewProductPrice] = useState("")
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [editingProductName, setEditingProductName] = useState("")
  const [editingProductPrice, setEditingProductPrice] = useState("")

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (newProductName && newProductPrice) {
      addProduct({
        id: Date.now().toString(),
        name: newProductName,
        price: Number.parseFloat(newProductPrice),
        description: "Descripción de ejemplo",
        image: "/placeholder.svg?height=100&width=100",
        categoryId: "cat1", // Categoría de ejemplo
      })
      setNewProductName("")
      setNewProductPrice("")
    }
  }

  const handleEditProduct = (id: string) => {
    const product = user?.storeConfig?.products.find((p) => p.id === id)
    if (product) {
      setEditingProductId(id)
      setEditingProductName(product.name)
      setEditingProductPrice(product.price.toString())
    }
  }

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProductId && editingProductName && editingProductPrice) {
      updateProduct(editingProductId, {
        name: editingProductName,
        price: Number.parseFloat(editingProductPrice),
      })
      setEditingProductId(null)
      setEditingProductName("")
      setEditingProductPrice("")
    }
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      deleteProduct(id)
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Productos</CardTitle>
          <CardDescription>Añade, edita o elimina productos de tu tienda.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProduct} className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="newProductName">Nombre del Producto</Label>
              <Input
                id="newProductName"
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Nuevo Producto"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newProductPrice">Precio</Label>
              <Input
                id="newProductPrice"
                type="number"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                placeholder="9.99"
                step="0.01"
                required
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full">
                Añadir Producto
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
          <CardDescription>Todos los productos disponibles en tu tienda.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user?.storeConfig?.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {editingProductId === product.id ? (
                      <Input value={editingProductName} onChange={(e) => setEditingProductName(e.target.value)} />
                    ) : (
                      product.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingProductId === product.id ? (
                      <Input
                        type="number"
                        value={editingProductPrice}
                        onChange={(e) => setEditingProductPrice(e.target.value)}
                      />
                    ) : (
                      `$${product.price.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingProductId === product.id ? (
                      <Button size="sm" onClick={handleSaveProduct}>
                        Guardar
                      </Button>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditProduct(product.id)}>
                          Editar
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
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
