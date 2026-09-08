"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import AnimatedElement from "./animated-element"
import { interpolate } from "../utils/interpolate"

export default function ScrollAnimationContainer() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [elementOpacity, setElementOpacity] = useState(1)
  const [elementTranslateY, setElementTranslateY] = useState(0)

  // Define la distancia total de scroll para la animación (ej. 3 veces la altura de la ventana)
  const totalScrollDistance = typeof window !== "undefined" ? window.innerHeight * 3 : 1000

  const handleScroll = useCallback(() => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop
      const scrollY = window.scrollY

      // Calcula el progreso del scroll dentro de esta sección
      // Clamp el valor entre 0 y 1
      const currentProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / totalScrollDistance))
      setScrollProgress(currentProgress)

      // Define los rangos de animación para el elemento
      const fadeInStart = 0
      const fadeInEnd = 0.1 // El texto aparece en el primer 10% del scroll
      const fadeOutStart = 0.7 // El texto empieza a desvanecerse en el 70%
      const fadeOutEnd = 0.9 // El texto termina de desvanecerse en el 90%

      const translateYStart = 0.1 // El movimiento hacia arriba empieza en el 10%
      const translateYEnd = 0.9 // El movimiento hacia arriba termina en el 90%

      // Interpolación para la opacidad
      let newOpacity = 1
      if (currentProgress <= fadeInEnd) {
        newOpacity = interpolate(currentProgress / fadeInEnd, 0, 1) // Fade in
      } else if (currentProgress >= fadeOutStart) {
        newOpacity = interpolate((currentProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart), 1, 0) // Fade out
      }
      setElementOpacity(newOpacity)

      // Interpolación para el movimiento vertical
      const newTranslateY = interpolate(
        (currentProgress - translateYStart) / (translateYEnd - translateYStart),
        0, // Valor inicial (0px de desplazamiento)
        -100, // Valor final (-100px de desplazamiento hacia arriba)
      )
      setElementTranslateY(newTranslateY)
    }
  }, [totalScrollDistance])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      handleScroll()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Iniciar la animación cuando el componente se monta
    animationFrameId = requestAnimationFrame(animate)

    // Limpiar el frame de animación cuando el componente se desmonta
    return () => cancelAnimationFrame(animationFrameId)
  }, [handleScroll]) // Dependencia de handleScroll para re-ejecutar si cambia

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-screen bg-gray-100"
      style={{ height: `${totalScrollDistance + window.innerHeight}px` }} // Asegura suficiente espacio para el scroll
    >
      <div className="sticky top-0 h-screen flex items-center justify-center w-full">
        <AnimatedElement
          opacity={elementOpacity}
          translateY={elementTranslateY}
          text="¡Animación controlada por scroll!"
        />
      </div>
    </section>
  )
}
