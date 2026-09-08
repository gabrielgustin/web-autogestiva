"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface AnimatedTextSectionProps {
  text: string
  className?: string
}

export default function AnimatedTextSection({ text, className }: AnimatedTextSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.5"], // Animation starts when 10% of element is visible, completes when center is in view
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]) // Fade in from 0 to 1 opacity
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]) // Scale up from 0.9 to 1

  return (
    <div ref={ref} className="text-center mb-20">
      <motion.h2
        className={`text-3xl md:text-4xl font-bold text-[#2A2D34] mb-4 ${className}`}
        style={{ opacity, scale, willChange: "opacity, transform" }} // Add willChange
      >
        {text}
      </motion.h2>
      <motion.div
        className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full my-6"
        style={{ opacity, willChange: "opacity" }} // Add willChange
      />
    </div>
  )
}
