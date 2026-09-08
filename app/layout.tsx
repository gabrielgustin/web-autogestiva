import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Autogestiva | Agencia de desarrollo web y sistemas a medida",
  description:
    "Diseñamos y desarrollamos páginas web, tiendas online y sistemas de gestión (ERP) a medida. Soluciones digitales rápidas, seguras y pensadas para escalar tu negocio.",
  generator: "v0.dev",
  keywords: [
    "desarrollo web",
    "páginas web",
    "tiendas online",
    "e-commerce",
    "ERP",
    "sistemas de gestión",
    "SEO",
    "Autogestiva",
    "Córdoba",
    "Argentina",
  ],
  openGraph: {
    title: "Autogestiva | Agencia de desarrollo web y sistemas a medida",
    description:
      "Páginas web, tiendas online y sistemas de gestión a medida que escalan con tu negocio.",
    type: "website",
    locale: "es_AR",
  },
}

export const viewport: Viewport = {
  themeColor: "#0057b8",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`scroll-smooth bg-background ${inter.variable} ${poppins.variable}`}>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
