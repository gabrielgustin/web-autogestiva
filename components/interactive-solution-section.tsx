"use client"

import { motion, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const carouselItems = [
  {
    title: "Menú Digital Interactivo",
    subtitle: "Moderniza tu restaurante",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu-digital-interactivo-q0123.png",
    description:
      "Permite a tus clientes explorar tu oferta con fotos, descripciones y precios actualizados al instante.",
  },
  {
    title: "Catálogo Web Autogestionable",
    subtitle: "Muestra tus productos online",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/catalogo-web-autogestionable-r4567.png",
    description: "Ideal para tiendas y comercios. Actualiza tu inventario y precios fácilmente desde cualquier lugar.",
  },
  {
    title: "Landing Pages de Conversión",
    subtitle: "Genera más leads",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/landing-pages-conversion-s8901.png",
    description:
      "Diseñadas para captar la atención y convertir visitantes en clientes potenciales con formularios optimizados.",
  },
  {
    title: "E-commerce Completo",
    subtitle: "Vende online sin límites",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ecommerce-completo-t2345.png",
    description:
      "Una tienda online robusta con gestión de productos, carrito de compras y pasarelas de pago integradas.",
  },
]

export default function InteractiveSolutionSection({ scrollProgress }) {
  const horizontalScrollStart = 0.2 // Cuando el carrusel empieza a moverse
  const horizontalScrollEnd = 0.8 // Cuando el carrusel termina de moverse

  // Animación del texto: aparece, escala y se mantiene visible, luego desaparece
  const textOpacity = useTransform(scrollProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const textScale = useTransform(scrollProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8])

  // Animación del carrusel: se mueve horizontalmente
  // El carrusel debe empezar fuera de pantalla a la derecha, moverse hacia la izquierda y terminar fuera de pantalla a la izquierda
  const carouselX = useTransform(
    scrollProgress,
    [horizontalScrollStart, horizontalScrollEnd],
    ["100%", "-100%"], // Inicia a la derecha, se mueve a la izquierda
  )

  return (
    // Este div ahora proporciona el espacio de scroll para el efecto sticky
    <div className="relative h-[300vh] flex flex-col items-center justify-center">
      {/* Este div hace que el texto sea sticky y lo centra verticalmente */}
      <motion.div
        className="sticky top-0 h-screen flex flex-col items-center justify-center w-full z-10"
        style={{ opacity: textOpacity, scale: textScale }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2A2D34] text-center mb-4">
          Soluciones digitales integrales para tu negocio
        </h2>
        <div className="h-2 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </motion.div>

      {/* Contenedor del carrusel - posicionado absolutamente relativo al div padre */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 w-full flex flex-nowrap overflow-visible z-0"
        style={{ x: carouselX }}
      >
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[300px] md:w-[400px] lg:w-[500px] mx-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-[#2A2D34] mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            <Button className="mt-auto bg-[#6366F1] hover:bg-[#5253cc] text-white px-6 py-3 rounded-xl">
              Agendar consulta <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
