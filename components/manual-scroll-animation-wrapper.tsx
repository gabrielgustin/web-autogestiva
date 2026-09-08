"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import CardCarousel from "./card-carousel"
import type { EmblaCarouselType } from "embla-carousel-react"
import ManualAnimatedText from "./manual-animated-text"

export default function ManualScrollAnimationWrapper() {
  const sectionRef = useRef<HTMLElement>(null)
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null)

  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800

  // Define las duraciones de scroll para cada fase de la animación
  // Estos valores son multiplicadores de la altura del viewport
  const textEnterDuration = viewportHeight * 1.5 // Texto aparece y se centra
  const textStickyDuration = viewportHeight * 1.5 // Texto se mantiene centrado (efecto freeze)
  const textExitDuration = viewportHeight * 1.5 // Texto se desvanece y sube
  const carouselScrollDuration = viewportHeight * 3 // Scroll para el carrusel horizontal

  // La altura total de la sección es la suma de todas las duraciones
  // más una altura de viewport para que el elemento sticky pueda entrar y salir de la vista.
  const sectionHeight =
    viewportHeight + textEnterDuration + textStickyDuration + textExitDuration + carouselScrollDuration

  // Usamos useScroll para obtener el progreso de scroll de la sección
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Empieza cuando la sección entra, termina cuando sale
  })

  // Puntos de inicio y fin de cada fase en el rango de scrollYProgress (0 a 1)
  const textEnterEnd = textEnterDuration / sectionHeight
  const textStickyEnd = (textEnterDuration + textStickyDuration) / sectionHeight
  const textExitEnd = (textEnterDuration + textStickyDuration + textExitDuration) / sectionHeight
  const carouselStart = textExitEnd // El carrusel empieza justo cuando el texto termina de salir
  const carouselEnd =
    (textEnterDuration + textStickyDuration + textExitDuration + carouselScrollDuration) / sectionHeight

  // Animación del texto: opacidad y traslación
  const textOpacity = useTransform(scrollYProgress, [0, textEnterEnd, textStickyEnd, textExitEnd], [0, 1, 1, 0])
  const textTranslateY = useTransform(
    scrollYProgress,
    [0, textEnterEnd, textStickyEnd, textExitEnd],
    [100, 0, 0, -100], // Empieza abajo, se centra, se mantiene, sube
  )

  // Progreso de scroll para el carrusel (0 a 1 dentro de su propia fase)
  const carouselProgress = useTransform(scrollYProgress, [carouselStart, carouselEnd], [0, 1])

  // Visibilidad del carrusel: aparece cuando el texto empieza a desvanecerse
  const [isCarouselVisible, setIsCarouselVisible] = useState(false)
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      // El carrusel se hace visible cuando el scroll entra en la fase del carrusel
      // Se añade un pequeño margen para que la transición sea suave
      setIsCarouselVisible(latest >= carouselStart - 0.05)
    })
    return () => unsubscribe()
  }, [scrollYProgress, carouselStart])

  // Callback para obtener la instancia de Embla API del carrusel
  const handleEmblaApiInit = useCallback((api: EmblaCarouselType) => {
    setEmblaApi(api)
  }, [])

  // Sincronizar el scroll del carrusel con el progreso vertical
  useEffect(() => {
    if (emblaApi && isCarouselVisible) {
      const scrollValue = carouselProgress.get() // Obtiene el valor actual del useTransform
      const maxScroll = emblaApi.scrollSnapList().length - 1
      const targetScroll = scrollValue * maxScroll
      emblaApi.scrollTo(targetScroll, true) // true para animación suave
    }
  }, [emblaApi, carouselProgress, isCarouselVisible])

  return (
    <section
      ref={sectionRef}
      className="relative bg-white flex flex-col items-center justify-center overflow-hidden"
      style={{ height: `${sectionHeight}px` }}
    >
      {/* Contenedor sticky para el texto animado */}
      <motion.div
        className="sticky top-1/2 -translate-y-1/2 w-full text-center z-10"
        style={{ opacity: textOpacity, y: textTranslateY }}
      >
        <ManualAnimatedText
          opacity={1} // La opacidad ya se controla en el estilo del div padre
          translateY={0} // La traslación ya se controla en el estilo del div padre
          text="Soluciones digitales integrales para tu negocio"
        />
      </motion.div>

      {/* Carrusel de tarjetas, aparece después del texto y se vuelve sticky */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-center z-20">
        <CardCarousel
          isVisible={isCarouselVisible}
          scrollProgress={carouselProgress.get()} // Pasamos el valor actual del progreso
          onEmblaApiInit={handleEmblaApiInit}
        />
      </div>
    </section>
  )
}
