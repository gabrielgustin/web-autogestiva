"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Users, LogOut, Menu, Bell, Settings } from 'lucide-react'
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Gestión de Clientes",
    href: "/admin/clients",
    icon: Users,
  },
  {
    title: "Configuración",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>({
    name: "Administrador",
    email: "autogestiva.info@gmail.com",
    role: "admin",
    status: "active",
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Try to get user info from cookie for display purposes only
    const cookies = document.cookie.split(";")
    const authCookie = cookies.find((c) => c.trim().startsWith("auth-token="))

    if (authCookie) {
      const token = authCookie.split("=")[1]
      const [email, role] = token.split("|")

      console.log("[v0] Admin layout loaded for:", email)
      setUser({
        name: "Administrador",
        email: email,
        role: role,
        status: "active",
      })
    }
  }, [])

  // Skip layout for login and setup pages
  if (pathname === "/admin/login" || pathname === "/admin/setup") {
    return <>{children}</>
  }

  const handleLogout = async () => {
    // Clear cookie
    document.cookie = "auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4 lg:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <span className="text-lg">Panel Admin</span>
        </div>
      </div>

      {/* User Info */}
      <div className="border-b p-4 lg:p-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
            <AvatarImage
              src="/images/design-mode/logoAutogestivaa.png"
              alt={user.name}
            />
            <AvatarFallback className="bg-blue-600 text-white">AG</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <Badge variant="secondary" className="mt-1 text-xs bg-blue-100 text-blue-800">
              Administrador
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4 lg:p-6">
        {navigationItems.map((item) => {
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
              {item.title}
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

      {/* Footer */}
      <div className="border-t p-4 lg:p-6 bg-gray-50">
        {/* Removing logout button from footer */}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex-1">
            <h1 className="text-lg font-semibold">Panel Admin</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Removing logout button from mobile header */}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="/images/design-mode/logoAutogestivaa.png"
                alt={user.name}
              />
              <AvatarFallback className="text-xs bg-blue-600 text-white">AG</AvatarFallback>
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
