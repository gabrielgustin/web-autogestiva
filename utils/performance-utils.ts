// Utility functions for performance optimization

/**
 * Debounce function to limit how often a function is called
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to limit the rate at which a function is executed
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Detect if the device is low-end
 */
export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false

  // Check device memory (available in Chrome)
  const memory = (navigator as any).deviceMemory
  if (memory && memory < 4) return true

  // Check CPU cores
  const cpuCores = navigator.hardwareConcurrency
  if (cpuCores && cpuCores < 4) return true

  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  return isMobile
}

/**
 * Optimize image loading based on device capabilities
 */
export function getImageQuality(): "low" | "medium" | "high" {
  if (isLowEndDevice()) return "low"

  // Check connection type if available
  if ("connection" in navigator) {
    const connection = (navigator as any).connection

    if (connection) {
      if (connection.saveData) return "low"
      if (connection.effectiveType === "2g" || connection.effectiveType === "3g") return "low"
      if (connection.effectiveType === "4g" && connection.downlink < 5) return "medium"
    }
  }

  return "high"
}
