"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  ShoppingCart,
  LayoutDashboard,
  BookOpen,
  Search,
  Server,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Globe,
    title: "Páginas web & Landing",
    description: "Sitios a medida que convierten visitas en clientes.",
    href: "/#servicios",
  },
  {
    icon: ShoppingCart,
    title: "Tiendas online",
    description: "E-commerce completo con pagos y gestión de stock.",
    href: "/#soluciones",
  },
  {
    icon: LayoutDashboard,
    title: "ERP / Sistemas de gestión",
    description: "Plataformas internas que automatizan tus procesos.",
    href: "/#sistemas",
  },
  {
    icon: BookOpen,
    title: "Catálogos digitales",
    description: "Mostrá tus productos de forma clara y autogestionable.",
    href: "/#soluciones",
  },
  {
    icon: Sparkles,
    title: "Integración de IA",
    description: "Chatbots, automatización y análisis con inteligencia artificial.",
    href: "/#ia",
  },
  {
    icon: Search,
    title: "SEO & Migraciones",
    description: "Posicionamiento y traspasos seguros sin perder tráfico.",
    href: "/#seo",
  },
  {
    icon: Server,
    title: "Hosting privado",
    description: "Servidores propios con monitoreo y soporte 24/7.",
    href: "/#servicios",
  },
]

const navLinks = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Soluciones", href: "/#soluciones" },
  { label: "IA", href: "/#ia" },
  { label: "Proceso", href: "/#como-funciona" },
  { label: "Casos", href: "/#testimonios" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsMenuOpen(false)
    setIsServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handlePanelRedirect = () => {
    router.push("/login")
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full relative transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_6px_24px_-12px_rgba(15,23,41,0.25)] border-b border-slate-200/70"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex h-18 md:h-20 items-center justify-between gap-4 px-4 md:px-6 py-3">
        <Link className="flex items-center gap-2 shrink-0" href="/">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Autogestiva%20ultimo-R93mHhq1sUa1o5uzR06VLSNktwqoaS.png"
            alt="Logo Autogestiva"
            width={200}
            height={45}
            className="h-9 md:h-10 w-auto"
          />
          <span className="sr-only">Autogestiva</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <div onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
            <button
              className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[15px] font-medium text-slate-700 transition-colors hover:text-brand hover:bg-brand-light"
              aria-expanded={isServicesOpen}
            >
              Servicios
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isServicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div className="w-[min(640px,92vw)] rounded-2xl border border-slate-100 bg-white p-3 shadow-2xl animate-rise-in">
                  <div className="grid grid-cols-2 gap-1">
                    {services.map((service) => {
                      const Icon = service.icon
                      return (
                        <Link
                          key={service.title}
                          href={service.href}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="flex-1">
                            <span className="block text-sm font-semibold text-slate-800">{service.title}</span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                              {service.description}
                            </span>
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded-xl bg-brand px-4 py-3">
                    <span className="text-sm font-medium text-white">¿No sabés qué necesitás? Te asesoramos gratis.</span>
                    <Link
                      href="/#contacto"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white"
                    >
                      Hablemos <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2.5 text-[15px] font-medium text-slate-700 transition-colors hover:text-brand hover:bg-brand-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            onClick={handlePanelRedirect}
            className="rounded-lg px-4 py-2.5 text-[15px] font-medium text-slate-700 transition-colors hover:text-brand"
          >
            Acceso Clientes
          </button>
          <Link
            href="/#contacto"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-orange-500 px-6 py-2.5 text-[15px] font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-orange-500/40"
          >
            <span className="relative z-10">Cotizá tu proyecto</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            <span className="pointer-events-none absolute inset-0 z-0 -translate-x-full bg-white/25 [clip-path:polygon(0_0,40%_0,60%_100%,20%_100%)] transition-transform duration-700 group-hover:translate-x-[260%]" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <Button
          className="lg:hidden"
          size="icon"
          variant="ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white">
          <nav className="flex flex-col gap-1 px-4 py-4">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-50"
            >
              Servicios
              <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>

            {isServicesOpen && (
              <div className="mb-1 grid gap-1 rounded-xl bg-slate-50 p-2">
                {services.map((service) => {
                  const Icon = service.icon
                  return (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="flex items-start gap-3 rounded-lg bg-white p-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-800">{service.title}</span>
                        <span className="mt-0.5 block text-xs text-slate-500">{service.description}</span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            )}

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <button
                onClick={handlePanelRedirect}
                className="rounded-lg border border-slate-200 px-4 py-3 text-base font-medium text-slate-800 hover:bg-slate-50"
              >
                Acceso Clientes
              </button>
              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-lg"
              >
                Cotizá tu proyecto <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
