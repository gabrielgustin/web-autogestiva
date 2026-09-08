"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth"
import Image from "next/image"
import { useState } from "react"

export default function StorePage() {
  const { user } = useAuth()
  const [cart, setCart] = useState<any[]>([]) // eslint-disable-line @typescript-eslint/no-explicit-any

  const handleAddToCart = (product: any) => {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Tienda no disponible</CardTitle>
            <CardDescription>Inicia sesión en el panel de administración para ver tu tienda.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/login">Ir a Iniciar Sesión</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">{user.storeConfig.name || "Mi Tienda"}</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Productos */}
        <div className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-semibold">Nuestros Productos</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {user.storeConfig.products.length > 0 ? (
              user.storeConfig.products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <Image
                      src={product.image || "/placeholder.svg?height=100&width=100"}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="mb-4 h-24 w-full object-cover"
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                      <Button onClick={() => handleAddToCart(product)}>Añadir al Carrito</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-gray-500">No hay productos disponibles.</p>
            )}
          </div>
        </div>

        {/* Carrito de Compras */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Carrito de Compras</h2>
          <Card>
            <CardContent className="p-4">
              {cart.length === 0 ? (
                <p className="text-gray-500">El carrito está vacío.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">
                          {item.name} (x{item.quantity})
                        </p>
                        <p className="text-sm text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => handleRemoveFromCart(item.id)}>
                        Eliminar
                      </Button>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <Button className="mt-4 w-full">Proceder al Pago</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
