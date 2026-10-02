"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useIsMobile as useMobile } from "@/hooks/use-mobile"
import {
  ArrowRight,
  LayoutDashboard,
  Lightbulb,
  Rocket,
  MousePointerClick,
  Clock,
  Check,
  BookOpen,
  MapPin,
  Mail,
  Phone,
  Globe,
  Palette,
  Gauge,
  Search,
  Smartphone,
  Server,
  Code2,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Bot,
  Zap,
  Cpu,
  Wand2,
  Building2,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { DemoModal } from "@/components/demo-modal"
import { DemoMenu } from "@/components/demo-menu"

/* ────────────────────────────────────────────────────────────
   Reveal-on-scroll helper
   ──────────────────────────────────────────────────────────── */
const Reveal = ({
  children,
  delay = 0,
  className = "",
  y = 24,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay * 1000)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "-40px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   Decorative CSS mockups (crisp, on-brand, no filler blobs)
   ──────────────────────────────────────────────────────────── */
const BrowserChrome = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
    <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-red-400" />
      <span className="h-3 w-3 rounded-full bg-yellow-400" />
      <span className="h-3 w-3 rounded-full bg-green-400" />
      <span className="ml-3 hidden h-5 flex-1 rounded-md bg-white ring-1 ring-slate-200 sm:block" />
    </div>
    {children}
  </div>
)

const HeroMockup = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const build = (delay: string) => (visible ? "animate-build-in" : "opacity-0")
  const buildStyle = (delay: string) => (visible ? { animationDelay: delay } : undefined)

  return (
    <div className="relative" ref={ref}>
      <div className="animate-float">
        <BrowserChrome>
          <div className="hidden p-5 md:block">
            <div className="flex items-center justify-between">
              <div className={`${build("0.05s")} h-4 w-24 rounded bg-brand`} style={buildStyle("0.05s")} />
              <div className="flex gap-2">
                <div className={`${build("0.15s")} h-3 w-10 rounded bg-slate-200`} style={buildStyle("0.15s")} />
                <div className={`${build("0.2s")} h-3 w-10 rounded bg-slate-200`} style={buildStyle("0.2s")} />
                <div
                  className={`${build("0.25s")} h-6 w-16 rounded-full bg-orange-500`}
                  style={buildStyle("0.25s")}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-5 gap-4">
              <div className="col-span-3 space-y-3">
                <div className={`${build("0.35s")} h-6 w-4/5 rounded bg-slate-800`} style={buildStyle("0.35s")} />
                <div className={`${build("0.45s")} h-6 w-3/5 rounded bg-slate-300`} style={buildStyle("0.45s")} />
                <div className={`${build("0.55s")} h-3 w-full rounded bg-slate-200`} style={buildStyle("0.55s")} />
                <div
                  className={`${build("0.6s")} h-3 w-11/12 rounded bg-slate-200`}
                  style={buildStyle("0.6s")}
                />
                <div className="mt-4 flex gap-2">
                  <div className={`${build("0.7s")} h-8 w-24 rounded-lg bg-brand`} style={buildStyle("0.7s")} />
                  <div
                    className={`${build("0.78s")} h-8 w-24 rounded-lg bg-slate-100 ring-1 ring-slate-200`}
                    style={buildStyle("0.78s")}
                  />
                </div>
              </div>
              <div
                className={`${build("0.4s")} col-span-2 rounded-xl bg-gradient-to-br from-brand to-brand-dark p-3`}
                style={buildStyle("0.4s")}
              >
                <div className={`${build("0.65s")} h-3 w-2/3 rounded bg-white/70`} style={buildStyle("0.65s")} />
                <div
                  className={`${build("0.75s")} mt-2 h-3 w-1/2 rounded bg-white/40`}
                  style={buildStyle("0.75s")}
                />
                <div
                  className={`${build("0.85s")} mt-4 h-16 rounded-lg bg-white/20`}
                  style={buildStyle("0.85s")}
                />
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => {
                const delay = `${0.9 + i * 0.12}s`
                return (
                  <div
                    key={i}
                    className={`${build(delay)} rounded-xl border border-slate-100 bg-slate-50 p-3`}
                    style={buildStyle(delay)}
                  >
                    <div className="h-6 w-6 rounded-md bg-brand-light" />
                    <div className="mt-2 h-2.5 w-full rounded bg-slate-200" />
                    <div className="mt-1.5 h-2.5 w-2/3 rounded bg-slate-200" />
                  </div>
                )
              })}
            </div>
          </div>
        </BrowserChrome>
      </div>

      {/* floating badges */}
      <div className="animate-float-slow absolute -left-4 top-16 hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-xl sm:flex sm:items-center sm:gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
          <TrendingUp className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold text-slate-800">+35% ventas</p>
          <p className="text-[10px] text-slate-500">primeros 90 días</p>
        </div>
      </div>
      <div className="animate-float absolute -right-3 bottom-8 hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-xl sm:flex sm:items-center sm:gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-brand">
          <Gauge className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold text-slate-800">100/100</p>
          <p className="text-[10px] text-slate-500">performance</p>
        </div>
      </div>
    </div>
  )
}

