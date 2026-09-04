'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Coverflow from '@/components/ui/Coverflow'
import { PLATFORMS_LISTAGEM } from '@/lib/platforms'

// 11 colunas soletram "Plataformas" como um letreiro de postes luminosos: cada
// uma sobe até a própria altura de descanso (`alto`) quando a seção entra na
// tela, em ordem embaralhada — não da esquerda para a direita — e desce de
// volta se o visitante rolar para cima, porque a leitura é sempre a mesma
// posição de rolagem. O "f" é o poste aceso: LED e haste já nascem em laranja,
// sem esperar o hover.
const LETRAS = [
  { letra: 'P', alto: 0 },
  { letra: 'l', alto: 6 },
  { letra: 'a', alto: 2 },
  { letra: 't', alto: 10 },
  { letra: 'a', alto: 4 },
  { letra: 'f', alto: 0, aceso: true },
  { letra: 'o', alto: 8 },
  { letra: 'r', alto: 3 },
  { letra: 'm', alto: 12 },
  { letra: 'a', alto: 5 },
  { letra: 's', alto: 1 },
]

function TituloPlataformas() {
  const linhaRef = useRef(null)
  const frameRef = useRef(0)
  const t0Ref = useRef(undefined)
  const limiaresRef = useRef(null)

  useEffect(() => {
    if (!limiaresRef.current) {
      const passos = LETRAS.map((_, i) => 0.06 + i * 0.062)
      for (let i = passos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[passos[i], passos[j]] = [passos[j], passos[i]]
      }
      limiaresRef.current = passos
    }

    // Progresso do título na tela, de 0 (ainda embaixo) a 1. O título pode já
    // estar dentro da tela no primeiro paint: guardar esse valor de partida
    // (t0) e renormalizar em cima dele é o que garante que as onze colunas
    // comecem embaixo e participem da subida, seja qual for a altura da janela.
    // A escrita de `padding-top` refaz o layout da página inteira, então ela só
    // acontece quando a coluna de fato troca de altura: nos demais frames de
    // rolagem o laço não toca no DOM. É o que mantém o carrossel logo abaixo
    // rodando com todos os frames.
    const colunas = Array.from(linhaRef.current?.querySelectorAll('[data-letra]') ?? [])
    const alturas = LETRAS.map(() => null)

    const elevar = () => {
      const linha = linhaRef.current
      if (!linha) return
      const r = linha.getBoundingClientRect()
      const bruto = Math.min(Math.max((window.innerHeight - r.top) / (window.innerHeight * 0.95), 0), 1)
      if (t0Ref.current === undefined) t0Ref.current = Math.min(bruto, 0.9)
      const t = Math.min(Math.max((bruto - t0Ref.current) / (1 - t0Ref.current), 0), 1)
      colunas.forEach((el, i) => {
        const alto = LETRAS[i].alto
        const topo = t > limiaresRef.current[i] ? alto : alto + 54
        if (alturas[i] === topo) return
        alturas[i] = topo
        el.style.paddingTop = `${topo}px`
      })
    }

    const aoRolar = () => {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(elevar)
    }

    elevar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  return (
    <h2
      aria-label="Plataformas"
      className="m-0 flex h-[clamp(178px,17vw,224px)] items-stretch justify-center gap-0.5 px-6 font-normal"
      ref={linhaRef}
    >
      {LETRAS.map(({ letra, alto, aceso }, i) => (
        <span
          aria-hidden="true"
          className="group flex flex-col items-stretch transition-[padding-top] duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)]"
          data-letra={i}
          key={i}
          style={{ paddingTop: alto + 54 }}
        >
          <span className="text-center text-[clamp(38px,7vw,100px)] font-extrabold leading-[0.92] tracking-[-0.02em] text-ink transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-2.5 group-hover:text-orange">
            {letra}
          </span>
          <span
            className={`rounded-sm transition-colors duration-200 group-hover:bg-orange ${
              aceso ? 'h-[3px] bg-orange' : 'h-0.5 bg-ink/[.26]'
            }`}
          />
          <span
            className={`mx-auto w-[1.5px] flex-1 origin-bottom ${
              aceso
                ? 'bg-[linear-gradient(to_bottom,rgba(255,105,0,.55),rgba(255,105,0,.05))]'
                : 'bg-[linear-gradient(to_bottom,rgba(22,17,13,.24),rgba(22,17,13,0))]'
            }`}
          />
        </span>
      ))}
    </h2>
  )
}

export default function PlatformsCarousel() {
  return (
    <section className="overflow-hidden bg-bone py-[104px] text-ink max-mob:py-[72px]" id="plataformas">
      {/* A abertura enquadra a amplitude do portfólio, e é ela que justifica
          nove plataformas em vez de uma: Front Light é aparecer, Projetos
          Icônicos é ser impossível de ignorar. */}
      <p className="reveal mx-auto mb-[22px] max-w-[52ch] px-8 text-center text-lg text-ink-soft max-mob:px-5">
        Algumas campanhas precisam aparecer. Outras precisam ser impossíveis de ignorar.
      </p>

      <TituloPlataformas />

      <div className="reveal mx-auto h-[1.5px] max-w-[1280px] bg-[linear-gradient(to_right,rgba(22,17,13,0),rgba(22,17,13,.34)_14%,rgba(22,17,13,.34)_86%,rgba(22,17,13,0))]" />

      <div className="reveal mt-10">
        <Coverflow
          // Abre no segundo card, e não no primeiro: é a entrada mais forte da
          // primeira dobra. Com `loop`, a lista é contínua nos dois sentidos,
          // então Icônicos passa a ter vizinho à esquerda em qualquer posição —
          // as 9 plataformas são um circuito, não uma fila com ponta.
          gap={26}
          inicial={1}
          label="Plataformas Outdoormídia"
          labels={PLATFORMS_LISTAGEM.map((p) => p.name)}
          loop
          rotulo="plataforma"
          width="min(820px,74vw)"
        >
          {PLATFORMS_LISTAGEM.map((p) => (
            <article
              className="ticks relative aspect-[16/9] w-full overflow-hidden rounded-[18px] border border-line bg-paper max-mob:aspect-[4/5]"
              key={p.slug}
            >
              {p.video ? (
                <video
                  aria-hidden="true"
                  autoPlay
                  className="pointer-events-none absolute inset-0 size-full object-cover"
                  loop
                  muted
                  playsInline
                  preload="none"
                  src={p.video}
                />
              ) : p.image ? (
                <Image
                  alt={p.imageAlt || `${p.name}: ${p.short}`}
                  className="object-cover"
                  draggable={false}
                  fill
                  sizes="(max-width: 560px) 74vw, 820px"
                  src={p.image}
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-ink/[.06] pb-[42%] text-[11px] font-bold uppercase tracking-[0.16em] text-ink/30">
                  {p.name}
                </div>
              )}
              {/* scrim claro — segura a leitura do texto em ink sobre a foto */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(246,242,236,.94)_0%,rgba(246,242,236,.62)_42%,rgba(246,242,236,0)_74%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-7 p-[38px] max-mob:flex-col max-mob:items-start max-mob:gap-5 max-mob:p-6">
                <div>
                  {p.marcador && (
                    <span className="mb-3 inline-flex rounded-full border border-orange px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-orange">
                      {p.marcador}
                    </span>
                  )}
                  <div className="eyebrow text-orange">
                    {p.num} · {p.desc}
                  </div>
                  <h3 className="m-0 mt-3 text-[clamp(26px,2.6vw,42px)] font-extrabold leading-none tracking-[-0.02em] text-ink">
                    {p.name}
                  </h3>
                  {/* O card de mobile é um tile 4/5 de altura fixa: o texto do documento
                      não cabe inteiro nele. Corta em 3 linhas aqui e vai completo
                      na página da plataforma. */}
                  <p className="m-0 mt-3.5 max-w-[40ch] text-[15.5px] leading-normal text-ink-soft max-mob:line-clamp-3">
                    {p.short}
                  </p>
                </div>
                <Link className="btn btn-fill shrink-0" draggable={false} href={p.href}>
                  {p.cta} →
                </Link>
              </div>
            </article>
          ))}
        </Coverflow>
      </div>
    </section>
  )
}
