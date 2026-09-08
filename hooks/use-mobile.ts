"use client"

import { useState, useEffect } from "react"

// Punto de quiebre para dispositivos móviles
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Inicializar como undefined para evitar discrepancias entre servidor y cliente
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // Función para actualizar el estado basado en el tamaño de la ventana
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Verificar inmediatamente
    checkMobile()

    // Configurar el listener para cambios de tamaño
    window.addEventListener("resize", checkMobile)

    // Limpiar el listener cuando el componente se desmonte
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Devolver false como valor predeterminado hasta que se determine el valor real
  return isMobile === undefined ? false : isMobile
}

export default useIsMobile