const SeoMockup = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const build = (delay: string) => (visible ? "animate-build-in" : "opacity-0")
  const buildStyle = (delay: string) => (visible ? { animationDelay: delay } : undefined)

  return (
    <div className="relative" ref={ref}>
      <BrowserChrome>
        <div className="space-y-3 p-6">
          <div className={`${build("0.05s")} h-7 w-4/5 rounded-lg bg-brand`} style={buildStyle("0.05s")} />
          <div className={`${build("0.15s")} h-7 w-3/5 rounded-lg bg-brand/50`} style={buildStyle("0.15s")} />
          <div className="mt-4 space-y-2">
            <div className={`${build("0.3s")} h-3 w-full rounded bg-slate-200`} style={buildStyle("0.3s")} />
            <div className={`${build("0.4s")} h-3 w-11/12 rounded bg-slate-200`} style={buildStyle("0.4s")} />
            <div className={`${build("0.5s")} h-3 w-4/5 rounded bg-slate-200`} style={buildStyle("0.5s")} />
            <div className={`${build("0.6s")} h-3 w-3/4 rounded bg-slate-200`} style={buildStyle("0.6s")} />
          </div>
        </div>
      </BrowserChrome>
      {/* magnifier */}
      <div className="animate-float absolute -bottom-6 -right-2 grid h-28 w-28 place-items-center rounded-full border-[6px] border-brand-dark bg-white/40 backdrop-blur-sm shadow-2xl">
        <Search className="h-10 w-10 text-brand-dark" />
        <span className="absolute -bottom-4 -right-2 h-10 w-3 rotate-45 rounded-full bg-brand-dark" />
      </div>
      <div className="absolute right-6 top-6 flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
        <ShieldCheck className="h-3.5 w-3.5" /> SEO OK
      </div>
    </div>
  )
}

