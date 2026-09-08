"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const handlePanelRedirect = () => {
    router.push("/login")
    setIsMenuOpen(false)
  }

  const categories = [
    {
      icon: "👗",
      title: "Indumentaria",
      description: "Vendé ropa, zapatos y accesorios de forma profesional",
    },
    {
      icon: "🍔",
      title: "Comida Rápida",
      description: "Digitalizá tu restaurant y recibí pedidos sin comisiones",
    },
    {
      icon: "💅",
      title: "Salud y Belleza",
      description: "Potenciá tu negocio de belleza y bienestar",
    },
    {
      icon: "🌱",
      title: "Dietética y Tiendas Saludables",
      description: "Vendé productos naturales y saludables por WhatsApp",
    },
    {
      icon: "🏠",
      title: "Decoración y Hogar",
      description: "Vendé artículos para el hogar con estilo",
    },
    {
      icon: "🍦",
      title: "Heladería",
      description: "Vendé helados artesanales con sabores del día y opciones especiales",
    },
    {
      icon: "🥩",
      title: "Carnicería y Pollería",
      description: "Vendé carnes y pollos con presentaciones claras",
    },
    {
      icon: "🍷",
      title: "Vinoteca y Bebidas",
      description: "Vendé vinos y licores con información completa",
    },
    {
      icon: "🥬",
      title: "Verdulería",
      description: "Vendé frutas y verduras frescas con calidad garantizada",
    },
    {
      icon: "🔧",
      title: "Tecnología y Repuestos",
      description: "Vendé tecnología y repuestos con especificaciones técnicas",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-950">
      <div className="container mx-auto flex h-20 md:h-16 items-center justify-between pl-2 pr-4 md:px-6">
        <Link className="flex items-center gap-2" href="/">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Autogestiva%20ultimo-R93mHhq1sUa1o5uzR06VLSNktwqoaS.png"
            alt="Logo Autogestiva"
            width={216}
            height={49}
            className="h-auto"
          />
          <span className="sr-only">Autogestiva</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {/* Categories dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCategoriesOpen(true)}
            onMouseLeave={() => setIsCategoriesOpen(false)}
          >
            {isCategoriesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 p-4 max-h-[500px] overflow-y-auto">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Categorías</h3>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="text-2xl flex-shrink-0">{category.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm mb-0.5">{category.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handlePanelRedirect}
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 px-6 py-2.5 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl"
          >
            Acceso Clientes
          </button>
        </div>

        {/* Botón menú móvil */}
        <Button
          className="md:hidden"
          size="icon"
          variant="ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col items-center gap-4 py-4 text-sm font-medium">
            {/* Mobile categories section */}
            <div className="w-full px-4">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="text-gray-700 hover:text-blue-500 transition-colors duration-300 flex items-center justify-center gap-1 w-full"
              >
                Ideal para
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isCategoriesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isCategoriesOpen && (
                <div className="mt-3 bg-gray-50 rounded-lg p-4 max-h-[400px] overflow-y-auto">
                  <h3 className="text-base font-bold text-gray-800 mb-3">Categorías</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <div className="text-2xl flex-shrink-0">{category.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">{category.title}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{category.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handlePanelRedirect}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 w-full max-w-[200px] px-6 py-2.5 rounded-lg font-semibold shadow-lg"
            >
              Acceso Clientes
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
