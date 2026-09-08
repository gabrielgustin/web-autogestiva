"use client"

import { useState } from "react"

export default function SetupPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [details, setDetails] = useState<any>(null)

  const setupDatabase = async () => {
    setStatus("loading")
    setMessage("")
    setDetails(null)

    try {
      const response = await fetch("/api/setup-database")
      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
        setDetails(data.details)
      } else {
        setStatus("error")
        setMessage(data.error || "Error al configurar la base de datos")
        setDetails(data.details)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Error de conexión: " + (error as Error).message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">Configuración de Base de Datos</h1>
          <p className="text-sm text-gray-600 mt-1">Configura tu base de datos Neon con un solo click</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {status === "idle" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Este proceso creará todas las tablas necesarias y configurará los datos iniciales:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Tabla de usuarios con roles (admin/client)</li>
                <li>Tabla de planes de suscripción</li>
                <li>Tabla de clientes</li>
                <li>Tabla de suscripciones</li>
                <li>Tabla de pagos</li>
                <li>Usuario admin: autogestiva.info@gmail.com / admin123</li>
                <li>Usuario cliente: info@lifegym.com / 123</li>
                <li>3 planes de ejemplo (Básico, Profesional, Empresarial)</li>
              </ul>
              <button
                onClick={setupDatabase}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Configurar Base de Datos
              </button>
            </div>
          )}

          {status === "loading" && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600">Configurando base de datos...</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">¡Configuración Exitosa!</h3>
                  <p className="text-sm text-gray-600">{message}</p>
                </div>
              </div>

              {details && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-green-900">Detalles:</p>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>✓ {details.tables?.length || 5} tablas creadas</li>
                    <li>✓ Usuario admin creado</li>
                    <li>✓ Usuario cliente creado</li>
                    <li>✓ 3 planes de ejemplo creados</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <p className="text-sm font-medium text-green-900 mb-2">Credenciales:</p>
                    <div className="space-y-2 text-sm text-green-800">
                      <div>
                        <p className="font-medium">Admin:</p>
                        <p>Email: autogestiva.info@gmail.com</p>
                        <p>Password: admin123</p>
                      </div>
                      <div>
                        <p className="font-medium">Cliente:</p>
                        <p>Email: info@lifegym.com</p>
                        <p>Password: 123</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => (window.location.href = "/login")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Ir al Login
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg">Error en la Configuración</h3>
                  <p className="text-sm text-gray-600">{message}</p>
                </div>
              </div>

              {details && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm font-mono text-red-800 whitespace-pre-wrap">
                    {JSON.stringify(details, null, 2)}
                  </p>
                </div>
              )}

              <button
                onClick={setupDatabase}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors"
              >
                Intentar de Nuevo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
