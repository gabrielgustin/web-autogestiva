"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { IframeWrapper } from "./iframe-wrapper"

interface VistaClienteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  storeUrl?: string
}

export function VistaClienteDialog({
  open,
  onOpenChange,
  storeUrl = "https://v0-carta-digital.vercel.app",
}: VistaClienteDialogProps) {
  const [error, setError] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Asegurarse de que el componente solo se renderice en el cliente
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Manejar el error de carga del iframe
  const handleIframeError = () => {
    setError(true)
  }

  // Abrir la tienda en una nueva pestaña
  const openInNewTab = () => {
    if (typeof window !== "undefined") {
      window.open(storeUrl, "_blank")
    }
  }

  // Reiniciar el estado cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      setError(false)
    }
  }, [open])

  if (!isMounted) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[375px] max-h-[90vh] p-0 border-0 overflow-hidden shadow-2xl"
        style={{ willChange: "transform, opacity" }}
      >
        <DialogHeader className="px-4 py-2 border-b bg-gradient-to-r from-[#004E89] to-[#0066B3] text-white">
          <DialogTitle className="flex items-center">
            <img
              src="/images/design-mode/Disen%CC%83o%20sin%20ti%CC%81tulo.png"
              alt="AUTOGESTIVA Logo"
              className="h-6 w-auto"
            />
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full overflow-hidden" style={{ height: "calc(90vh - 50px)" }}>
          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar la vista previa</h3>
              <p className="text-gray-600 text-center max-w-md mb-4">
                No se pudo cargar la vista previa de la tienda. Por favor, intenta abrir la tienda en una nueva pestaña.
              </p>
              <Button
                onClick={openInNewTab}
                className="bg-gradient-to-r from-[#004E89] to-[#0066B3] hover:from-[#003566] hover:to-[#004E89] text-white"
              >
                Abrir en nueva pestaña
              </Button>
            </div>
          ) : (
            <IframeWrapper
              src={storeUrl}
              title="Vista previa de la tienda"
              style={{ height: "100%" }}
              onError={handleIframeError}
              loading="lazy"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
