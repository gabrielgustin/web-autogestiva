"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { LoadingSpinner } from "./loading-spinner"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname, children])

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Cargando...</p>
        </div>
      </div>
    )
  }

  return <div className="animate-in fade-in-0 duration-300">{displayChildren}</div>
}
