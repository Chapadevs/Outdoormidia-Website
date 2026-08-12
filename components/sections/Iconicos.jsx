'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import { ICONICOS } from '@/lib/iconicos'

export default function Iconicos() {
  const railRef = useRef(null)
  const timerRef = useRef(null)
  const [active, setActive] = useState(0)

  const sync = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const mid = rail.getBoundingClientRect().left + rail.clientWidth / 2
    let best = 0
    let bestDistance = Infinity
    Array.from(rail.children).forEach((card, i) => {
      const box = card.getBoundingClientRect()
      const distance = Math.abs(box.left + box.width / 2 - mid)
      if (distance < bestDistance) {
        bestDistance = distance
        best = i
      }
    })
    setActive(best)
  }, [])

  const onScroll = useCallback(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(sync, 60)
  }, [sync])

  const goTo = useCallback((i) => {
    const rail = railRef.current
    const card = rail?.children[i]
    if (!card) return
    const railBox = rail.getBoundingClientRect()
    const cardBox = card.getBoundingClientRect()
    const left = rail.scrollLeft + (cardBox.left - railBox.left) - (rail.clientWidth - cardBox.width) / 2
    rail.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
    setActive(i)
  }, [])

  return (
    <section className="bg-bone py-[110px] text-ink max-mob:py-[72px]" id="iconicos">
      <div className="wrap">
        <div className="reveal flex items-end justify-between gap-6">
          <div>
            <div className="eyebrow text-orange">Projetos icônicos · Assinatura</div>
            <h2 className="m-0 mt-4 text-pretty text-[clamp(30px,3.4vw,52px)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              Nem toda mídia cabe num catálogo.
            </h2>
            <p className="m-0 mt-3.5 max-w-[46ch] text-base leading-relaxed text-ink-soft">
              Três linhas de projetos sob medida — desenhadas ponto a ponto.
            </p>
          </div>
          <div className="flex shrink-0 gap-2.5 pb-1.5 max-tab:hidden">
            <button
              aria-label="Projeto anterior"
              className="grid size-[46px] cursor-pointer place-items-center rounded-full border-[1.5px] border-line-2 text-[17px] text-ink transition duration-200 hover:border-orange hover:bg-orange hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:border-line-2 disabled:hover:bg-transparent disabled:hover:text-ink"
              disabled={active === 0}
              onClick={() => goTo(active - 1)}
              type="button"
            >
              ←
            </button>
            <button
              aria-label="Próximo projeto"
              className="grid size-[46px] cursor-pointer place-items-center rounded-full border-[1.5px] border-line-2 text-[17px] text-ink transition duration-200 hover:border-orange hover:bg-orange hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:border-line-2 disabled:hover:bg-transparent disabled:hover:text-ink"
              disabled={active === ICONICOS.length - 1}
              onClick={() => goTo(active + 1)}
              type="button"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* carrossel de peek: sangra a largura toda da tela e centraliza o card
          ativo, deixando o próximo espiando nas bordas. O padding lateral é o
          que segura o primeiro e o último card centralizados. */}
      <div
        className="reveal mt-11 flex snap-x snap-proximity gap-[22px] overflow-x-auto px-[max(32px,calc((100%-1000px)/2))] pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-mob:px-5"
        onScroll={onScroll}
        ref={railRef}
      >
        {ICONICOS.map((i, index) => (
          <article
            className="ticks relative aspect-[16/9] flex-[0_0_min(1000px,86%)] snap-center overflow-hidden rounded-[18px] border border-line bg-paper [&::after]:z-[3] [&::before]:z-[3] max-mob:aspect-[4/5] max-mob:flex-[0_0_100%]"
            key={i.slug}
          >
            {i.image ? (
              <Image
                alt={i.name}
                className="object-cover"
                fill
                sizes="(max-width: 560px) 100vw, 1000px"
                src={i.image}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-ink/[.06] text-[11px] font-bold uppercase tracking-[0.16em] text-ink/30">
                {i.name}
              </div>
            )}
            {/* scrim claro — segura a leitura do texto em ink sobre a foto */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(246,242,236,.94)_0%,rgba(246,242,236,.62)_42%,rgba(246,242,236,0)_74%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-7 p-11 max-mob:flex-col max-mob:items-start max-mob:gap-6 max-mob:p-7">
              <div>
                <div className="eyebrow text-orange">
                  {i.num} · {i.tagline}
                </div>
                <h3 className="m-0 mt-3 text-[clamp(30px,3vw,46px)] font-extrabold leading-none tracking-[-0.02em] text-ink">
                  {i.name}
                </h3>
                <p className="m-0 mt-3.5 max-w-[40ch] text-base leading-normal text-ink-soft">
                  {i.short}
                </p>
              </div>
              <Link className="btn btn-fill pointer-events-auto shrink-0" href={i.href}>
                Ver projeto →
              </Link>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2] bg-bone transition-opacity duration-[550ms] ease-[cubic-bezier(.2,.7,.2,1)]"
              style={{ opacity: index === active ? 0 : 0.6 }}
            />
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2.5">
        {ICONICOS.map((i, index) => (
          <button
            aria-label={`Ir para ${i.name}`}
            className={`h-2 cursor-pointer rounded-full border-none p-0 transition-[width,background-color] duration-[400ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
              index === active ? 'w-[30px] bg-orange' : 'w-2 bg-ink/25'
            }`}
            key={i.slug}
            onClick={() => goTo(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  )
}
