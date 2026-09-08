"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Smartphone, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

interface DemoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  demoUrl: string
  originPosition?: { x: number; y: number }
}

export function DemoModal({ open, onOpenChange, demoUrl }: DemoModalProps) {
  const [viewMode, setViewMode] = React.useState<"mobile" | "desktop">("desktop")
  const [iframeLoaded, setIframeLoaded] = React.useState(false)

  const modalSize = React.useMemo(() => {
    if (viewMode === "mobile") {
      return {
        width: "375px",
        height: "75vh",
        maxWidth: "375px",
        maxHeight: "75vh",
        borderRadius: "24px",
        border: "none",
      }
    }
    return {
      width: "95vw",
      height: "75vh",
      maxWidth: "1200px",
      maxHeight: "75vh",
      borderRadius: "0.5rem",
      border: "none",
    }
  }, [viewMode])

  React.useEffect(() => {
    if (open) {
      setViewMode("desktop")
      setIframeLoaded(false)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex flex-col p-0 overflow-hidden shadow-2xl animate-modal-entrance"
        style={{
          width: modalSize.width,
          height: modalSize.height,
          maxWidth: modalSize.maxWidth,
          maxHeight: modalSize.maxHeight,
          borderRadius: modalSize.borderRadius,
          border: modalSize.border,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          transition: "width 0.3s ease-out, height 0.3s ease-out, border-radius 0.3s ease-out",
        }}
      >
        <div className="flex flex-row items-center justify-start gap-2 px-3 py-2 bg-gradient-to-r from-[#004E89] to-[#0066B3] text-white min-h-[44px] z-50 shadow-lg backdrop-blur-sm">
          <button
            onClick={() => setViewMode("mobile")}
            className={cn(
              "px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all duration-300 font-semibold text-[11px] transform-gpu",
              viewMode === "mobile"
                ? "bg-white text-[#004E89] shadow-lg scale-105"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/30 hover:scale-105",
            )}
          >
            <Smartphone
              className={cn("h-3.5 w-3.5 transition-transform duration-300", viewMode === "mobile" && "scale-110")}
            />
            <span>Móvil</span>
          </button>
          <button
            onClick={() => setViewMode("desktop")}
            className={cn(
              "px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all duration-300 font-semibold text-[11px] transform-gpu",
              viewMode === "desktop"
                ? "bg-white text-[#004E89] shadow-lg scale-105"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/30 hover:scale-105",
            )}
          >
            <Monitor
              className={cn("h-3.5 w-3.5 transition-transform duration-300", viewMode === "desktop" && "scale-110")}
            />
            <span>Desktop</span>
          </button>
        </div>
        <div className="flex-1 w-full h-full overflow-hidden bg-gray-100 relative">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004E89]"></div>
            </div>
          )}
          <iframe
            src={demoUrl}
            className={cn(
              "w-full h-full border-0 transition-opacity duration-500",
              iframeLoaded ? "opacity-100" : "opacity-0",
            )}
            title="Demo Preview"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
