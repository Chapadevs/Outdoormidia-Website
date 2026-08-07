'use client'

import { useEffect, useState } from 'react'

const VIDEO_SRC = '/media/video-hero.mp4'

export default function Hero() {
  const [loadVideo, setLoadVideo] = useState(false)

  // O vídeo é decorativo e pesa 18 MB. Só recebe o `src` depois do load da
  // página, o que o tira do carregamento inicial — até lá o fundo cobre a área.
  useEffect(() => {
    // setTimeout em vez de requestAnimationFrame: rAF não dispara em aba de
    // segundo plano, o que deixaria o hero sem vídeo até a aba ganhar foco.
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => setLoadVideo(true), 0)
      return () => clearTimeout(timer)
    }
    const onLoad = () => setLoadVideo(true)
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={loadVideo ? VIDEO_SRC : undefined}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Escurecimento sutil no topo para legibilidade do título */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[42%] bg-gradient-to-b from-ink/55 to-transparent" />

      <div className="wrap absolute inset-x-0 top-0 z-10 pt-[48px] max-mob:pt-[36px]">
        <h1
          className="display text-center text-[clamp(30px,5vw,78px)]"
          style={{ textShadow: '0 2px 18px rgba(22,17,13,0.45)' }}
        >
          Toda <span className="text-orange">Hora</span> em Todo{' '}
          <span className="text-orange">Lugar.</span>
        </h1>
      </div>
    </section>
  )
}
