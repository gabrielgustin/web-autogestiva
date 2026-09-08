"use client"

import { useState, useCallback, useRef } from "react"

interface UseProgressOptions {
  onComplete?: () => void
  onError?: (error: Error) => void
  steps?: Array<{ id: string; title: string; description?: string; duration?: number }>
}

export function useProgress(options: UseProgressOptions = {}) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setErrorState] = useState<Error | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const reset = useCallback(() => {
    setProgress(0)
    setCurrentStep(0)
    setStatus("idle")
    setErrorState(null)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const start = useCallback(
    async (duration = 3000) => {
      reset()
      setStatus("loading")

      if (options.steps && options.steps.length > 0) {
        // Progress with steps
        const totalDuration = 0
        let currentProgress = 0

        for (let i = 0; i < options.steps.length; i++) {
          const step = options.steps[i]
          const stepDuration = step.duration || duration / options.steps.length

          setCurrentStep(i)

          await new Promise<void>((resolve, reject) => {
            const stepProgress = (100 / options.steps!.length) * (i + 1)
            const startProgress = currentProgress
            const progressDiff = stepProgress - startProgress

            let elapsed = 0
            const stepInterval = setInterval(() => {
              elapsed += 50
              const stepProgressValue = startProgress + (progressDiff * elapsed) / stepDuration

              setProgress(Math.min(stepProgressValue, stepProgress))

              if (elapsed >= stepDuration) {
                clearInterval(stepInterval)
                currentProgress = stepProgress
                resolve()
              }
            }, 50)

            intervalRef.current = stepInterval
          })
        }

        setStatus("success")
        options.onComplete?.()
      } else {
        // Simple linear progress
        let elapsed = 0
        intervalRef.current = setInterval(() => {
          elapsed += 50
          const progressValue = (elapsed / duration) * 100

          setProgress(Math.min(progressValue, 100))

          if (elapsed >= duration) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
            setStatus("success")
            options.onComplete?.()
          }
        }, 50)
      }
    },
    [options, reset],
  )

  const setError = useCallback(
    (err: Error) => {
      setStatus("error")
      setErrorState(err)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      options.onError?.(err)
    },
    [options],
  )

  const cancel = useCallback(() => {
    reset()
  }, [reset])

  return {
    progress,
    currentStep,
    status,
    error,
    start,
    reset,
    cancel,
    setError,
  }
}
