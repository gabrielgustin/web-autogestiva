"use client"

import { ArrowRight, Check, Clock, Gauge, ShieldCheck } from "lucide-react"
import { BrowserFrame, useInView } from "@/components/home/primitives"

/* ── SEO: registro de una migración con redirecciones 301 ─────────────── */

const redirects = [
  { from: "/servicios.html", to: "/servicios" },
  { from: "/index.php?p=contacto", to: "/contacto" },
  { from: "/productos/ver?id=12", to: "/productos/nombre-del-producto" },
]

export function SeoVisual() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35)
  const show = (delay: number) => ({
    className: inView ? "animate-build-in" : "opacity-0",
    style: inView ? { animationDelay: `${delay}s` } : undefined,
  })

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink text-white shadow-[0_40px_80px_-30px_rgba(11,19,34,0.55)]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <span className="eyebrow truncate pr-3 text-white/65 max-sm:text-[10px] max-sm:tracking-[0.08em]">migración · redirecciones</span>
          <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
            <ShieldCheck className="h-3.5 w-3.5" /> SEO OK
          </span>
        </div>
        <ul className="divide-y divide-white/[0.07] font-mono text-[12px] sm:text-[13px]">
          {redirects.map((r, i) => (
            <li key={r.from} {...show(0.15 + i * 0.18)}>
              <div className="flex flex-col gap-1.5 px-5 py-4 sm:flex-row sm:items-center sm:gap-3">
                <span className="truncate text-white/40 line-through decoration-white/25">{r.from}</span>
                <span className="flex shrink-0 items-center gap-2 text-orange-400">
                  <span className="rounded border border-orange-400/40 px-1.5 py-0.5 text-[10px] font-semibold">301</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="truncate text-white">{r.to}</span>
                <Check className="ml-auto hidden h-4 w-4 shrink-0 text-green-400 sm:block" />
              </div>
            </li>
          ))}
          <li {...show(0.8)}>
            <div className="flex items-center gap-3 px-5 py-4">
              <span className="text-white/60">sitemap.xml</span>
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-green-400">indexado</span>
              <Check className="h-4 w-4 shrink-0 text-green-400" />
            </div>
          </li>
        </ul>
      </div>

      <div className="animate-float absolute -bottom-20 right-4 flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-3.5 pr-5 shadow-xl md:right-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-light text-brand">
          <Gauge className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-xl font-bold leading-none text-ink">100/100</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-ink">performance</p>
        </div>
      </div>
    </div>
  )
}

/* ── ERP: panel de gestión ───────────────────────────────────────────── */

const bars = [40, 65, 50, 80, 55, 90, 70]

export function DashboardMockup() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const show = (delay: number) => ({
    className: inView ? "animate-build-in" : "opacity-0",
    style: inView ? { animationDelay: `${delay}s` } : undefined,
  })

  const panel = (
    <div className="flex">
      <div className="hidden w-14 shrink-0 space-y-3 bg-ink p-3 sm:block">
        <div className="h-8 w-8 rounded-lg bg-brand" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-2 w-full rounded ${i === 0 ? "bg-white/60" : "bg-white/15"}`} />
        ))}
      </div>
      <div className="flex-1 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div {...show(0.05)}>
            <div className="h-3.5 w-32 rounded bg-ink" />
          </div>
          <div {...show(0.15)}>
            <div className="h-6 w-6 rounded-full bg-brand-light" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { c: "bg-brand", w: "w-2/3" },
            { c: "bg-orange-500", w: "w-1/2" },
            { c: "bg-green-500", w: "w-3/4" },
          ].map((k, i) => {
            const s = show(0.3 + i * 0.1)
            return (
              <div key={i} className={`${s.className} rounded-lg border border-ink/10 bg-paper p-3`} style={s.style}>
                <div className={`h-2 ${k.w} rounded bg-ink/15`} />
                <div className={`mt-2.5 h-4 w-12 rounded ${k.c}`} />
              </div>
            )
          })}
        </div>
        <div
          className={`mt-3 flex items-end gap-2 rounded-lg border border-ink/10 bg-paper p-3 h-32`}
        >
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t bg-gradient-to-t from-brand to-brand/50 ${inView ? "animate-grow-y" : "scale-y-0"}`}
              style={{ height: `${h}%`, animationDelay: `${0.6 + i * 0.07}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div ref={ref} className="relative">
      <BrowserFrame>{panel}</BrowserFrame>
      <div className="animate-float absolute -bottom-7 -left-2 flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-3.5 pr-5 shadow-xl md:-left-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Clock className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-xl font-bold leading-none text-ink">-80% tiempo</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-ink">operativo</p>
        </div>
      </div>
    </div>
  )
}
