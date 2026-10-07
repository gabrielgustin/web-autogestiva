"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { projects, prettyUrl, type Project } from "@/lib/site-data"
import { Eyebrow } from "@/components/home/primitives"

const NAV_HEIGHT = 72

/* ── Dispositivos ─────────────────────────────────────────────────────── */

/* iPhone: marco de titanio, bisel negro, isla dinámica, botones laterales y reflejo en el vidrio */
function IPhone({
  src,
  alt,
  bars,
  className = "",
}: {
  src: string
  alt: string
  bars?: { width: number; height: number; bottom: number }
  className?: string
}) {
  return (
    <div className={`relative aspect-[9/19.5] ${className}`}>
      {/* botones laterales */}
      <span className="absolute -left-[1.1%] top-[17%] h-[3.6%] w-[1.6%] rounded-l-sm bg-[#3a3c42]" />
      <span className="absolute -left-[1.1%] top-[24%] h-[7%] w-[1.6%] rounded-l-sm bg-[#3a3c42]" />
      <span className="absolute -left-[1.1%] top-[33%] h-[7%] w-[1.6%] rounded-l-sm bg-[#3a3c42]" />
      <span className="absolute -right-[1.1%] top-[27%] h-[11%] w-[1.6%] rounded-r-sm bg-[#3a3c42]" />

      {/* marco */}
      <div className="absolute inset-0 rounded-[17%/7.8%] bg-gradient-to-br from-[#8e9097] via-[#34363b] to-[#74767d] p-[1.7%] shadow-[0_35px_60px_-18px_rgba(0,0,0,0.7)]">
        {/* bisel */}
        <div className="h-full w-full rounded-[15.4%/7.1%] bg-black p-[2.4%]">
          {/* pantalla */}
          <div className="relative h-full w-full overflow-hidden rounded-[12.6%/5.8%] bg-white">
            {bars ? (
              <div className="relative h-full w-full bg-[#efefef]">
                {/* Pantalla de la app a lo ancho del teléfono, sin su barra inferior... */}
                <div className="w-full overflow-hidden" style={{ aspectRatio: `${bars.width} / ${bars.height - bars.bottom}` }}>
                  <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" />
                </div>
                {/* ...y la barra de navegación, fija al pie como en el teléfono real */}
                <div
                  className="absolute inset-x-0 bottom-0 overflow-hidden"
                  style={{ aspectRatio: `${bars.width} / ${bars.bottom}` }}
                >
                  <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-bottom" />
                </div>
              </div>
            ) : (
              <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
            )}
            <span className="absolute left-1/2 top-[1.9%] h-[2.9%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
            <span className="absolute bottom-[1.4%] left-1/2 h-[0.5%] w-[34%] -translate-x-1/2 rounded-full bg-black/70" />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-white/0 to-white/0 mix-blend-soft-light" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Browser({ src, alt, url, className = "" }: { src: string; alt: string; url?: string; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-[#16181d] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 ${className}`}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/20" />
          ))}
        </span>
        {url && (
          <span className="ml-2 truncate rounded bg-white/[0.07] px-2.5 py-1 font-mono text-[10px] text-white/55">
            {url}
          </span>
        )}
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" />
    </div>
  )
}

/* La misma composición en todas las tarjetas: navegador al fondo, teléfono al frente */
function Devices({ project }: { project: Project }) {
  const { name, desktop, desktopUrl, desktopWide, mobile, mobileBars, logo, url } = project

  if (logo) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <img
          src={logo}
          alt={name}
          loading="lazy"
          decoding="async"
          className="max-h-[58%] max-w-[72%] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    )
  }

  return (
    <>
      {desktop && (
        <Browser
          src={desktop}
          alt={desktopUrl ? `Backoffice de ${name}` : `Sitio web de ${name}`}
          url={desktopUrl ?? (url ? prettyUrl(url) : undefined)}
          className={`absolute transition-transform duration-700 ease-out group-hover:-translate-y-1.5 ${
            desktopWide
              ? "right-[-3%] top-[9%] w-[90%]"
              : mobile
                ? "right-[-12%] top-[9%] w-[84%]"
                : "right-[-4%] top-[16%] w-[92%]"
          }`}
        />
      )}
      {mobile && (
        <IPhone
          src={mobile}
          alt={`${name} en el teléfono`}
          bars={mobileBars}
          className="absolute bottom-[-13%] left-[5%] h-[96%] transition-transform duration-700 ease-out group-hover:-translate-y-3"
        />
      )}
    </>
  )
}

