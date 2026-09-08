"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, UserPlus, FileText, Users, LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { useIsMobile } from "@/hooks/use-mobile"

const navigation = [
  { name: "Dashboard", href: "/backoffice/dashboard", icon: Home },
  { name: "Gestión de Clientes", href: "/backoffice/clients", icon: Users },
  { name: "Nuevo Cliente", href: "/backoffice/new-client", icon: UserPlus },
  { name: "Facturación", href: "/backoffice/billing", icon: FileText },
]

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== "admin") {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  // Close sheet when route changes
  useEffect(() => {
    setIsSheetOpen(false)
  }, [pathname])

  if (!isAuthenticated || !user || user.role !== "admin") {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b">
        <h1 className="text-xl font-bold text-[#004E89]">Panel Admin</h1>
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback className="bg-[#004E89] text-white">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Administrador</p>
            <p className="text-xs text-gray-500 truncate">{user.username}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onItemClick}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive ? "bg-[#004E89] text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon
                className={`mr-3 flex-shrink-0 h-5 w-5 ${
                  isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                }`}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t mt-auto">
        <Button
          onClick={() => {
            handleLogout()
            onItemClick?.()
          }}
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="lg:hidden bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4">
            <h1 className="text-lg font-bold text-[#004E89]">Panel Admin</h1>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent onItemClick={() => setIsSheetOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="w-64 bg-white shadow-sm fixed h-full overflow-y-auto">
            <SidebarContent />
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 ${!isMobile ? "ml-64" : ""}`}>
          <main className="p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
