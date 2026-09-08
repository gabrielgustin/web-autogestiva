"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    showValue?: boolean
    size?: "sm" | "md" | "lg"
    variant?: "default" | "success" | "warning" | "error"
  }
>(({ className, value, showValue = false, size = "md", variant = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
  }

  const variantClasses = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  }

  return (
    <div className="w-full">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative w-full overflow-hidden rounded-full bg-secondary", sizeClasses[size], className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn("h-full w-full flex-1 transition-all duration-300 ease-in-out", variantClasses[variant])}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
      {showValue && (
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>{Math.round(value || 0)}%</span>
          <span>100%</span>
        </div>
      )}
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