const DashboardMockup = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const build = (delay: string) => (visible ? "animate-build-in" : "opacity-0")
  const buildStyle = (delay: string) => (visible ? { animationDelay: delay } : undefined)

  return (
    <div className="relative" ref={ref}>
      <BrowserChrome>
        <div className="flex">
          <div className="hidden w-16 shrink-0 space-y-3 bg-slate-900 p-3 sm:block">
            <div className="h-8 w-8 rounded-lg bg-brand" />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-2.5 w-full rounded bg-white/20" />
            ))}
          </div>
          <div className="flex-1 p-5">
            <div className="flex items-center justify-between">
              <div className={`${build("0.05s")} h-4 w-32 rounded bg-slate-800`} style={buildStyle("0.05s")} />
              <div className={`${build("0.15s")} h-6 w-6 rounded-full bg-brand-light`} style={buildStyle("0.15s")} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { c: "bg-brand", w: "w-2/3", delay: "0.3s" },
                { c: "bg-orange-500", w: "w-1/2", delay: "0.4s" },
                { c: "bg-green-500", w: "w-3/4", delay: "0.5s" },
              ].map((k, i) => (
                <div
                  key={i}
                  className={`${build(k.delay)} rounded-xl border border-slate-100 bg-slate-50 p-3`}
                  style={buildStyle(k.delay)}
                >
                  <div className={`h-2.5 ${k.w} rounded bg-slate-300`} />
                  <div className={`mt-2 h-5 w-12 rounded ${k.c}`} />
                </div>
              ))}
            </div>
            <div
              className={`${build("0.65s")} mt-4 flex h-28 items-end gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3`}
              style={buildStyle("0.65s")}
            >
              {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-brand to-brand/50"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </BrowserChrome>
      <div className="animate-float-slow absolute -left-3 bottom-6 hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-xl md:flex md:items-center md:gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Clock className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold text-slate-800">-80% tiempo</p>
          <p className="text-[10px] text-slate-500">operativo</p>
        </div>
      </div>
    </div>
  )
}

const AIChatMockup = () => (
  <div className="relative">
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
          <Bot className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-slate-900" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">Asistente IA</p>
          <p className="text-[11px] text-green-400">En línea · responde al instante</p>
        </div>
        <Sparkles className="ml-auto h-4 w-4 text-brand-light/70" />
      </div>
      <div className="space-y-3 py-4">
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/10 px-3 py-2 text-sm text-slate-200">
          Hola, ¿en qué puedo ayudarte hoy?
        </div>
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-brand px-3 py-2 text-sm text-white">
          Necesito el estado de mi pedido #1042
        </div>
        <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white/10 px-3 py-2 text-sm text-slate-200">
          Tu pedido #1042 está en camino y llega hoy entre las 14 y 18 h. ¿Querés que te avise cuando salga a
          reparto?
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5">
        <span className="text-sm text-slate-400">Escribí tu mensaje…</span>
        <span className="ml-auto flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-light [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-light [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-light" />
        </span>
      </div>
    </div>
    <div className="animate-float absolute -right-3 -top-5 hidden rounded-2xl border border-white/10 bg-slate-900/90 p-3 shadow-xl backdrop-blur md:flex md:items-center md:gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/20 text-brand-light">
        <Zap className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold text-white">+3x productividad</p>
        <p className="text-[10px] text-slate-400">con automatización IA</p>
      </div>
    </div>
  </div>
)

/* ────────────────────────────────�����───────────────────────────
   Data
   ──────────────────────────────────────────────────────────── */
  const aiFeatures = [
  { icon: TrendingUp, title: "Análisis predictivo", text: "Anticipá demanda, stock y comportamiento." },
  { icon: Wand2, title: "Lectura de documentos", text: "Extrae datos de facturas y formularios al instante." },
  { icon: Search, title: "Búsqueda y recomendaciones", text: "Resultados y sugerencias personalizadas." },
  { icon: Cpu, title: "Integrado a tus sistemas", text: "La IA vive dentro de tu web y tu ERP." },
]

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "WordPress",
  "Laravel",
  "PostgreSQL",
  "Vercel",
  "Supabase",
]

