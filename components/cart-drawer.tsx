"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import type { Product } from "@/lib/auth"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: { product: Product; quantity: number }[]
  updateQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  primaryColor: string
}

export function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, primaryColor }: CartDrawerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Tu Carrito</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex border-b pb-4">
                  <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(product.name)}`
                      }}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">${product.price.toFixed(2)}</p>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto text-red-500"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter className="border-t pt-4">
          <div className="w-full space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span style={{ color: primaryColor }}>${getTotalPrice().toFixed(2)}</span>
            </div>
            <Button
              className="w-full"
              size="lg"
              disabled={cart.length === 0}
              style={{ backgroundColor: primaryColor, color: "white" }}
            >
              Proceder al pago
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
