"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CircularProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  showValue?: boolean
  variant?: "default" | "success" | "warning" | "error"
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ value, size = 120, strokeWidth = 8, className, showValue = true, variant = "default" }, ref) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (value / 100) * circumference

    const variantColors = {
      default: "stroke-blue-500",
      success: "stroke-green-500",
      warning: "stroke-yellow-500",
      error: "stroke-red-500",
    }

    return (
      <div ref={ref} className={cn("relative inline-flex items-center justify-center", className)}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-300 ease-in-out", variantColors[variant])}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-700">{Math.round(value)}%</span>
          </div>
        )}
      </div>
    )
  },
)
CircularProgress.displayName = "CircularProgress"

export { CircularProgress }
