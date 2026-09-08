"use client"

import { useEffect, useState } from "react"

// Custom hook to determine if animations should be reduced
export function useOptimizedAnimation() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    setShouldReduceMotion(prefersReducedMotion.matches)

    const handleReduceMotionChange = (event: MediaQueryListEvent) => {
      setShouldReduceMotion(event.matches)
    }

    prefersReducedMotion.addEventListener("change", handleReduceMotionChange)

    // Check for low power mode (battery status)
    if ("getBattery" in navigator) {
      // @ts-ignore - getBattery is not in the standard navigator type
      navigator.getBattery().then((battery: any) => {
        setIsLowPowerMode(battery.level <= 0.2 && !battery.charging)

        battery.addEventListener("levelchange", () => {
          setIsLowPowerMode(battery.level <= 0.2 && !battery.charging)
        })

        battery.addEventListener("chargingchange", () => {
          setIsLowPowerMode(battery.level <= 0.2 && !battery.charging)
        })
      })
    }

    // Check for low-end devices
    const isLowEndDevice = () => {
      const memory = (navigator as any).deviceMemory
      if (memory && memory < 4) return true

      // Check for CPU cores
      const cpuCores = navigator.hardwareConcurrency
      if (cpuCores && cpuCores < 4) return true

      return false
    }

    if (isLowEndDevice()) {
      setIsLowPowerMode(true)
    }

    return () => {
      prefersReducedMotion.removeEventListener("change", handleReduceMotionChange)
    }
  }, [])

  // Return animation settings based on device capabilities
  return {
    shouldReduceMotion,
    isLowPowerMode,
    getAnimationSettings: (type: "spring" | "tween" = "tween") => {
      if (shouldReduceMotion || isLowPowerMode) {
        return {
          type: "tween",
          duration: 0.1,
          ease: "easeOut",
        }
      }

      return type === "spring"
        ? {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
          }
        : {
            type: "tween",
            duration: 0.3, // Reduced duration for faster transitions
            ease: "easeOut",
          }
    },
  }
}
