"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react"
import { navServices, contact } from "@/lib/site-data"

const links = [
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Soluciones", href: "/#soluciones" },
  { label: "Proceso", href: "/#como-funciona" },
  { label: "Clientes", href: "/#clientes" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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

  useEffect(() => {
    if (!isMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  const closeAll = () => {
    setIsMenuOpen(false)
    setIsServicesOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        scrolled || isMenuOpen ? "border-line bg-paper md:bg-paper/85 md:backdrop-blur-xl" : "border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-4 px-5 md:px-8">
        <div className="flex items-center gap-6">
          <Link className="flex shrink-0 items-center" href="/" onClick={closeAll}>
            <img
              src="/images/logo-autogestiva.png"
              alt="Logo Autogestiva"
              width={380}
              height={151}
              fetchPriority="high"
              className="-ml-1 h-[58px] w-auto md:h-[66px]"
            />
            <span className="sr-only">Autogestiva</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
                aria-expanded={isServicesOpen}
                onClick={() => setIsServicesOpen((v) => !v)}
              >
                Servicios
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isServicesOpen && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="animate-rise-in w-[min(680px,92vw)] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_70px_-25px_rgba(11,19,34,0.4)]">
                    <div className="grid grid-cols-2">
                      {navServices.map((service, i) => {
                        const Icon = service.icon
                        return (
                          <Link
                            key={service.title}
                            href={service.href}
                            onClick={closeAll}
                            className={`group flex items-start gap-3.5 border-line p-4 transition-colors hover:bg-paper ${
                              i % 2 === 0 ? "border-r" : ""
                            } ${i < navServices.length - 2 ? "border-b" : ""}`}
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="flex-1">
                              <span className="flex items-center gap-1 text-sm font-semibold text-ink">
                                {service.title}
                                <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                              </span>
                              <span className="mt-0.5 block text-[13px] leading-snug text-muted-ink">
                                {service.description}
                              </span>
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <span className="eyebrow hidden items-center gap-2 text-muted-ink xl:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {contact.location}
          </span>
          <Link
            href="/#contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-orange-500"
          >
            Cotizá tu proyecto
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="animate-fade-in absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-paper lg:hidden">
          <nav className="flex min-h-full flex-col px-5 pb-8 pt-4">
            <p className="eyebrow py-3 text-muted-ink">Servicios</p>
            <div className="border-t border-line">
              {navServices.map((service) => {
                const Icon = service.icon
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    onClick={closeAll}
                    className="flex items-start gap-3.5 border-b border-line py-3.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-ink">{service.title}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-muted-ink">
                        {service.description}
                      </span>
                    </span>
                  </Link>
                )
              })}
            </div>

            <Link
              href="/#contacto"
              onClick={closeAll}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-4 text-base font-semibold text-white"
            >
              Cotizá tu proyecto <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
