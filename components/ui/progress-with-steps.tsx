"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: string
  title: string
  description?: string
}

interface ProgressWithStepsProps {
  steps: Step[]
  currentStep: number
  className?: string
  variant?: "horizontal" | "vertical"
}

const ProgressWithSteps = React.forwardRef<HTMLDivElement, ProgressWithStepsProps>(
  ({ steps, currentStep, className, variant = "horizontal" }, ref) => {
    if (variant === "vertical") {
      return (
        <div ref={ref} className={cn("space-y-4", className)}>
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep
            const isUpcoming = index > currentStep

            return (
              <div key={step.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200",
                      {
                        "border-green-500 bg-green-500 text-white": isCompleted,
                        "border-blue-500 bg-blue-500 text-white": isCurrent,
                        "border-gray-300 bg-white text-gray-400": isUpcoming,
                      },
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "mt-2 h-8 w-0.5 transition-all duration-200",
                        isCompleted ? "bg-green-500" : "bg-gray-300",
                      )}
                    />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3
                    className={cn("text-sm font-medium transition-all duration-200", {
                      "text-green-700": isCompleted,
                      "text-blue-700": isCurrent,
                      "text-gray-500": isUpcoming,
                    })}
                  >
                    {step.title}
                  </h3>
                  {step.description && (
                    <p
                      className={cn("mt-1 text-xs transition-all duration-200", {
                        "text-green-600": isCompleted,
                        "text-blue-600": isCurrent,
                        "text-gray-400": isUpcoming,
                      })}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    // Horizontal variant
    return (
      <div ref={ref} className={cn("w-full", className)}>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep
            const isUpcoming = index > currentStep

            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200",
                      {
                        "border-green-500 bg-green-500 text-white": isCompleted,
                        "border-blue-500 bg-blue-500 text-white": isCurrent,
                        "border-gray-300 bg-white text-gray-400": isUpcoming,
                      },
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <h3
                      className={cn("text-xs font-medium transition-all duration-200", {
                        "text-green-700": isCompleted,
                        "text-blue-700": isCurrent,
                        "text-gray-500": isUpcoming,
                      })}
                    >
                      {step.title}
                    </h3>
                    {step.description && (
                      <p
                        className={cn("mt-1 text-xs transition-all duration-200", {
                          "text-green-600": isCompleted,
                          "text-blue-600": isCurrent,
                          "text-gray-400": isUpcoming,
                        })}
                      >
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-all duration-200",
                      isCompleted ? "bg-green-500" : "bg-gray-300",
                    )}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    )
  },
)
ProgressWithSteps.displayName = "ProgressWithSteps"

export { ProgressWithSteps }
