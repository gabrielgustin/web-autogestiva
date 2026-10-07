"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Lock } from "lucide-react"

/* Devuelve true la primera vez que el elemento entra en pantalla */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

/* true mientras el elemento está en pantalla: sirve para pausar animaciones que nadie ve */
export function useOnScreen<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [onScreen, setOnScreen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin: "120px" })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, onScreen }
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.12)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

export function Eyebrow({
  index,
  children,
  inverted = false,
}: {
  index?: string
  children: React.ReactNode
  inverted?: boolean
}) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${inverted ? "text-white/60" : "text-muted-ink"}`}>
      {index && <span className="text-orange-700">{index}</span>}
      <span className={`h-px w-8 ${inverted ? "bg-white/30" : "bg-ink/25"}`} />
      {children}
    </p>
  )
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top, behavior: "smooth" })
}

const ctaBase =
  "group inline-flex items-center justify-center gap-3 rounded-full py-2 pl-6 pr-2 text-[15px] font-semibold transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4"

const ctaVariants = {
  orange:
    "bg-orange-500 text-white shadow-[0_10px_30px_-10px_rgba(249,115,22,0.7)] hover:bg-orange-600 focus-visible:ring-orange-500/30",
  ink: "bg-ink text-white hover:bg-brand focus-visible:ring-brand/30",
  light: "bg-white text-ink hover:bg-orange-500 hover:text-white focus-visible:ring-white/40",
}

const ctaDot = {
  orange: "bg-white text-orange-600",
  ink: "bg-white text-ink",
  light: "bg-ink text-white group-hover:bg-white group-hover:text-orange-600",
}

/* Botón principal: píldora con la flecha en un círculo que avanza al pasar el mouse */
export function CtaButton({
  children,
  onClick,
  href,
  variant = "orange",
  className = "",
  type = "button",
}: {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: keyof typeof ctaVariants
  className?: string
  type?: "button" | "submit"
}) {
  const inner = (
    <>
      <span>{children}</span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-0.5 ${ctaDot[variant]}`}
      >
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
      </span>
    </>
  )
  const classes = `${ctaBase} ${ctaVariants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  )
}

/* Marco de navegador para mostrar capturas reales con su dominio */
export function BrowserFrame({
  url,
  children,
  dark = false,
  className = "",
}: {
  url?: string
  children: React.ReactNode
  dark?: boolean
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border shadow-[0_40px_80px_-30px_rgba(11,19,34,0.45)] ${
        dark ? "border-white/10 bg-ink-2" : "border-ink/10 bg-white"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-3 border-b px-3.5 py-2.5 ${
          dark ? "border-white/10 bg-white/[0.03]" : "border-ink/10 bg-paper"
        }`}
      >
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-2.5 w-2.5 rounded-full ${dark ? "bg-white/20" : "bg-ink/15"}`} />
          ))}
        </span>
        <span
          className={`flex min-w-0 flex-1 items-center gap-2 rounded-md px-3 py-1.5 font-mono text-[11px] ${
            dark ? "bg-white/[0.06] text-white/70" : "bg-white text-muted-ink ring-1 ring-ink/10"
          }`}
        >
          {url && (
            <>
              <Lock className="h-3 w-3 shrink-0 opacity-60" aria-hidden="true" />
              <span className="truncate">{url}</span>
            </>
          )}
        </span>
      </div>
      {children}
    </div>
  )
}

/* Logo oficial de WhatsApp (lucide no trae íconos de marcas) */
export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
