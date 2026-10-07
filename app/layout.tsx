import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Autogestiva | Agencia de desarrollo web y sistemas a medida",
  description:
    "Diseñamos y desarrollamos páginas web, tiendas online y sistemas de gestión (ERP) a medida. Soluciones digitales rápidas, seguras y pensadas para escalar tu negocio.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
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
    <html
      lang="es"
      className={`scroll-smooth bg-paper ${geist.variable} ${geistMono.variable} ${bricolage.variable}`}
    >
      <body className={geist.className}>{children}</body>
    </html>
  )
}
