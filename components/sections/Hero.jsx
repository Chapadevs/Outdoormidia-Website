'use client'

import { useState } from 'react'

const VIDEO_SRC = '/media/hero-video-opt.mp4'

function Chevron({ dir = 'right' }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={dir === 'left' ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

export default function Hero() {
  const [view, setView] = useState(0)
  const toggle = () => setView((v) => (v === 0 ? 1 : 0))

  return (
    <section
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden"
      style={{ '--hero-h': '100svh' }}
    >
      {/* ─── Versão 1: imagem estática + vídeo dentro do painel ─── */}
      {view === 0 && (
        <div
          className="absolute left-1/2 top-0 aspect-[2400/1351] -translate-x-1/2"
          style={{ width: 'max(100vw, calc(var(--hero-h) * 1.7768))' }}
        >
          <img
            src="/media/hero-billboard.webp"
            alt="Outdoor da Outdoormídia com a mensagem Toda hora, em todo lugar"
            className="pointer-events-none block h-full w-full select-none"
          />
          <div className="absolute left-[10.9%] right-[10.7%] top-[26.6%] bottom-[29.1%] overflow-hidden rounded-[2px]">
            <video
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      {/* ─── Versão 2: vídeo de fundo + outdoor estático (recorte) por cima ─── */}
      {view === 1 && (
        <>
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-ink/20" />
          <img
            src="/media/outdoor-cutout.webp"
            alt="Outdoor da Outdoormídia com a mensagem Toda hora, em todo lugar"
            className="pointer-events-none absolute inset-x-0 bottom-0 top-[19%] mx-auto h-[81%] w-full select-none object-contain object-bottom max-mob:top-[26%] max-mob:h-[74%]"
          />
        </>
      )}

      {/* Escurecimento sutil no topo para legibilidade do título */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[42%] bg-gradient-to-b from-ink/55 to-transparent" />

      {/* Título — no céu, acima do outdoor (comum às duas versões) */}
      <div className="wrap absolute inset-x-0 top-0 z-10 pt-[48px] max-mob:pt-[36px]">
        <h1
          className="display text-center text-[clamp(30px,5vw,78px)]"
          style={{ textShadow: '0 2px 18px rgba(22,17,13,0.45)' }}
        >
          Toda <span className="text-orange">Hora</span> em Todo{' '}
          <span className="text-orange">Lugar.</span>
        </h1>
      </div>

      {/* Controle de troca de visualização */}
      <div className="absolute inset-x-0 bottom-7 z-20 flex items-center justify-center gap-4 max-mob:bottom-5">
        <button
          type="button"
          onClick={toggle}
          aria-label="Visualização anterior"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-ink/25 text-white backdrop-blur-sm transition hover:bg-white hover:text-ink"
        >
          <Chevron dir="left" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Visualizações do outdoor">
          {[0, 1].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setView(i)}
              aria-label={`Visualização ${i + 1}`}
              aria-selected={view === i}
              className={`h-2.5 w-2.5 rounded-full transition ${
                view === i ? 'bg-orange' : 'bg-white/45 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label="Próxima visualização"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-ink/25 text-white backdrop-blur-sm transition hover:bg-white hover:text-ink"
        >
          <Chevron dir="right" />
        </button>
      </div>
    </section>
  )
}
