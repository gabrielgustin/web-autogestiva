"use client"

import type React from "react"
import { Bell, LogOut } from 'lucide-react' // Import Bell and LogOut icons

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Users, CreditCard } from 'lucide-react'
import { cn } from "@/lib/utils"

interface UserProfile {
  name: string
  email: string | null
  status: "active" | "inactive"
  plan_name?: string
  username: string
}

export default function ClientPanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const username = localStorage.getItem("username")
        if (!username) {
          console.log("[v0] No username found, redirecting to login")
          router.push("/login")
          return
        }

        console.log("[v0] Fetching profile for user:", username)
        const response = await fetch(`/api/client/profile?username=${username}`)

        if (!response.ok) {
          throw new Error("Failed to fetch profile")
        }

        const data = await response.json()
        console.log("[v0] Profile data received:", data)

        setUser({
          name: data.profile.name || username,
          email: data.profile.email || null,
          status: data.profile.subscription_status === "active" ? "active" : "inactive",
          plan_name: data.profile.plan_name,
          username: data.profile.username,
        })
      } catch (error) {
        console.error("[v0] Error fetching user profile:", error)
        const username = localStorage.getItem("username") || "Usuario"
        setUser({
          name: username,
          email: null,
          status: "inactive",
          username: username,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("role")
    router.push("/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/client-panel/dashboard", icon: LayoutDashboard },
    { name: "Mi Perfil", href: "/client-panel/profile", icon: Users },
    { name: "Métodos de Pago", href: "/client-panel/payment-methods", icon: CreditCard },
  ]

  const getStatusColor = (status: "active" | "inactive") => {
    return status === "active"
      ? "bg-green-500/10 text-green-500 border-green-500/20"
      : "bg-red-500/10 text-red-500 border-red-500/20"
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Error al cargar datos del usuario</p>
          <Button onClick={() => router.push("/login")} className="mt-4">
            Volver al login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center h-16 px-6 border-b">
            <img
              src="/images/design-mode/logito.png"
              alt="Autogestiva"
              className="h-16 w-auto"
            />
          </div>

          {/* User info */}
          <div className="flex items-center gap-3 p-4 border-b">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email || "Sin email"}</p>
              <Badge variant="secondary" className={cn("mt-1 text-xs", getStatusColor(user.status))}>
                {user.status === "active" ? "Activo" : "Inactivo"}
              </Badge>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
            
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 font-medium transition-all mt-4"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </button>
          </nav>

          {/* Logout button at bottom of desktop sidebar */}
          {/* <div className="p-4 border-t bg-gray-50">
            <Button 
              onClick={handleLogout} 
              variant="destructive"
              size="lg"
              className="w-full justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <LogOut className="h-6 w-6" />
              <span>Cerrar Sesión</span>
            </Button>
          </div> */}
          
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center h-16 px-6 border-b">
              <img
                src="/images/design-mode/logito.png"
                alt="Autogestiva"
                className="h-16 w-auto"
              />
            </div>

            {/* User info */}
            <div className="flex items-center gap-3 p-4 border-b">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email || "Sin email"}</p>
                <Badge variant="secondary" className={cn("mt-1 text-xs", getStatusColor(user.status))}>
                  {user.status === "active" ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                      isActive
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-accent-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
              
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 font-medium transition-all mt-4"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </button>
            </nav>

            {/* Logout button at bottom of mobile sidebar */}
            {/* <div className="p-4 border-t bg-gray-50">
              <Button 
                onClick={handleLogout} 
                variant="destructive"
                size="lg"
                className="w-full justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <LogOut className="h-6 w-6" />
                <span>Cerrar Sesión</span>
              </Button>
            </div> */}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <LayoutDashboard className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex-1">
            <h1 className="text-lg font-semibold">Panel Cliente</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Added logout button to mobile header for easier access */}
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Cerrar Sesión</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 lg:p-6 max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