/* ── Tarjeta de proyecto (mismo tamaño para todas) ────────────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { name, url, type, description, bg, accent, dark } = project
  const text = dark ? "text-white" : "text-ink"
  const soft = dark ? "text-white/65" : "text-ink/65"
  const Tag = url ? "a" : "div"

  return (
    <Tag
      {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative flex h-full w-[min(88vw,540px)] shrink-0 flex-col overflow-hidden rounded-3xl md:w-[min(78vw,880px)] md:flex-row ${text}`}
      style={{ backgroundColor: bg }}
      aria-label={url ? `${name}: visitar sitio` : name}
    >
      {/* Luz con el color de marca del cliente */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: `radial-gradient(60% 75% at 88% 0%, ${accent}, transparent 70%)` }}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-60 ${dark ? "bg-blueprint-inv" : "bg-blueprint"}`}
      />

      {/* Ficha del proyecto */}
      <div className="relative z-10 flex shrink-0 flex-col justify-between gap-3 p-5 md:w-[38%] md:p-8">
        <div className="flex items-center gap-2.5">
          <span className={`font-mono text-xs tabular-nums ${soft}`}>{String(index + 1).padStart(2, "0")}</span>
          {type && (
            <span
              className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
                dark ? "border-white/25 bg-white/10" : "border-ink/20 bg-white/50"
              }`}
            >
              {type}
            </span>
          )}
        </div>

        <div>
          <h3 className="font-display text-balance text-2xl font-semibold leading-[1.04] tracking-tight md:text-[2rem] xl:text-[2.2rem]">
            {name}
          </h3>
          {description && (
            <p className={`mt-2 line-clamp-2 text-[13px] leading-relaxed md:mt-3 md:line-clamp-3 md:text-sm ${soft}`}>
              {description}
            </p>
          )}
          {url && (
            <span className="mt-3 inline-flex max-w-full items-center gap-2.5 md:mt-5">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45 ${
                  dark ? "bg-white text-ink" : "bg-ink text-white"
                }`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <span className={`truncate font-mono text-[11px] ${soft}`}>{prettyUrl(url)}</span>
            </span>
          )}
        </div>
      </div>

      {/* Dispositivos */}
      <div className="relative min-h-0 flex-1">
        <Devices project={project} />
      </div>
    </Tag>
  )
}

/* ── Galería ──────────────────────────────────────────────────────────── */

export function ProjectsGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const [pinned, setPinned] = useState(false)
  const [distance, setDistance] = useState(0)
  const [current, setCurrent] = useState(1)

  // La galería se fija y el scroll vertical la desplaza en horizontal, en cualquier tamaño de pantalla.
  // Solo con "reducir movimiento" se deja como carrusel deslizable.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")

    const measure = () => {
      const track = trackRef.current
      const canPin = !reduce.matches
      setPinned(canPin)
      if (track) setDistance(canPin ? Math.max(0, track.scrollWidth - window.innerWidth) : 0)
    }

    measure()
    window.addEventListener("resize", measure)
    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    return () => {
      window.removeEventListener("resize", measure)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // La barra se mueve sin pasar por React; el contador solo se actualiza cuando cambia de proyecto
    let lastCurrent = 1
    const setProgress = (progress: number) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
      const next = Math.min(projects.length, Math.round(progress * (projects.length - 1)) + 1)
      if (next !== lastCurrent) {
        lastCurrent = next
        setCurrent(next)
      }
    }

    if (!pinned) {
      track.style.transform = ""
      const onTrackScroll = () => {
        const max = track.scrollWidth - track.clientWidth
        setProgress(max > 0 ? track.scrollLeft / max : 0)
      }
      onTrackScroll()
      track.addEventListener("scroll", onTrackScroll, { passive: true })
      return () => track.removeEventListener("scroll", onTrackScroll)
    }

    let frame = 0
    const update = () => {
      frame = 0
      const scrolled = NAV_HEIGHT - section.getBoundingClientRect().top
      const progress = distance > 0 ? Math.min(1, Math.max(0, scrolled / distance)) : 0
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`
      setProgress(progress)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [pinned, distance])

  const viewport = `calc(100svh - ${NAV_HEIGHT}px)`

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="relative scroll-mt-20 border-t border-line bg-white"
      style={pinned ? { height: `calc(${viewport} + ${distance}px)` } : undefined}
    >
      <div
        className={`flex flex-col justify-center overflow-hidden ${pinned ? "sticky" : "py-10"}`}
        style={pinned ? { top: NAV_HEIGHT, height: viewport } : undefined}
      >
        <div className="mx-auto flex w-full max-w-[1320px] items-end justify-between gap-4 px-5 md:px-8">
          <div>
            <Eyebrow index="01">Portfolio</Eyebrow>
            <h2 className="font-display h-section mt-3">Últimos proyectos</h2>
          </div>
          <div className="flex shrink-0 items-center gap-3 pb-1.5">
            <span className="font-mono text-xs tabular-nums text-muted-ink">
              {String(current).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <span className="hidden h-[3px] w-24 overflow-hidden rounded-full bg-ink/10 min-[420px]:block md:w-40">
              <span
                ref={barRef}
                className="block h-full w-full origin-left rounded-full bg-brand"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          </div>
        </div>

        <div
          ref={trackRef}
          className={`mt-5 flex h-[clamp(360px,calc(100svh-300px),440px)] md:h-[clamp(380px,calc(100svh-260px),540px)] gap-4 px-5 will-change-transform md:mt-8 md:gap-6 md:px-8 lg:px-[max(2rem,calc((100vw-1320px)/2+2rem))] ${
            pinned ? "w-max" : "snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }`}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