const clients = [
  {
    name: "Traslados Jarabus",
    logo: "/images/clients/jarabus.jpg",
    url: "https://trasladosjarabus.com.ar",
    dark: false,
  },
  {
    name: "Estudio Jurídico CONVS",
    logo: "/images/clients/convs.png",
    url: "https://estudiojuridicoconvs.com.ar",
    dark: false,
  },
  {
    name: "Tempograss",
    logo: "/images/clients/tempograss.png",
    url: "https://tempograss.vercel.app",
    dark: true,
  },
  {
    name: "SEA - Villada",
    logo: "/images/clients/sea-villada.png",
    url: "https://portalsea.com.ar/villada",
    dark: false,
  },
  {
    name: "SEA - Savio",
    logo: "/images/clients/sea-savio.png",
    url: "https://portalsea.com.ar/savio",
    dark: false,
  },
  {
    name: "Gimnasio Life Gym",
    logo: "/images/clients/life-gym.png",
    url: "https://gimnasiolifegym.com.ar",
    dark: false,
  },
  {
    name: "Mara Saúl Estética",
    logo: "/images/clients/mara-saul.png",
    url: "https://v0-mara-saul.vercel.app",
    dark: true,
  },
  {
    name: "Visual Henderson",
    logo: "/images/clients/visual-henderson.png",
    url: "https://visual-henderson.netlify.app",
    dark: false,
  },
  {
    name: "Cambel Red Jurídica",
    logo: "/images/clients/cambel.png",
    url: "https://cambelredjuridica.com.ar",
    dark: true,
  },
]

const services = [
  {
    icon: Palette,
    title: "Diseño web personalizado",
    description:
      "Trabajamos desde el wireframe hasta la identidad visual final. Pensamos cada sitio como una herramienta de marca: clara, funcional y alineada con tus objetivos.",
  },
  {
    icon: Search,
    title: "Optimización SEO",
    description:
      "Optimizamos estructura, velocidad y contenido para que Google (y tus clientes) te encuentren. Tráfico orgánico de calidad y mejores posiciones.",
  },
  {
    icon: Smartphone,
    title: "Diseño responsive",
    description:
      "Cada sitio se adapta a todos los dispositivos. Optimizamos la experiencia en mobile, tablet y desktop para que naveguen sin trabas.",
  },
  {
    icon: Server,
    title: "Hosting privado",
    description:
      "Servidores propios con monitoreo 24/7. Tiempos de carga rápidos, máxima seguridad y soporte especializado. Tu sitio siempre online.",
  },
]

const solutions = [
  {
  title: "Landing Pages",
  description:
  "Páginas profesionales diseñadas para captar clientes y convertir visitas en ventas. Perfectas para lanzar productos, servicios o campañas puntuales.",
  icon: Globe,
  accent: "from-brand to-brand-dark",
  features: ["Diseño orientado a conversión", "Responsive y veloz", "Formularios de contacto", "SEO optimizado"],
  },
  {
  title: "Web Institucionales",
  description:
  "Sitios corporativos que presentan tu empresa, servicios y equipo de forma profesional. Dan presencia formal y confianza a tu marca en internet.",
  icon: Building2,
  accent: "from-orange-500 to-orange-600",
  features: ["Presencia profesional", "Secciones institucionales", "Información de contacto", "Diseño a tu marca"],
  },
  {
    title: "ERP / Sistemas de gestión",
    description:
      "Plataformas internas a medida que automatizan tareas y digitalizan tus procesos clave. Menos trabajo manual, más control y eficiencia.",
    icon: LayoutDashboard,
    accent: "from-brand to-brand-dark",
    badge: "Nuevo",
    features: ["Automatización de procesos", "Roles y permisos", "Reportes en tiempo real", "Integraciones a medida"],
  },
  {
    title: "Catálogos / Cartas Digitales",
    description:
      "Catálogos autogestionables para emprendimientos y tiendas. Mostrá tus productos de forma atractiva, organizada y siempre actualizada.",
    icon: BookOpen,
    accent: "from-orange-500 to-orange-600",
    features: ["100% autogestionable", "Actualización en tiempo real", "Acceso por código QR", "Búsqueda y filtros"],
  },
]

