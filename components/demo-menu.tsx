"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Globe, BookOpen, ArrowRight, ChevronDown, ShoppingCart, Building2 } from "lucide-react"

const DEMOS = [
  {
    example: "Estudio Jurídico",
    title: "Página web / Landing",
    description: "Sitio institucional con información de servicios y contacto directo.",
    url: "https://autogestiva-estudio-juridico.vercel.app/",
    icon: Globe,
  },
  {
    example: "Carta Digital",
    title: "Catálogo digital",
    description: "Menú o catálogo autogestionable, ideal para gastronomía y comercios.",
    url: "https://lacomanda-xi.vercel.app/",
    icon: BookOpen,
  },
  {
    example: "Traslados Jarabus",
    title: "E-commerce",
    description: "Tienda online con reserva y venta de pasajes de forma autogestionable.",
    url: "https://trasladosjarabus.com.ar",
    icon: ShoppingCart,
  },
  {
    example: "Tempograss",
    title: "Web Institucional",
    description: "Sitio institucional con presentación de servicios y contacto directo.",
    url: "https://tempograss.vercel.app",
    icon: Building2,
  },
]

interface DemoMenuProps {
  onSelect: (url: string) => void
}

export function DemoMenu({ onSelect }: DemoMenuProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-all hover:border-brand hover:text-brand"
      >
        <Globe className="h-4 w-4" /> Ver demos
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <button
              aria-label="Cerrar"
              onClick={() => setOpen(false)}
              className="absolute inset-0 animate-fade-in bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Menu card */}
            <div
              role="menu"
              className="animate-rise-in relative z-10 max-h-[85vh] w-[min(400px,92vw)] overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl"
            >
              <div className="flex items-center justify-between px-3 pb-2 pt-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Elegí un demo para explorar
                </p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <span className="sr-only">Cerrar</span>
                  <ChevronDown className="h-4 w-4 rotate-180" aria-hidden="true" />
                </button>
              </div>
              {DEMOS.map((demo) => (
                <button
                  key={demo.url}
                  role="menuitem"
                  onClick={() => {
                    onSelect(demo.url)
                    setOpen(false)
                  }}
                  className="group flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-brand-light"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <demo.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-ink">{demo.example}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-brand">{demo.title}</span>
                    <span className="mt-1 block text-xs leading-snug text-slate-400">{demo.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
