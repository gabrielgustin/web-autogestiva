"use client"

import type React from "react"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useIsMobile as useMobile } from "@/hooks/use-mobile"
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  LayoutDashboard,
  Lightbulb,
  Rocket,
  MousePointerClick,
  Clock,
  Users,
  Check,
  BookOpen,
  MapPin,
  Mail,
  Phone,
  ShoppingCart,
  Globe,
  ChevronDown,
  Star,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { DemoModal } from "@/components/demo-modal"

const EnhancedImageCarousel = () => {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = useMobile()

  const images = [
    "/images/green-20gradient-20application-20showcase-20presentation.png",
    "/images/ga.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
  ]

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrent(index)
  }

  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(
        () => {
          nextSlide()
        },
        isMobile ? 7000 : 5000,
      )

      return () => clearTimeout(timer)
    }
  }, [current, isHovered, isMobile])

  const imageTitles = [
    "Aplicación con Gradiente Verde",
    "Carta Virtual Club Montebello",
    "Menú Digital para Cafeterías",
    "Backoffice y Tienda Online",
    "Landing Page para Servicios",
  ]

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50" />

      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{ opacity: current === index ? 1 : 0, pointerEvents: current === index ? "auto" : "none" }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Slide ${index + 1} - ${imageTitles[index]}`}
              className="w-full h-auto object-contain p-4"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </div>
        ))}
      </div>

      <div
        className={`absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 transition-opacity duration-300 ${
          isHovered || isMobile ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          className="bg-white/80 backdrop-blur-sm text-blue-600 rounded-full p-2 shadow-lg hover:bg-white transition-all"
          onClick={prevSlide}
          aria-label="Anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          className="bg-white/80 backdrop-blur-sm text-blue-600 rounded-full p-2 shadow-lg hover:bg-white transition-all"
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
            }`}
            style={{ width: current === index ? "2rem" : "0.75rem" }}
            aria-label={`Ir a la imagen ${index + 1}`}
            aria-current={current === index ? "true" : "false"}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-blue-600 rounded-full px-3 py-1 text-sm font-medium shadow-lg">
        {current + 1} / {images.length}
      </div>
    </div>
  )
}

const RotatingTextComponent = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const texts = ["Impulsa tu presencia digital hoy", "Incrementa tus ventas", "Optimiza procesos"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    }, 3500) // Change text every 3.5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[200px] md:h-[160px] lg:h-[180px] pb-4 px-2">
      {texts.map((text, index) => {
        const isActive = currentTextIndex === index
        const isPast = index < currentTextIndex || (currentTextIndex === 0 && index === texts.length - 1)

        return (
          <div
            key={index}
            className={`absolute inset-0 text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-[800ms] ease-out ${
              isActive
                ? "opacity-100 translate-y-0 scale-100 blur-0"
                : isPast
                  ? "opacity-0 -translate-y-12 scale-95 blur-[2px]"
                  : "opacity-0 translate-y-12 scale-95 blur-[2px]"
            }`}
            style={{
              background: "linear-gradient(135deg, #2A2D34 0%, #4A5568 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: isActive ? "transparent" : "#2A2D34",
              backgroundClip: "text",
              textShadow: isActive ? "0 4px 12px rgba(42, 45, 52, 0.1)" : "none",
            }}
          >
            {text}
          </div>
        )
      })}
    </div>
  )
}

const BACKOFFICE_URL = "https://v0.dev/chat/backoffice-eRF5UeiMWk0"

const PRIMARY_COLOR = "#004E89"
const SECONDARY_COLOR = "#0066B3"
const ACCENT_COLOR = "#003566"
const NEUTRAL_DARK = "#2A2D34"
const NEUTRAL_LIGHT = "#F8F9FA"

const benefits = [
  {
    title: "Landing Pages",
    description:
      "Páginas profesionales diseñadas para captar clientes y convertir visitas en ventas. Perfectas para lanzar productos, servicios o campañas.",
    icon: <Globe className="h-8 w-8" />,
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    hoverColor: "group-hover:bg-blue-100",
  },
  {
    title: "E-commerce",
    description:
      "Tiendas online completas para vender tus productos. Gestión de inventario, pagos seguros y experiencia de compra optimizada.",
    icon: <ShoppingCart className="h-8 w-8" />,
    color: "bg-green-50",
    iconColor: "text-green-500",
    hoverColor: "group-hover:bg-green-100",
  },
  {
    title: "Cartas Digitales",
    description:
      "Menús digitales para bares, restaurantes y cafeterías. Actualización en tiempo real y acceso desde código QR.",
    icon: <BookOpen className="h-8 w-8" />,
    color: "bg-indigo-50",
    iconColor: "text-indigo-500",
    hoverColor: "group-hover:bg-indigo-100",
  },
  {
    title: "Catálogos Digitales",
    description:
      "Catálogos autogestionables para emprendimientos y tiendas. Muestra tus productos de forma atractiva y organizada.",
    icon: <LayoutDashboard className="h-8 w-8" />,
    color: "bg-orange-50",
    iconColor: "text-orange-500",
    hoverColor: "group-hover:bg-orange-100",
  },
]

const digitalMenuFeatures = [
  "100% autogestionable",
  "Actualización en tiempo real",
  "Optimizado para dispositivos móviles",
  "Acceso desde código QR",
  "Integración con redes sociales",
  "Categorización de productos",
]

const catalogWebFeatures = [
  "100% autogestionable",
  "Actualización en tiempo real",
  "Optimizado para dispositivos móviles",
  "Imágenes y descripciones detalladas",
  "Integración con redes sociales",
  "Búsqueda y filtros",
]

const testimonials = [
  {
    name: "Mara Saul",
    business: "Estetica",
    text: "Una experiencia muy gratificante, ofrecen una atencion personalizada y son muy flexibles en varios aspectos",
    rating: 5,
  },
  {
    name: "Santiago Henderson",
    business: "Carpinteria",
    text: "Muy conforme con el resultado y la rapidez con la que trabajaron",
    rating: 5,
  },
  {
    name: "Lulu Deco",
    business: "Tienda de decoracion",
    text: "Muy contento con los resultados, 100% funcional",
    rating: 5,
  },
]

const faqs = [
  {
    question: "¿Cuánto tiempo tarda el desarrollo?",
    answer:
      "El tiempo varía según el proyecto. Una carta digital o catálogo puede estar listo en 1-2 semanas. Landing pages y e-commerce pueden tomar 2-4 semanas dependiendo de la complejidad.",
  },
  {
    question: "¿Puedo actualizar el contenido yo mismo?",
    answer:
      "¡Sí! Todas nuestras soluciones son 100% autogestionables. Te capacitamos para que puedas actualizar contenido, precios, imágenes y más sin necesidad de conocimientos técnicos.",
  },
  {
    question: "¿Qué incluye el servicio?",
    answer:
      "Incluye diseño personalizado, desarrollo, capacitación completa, soporte técnico y hosting. Todo lo necesario para que tu solución digital funcione perfectamente.",
  },
  {
    question: "¿Ofrecen soporte después del lanzamiento?",
    answer:
      "Sí, ofrecemos soporte continuo. Estamos disponibles para resolver dudas, hacer ajustes y ayudarte en lo que necesites.",
  },
  {
    question: "¿Funciona en celulares?",
    answer:
      "Absolutamente. Todas nuestras soluciones están optimizadas para funcionar perfectamente en celulares, tablets y computadoras.",
  },
  {
    question: "¿Necesito conocimientos técnicos?",
    answer:
      "No, para nada. Diseñamos todo pensando en que sea simple de usar. Si sabes usar WhatsApp, podrás gestionar tu contenido sin problemas.",
  },
]

const landingPageFeatures = [
  "Diseño profesional y moderno",
  "Optimizado para conversión",
  "Responsive (móvil y desktop)",
  "Formularios de contacto",
  "Integración con redes sociales",
  "SEO optimizado",
]

const ecommerceFeatures = [
  "Gestión de productos e inventario",
  "Carrito de compras",
  "Pasarela de pagos segura",
  "Panel de administración",
  "Reportes de ventas",
  "Envío y seguimiento de pedidos",
]

const procesSteps = [
  {
    title: "Análisis y Diseño",
    description:
      "Analizamos tus necesidades específicas y diseñamos una solución digital personalizada que se alinee con tu marca y objetivos de negocio.",
    icon: <Lightbulb className="h-6 w-6" />,
    image: "/images/ana-cc-81lisis-20y-20disen-cc-83o.png",
    mobileImage: "/images/analisis-diseno-mobile.png",
    color: "bg-blue-500",
  },
  {
    title: "Desarrollo",
    description:
      "Creamos tu solución digital con un enfoque en la experiencia de usuario y la facilidad de gestión. Desarrollo ágil y transparente.",
    icon: <Rocket className="h-6 w-6" />,
    image: "/images/desarrollo.png",
    mobileImage: "/images/desarrollo-mobile.png",
    color: "bg-indigo-500",
  },
  {
    title: "Lanzamiento y Capacitación",
    description:
      "Lanzamos tu solución digital y te capacitamos en el uso del sistema para que puedas gestionar tu contenido de forma autónoma y sin complicaciones.",
    icon: <MousePointerClick className="h-6 w-6" />,
    image: "/images/implementacio-cc-81n.png",
    mobileImage: "/images/implementacion-mobile.png",
    color: "bg-purple-500",
  },
]

const FadeInWhenVisibleComponent = ({
  children,
  delay = 0,
  className = "",
  direction = null,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: string | null
}) => {
  const isMobile = useMobile()
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay * 1000)
          }
        })
      },
      {
        threshold: isMobile ? 0.1 : 0.2,
        rootMargin: isMobile ? "-10px" : "-50px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, isMobile])

  const getTransform = () => {
    if (!direction) return "translateY(0)"
    switch (direction) {
      case "up":
        return "translateY(20px)"
      case "down":
        return "translateY(-20px)"
      case "left":
        return "translateX(20px)"
      case "right":
        return "translateX(-20px)"
      default:
        return "translateY(0)"
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : getTransform(),
      }}
    >
      {children}
    </div>
  )
}

const AnimatedTextComponent = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) => {
  return <div className={className}>{text}</div>
}

const StatCounter = ({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  value: string
  suffix?: string
  prefix?: string
  duration?: number
}) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
          }
        })
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = Number.parseInt(value, 10)
    const increment = end / (duration * 30)
    const timer = setInterval(() => {
      start += increment
      setCount(Math.min(Math.floor(start), end))
      if (start >= end) clearInterval(timer)
    }, 1000 / 30)

    return () => clearInterval(timer)
  }, [isInView, value, duration])

  return (
    <div ref={ref} className="text-4xl font-bold">
      {prefix}
      {count}
      {suffix}
    </div>
  )
}

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const heroRef = useRef(null)
  const benefitsRef = useRef(null)
  const solutionRef = useRef(null)
  const howItWorksRef = useRef(null)
  const statsRef = useRef(null)
  const isMobile = useMobile()
  const [demoDialogOpen, setDemoDialogOpen] = useState(false)
  const [demoUrl, setDemoUrl] = useState("https://demos-landing.vercel.app")
  // REMOVED STATE: const [mobileIframeOpen, setMobileIframeOpen] = useState(false)
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [consulta, setConsulta] = useState("")

  // CHANGE: Added state to track button position for macOS-style animation
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const phoneNumber = "5493512681910"
    const message = `Hola, mi nombre es ${nombre} ${apellido}. Mi consulta es: ${consulta}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const [api, setApi] = useState<CarouselApi | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [count, setCount] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [showMobileIframe, setShowMobileIframe] = useState(false) // ADDED STATE

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrentSlide(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // CHANGE: Updated openDemoDialog to capture bottom-left corner of button for genie effect
  const openDemoDialog = (url = "https://demos-landing.vercel.app", event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect()
      // Capture bottom-left corner position
      setButtonPosition({
        x: rect.left, // Left edge
        y: rect.bottom, // Bottom edge
      })
    }
    setDemoUrl(url)
    setDemoDialogOpen(true)
  }

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            setScrolled(true)
          } else {
            setScrolled(false)
          }

          let activeId = "hero"
          const viewportHeight = window.innerHeight
          const scrollPosition = window.scrollY + viewportHeight * 0.3

          const sections = [
            { id: "hero", ref: heroRef },
            { id: "beneficios", ref: benefitsRef },
            { id: "solucion", ref: solutionRef },
            { id: "detalle-soluciones", ref: null },
            { id: "como-funciona", ref: howItWorksRef },
            { id: "estadisticas", ref: statsRef },
          ]

          for (const section of sections) {
            if (!section.ref) {
              const element = document.getElementById(section.id)
              if (element) {
                const rect = element.getBoundingClientRect()
                const offsetTop = rect.top + window.scrollY
                if (scrollPosition >= offsetTop) {
                  activeId = section.id
                }
              }
            } else if (section.ref.current) {
              const element = section.ref.current
              const rect = element.getBoundingClientRect()
              const offsetTop = rect.top + window.scrollY

              if (scrollPosition >= offsetTop) {
                activeId = section.id
              }
            }
          }

          if (activeId !== activeSection) {
            setActiveSection(activeId)
          }

          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeSection])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const navbarHeight = 130
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - navbarHeight
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans">
      <Navbar />

      {/* CHANGE: Pass button position to DemoModal for animation */}
      <DemoModal
        open={demoDialogOpen}
        onOpenChange={setDemoDialogOpen}
        demoUrl={demoUrl}
        originPosition={buttonPosition}
      />

      {showMobileIframe && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setShowMobileIframe(false)}
              className="absolute top-2 right-2 z-10 bg-white text-gray-900 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all"
              aria-label="Cerrar demo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="w-full max-w-md h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
              <iframe src={demoUrl} className="w-full h-full border-0" title="Demo Preview" loading="lazy" />
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="pb-24 md:pb-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden pt-[80px] md:pt-[100px]"
        ref={heroRef}
        id="hero"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#004E89]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#004E89]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-[#0066B3]/5 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 md:space-16">
              <div className="text-center md:text-left">
                <RotatingTextComponent />
                <div className="h-2 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-expand-contract mt-6 md:mt-10 mx-auto md:mx-0"></div>
              </div>

              <div className="md:hidden mt-16 flex justify-center px-4">
                <button
                  onClick={() => setShowMobileIframe(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 px-10 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3 text-lg w-full max-w-sm"
                >
                  <Globe className="h-6 w-6" />
                  <span>Ver Demo</span>
                </button>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed text-pretty mt-10 hidden"></p>

              <div className="hidden md:flex flex-row gap-4 items-center justify-center mx-auto">
                <div className="w-full">
                  <Button
                    className="bg-[#6366F1] hover:bg-[#5253cc] text-white px-8 py-6 text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                    onClick={() => scrollToSection("beneficios")}
                    type="button"
                  >
                    <span>Quiero mi web</span>
                  </Button>
                </div>

                <div className="w-full">
                  <Button
                    className="bg-transparent text-[#6366F1] hover:bg-[#6366F1]/10 px-8 py-6 text-base rounded-xl transition-all duration-300 w-full flex items-center justify-center"
                    onClick={() => openDemoDialog("https://autogestiva-estudio-juridico.vercel.app/")}
                  >
                    Demos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* CHANGE: Enhanced buttons with better UX and animations */}
            <div className="relative hidden md:block">
              <div className="relative z-0 rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] aspect-[3/2] p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full">
                  {/* Button 1: Landing - Enhanced UX design */}
                  <button
                    onClick={(e) => openDemoDialog("https://autogestiva-estudio-juridico.vercel.app/", e)}
                    className="relative group bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg p-4 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center overflow-hidden"
                  >
                    {/* Background animation layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>

                    {/* Icon with animation */}
                    <Globe className="h-10 w-10 mb-3 relative z-10" />
                    <span className="text-base font-bold relative z-10 tracking-wide">Landing</span>

                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                  </button>

                  {/* Button 2: E-commerce - Enhanced UX design */}
                  <button
                    onClick={(e) => openDemoDialog("https://www.luludeco.com.ar/", e)}
                    className="relative group bg-gradient-to-br from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg p-4 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>

                    <ShoppingCart className="h-10 w-10 mb-3 relative z-10" />
                    <span className="text-base font-bold relative z-10 tracking-wide">E-commerce</span>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                  </button>

                  {/* Button 3: Catálogo digital - Enhanced UX design */}
                  <button
                    onClick={(e) => openDemoDialog("https://mymrelojes.vercel.app/", e)}
                    className="relative group bg-gradient-to-br from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white rounded-lg p-4 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>

                    <LayoutDashboard className="h-10 w-10 mb-3 relative z-10" />
                    <span className="text-base font-bold relative z-10 tracking-wide">Catálogo digital</span>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                  </button>

                  {/* Button 4: Carta Digital - Enhanced UX design */}
                  <button
                    onClick={(e) => openDemoDialog("https://v0-capke.vercel.app/", e)}
                    className="relative group bg-gradient-to-br from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-lg p-4 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>

                    <BookOpen className="h-10 w-10 mb-3 relative z-10" />
                    <span className="text-base font-bold relative z-10 tracking-wide">Carta Digital</span>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="estadisticas" ref={statsRef} className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center h-full">
            <FadeInWhenVisibleComponent className="h-full">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white">
                    <Check className="h-6 w-6" />
                  </div>
                </div>
                <StatCounter value="35" suffix="%" />
                <p className="text-gray-700 mt-3 font-medium">Aumento en ventas</p>
              </div>
            </FadeInWhenVisibleComponent>

            <FadeInWhenVisibleComponent delay={0.1} className="h-full">
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full text-white">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <StatCounter value="50" suffix="%" />
                <p className="text-gray-700 mt-3 font-medium">Menos en tiempo de gestión</p>
              </div>
            </FadeInWhenVisibleComponent>

            <FadeInWhenVisibleComponent delay={0.3} className="h-full">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full text-white">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <StatCounter value="75" suffix="%" />
                <p className="text-gray-700 mt-3 font-medium">Mayor alcance de audiencia</p>
              </div>
            </FadeInWhenVisibleComponent>
          </div>
        </div>
      </section>

      {/* Benefits Section - Combined with Solutions Details */}
      <section
        id="beneficios"
        ref={benefitsRef}
        className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-20">
            <FadeInWhenVisibleComponent>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2A2D34] mb-4">Nuestras Soluciones Digitales</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full my-6"></div>
            </FadeInWhenVisibleComponent>
            <FadeInWhenVisibleComponent delay={0.1}></FadeInWhenVisibleComponent>
          </div>

          {/* Mobile Carousel */}
          {isMobile ? (
            <div className="flex flex-col items-center">
              <Carousel setApi={setApi} className="w-full max-w-sm mx-auto">
                <CarouselContent>
                  {benefits.map((benefit, index) => (
                    <CarouselItem key={index} className="basis-full">
                      <FadeInWhenVisibleComponent direction="up" delay={0.1 * index}>
                        <div
                          className={`group bg-white p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 h-full ${benefit.color}`}
                        >
                          <div
                            className={`mb-6 p-4 rounded-full flex items-center justify-center ${benefit.color} ${benefit.hoverColor} transition-all duration-300 w-16 h-16 mx-auto`}
                          >
                            <div className={benefit.iconColor}>{benefit.icon}</div>
                          </div>
                          <h3 className="text-xl font-bold text-[#2A2D34] mb-3 text-center">{benefit.title}</h3>
                          <p className="text-gray-600 text-center mb-6 text-sm">{benefit.description}</p>

                          {/* Features list */}
                          <div className="border-t border-gray-200 pt-6">
                            <ul className="space-y-2 text-sm text-gray-700">
                              {index === 0 &&
                                landingPageFeatures.slice(0, 4).map((feature, i) => (
                                  <li key={i} className="flex items-center">
                                    <Check className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              {index === 1 &&
                                ecommerceFeatures.slice(0, 4).map((feature, i) => (
                                  <li key={i} className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              {index === 2 &&
                                digitalMenuFeatures.slice(0, 4).map((feature, i) => (
                                  <li key={i} className="flex items-center">
                                    <Check className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              {index === 3 &&
                                catalogWebFeatures.slice(0, 4).map((feature, i) => (
                                  <li key={i} className="flex items-center">
                                    <Check className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </FadeInWhenVisibleComponent>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="flex justify-center gap-2 mt-8">
                {benefits.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index + 1 ? "bg-blue-500 w-6" : "bg-gray-300 w-2"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {benefits.map((benefit, index) => (
                <FadeInWhenVisibleComponent key={index} delay={0.1 * index} direction="up">
                  <div
                    className={`group bg-white p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 h-full ${benefit.color} hover:translate-y-[-8px]`}
                  >
                    <div
                      className={`mb-4 p-3 rounded-full flex items-center justify-center ${benefit.color} ${benefit.hoverColor} transition-all duration-300 w-14 h-14 mx-auto`}
                    >
                      <div className={benefit.iconColor}>{benefit.icon}</div>
                    </div>
                    <h3 className="text-lg font-bold text-[#2A2D34] mb-2 text-center">{benefit.title}</h3>

                    {/* Features list */}
                  </div>
                </FadeInWhenVisibleComponent>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Removed separate "¿Qué incluye cada solución?" section */}

      {/* Process Section */}
      <section
        id="como-funciona"
        ref={howItWorksRef}
        className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative">
          <FadeInWhenVisibleComponent>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2A2D34] mb-6">
              Nuestro proceso de trabajo en 3 pasos
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-20"></div>
          </FadeInWhenVisibleComponent>

          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 hidden md:block"></div>

            <div className="space-y-20 md:space-y-24">
              {procesSteps.map((step, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className={`order-1 ${index % 2 !== 0 ? "md:order-1" : "md:order-2"}`}>
                    <FadeInWhenVisibleComponent direction={index % 2 === 0 ? "right" : "left"}>
                      <div className={index % 2 === 0 ? "md:text-right" : ""}>
                        <div
                          className={`inline-flex items-center justify-center ${step.color} text-white text-xl font-bold rounded-full w-12 h-12 mb-6`}
                        >
                          {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-[#2A2D34] mb-3">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </FadeInWhenVisibleComponent>
                  </div>

                  <div className={`order-2 ${index % 2 !== 0 ? "md:order-2" : "md:order-1"}`}>
                    <FadeInWhenVisibleComponent delay={0.2} direction={index % 2 === 0 ? "left" : "right"}>
                      <div
                        className="rounded-2xl overflow-hidden max-w-4xl mx-auto relative"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <img
                          src={(isMobile ? step.mobileImage : step.image) || "/placeholder.svg"}
                          alt={step.title}
                          className="w-full h-auto max-h-80 md:max-h-96 lg:max-h-[30rem] object-contain"
                          loading="lazy"
                          decoding="async"
                          style={{ backgroundColor: "transparent" }}
                        />
                      </div>
                    </FadeInWhenVisibleComponent>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section id="testimonios" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeInWhenVisibleComponent>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2A2D34] mb-4">Lo que dicen nuestros clientes</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full my-6"></div>
            </FadeInWhenVisibleComponent>
          </div>

          {isMobile ? (
            <div className="flex flex-col items-center">
              <Carousel setApi={setApi} className="w-full max-w-sm mx-auto">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="basis-full">
                      <FadeInWhenVisibleComponent direction="up" delay={0.1 * index}>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                          <div className="flex mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                          <div className="border-t border-gray-300 pt-4">
                            <p className="font-bold text-[#2A2D34]">{testimonial.name}</p>
                            <p className="text-sm text-gray-600">{testimonial.business}</p>
                          </div>
                        </div>
                      </FadeInWhenVisibleComponent>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index + 1 ? "bg-blue-500 w-6" : "bg-gray-300 w-2"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <FadeInWhenVisibleComponent key={index} delay={0.1 * index} direction="up">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                    <div className="border-t border-gray-300 pt-4">
                      <p className="font-bold text-[#2A2D34]">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.business}</p>
                    </div>
                  </div>
                </FadeInWhenVisibleComponent>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section - NEW */}
      <section id="faq" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeInWhenVisibleComponent>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2A2D34] mb-4">Preguntas Frecuentes</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full my-6"></div>
            </FadeInWhenVisibleComponent>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FadeInWhenVisibleComponent key={index} delay={0.05 * index}>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <button
                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <span className="font-semibold text-[#2A2D34] pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">{faq.answer}</div>
                    </div>
                  )}
                </div>
              </FadeInWhenVisibleComponent>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]">
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 items-center text-center md:text-left">
            <FadeInWhenVisibleComponent direction="left">
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  ¿Listo para transformar tu presencia digital?
                </h2>
                <div className="h-1 w-20 bg-white rounded-full mb-8"></div>
                <p className="text-lg text-white/90 mb-8 max-w-2xl">
                  Asesoría gratuita para entender qué solución necesita tu negocio. Sin complicaciones. Entrega rápida.
                  Tenés soporte.
                </p>
                <div>
                  <Button
                    className="bg-white text-[#1E3A8A] hover:bg-gray-100 px-8 py-6 text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => scrollToSection("contacto")}
                    type="button"
                  >
                    <span>¡Me interesa!</span>
                  </Button>
                </div>
              </div>
            </FadeInWhenVisibleComponent>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <FadeInWhenVisibleComponent>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2A2D34] mb-4">Contáctanos</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full my-6"></div>
            </FadeInWhenVisibleComponent>
            <FadeInWhenVisibleComponent delay={0.1}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Envíanos tu consulta y nos pondremos en contacto contigo a la brevedad.
              </p>
            </FadeInWhenVisibleComponent>
          </div>

          <FadeInWhenVisibleComponent delay={0.2}>
            <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="consulta" className="block text-sm font-medium text-gray-700 mb-2">
                    Tu Consulta
                  </label>
                  <textarea
                    id="consulta"
                    name="consulta"
                    rows={5}
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                {/* CHANGE: Making submit button more visible with inline styles and better spacing */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Enviar Mensaje por WhatsApp
                </button>
              </form>
            </div>
          </FadeInWhenVisibleComponent>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1d24] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <img
                  src="/images/design-mode/Logo%20Autogestiva%20%281%29%20%281%29.png"
                  alt="AUTOGESTIVA Logo"
                  className="h-16 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="text-gray-400 text-sm">
                Soluciones digitales autogestionables que transforman la presencia online de tu negocio.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Soluciones</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#beneficios" className="text-gray-400 hover:text-white transition-colors">
                    Landing Pages
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="text-gray-400 hover:text-white transition-colors">
                    E-commerce
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="text-gray-400 hover:text-white transition-colors">
                    Cartas Digitales
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="text-gray-400 hover:text-white transition-colors">
                    Catálogos Digitales
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-1 mt-0.5 mr-2">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-400">Córdoba, Argentina</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 bg-red-500 rounded-md p-1 mt-0.5 mr-2 transition-transform hover:scale-110 duration-200">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <a
                    href="mailto:autogestiva.info@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    autogestiva.info@gmail.com
                  </a>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-1 mt-0.5 mr-2">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <a href="tel:+5493512681910" className="text-gray-400 hover:text-white transition-colors">
                    +54 9 351 268-1910
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} AUTOGESTIVA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* CHANGE: Removed fixed Ver Demo button - now it's in hero section */}
    </div>
  )
}
