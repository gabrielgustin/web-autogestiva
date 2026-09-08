"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { useState, useEffect } from "react"

export default function SettingsPage() {
  const { user, updateStoreConfig } = useAuth()
  const [storeName, setStoreName] = useState("")
  const [primaryColor, setPrimaryColor] = useState("")
  const [secondaryColor, setSecondaryColor] = useState("")

  useEffect(() => {
    if (user?.storeConfig) {
      setStoreName(user.storeConfig.name || "")
      setPrimaryColor(user.storeConfig.primaryColor || "")
      setSecondaryColor(user.storeConfig.secondaryColor || "")
    }
  }, [user])

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      updateStoreConfig({
        name: storeName,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
      })
      alert("Configuración guardada (simulado).")
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de la Tienda</CardTitle>
          <CardDescription>Actualiza la información y el diseño de tu tienda.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveSettings} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="storeName">Nombre de la Tienda</Label>
              <Input
                id="storeName"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Mi Tienda Online"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="primaryColor">Color Principal</Label>
                <Input
                  id="primaryColor"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="secondaryColor">Color Secundario</Label>
                <Input
                  id="secondaryColor"
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Guardar Configuración
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
