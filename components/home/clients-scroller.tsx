"use client"

import { clients, type Client } from "@/lib/site-data"
import { useInView } from "@/components/home/primitives"

// Cada cliente vive en una sola fila: así nunca aparece el mismo logo arriba y abajo a la vez.
// El orden alterna colores y mantiene lejos a las marcas parecidas (los dos ITS, SEA e ITS Villada).
const ROW_A = ["Traslados Jarabus", "Tempograss", "ITS Villada", "Mara Saúl Estética", "Cambel Red Jurídica", "Gimnasio Life Gym"]
const ROW_B = ["SEA - Villada", "Visual Henderson", "ITS Boutique", "Zonabot Espacio Tecnológico", "Estudio Jurídico CONVS"]

const byName = (names: string[]) =>
  names.map((name) => clients.find((c) => c.name === name)).filter((c): c is Client => Boolean(c))
const rowA = byName(ROW_A)
const rowB = byName(ROW_B)

const TILE_STEP = 172 // ancho de tarjeta + espacio, en px (aprox.)
const SPEED = 40 // px por segundo
const MIN_HALF_WIDTH = 2400 // cada mitad del bucle debe cubrir cualquier pantalla

function Tile({ client }: { client: Client }) {
  const hasLink = client.url !== "#"
  const Tag = hasLink ? "a" : "div"
  return (
    <Tag
      {...(hasLink ? { href: client.url, target: "_blank", rel: "noopener noreferrer" } : {})}
      title={client.name}
      draggable={false}
      className="group flex h-[72px] w-36 shrink-0 items-center justify-center rounded-xl border border-ink/10 p-4 sm:h-20 sm:w-40 transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.04]"
      style={{ backgroundColor: client.tile }}
    >
      <img
        src={client.logo}
        alt={client.name}
        width={176}
        height={56}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`max-w-full object-contain transition-all duration-500 ${
          client.name === "Gimnasio Life Gym" || client.tall ? "max-h-[52px]" : "max-h-9"
        } ${client.keepColor ? "" : "opacity-75 grayscale group-hover:opacity-100 group-hover:grayscale-0"}`}
      />
    </Tag>
  )
}

function Row({ items, reverse, visible }: { items: Client[]; reverse?: boolean; visible: boolean }) {
  const repeats = Math.ceil(MIN_HALF_WIDTH / (items.length * TILE_STEP))
  const half = Array.from({ length: repeats }).flatMap(() => items)
  const duration = (half.length * TILE_STEP) / SPEED

  return (
    <div
      className="marquee-mask overflow-hidden py-2 transition-all duration-1000 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateX(${reverse ? "-" : ""}6rem)`,
        transitionDelay: reverse ? "0.15s" : "0s",
      }}
    >
      <div
        className="marquee-row flex w-max items-center gap-3 pr-3"
        style={{ animationDirection: reverse ? "reverse" : "normal", animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copy) =>
          half.map((client, i) => <Tile key={`${copy}-${i}`} client={client} />),
        )}
      </div>
    </div>
  )
}

export function ClientsScroller() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)

  return (
    <div ref={ref} className="-my-1" aria-label="Clientes de Autogestiva">
      <Row items={rowA} visible={inView} />
      <Row items={rowB} reverse visible={inView} />
    </div>
  )
}
