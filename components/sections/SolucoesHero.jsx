'use client'

import { useEffect, useState } from 'react'

const VIDEO_SRC = '/media/video-hero.mp4'

// Mesmo vídeo de fundo do Hero da home, com o mesmo adiamento de carga: o
// `src` só entra depois do load da página, para não pesar no carregamento
// inicial desta rota.
export default function SolucoesHero() {
  const [loadVideo, setLoadVideo] = useState(false)

  useEffect(() => {
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => setLoadVideo(true), 0)
      return () => clearTimeout(timer)
    }
    const onLoad = () => setLoadVideo(true)
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <section className="relative min-h-[460px] w-full overflow-hidden bg-ink pb-[70px] pt-[54px] max-mob:flex max-mob:min-h-0 max-mob:flex-col max-mob:gap-5 max-mob:bg-paper max-mob:pb-12 max-mob:pt-9">
      <div className="wrap relative z-10 max-mob:order-2">
        <div className="eyebrow reveal text-white max-mob:text-ink">Núcleo comercial · PR + SC</div>
        <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-white [text-shadow:0_2px_18px_rgba(22,17,13,0.45)] max-mob:text-ink max-mob:[text-shadow:none]">
          Soluções.
        </h1>
        <p className="reveal mt-6 max-w-[62ch] text-lg text-white/90 [text-shadow:0_2px_16px_rgba(22,17,13,0.75)] max-mob:text-ink-soft max-mob:[text-shadow:none]">
          Comece por onde faz sentido para você: pelo que nos diferencia, pela praça onde sua
          marca precisa aparecer ou direto pelo formato que você já tem em mente.
        </p>
      </div>

      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover max-mob:static max-mob:order-1 max-mob:mx-5 max-mob:aspect-video max-mob:h-auto max-mob:w-auto max-mob:rounded-[16px]"
        src={loadVideo ? VIDEO_SRC : undefined}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[60%] bg-gradient-to-b from-ink/60 to-transparent max-mob:hidden" />
    </section>
  )
}