const procesSteps = [
  {
  title: "Análisis y Diseño",
  description:
  "Analizamos tus necesidades específicas y diseñamos una solución personalizada, alineada con tu marca y tus objetivos de negocio.",
  icon: Lightbulb,
  image: "/images/ana-cc-81lisis-20y-20disen-cc-83o.png",
  mobileImage: "/images/analisis-diseno-mobile.png",
  tags: ["Reunión inicial", "Objetivos", "Wireframes"],
  },
  {
  title: "Desarrollo",
  description:
  "Construimos tu solución con foco en la experiencia de usuario y la facilidad de gestión. Desarrollo ágil, transparente y con tecnología moderna.",
  icon: Rocket,
  image: "/images/desarrollo.png",
  mobileImage: "/images/desarrollo-mobile.png",
  tags: ["Diseño a medida", "Tecnología moderna", "Revisiones"],
  },
  {
  title: "Lanzamiento y Capacitación",
  description:
  "Lanzamos tu proyecto y te capacitamos para que gestiones el contenido de forma autónoma. Soporte continuo después del despegue.",
  icon: MousePointerClick,
  image: "/images/implementacio-cc-81n.png",
  mobileImage: "/images/implementacion-mobile.png",
  tags: ["Puesta online", "Capacitación", "Soporte continuo"],
  },
  ]

/* ────────────────────────────────────────────────────────────
   Page
   ─────────────────���────────────────────────────────────────── */
