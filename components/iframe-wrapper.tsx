"use client"

import type React from "react"

import { useState } from "react"

interface IframeWrapperProps {
  src: string
  title: string
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
}

export function IframeWrapper({ src, title, className = "", style = {}, onLoad, onError }: IframeWrapperProps) {
  const [error, setError] = useState(false)

  const handleLoad = () => {
    if (onLoad) onLoad()
  }

  const handleError = () => {
    setError(true)
    if (onError) onError()
  }

  return (
    <div className="relative w-full h-full">
      <iframe
        src={src}
        title={title}
        className={`w-full h-full border-0 ${className}`}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    </div>
  )
}
