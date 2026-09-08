"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { CircularProgress } from "@/components/ui/circular-progress"
import { ProgressWithSteps } from "@/components/ui/progress-with-steps"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"

interface ProgressDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  progress: number
  variant?: "linear" | "circular" | "steps"
  steps?: Array<{ id: string; title: string; description?: string }>
  currentStep?: number
  status?: "loading" | "success" | "error"
  canCancel?: boolean
  onCancel?: () => void
}

export function ProgressDialog({
  open,
  onOpenChange,
  title,
  description,
  progress,
  variant = "linear",
  steps,
  currentStep = 0,
  status = "loading",
  canCancel = false,
  onCancel,
}: ProgressDialogProps) {
  const renderProgress = () => {
    switch (variant) {
      case "circular":
        return (
          <div className="flex justify-center py-8">
            <CircularProgress
              value={progress}
              variant={status === "error" ? "error" : status === "success" ? "success" : "default"}
            />
          </div>
        )
      case "steps":
        return steps ? (
          <div className="py-4">
            <ProgressWithSteps steps={steps} currentStep={currentStep} />
          </div>
        ) : null
      default:
        return (
          <div className="py-4">
            <Progress
              value={progress}
              showValue
              variant={status === "error" ? "error" : status === "success" ? "success" : "default"}
            />
          </div>
        )
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "error":
        return <AlertCircle className="h-6 w-6 text-red-500" />
      default:
        return null
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case "success":
        return "¡Proceso completado exitosamente!"
      case "error":
        return "Ha ocurrido un error durante el proceso"
      default:
        return description || "Procesando..."
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" hideCloseButton={status === "loading" && !canCancel}>
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getStatusIcon()}
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{getStatusMessage()}</p>

          {renderProgress()}

          {status === "loading" && variant === "steps" && steps && (
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600">{steps[currentStep]?.title || "Procesando..."}</p>
              {steps[currentStep]?.description && (
                <p className="text-xs text-muted-foreground mt-1">{steps[currentStep].description}</p>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            {canCancel && status === "loading" && (
              <Button variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            {status !== "loading" && (
              <Button onClick={() => onOpenChange(false)}>{status === "success" ? "Continuar" : "Cerrar"}</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