export default function HomePage() {
  const isMobile = useMobile()
  const [demoDialogOpen, setDemoDialogOpen] = useState(false)
  const [demoUrl, setDemoUrl] = useState("https://autogestiva-estudio-juridico.vercel.app/")
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [consulta, setConsulta] = useState("")

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const phoneNumber = "5493512681910"
    const message = `Hola, mi nombre es ${nombre} ${apellido}. Mi consulta es: ${consulta}`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const openDemoDialog = (url = "https://autogestiva-estudio-juridico.vercel.app/", event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect()
      setButtonPosition({ x: rect.left, y: rect.bottom })
    }
    setDemoUrl(url)
    setDemoDialogOpen(true)
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.scrollY - 96
      window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }

  const OrangeButton = ({
    children,
    onClick,
    className = "",
  }: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
  }) => (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-orange-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/40 active:scale-95 ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full">
        <span className="absolute top-0 h-full w-16 -translate-x-full bg-white/30 animate-sheen" />
      </span>
    </button>
  )

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-800">
      <Navbar />

      <DemoModal open={demoDialogOpen} onOpenChange={setDemoDialogOpen} demoUrl={demoUrl} originPosition={buttonPosition} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="hero" className="relative bg-white pt-14 pb-20 md:pt-20 md:pb-28">
        {/* animated aurora background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-aurora absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
          <div className="animate-aurora absolute -top-10 right-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl [animation-delay:-6s]" />
          <div className="animate-aurora absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand/10 blur-3xl [animation-delay:-3s]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        </div>

        <div className="container relative mx-auto grid grid-cols-1 items-center gap-14 px-4 md:px-6 lg:grid-cols-2">
          <div className="animate-rise-in text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-light px-4 py-1.5 text-sm font-medium text-brand">
              <Sparkles className="h-4 w-4" />
              Agencia de desarrollo web & software
            </span>

            <h1 className="font-display mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
              Soluciones digitales que{" "}
              <span className="relative whitespace-nowrap">
                <span className="animate-gradient bg-gradient-to-r from-brand via-orange-500 to-brand bg-clip-text text-transparent">
                  escalan
                </span>
              </span>{" "}
              con tu negocio
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-600 lg:mx-0">
              No trabajamos con plantillas genéricas. Diseñamos y desarrollamos páginas web, tiendas online y sistemas
              de gestión a medida, pensados para tus procesos, tus usuarios y tus objetivos.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <OrangeButton onClick={() => scrollToSection("contacto")}>
                Cotizá tu proyecto <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </OrangeButton>
              <DemoMenu onSelect={(url) => openDemoDialog(url)} />
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500 lg:justify-start">
              {["Entrega rápida", "100% autogestionable", "Soporte incluido"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-green-500" /> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* ── Tech marquee ─────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-slate-50 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-slate-400">
            Construido con tecnologías modernas
          </p>
          <div className="marquee-mask relative overflow-hidden">
            <div className="flex w-max animate-marquee gap-4">
              {[...techStack, ...techStack].map((tech, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-brand" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services grid ────────────────────────────────��───── */}
      <section id="servicios" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">Servicios</span>
            <h2 className="font-display mt-3 text-3xl font-extrabold text-ink md:text-4xl">
              Todo lo que tu presencia digital necesita
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Un equipo, todas las piezas: diseño, desarrollo, rendimiento y posicionamiento bajo un mismo criterio
              técnico.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Reveal key={service.title} delay={0.05 * index}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl">
                    <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="font-display text-xl font-bold text-ink">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>


      {/* ── Solutions ────────────────────────────────────────── */}
      <section id="soluciones" className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">Soluciones</span>
            <h2 className="font-display mt-3 text-3xl font-extrabold text-ink md:text-4xl">
              Soluciones a medida para cada tipo de negocio
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Desde una landing que convierte hasta un ERP que automatiza tu operación. Elegimos el camino correcto para
              vos.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {solutions.map((solution, index) => {
              const Icon = solution.icon
              return (
                <Reveal key={solution.title} delay={0.05 * index}>
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${solution.accent} text-white shadow-lg`}
                      >
                        <Icon className="h-8 w-8" />
                      </span>
                      {solution.badge && (
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-600">
                          {solution.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display mt-6 text-2xl font-bold text-ink">{solution.title}</h3>
                    <p className="mt-3 text-slate-600">{solution.description}</p>
                    <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {solution.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                          <Check className="h-4 w-4 shrink-0 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SEO / Migrations feature ─────────────────────────���─ */}
      <section id="seo" className="bg-slate-50 py-24">
        <div className="container mx-auto grid grid-cols-1 items-center gap-14 px-4 md:px-6 lg:grid-cols-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">SEO & Migraciones</span>
            <h2 className="font-display mt-3 text-3xl font-extrabold leading-tight text-ink md:text-4xl">
              Migraciones SEO-friendly y seguras
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Migrar un sitio no es solo copiar y pegar. Nos aseguramos de que el traspaso sea limpio, sin perder
              posicionamiento ni afectar tu tráfico. Redireccionamientos, indexación y velocidad bajo control.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Redirecciones 301 sin pérdida de ranking",
                "Indexación y sitemap optimizados",
                "Auditoría de velocidad y Core Web Vitals",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <OrangeButton onClick={() => scrollToSection("contacto")}>
                Posicioná tu web <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </OrangeButton>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <SeoMockup />
          </Reveal>
        </div>
      </section>

      {/* ── Sistemas de gestión (ERP) feature ────────────────── */}
      <section id="sistemas" className="py-24">
        <div className="container mx-auto grid grid-cols-1 items-center gap-14 px-4 md:px-6 lg:grid-cols-2">
          <Reveal delay={0.15} className="order-2 lg:order-1">
            <DashboardMockup />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              ERP / Sistemas de gestión
            </span>
            <h2 className="font-display mt-3 text-3xl font-extrabold leading-tight text-ink md:text-4xl">
              Sistemas de gestión que impulsan tu operación
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Desarrollamos plataformas internas a medida que automatizan tareas y digitalizan procesos clave. Nuestros
              sistemas ayudaron a empresas a reducir hasta un 80% del tiempo operativo, mejorando su seguridad,
              eficiencia y rentabilidad.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: MousePointerClick, title: "Automatización", text: "Menos tareas manuales, más foco." },
                { icon: ShieldCheck, title: "Roles y permisos", text: "Control total y datos seguros." },
                { icon: TrendingUp, title: "Reportes en vivo", text: "Decisiones con información real." },
                { icon: Code2, title: "A medida", text: "Se adapta a tus procesos, no al revés." },
              ].map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="font-semibold text-ink">{f.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{f.text}</p>
                  </div>
                )
              })}
            </div>
            <div className="mt-8">
              <OrangeButton onClick={() => scrollToSection("contacto")}>
                Contactanos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </OrangeButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── IA / Inteligencia Artificial ─────────────────────── */}
      <section id="ia" className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.12]" />
        <div className="animate-aurora pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
        <div className="animate-aurora pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="container relative mx-auto grid grid-cols-1 items-center gap-14 px-4 md:px-6 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-brand-light">
              <Sparkles className="h-4 w-4" /> Inteligencia Artificial
            </span>
            <h2 className="font-display mt-5 max-w-3xl text-3xl font-extrabold leading-tight md:text-4xl lg:max-w-none lg:text-[2.75rem]">
              Sistemas que{" "}
              <span className="bg-gradient-to-r from-brand-light via-white to-orange-300 bg-clip-text text-transparent">
                integran IA
              </span>{" "}
              para vender y operar mejor
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {aiFeatures.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-brand/50 hover:bg-white/[0.08]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/20 text-brand-light">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{f.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{f.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <AIChatMockup />
          </Reveal>
          <div className="flex justify-center lg:col-span-2">
            <OrangeButton onClick={() => scrollToSection("contacto")}>
              Quiero IA en mi negocio{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </OrangeButton>
          </div>
        </div>
      </section>

      {/* ── Process ─────────────────��────────────────────────── */}
      <section id="como-funciona" className="bg-slate-50 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-20 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-orange-500">
              Proceso
            </span>
            <h2 className="font-display mt-4 text-3xl font-extrabold text-ink md:text-4xl">
              De la idea al lanzamiento en 3 pasos
            </h2>
            <p className="mt-4 text-pretty text-slate-600">
              Un camino claro y transparente. Así acompañamos tu proyecto desde la primera charla hasta que estás online.
            </p>
          </Reveal>

          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand via-brand/40 to-orange-500 md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-12 md:space-y-16">
              {procesSteps.map((step, index) => {
                const Icon = step.icon
                const textFirst = index % 2 === 0
                return (
                  <Reveal key={step.title} delay={0.05 * index}>
                    <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-12">
                      {/* Timeline node */}
                      <span className="absolute left-6 top-8 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-4 border-slate-50 bg-orange-500 md:left-1/2">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-orange-500/40" />
                      </span>

                      {/* Text card */}
                      <div className={textFirst ? "md:order-1" : "md:order-2"}>
                        <div
                          className={`group ml-14 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:ml-0 ${
                            textFirst ? "md:mr-8 md:text-right" : "md:ml-8"
                          }`}
                        >
                          <div className={`flex items-center gap-3 ${textFirst ? "md:flex-row-reverse" : ""}`}>
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                              <Icon className="h-6 w-6" />
                            </span>
                            <span className="font-display text-5xl font-extrabold text-slate-100 transition-colors group-hover:text-orange-500/20">
                              0{index + 1}
                            </span>
                          </div>
                          <h3 className="font-display mt-4 text-2xl font-bold text-ink">{step.title}</h3>
                          <p className="mt-3 leading-relaxed text-slate-600">{step.description}</p>
                          <div className={`mt-5 flex flex-wrap gap-2 ${textFirst ? "md:justify-end" : ""}`}>
                            {step.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Image */}
                      <div className={textFirst ? "md:order-2" : "md:order-1"}>
                        <div className="ml-14 max-w-md overflow-hidden rounded-2xl md:mx-auto md:ml-0">
                          <img
                            src={(isMobile ? step.mobileImage : step.image) || "/placeholder.svg"}
                            alt={step.title}
                            className="mx-auto h-auto max-h-80 w-full object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Clients ─���────────────────────────────────────────── */}
      <section id="clientes" className="border-y border-slate-100 bg-slate-50 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">Clientes</span>
            <h2 className="font-display mt-3 text-3xl font-extrabold text-ink md:text-4xl">
              Marcas que ya confían en nosotros
            </h2>
            <p className="mt-4 text-pretty text-slate-600">
              Negocios de rubros muy distintos eligieron nuestras soluciones digitales para crecer.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="marquee-mask relative overflow-hidden">
              <div className="flex w-max animate-marquee-clients items-center gap-6">
                {[...clients, ...clients].map((client, i) => (
                  <a
                    key={`${client.name}-${i}`}
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar el sitio web de ${client.name}`}
                    className={`group flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      client.dark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
                    }`}
                  >
                    <img
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      crossOrigin="anonymous"
                      loading="lazy"
                      decoding="async"
                      className="max-h-14 max-w-full object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-dark py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-aurora absolute -top-20 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="animate-aurora absolute bottom-0 right-10 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl [animation-delay:-5s]" />
        </div>
        <div className="container relative mx-auto px-4 text-center md:px-6">
          <Reveal>
            <h2 className="font-display mx-auto max-w-3xl text-balance text-3xl font-extrabold text-white md:text-5xl">
              ¿Listo para transformar tu presencia digital?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
              Asesoría gratuita para entender qué solución necesita tu negocio. Sin complicaciones, entrega rápida y con
              soporte incluido.
            </p>
            <div className="mt-8 flex justify-center">
              <OrangeButton onClick={() => scrollToSection("contacto")}>
                ¡Me interesa! <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </OrangeButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section id="contacto" className="py-24">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-orange-500">Contacto</span>
            <h2 className="font-display mt-3 text-3xl font-extrabold text-ink md:text-4xl">Hablemos de tu proyecto</h2>
            <p className="mt-4 text-lg text-slate-600">
              Contanos qué necesitás y te asesoramos sin cargo. Respondemos por WhatsApp a la brevedad.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="text-slate-700">Córdoba, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <Mail className="h-5 w-5" />
                </span>
                <a href="mailto:autogestiva.info@gmail.com" className="text-slate-700 hover:text-brand">
                  autogestiva.info@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <Phone className="h-5 w-5" />
                </span>
                <a href="tel:+5493512681910" className="text-slate-700 hover:text-brand">
                  +54 9 351 268-1910
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
              <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-slate-700">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="apellido" className="mb-2 block text-sm font-medium text-slate-700">
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="apellido"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      required
                      className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="consulta" className="mb-2 block text-sm font-medium text-slate-700">
                    Tu consulta
                  </label>
                  <textarea
                    id="consulta"
                    rows={5}
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    required
                    placeholder="Contanos qué tipo de proyecto tenés en mente..."
                    className="block w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:bg-green-600 hover:shadow-xl active:scale-[0.98]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enviar por WhatsApp
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────��───── */}
      <footer className="bg-ink text-white">
        <div className="container mx-auto px-4 py-14 md:px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Autogestiva%20ultimo-R93mHhq1sUa1o5uzR06VLSNktwqoaS.png"
                alt="Logo Autogestiva"
                className="h-10 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
                loading="lazy"
                decoding="async"
              />
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Agencia de desarrollo web y sistemas a medida. Transformamos la presencia digital de tu negocio con
                tecnología moderna.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold">Servicios</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {["Diseño web", "Optimización SEO", "Diseño responsive", "Sistemas de gestión"].map((item) => (
                  <li key={item}>
                    <a href="#servicios" className="text-slate-400 transition-colors hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold">Soluciones</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[
  { label: "Landing Pages", href: "#soluciones" },
  { label: "Web Institucionales", href: "#soluciones" },
                  { label: "ERP / Sistemas de gestión", href: "#sistemas" },
                  { label: "Catálogos Digitales / Cartas Digitales", href: "#soluciones" },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-slate-400 transition-colors hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold">Contacto</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span className="text-slate-400">Córdoba, Argentina</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a href="mailto:autogestiva.info@gmail.com" className="text-slate-400 hover:text-white">
                    autogestiva.info@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <a href="tel:+5493512681910" className="text-slate-400 hover:text-white">
                    +54 9 351 268-1910
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Autogestiva. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
