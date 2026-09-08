interface AnimatedElementProps {
  opacity: number
  translateY: number
  text: string
}

export default function AnimatedElement({ opacity, translateY, text }: AnimatedElementProps) {
  return (
    <h2
      className="text-5xl font-bold text-gray-800 text-center"
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
        transition: "none", // ¡Importante! Deshabilitar transiciones CSS
        willChange: "opacity, transform", // Sugerencia al navegador para optimización
      }}
    >
      {text}
    </h2>
  )
}
