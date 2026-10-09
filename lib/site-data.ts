import {
  BookOpen,
  Building2,
  Code2,
  Globe,
  LayoutDashboard,
  Lightbulb,
  MousePointerClick,
  Palette,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

export const contact = {
  location: "Córdoba, Argentina",
  email: "autogestiva.info@gmail.com",
  phoneLabel: "+54 9 351 268-1910",
  phoneHref: "tel:+5493512681910",
  whatsappNumber: "5493512681910",
  adminUrl: "https://dashboardneon.vercel.app",
}

export const navServices: { icon: LucideIcon; title: string; description: string; href: string }[] = [
  {
    icon: Globe,
    title: "Páginas web",
    description: "Sitios a medida que convierten visitas en clientes.",
    href: "/#servicios",
  },
  {
    icon: Building2,
    title: "Web Institucionales",
    description: "Sitios profesionales para presentar tu empresa y generar confianza.",
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
    title: "Catálogos digitales y Cartas",
    description: "Mostrá tus productos de forma clara y autogestionable.",
    href: "/#soluciones",
  },
  {
    icon: Search,
    title: "SEO & Migraciones",
    description: "Posicionamiento y traspasos seguros sin perder tráfico.",
    href: "/#seo",
  },
]

export const techStack = [
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

export const services: { icon: LucideIcon; title: string; description: string }[] = [
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

export type Solution = {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  badge?: string
}

export const solutions: Solution[] = [
  {
    title: "Páginas Webs",
    description:
      "Páginas profesionales diseñadas para captar clientes y convertir visitas en ventas. Perfectas para lanzar productos, servicios o campañas puntuales.",
    icon: Globe,
    features: ["Diseño orientado a conversión", "Responsive y veloz", "Formularios de contacto", "SEO optimizado"],
  },
  {
    title: "Webs Institucionales",
    description:
      "Sitios corporativos que presentan tu empresa, servicios y equipo de forma profesional. Dan presencia formal y confianza a tu marca en internet.",
    icon: Building2,
    features: ["Presencia profesional", "Secciones institucionales", "Información de contacto", "Diseño a tu marca"],
  },
  {
    title: "ERP / Sistemas de gestión",
    description:
      "Plataformas internas a medida que automatizan tareas y digitalizan tus procesos clave. Menos trabajo manual, más control y eficiencia.",
    icon: LayoutDashboard,
    badge: "Nuevo",
    features: ["Automatización de procesos", "Roles y permisos", "Reportes en tiempo real", "Integraciones a medida"],
  },
  {
    title: "Catálogos / Cartas Digitales",
    description:
      "Catálogos autogestionables para emprendimientos y tiendas. Mostrá tus productos de forma atractiva, organizada y siempre actualizada.",
    icon: BookOpen,
    features: ["100% autogestionable", "Actualización en tiempo real", "Acceso por código QR", "Búsqueda y filtros"],
  },
]

export const erpFeatures: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MousePointerClick, title: "Automatización", text: "Menos tareas manuales, más foco." },
  { icon: ShieldCheck, title: "Roles y permisos", text: "Control total y datos seguros." },
  { icon: TrendingUp, title: "Reportes en vivo", text: "Decisiones con información real." },
  { icon: Code2, title: "A medida", text: "Se adapta a tus procesos, no al revés." },
]

export const seoChecks = [
  "Redirecciones 301 sin pérdida de ranking",
  "Indexación y sitemap optimizados",
  "Auditoría de velocidad y Core Web Vitals",
]

export const processSteps: { title: string; description: string; icon: LucideIcon; tags: string[] }[] = [
  {
    title: "Análisis y Diseño",
    description:
      "Analizamos tus necesidades específicas y diseñamos una solución personalizada, alineada con tu marca y tus objetivos de negocio.",
    icon: Lightbulb,
    tags: ["Reunión inicial", "Objetivos", "Wireframes"],
  },
  {
    title: "Desarrollo",
    description:
      "Construimos tu solución con foco en la experiencia de usuario y la facilidad de gestión. Desarrollo ágil, transparente y con tecnología moderna.",
    icon: Rocket,
    tags: ["Diseño a medida", "Tecnología moderna", "Revisiones"],
  },
  {
    title: "Lanzamiento y Capacitación",
    description:
      "Lanzamos tu proyecto y te capacitamos para que gestiones el contenido de forma autónoma. Soporte continuo después del despegue.",
    icon: MousePointerClick,
    tags: ["Puesta online", "Capacitación", "Soporte continuo"],
  },
]

export type Client = {
  name: string
  logo: string
  url: string
  /** Fondo de la tarjeta del logo (cada logo necesita el suyo para leerse bien) */
  tile: string
  /** Los logos que ya vienen a color no se pasan a escala de grises */
  keepColor?: boolean
  /** Logos casi cuadrados necesitan más alto para leerse igual que los apaisados */
  tall?: boolean
}

export const clients: Client[] = [
  {
    name: "Traslados Jarabus",
    logo: "/images/clients/jarabus.jpg",
    url: "https://trasladosjarabus.com.ar",
    tile: "#000000",
  },
  {
    name: "Estudio Jurídico CONVS",
    logo: "/images/clients/convs.png",
    url: "https://estudiojuridicoconvs.com.ar",
    tile: "#2d3127",
  },
  {
    name: "Tempograss",
    logo: "/images/clients/tempograss.png",
    url: "https://tempograss.vercel.app",
    tile: "#0f172a",
  },
  {
    name: "SEA - Villada",
    logo: "/images/clients/sea-villada.png",
    url: "https://portalsea.com.ar/villada",
    tile: "#ffffff",
  },
  {
    name: "Gimnasio Life Gym",
    logo: "/images/clients/life-gym.png",
    url: "https://gimnasiolifegym.com.ar",
    tile: "#833d9f",
    keepColor: true,
  },
  {
    name: "Mara Saúl Estética",
    logo: "/images/clients/mara-saul.png",
    url: "https://v0-mara-saul.vercel.app",
    tile: "#0f172a",
  },
  {
    name: "Visual Henderson",
    logo: "/images/clients/visual-henderson.png",
    url: "https://visual-henderson.netlify.app",
    tile: "#040a15",
  },
  {
    name: "Cambel Red Jurídica",
    logo: "/images/clients/cambel.png",
    url: "https://cambelredjuridica.com.ar",
    tile: "#0f172a",
  },
  {
    name: "Zonabot Espacio Tecnológico",
    logo: "/images/clients/zonabot.png",
    url: "https://www.zonabot.com.ar",
    tile: "#f5d9a8",
    keepColor: true,
  },
  {
    name: "ITS Villada",
    logo: "/images/clients/its-villada.png",
    url: "#",
    tile: "#ffffff",
    keepColor: true,
    tall: true,
  },
  {
    name: "ITS Boutique",
    logo: "/images/clients/its-boutique.png",
    url: "#",
    tile: "#ffffff",
    keepColor: true,
    tall: true,
  },
]

export type Project = {
  name: string
  url?: string
  /** Tipo de solución, solo cuando está definido */
  type?: string
  description?: string
  /** Capturas reales del sitio en producción */
  desktop?: string
  /** Dirección que se muestra en el navegador del mockup, si no es la del sitio */
  desktopUrl?: string
  mobile?: string
  logo?: string
  /** Colores tomados de la marca de cada cliente */
  bg: string
  accent: string
  dark: boolean
}

export const projects: Project[] = [
  {
    name: "Traslados Jarabus",
    url: "https://trasladosjarabus.com.ar",
    type: "E-commerce",
    description: "Tienda online con reserva y venta de pasajes de forma autogestionable.",
    desktop: "/images/work/jarabus-admin.jpg",
    mobile: "/images/work/jarabus-mobile.jpg",
    bg: "#100506",
    accent: "#e02424",
    dark: true,
  },
  {
    name: "La Comanda",
    url: "https://lacomanda-xi.vercel.app",
    type: "Carta digital",
    description: "Menú o catálogo autogestionable, ideal para gastronomía y comercios.",
    desktop: "/images/work/la-comanda-backoffice.jpg",
    desktopUrl: "lacomanda-xi.vercel.app/backoffice/personalizar",
    mobile: "/images/work/la-comanda-mobile.jpg",
    bg: "#efe1cd",
    accent: "#4a2c20",
    dark: false,
  },
  {
    name: "Estudio Jurídico CONVS",
    url: "https://estudiojuridicoconvs.com.ar",
    type: "Página web",
    desktop: "/images/work/convs.jpg",
    mobile: "/images/work/convs-mobile.jpg",
    bg: "#2d3127",
    accent: "#c9a98c",
    dark: true,
  },
  {
    name: "Zonabot Espacio Tecnológico",
    url: "https://www.zonabot.com.ar",
    type: "Web institucional",
    desktop: "/images/work/zonabot.jpg",
    mobile: "/images/work/zonabot-mobile.jpg",
    bg: "#f5d9a8",
    accent: "#e8792b",
    dark: false,
  },
  {
    name: "Cantina Savio",
    url: "https://www.grupoalgarbe.com.ar",
    type: "Catálogo digital",
    desktop: "/images/work/cantina-savio-backoffice.jpg",
    mobile: "/images/work/cantina-savio-mobile.jpg",
    bg: "#0f2a52",
    accent: "#2f6fd0",
    dark: true,
  },
]

export const footerSolutions = [
  { label: "Landing Pages", href: "#soluciones" },
  { label: "Web Institucionales", href: "#soluciones" },
  { label: "ERP / Sistemas de gestión", href: "#sistemas" },
  { label: "Catálogos Digitales / Cartas Digitales", href: "#soluciones" },
]

export const prettyUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "")
