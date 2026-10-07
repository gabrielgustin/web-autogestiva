"use client"

import type React from "react"
import { useState } from "react"
import { ArrowUpRight, Check, Mail, MapPin, Phone, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { ProjectsGallery } from "@/components/home/projects-gallery"
import { ClientsScroller } from "@/components/home/clients-scroller"
import { DashboardMockup, SeoVisual } from "@/components/home/mockups"
import { CtaButton, Eyebrow, Reveal, WhatsAppIcon, scrollToSection, useOnScreen } from "@/components/home/primitives"
import {
  contact,
  erpFeatures,
  footerSolutions,
  processSteps,
  seoChecks,
  services,
  solutions,
  techStack,
} from "@/lib/site-data"

const container = "mx-auto max-w-[1320px] px-5 md:px-8"

export default function HomePage() {
  const { ref: techRef, onScreen: techOnScreen } = useOnScreen<HTMLDivElement>()
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [consulta, setConsulta] = useState("")

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hola, mi nombre es ${nombre} ${apellido}. Mi consulta es: ${consulta}`
    const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const goToContact = () => scrollToSection("contacto")

  const inputClass =
    "block w-full rounded-none border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-brand"

  return (
    <div className="min-h-screen overflow-x-clip bg-paper font-sans text-ink">
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section id="hero" className="relative overflow-hidden">
          <div className="bg-blueprint fade-edges-y pointer-events-none absolute inset-0" />
          <div
            className="pointer-events-none absolute -right-32 top-40 h-[560px] w-[560px]"
            style={{ background: "radial-gradient(closest-side, rgba(0,87,184,0.16), transparent)" }}
          />

          <div className={`${container} relative pb-16 pt-10 md:pb-20 md:pt-16`}>
            <p className="animate-rise-in eyebrow inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-brand/25 bg-white/70 px-4 py-2.5 text-brand backdrop-blur max-sm:text-[10px] max-sm:tracking-[0.06em]">
              <Sparkles className="h-3.5 w-3.5" />
              Agencia de desarrollo web & software
            </p>

            <h1 className="font-display h-mega mt-7 text-ink">
              <span className="line-mask">
                <span className="text-balance">Soluciones digitales que</span>
              </span>
              <span className="line-mask">
                <span style={{ animationDelay: "0.12s" }}>
                  <span className="relative inline-block text-brand">
                    escalan
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 300 20"
                      preserveAspectRatio="none"
                      className="absolute -bottom-[0.04em] left-0 h-[0.14em] w-full overflow-visible"
                    >
                      <path
                        d="M3 14 C 60 3, 120 3, 170 10 S 260 16, 297 6"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="6"
                        strokeLinecap="round"
                        className="draw-stroke"
                      />
                    </svg>
                  </span>{" "}
                  a tu negocio
                </span>
              </span>
            </h1>

            <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:items-end">
              <div className="animate-rise-in lg:col-span-7" style={{ animationDelay: "0.35s" }}>
                <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-ink md:text-xl">
                  No trabajamos con plantillas genéricas. Diseñamos y desarrollamos páginas web, tiendas online y
                  sistemas de gestión a medida, pensados para tus procesos, tus usuarios y tus objetivos.
                </p>
                <div className="mt-9">
                  <CtaButton onClick={goToContact}>Cotizá tu proyecto</CtaButton>
                </div>
              </div>

              <ul
                className="animate-rise-in border-t border-line lg:col-span-4 lg:col-start-9"
                style={{ animationDelay: "0.5s" }}
              >
                {["Entrega rápida", "100% autogestionable", "Soporte incluido"].map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-line py-3.5 font-medium text-ink">
                    <Check className="h-4 w-4 shrink-0 text-green-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Portfolio ────────────────────────────────────────── */}
        <ProjectsGallery />

        {/* ── Tech marquee ─────────────────────────────────────── */}
        <section className="border-y border-line bg-white py-7">
          <p className="eyebrow mb-6 text-center text-muted-ink">Construido con tecnologías modernas</p>
          <div ref={techRef} className="marquee-mask relative overflow-hidden">
            <div
              className="animate-marquee flex w-max items-center"
              style={{ animationPlayState: techOnScreen ? "running" : "paused" }}
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <span key={i} className="flex items-center whitespace-nowrap">
                  <span className="font-display px-7 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    {tech}
                  </span>
                  <span className="font-mono text-lg text-orange-500">/</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────────── */}
        <section id="servicios" className="scroll-mt-20 py-24 md:py-32">
          <div className={container}>
            <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow index="02">Servicios</Eyebrow>
                <h2 className="font-display h-section mt-5 text-balance">Todo lo que tu presencia digital necesita</h2>
              </div>
              <p className="text-lg text-muted-ink lg:col-span-5">
                Un equipo, todas las piezas: diseño, desarrollo, rendimiento y posicionamiento bajo un mismo criterio
                técnico.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <Reveal key={service.title} delay={0.07 * index} className="h-full">
                    <article className="group relative flex h-full flex-col overflow-hidden border-b border-r border-line p-7 transition-colors duration-500 hover:bg-ink md:p-8">
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="font-mono text-xs text-ink/55 transition-colors duration-500 group-hover:text-white/60">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="font-display mt-10 text-2xl font-semibold leading-tight tracking-tight transition-colors duration-500 group-hover:text-white">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted-ink transition-colors duration-500 group-hover:text-white/65">
                        {service.description}
                      </p>
                      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-orange-500 transition-transform duration-500 group-hover:scale-x-100" />
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Solutions ────────────────────────────────────────── */}
        <section id="soluciones" className="scroll-mt-20 border-t border-line bg-paper-2 py-24 md:py-32">
          <div className={container}>
            <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow index="03">Soluciones</Eyebrow>
                <h2 className="font-display h-section mt-5 text-balance">
                  Soluciones a medida para cada tipo de negocio
                </h2>
              </div>
              <p className="text-lg text-muted-ink lg:col-span-5">
                Desde una landing que convierte hasta un ERP que automatiza tu operación. Elegimos el camino correcto
                para vos.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
              {solutions.map((solution, index) => {
                const Icon = solution.icon
                return (
                  <Reveal key={solution.title} delay={0.06 * (index % 2)} className="h-full">
                    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(11,19,34,0.35)]">
                      <div className="p-7 md:p-9">
                        <div className="flex items-center gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-white">
                            <Icon className="h-6 w-6" />
                          </span>
                          {solution.badge && (
                            <span className="eyebrow rounded-full bg-orange-500 px-3 py-1.5 font-semibold text-white">
                              {solution.badge}
                            </span>
                          )}
                          <span className="ml-auto font-mono text-xs text-ink/55">0{index + 1}</span>
                        </div>
                        <h3 className="font-display mt-7 text-3xl font-semibold tracking-tight md:text-[2.1rem]">
                          {solution.title}
                        </h3>
                        <p className="mt-3 max-w-lg leading-relaxed text-muted-ink">{solution.description}</p>
                        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                          {solution.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm font-medium text-ink">
                              <Check className="h-4 w-4 shrink-0 text-brand" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── SEO / Migrations ─────────────────────────────────── */}
        <section id="seo" className="scroll-mt-20 py-24 md:py-32">
          <div className={`${container} grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20`}>
            <Reveal>
              <Eyebrow index="04">SEO & Migraciones</Eyebrow>
              <h2 className="font-display h-section mt-5 text-balance">
                Migraciones <span className="whitespace-nowrap text-brand">SEO-friendly</span> y seguras
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-ink">
                Migrar un sitio no es solo copiar y pegar. Nos aseguramos de que el traspaso sea limpio, sin perder
                posicionamiento ni afectar tu tráfico. Redireccionamientos, indexación y velocidad bajo control.
              </p>
              <ul className="mt-8 max-w-xl border-t border-line">
                {seoChecks.map((item, i) => (
                  <li key={item} className="flex items-center gap-4 border-b border-line py-4 font-medium text-ink">
                    <span className="font-mono text-xs text-orange-700">0{i + 1}</span>
                    {item}
                    <Check className="ml-auto h-4 w-4 shrink-0 text-green-600" />
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <CtaButton onClick={goToContact}>Posicioná tu web</CtaButton>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="pb-20">
              <SeoVisual />
            </Reveal>
          </div>
        </section>

        {/* ── Sistemas de gestión (ERP) ────────────────────────── */}
        <section id="sistemas" className="scroll-mt-20 border-y border-line bg-white py-24 md:py-32">
          <div className={container}>
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
              <Reveal className="order-2 pb-8 lg:order-1">
                <DashboardMockup />
              </Reveal>
              <Reveal delay={0.1} className="order-1 lg:order-2">
                <Eyebrow index="05">ERP / Sistemas de gestión</Eyebrow>
                <h2 className="font-display h-section mt-5 text-balance">
                  Sistemas de gestión que impulsan tu operación
                </h2>
                <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-ink">
                  Desarrollamos plataformas internas a medida que automatizan tareas y digitalizan procesos clave.
                  Nuestros sistemas ayudaron a empresas a reducir hasta un 80% del tiempo operativo, mejorando su
                  seguridad, eficiencia y rentabilidad.
                </p>
                <div className="mt-9">
                  <CtaButton onClick={goToContact} variant="ink">
                    Contactanos
                  </CtaButton>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="mt-20">
              <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
                {erpFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.title} className="border-b border-r border-line p-6 md:p-7">
                      <Icon className="h-6 w-6 text-brand" />
                      <p className="font-display mt-5 text-xl font-semibold tracking-tight">{f.title}</p>
                      <p className="mt-1.5 text-[15px] text-muted-ink">{f.text}</p>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────── */}
        <section id="como-funciona" className="scroll-mt-20 py-24 md:py-32">
          <div className={container}>
            <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow index="06">Proceso</Eyebrow>
                <h2 className="font-display h-section mt-5 text-balance">De la idea al lanzamiento en 3 pasos</h2>
              </div>
              <p className="text-lg text-muted-ink lg:col-span-5">
                Un camino claro y transparente. Así acompañamos tu proyecto desde la primera charla hasta que estás
                online.
              </p>
            </Reveal>

            <ol className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-0">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <li key={step.title}>
                    <Reveal delay={0.12 * index} className="h-full">
                      {/* Línea de tiempo */}
                      <div className="flex items-center">
                        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-500">
                          <span className="absolute h-full w-full animate-ping rounded-full bg-orange-500/40" />
                        </span>
                        <span
                          className={`h-px flex-1 ${
                            index === processSteps.length - 1
                              ? "bg-gradient-to-r from-ink/25 to-transparent"
                              : "bg-ink/25"
                          }`}
                        />
                      </div>
                      <div className="pt-8 lg:pr-12">
                        <div className="flex items-end justify-between">
                          <span
                            className="font-display text-[5.5rem] font-bold leading-[0.8] tracking-tighter text-transparent md:text-[7rem]"
                            style={{ WebkitTextStroke: "1.5px #0057b8" }}
                          >
                            0{index + 1}
                          </span>
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                            <Icon className="h-6 w-6" />
                          </span>
                        </div>
                        <h3 className="font-display mt-8 text-2xl font-semibold tracking-tight md:text-3xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 leading-relaxed text-muted-ink">{step.description}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {step.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-line bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* ── Clients ──────────────────────────────────────────── */}
        <section id="clientes" className="scroll-mt-20 border-t border-line bg-paper-2 py-24 md:py-28">
          <div className={container}>
            <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow index="07">Clientes</Eyebrow>
                <h2 className="font-display h-section mt-5 text-balance">Marcas que ya confían en nosotros</h2>
              </div>
              <p className="text-lg text-muted-ink lg:col-span-5">
                Negocios de rubros muy distintos eligieron nuestras soluciones digitales para crecer.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-14">
            <ClientsScroller />
          </Reveal>
        </section>

        {/* ── CTA band ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-brand py-24 text-white md:py-32">
          <div className="bg-blueprint-inv pointer-events-none absolute inset-0" />
          <div
            className="pointer-events-none absolute -bottom-40 -right-20 h-[620px] w-[620px]"
            style={{ background: "radial-gradient(closest-side, #00376f, transparent)" }}
          />
          <div className={`${container} relative`}>
            <Reveal>
              <h2 className="font-display h-mega max-w-5xl text-balance">
                ¿Listo para transformar tu presencia digital?
              </h2>
              <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <p className="max-w-xl text-lg text-white/85 md:text-xl">
                  Asesoría gratuita para entender qué solución necesita tu negocio. Sin complicaciones, entrega rápida
                  y con soporte incluido.
                </p>
                <CtaButton onClick={goToContact} variant="light" className="shrink-0 self-start md:self-auto">
                  ¡Me interesa!
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contacto" className="scroll-mt-20 py-24 md:py-32">
          <div className={`${container} grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20`}>
            <Reveal>
              <Eyebrow index="08">Contacto</Eyebrow>
              <h2 className="font-display h-section mt-5 text-balance">Hablemos de tu proyecto</h2>
              <p className="mt-6 max-w-md text-lg text-muted-ink">
                Contanos qué necesitás y te asesoramos sin cargo. Respondemos por WhatsApp a la brevedad.
              </p>
              <ul className="mt-10 max-w-md border-t border-line">
                <li className="flex items-center gap-4 border-b border-line py-4">
                  <MapPin className="h-5 w-5 shrink-0 text-brand" />
                  <span className="font-medium">{contact.location}</span>
                </li>
                <li className="border-b border-line">
                  <a
                    href={`mailto:${contact.email}`}
                    className="group flex items-center gap-4 py-4 font-medium transition-colors hover:text-brand"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-brand" />
                    {contact.email}
                    <ArrowUpRight className="ml-auto h-4 w-4 text-ink/30 transition-all group-hover:text-brand" />
                  </a>
                </li>
                <li className="border-b border-line">
                  <a
                    href={contact.phoneHref}
                    className="group flex items-center gap-4 py-4 font-medium transition-colors hover:text-brand"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-brand" />
                    {contact.phoneLabel}
                    <ArrowUpRight className="ml-auto h-4 w-4 text-ink/30 transition-all group-hover:text-brand" />
                  </a>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-line bg-white p-7 shadow-[0_40px_80px_-45px_rgba(11,19,34,0.4)] md:p-10">
                <form onSubmit={handleWhatsAppSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div>
                      <label htmlFor="nombre" className="eyebrow block text-muted-ink">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        autoComplete="given-name"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="apellido" className="eyebrow block text-muted-ink">
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="apellido"
                        autoComplete="family-name"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="consulta" className="eyebrow block text-muted-ink">
                      Tu consulta
                    </label>
                    <textarea
                      id="consulta"
                      rows={4}
                      value={consulta}
                      onChange={(e) => setConsulta(e.target.value)}
                      required
                      placeholder="Contanos qué tipo de proyecto tenés en mente..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-green-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-green-700 active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Enviar por WhatsApp
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="relative overflow-hidden bg-ink text-white">
        <div className={`${container} relative pb-10 pt-20`}>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <img
                src="/images/logo-autogestiva.png"
                alt="Logo Autogestiva"
                width={380}
                height={151}
                className="-ml-1 h-[72px] w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
                loading="lazy"
                decoding="async"
              />
              <p className="mt-5 max-w-sm leading-relaxed text-white/70">
                Agencia de desarrollo web y sistemas a medida. Transformamos la presencia digital de tu negocio con
                tecnología moderna.
              </p>
            </div>

            <div className="md:col-span-4">
              <h3 className="eyebrow text-white/65">Soluciones</h3>
              <ul className="mt-5 space-y-3">
                {footerSolutions.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-white/75 transition-colors hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h3 className="eyebrow text-white/65">Contacto</h3>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-soft" />
                  <span className="text-white/75">{contact.location}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-brand-soft" />
                  <a href={`mailto:${contact.email}`} className="break-all text-white/75 hover:text-white">
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-brand-soft" />
                  <a href={contact.phoneHref} className="text-white/75 hover:text-white">
                    {contact.phoneLabel}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pr-16 pt-7 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between md:pr-20">
            <p>© {new Date().getFullYear()} Autogestiva. Todos los derechos reservados.</p>
            <a
              href={contact.adminUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Acceso Admin
            </a>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${contact.whatsappNumber}?text=Hola!`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition-transform duration-300 hover:scale-110 hover:bg-green-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-500/40 md:bottom-6 md:right-6"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}
