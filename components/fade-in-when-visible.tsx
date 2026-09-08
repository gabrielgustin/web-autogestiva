"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { useIsMobile as useMobile } from "@/hooks/use-mobile"

interface FadeInWhenVisibleProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: "up" | "down" | "left" | "right" | null
}

const FadeInWhenVisible = ({ children, delay = 0, className = "", direction = null }: FadeInWhenVisibleProps) => {
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
      }
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

export default FadeInWhenVisible
