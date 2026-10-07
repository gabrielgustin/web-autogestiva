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
      {index && <span className="text-orange-500">{index}</span>}
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
