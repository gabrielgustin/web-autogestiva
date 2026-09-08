"use client"

import { useEffect, useRef, useState } from "react"
import { Globe, BookOpen, ArrowRight, ChevronDown } from "lucide-react"

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
    url: "https://v0-carta-digital.vercel.app",
    icon: BookOpen,
  },
]

interface DemoMenuProps {
  onSelect: (url: string) => void
}

export function DemoMenu({ onSelect }: DemoMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-all hover:border-brand hover:text-brand"
      >
        <Globe className="h-4 w-4" /> Ver demos
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-30 w-[min(360px,88vw)] -translate-x-1/2 pt-3 sm:left-0 sm:translate-x-0"
        >
          <div className="animate-rise-in overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl">
            <p className="px-3 pb-2 pt-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Elegí un demo para explorar
            </p>
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
        </div>
      )}
    </div>
  )
}
