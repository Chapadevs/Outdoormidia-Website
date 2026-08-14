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
    // Até 560px o vídeo sai do fundo e vira um bloco 16/9 no fluxo, com o título
    // acima dele — em retrato o corte do full-bleed comia dois terços do quadro.
    // Acima disso a altura segue a proporção do vídeo (16/9 → 56.25vw), limitada
    // pela viewport, para ele escalar com a tela em vez de ficar num zoom fixo.
    <section className="relative h-[min(100svh,56.25vw)] min-h-[560px] w-full overflow-hidden bg-ink max-mob:flex max-mob:h-auto max-mob:min-h-0 max-mob:flex-col max-mob:gap-5 max-mob:bg-paper max-mob:pb-[40px] max-mob:pt-[32px]">
      <div className="wrap absolute inset-x-0 top-0 z-10 pt-[48px] max-mob:static max-mob:pt-0">
        <h1 className="display text-center text-[clamp(30px,5vw,78px)] [text-shadow:0_2px_18px_rgba(22,17,13,0.45)] max-mob:text-ink max-mob:[text-shadow:none]">
          Toda <span className="text-orange">Hora</span> em Todo{' '}
          <span className="text-orange">Lugar.</span>
        </h1>
      </div>

      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover max-mob:static max-mob:mx-5 max-mob:aspect-video max-mob:h-auto max-mob:w-auto max-mob:rounded-[16px]"
        src={loadVideo ? VIDEO_SRC : undefined}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Escurecimento sutil no topo para legibilidade do título */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[42%] bg-gradient-to-b from-ink/55 to-transparent max-mob:hidden" />
    </section>
  )
}
