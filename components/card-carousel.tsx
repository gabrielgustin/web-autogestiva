"use client"
import { motion, AnimatePresence } from "framer-motion"
import { CardDescription } from "@/components/ui/card"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { useEffect } from "react"

import { useState, useRef } from "react"
import { ChevronRight, ChevronLeft, Lightbulb, Rocket, MousePointerClick, Users } from "lucide-react"
import { useIsMobile as useMobile } from "@/hooks/use-mobile"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import type { EmblaCarouselType } from "embla-carousel-react"

const prefersReducedMotion =
  typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false

const animationSettings = prefersReducedMotion
  ? {
      duration: 0.1,
      type: "tween",
    }
  : {
      duration: 0.5,
      type: "spring",
      stiffness: 300,
      damping: 30,
    }

interface CardCarouselProps {
  isVisible: boolean
  scrollProgress: number // Nuevo prop para controlar el scroll horizontal
  onEmblaApiInit: (api: EmblaCarouselType) => void // Callback para obtener la instancia de Embla API
}

const cardData = [
  {
    title: "Menú Digital Interactivo",
    description: "Digitaliza tu carta con fotos, descripciones y actualizaciones en tiempo real. Acceso vía QR.",
    icon: <Lightbulb className="h-6 w-6 text-blue-500" />,
    image: "/placeholder.svg?height=150&width=250?text=Menu",
  },
  {
    title: "Catálogos Web Modernos",
    description: "Presenta tus productos de forma atractiva con filtros y búsqueda. Ideal para tiendas.",
    icon: <Rocket className="h-6 w-6 text-green-500" />,
    image: "/placeholder.svg?height=150&width=250?text=Catalogo",
  },
  {
    title: "Landing Pages de Conversión",
    description: "Diseños optimizados para captar leads y convertir visitantes en clientes potenciales.",
    icon: <MousePointerClick className="h-6 w-6 text-purple-500" />,
    image: "/placeholder.svg?height=150&width=250?text=Landing",
  },
  {
    title: "E-commerce Completo",
    description: "Tu tienda online con gestión de productos, carrito y pagos integrados.",
    icon: <Users className="h-6 w-6 text-red-500" />,
    image: "/placeholder.svg?height=150&width=250?text=Ecommerce",
  },
  {
    title: "Sistemas de Reservas",
    description: "Permite a tus clientes reservar citas o mesas online de forma sencilla.",
    icon: <Users className="h-6 w-6 text-orange-500" />,
    image: "/placeholder.svg?height=150&width=250?text=Reservas",
  },
  {
    title: "Integración de Pagos",
    description: "Implementa pasarelas de pago seguras para transacciones fluidas.",
    icon: <Users className="h-6 w-6 text-teal-500" />,
    image: "/placeholder.svg?height=150&width=250?text=Pagos",
  },
]

export default function CardCarousel({ isVisible, scrollProgress, onEmblaApiInit }: CardCarouselProps) {
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragDistance, setDragDistance] = useState(0)
  const carouselRef = useRef(null)
  const autoplayTimerRef = useRef(null)
  const isMobile = useMobile()

  const nextSlide = () => {
    setDirection(1)
    setCurrent((prev) => (prev === cardData.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrent((prev) => (prev === 0 ? cardData.length - 1 : prev - 1))
  }

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const handleDragStart = (e) => {
    setIsDragging(true)
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0)
    setDragDistance(0)
  }

  const handleDragMove = (e) => {
    if (!isDragging) return
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const distance = clientX - dragStartX
    setDragDistance(distance)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    if (Math.abs(dragDistance) > 100) {
      if (dragDistance > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }

    setDragDistance(0)
  }

  useEffect(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
    }

    if (!isHovered) {
      autoplayTimerRef.current = setTimeout(
        () => {
          setDirection(1)
          setCurrent((prev) => (prev === cardData.length - 1 ? 0 : prev + 1))
        },
        isMobile ? 7000 : 5000,
      )
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current)
      }
    }
  }, [current, isHovered, cardData.length, isMobile])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  }

  useEffect(() => {
    if (emblaApi) {
      onEmblaApiInit(emblaApi)
    }
  }, [emblaApi, onEmblaApiInit])

  useEffect(() => {
    if (emblaApi && isVisible) {
      const scrollToIndex = Math.min(
        Math.max(0, Math.floor(scrollProgress * (emblaApi.scrollSnapList().length - 1))),
        emblaApi.scrollSnapList().length - 1,
      )
      emblaApi.scrollTo(scrollToIndex, true)
    }
  }, [emblaApi, scrollProgress, isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl mx-auto relative"
        >
          <Carousel
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
            }}
            setApi={setEmblaApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4 flex">
              {cardData.map((card, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-[75%] md:basis-[calc(100%/2)] lg:basis-[calc(100%/3)] xl:basis-[calc(100%/4)]"
                >
                  <div className="p-1">
                    <motion.div
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        x: isDragging ? dragDistance : 0,
                        transition: isDragging ? "none" : undefined,
                      }}
                    >
                      <Card className="h-full flex flex-col">
                        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                          <div className="p-3 rounded-full bg-gray-100">{card.icon}</div>
                          <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <img
                            src={card.image || "/placeholder.svg"}
                            alt={card.title}
                            className="w-full h-32 object-cover rounded-md mb-4"
                            loading="lazy"
                            decoding="async"
                            draggable="false"
                          />
                          <CardDescription className="text-sm text-gray-600">{card.description}</CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

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
            {cardData.map((_, index) => (
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
            {current + 1} / {cardData.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
