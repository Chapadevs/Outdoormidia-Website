'use client'

import { useEffect, useRef } from 'react'
import CarrosselContinuo from '@/components/ui/CarrosselContinuo'
import PlatformShowcaseCard from '@/components/ui/PlatformShowcaseCard'
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
  const topoRef = useRef(0)
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
    //
    // A posição do título no documento é medida uma vez, na montagem e no
    // resize, e o laço de rolagem só lê `scrollY`. Medir com
    // `getBoundingClientRect` a cada frame obriga o navegador a recalcular o
    // layout da página inteira no meio do frame, e o carrossel logo abaixo
    // pagava a conta em frames perdidos. A escrita de `padding-top` também
    // refaz o layout, então ela só acontece quando a coluna de fato troca de
    // altura: onze vezes na subida, nenhuma nos demais frames.
    const colunas = Array.from(linhaRef.current?.querySelectorAll('[data-letra]') ?? [])
    const alturas = LETRAS.map(() => null)

    const medir = () => {
      const linha = linhaRef.current
      if (!linha) return
      topoRef.current = linha.getBoundingClientRect().top + window.scrollY
    }

    const elevar = () => {
      const topo = topoRef.current - window.scrollY
      const bruto = Math.min(Math.max((window.innerHeight - topo) / (window.innerHeight * 0.95), 0), 1)
      if (t0Ref.current === undefined) t0Ref.current = Math.min(bruto, 0.9)
      const t = Math.min(Math.max((bruto - t0Ref.current) / (1 - t0Ref.current), 0), 1)
      colunas.forEach((el, i) => {
        const alto = LETRAS[i].alto
        const destino = t > limiaresRef.current[i] ? alto : alto + 54
        if (alturas[i] === destino) return
        alturas[i] = destino
        el.style.paddingTop = `${destino}px`
      })
    }

    const aoRolar = () => {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(elevar)
    }

    const aoRedimensionar = () => {
      medir()
      aoRolar()
    }

    medir()
    elevar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRedimensionar)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRedimensionar)
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
    // `overflow-clip` e não `overflow-hidden`: o segundo faz da seção um
    // contêiner rolável, e o navegador rolaria essa caixa na horizontal para
    // trazer à vista um card que o Tab focou do outro lado do círculo — a seção
    // inteira sairia do lugar. `clip` corta igual e não rola.
    <section className="overflow-clip bg-bone py-[104px] text-ink max-mob:py-[72px]" id="plataformas">
      {/* A abertura enquadra a amplitude do portfólio, e é ela que justifica
          nove plataformas em vez de uma: Front Light é aparecer, Projetos
          Icônicos é ser impossível de ignorar. */}
      <p className="reveal mx-auto mb-[22px] max-w-[52ch] px-8 text-center text-lg text-ink-soft max-mob:px-5">
        Algumas campanhas precisam aparecer. Outras precisam ser impossíveis de ignorar.
      </p>

      <TituloPlataformas />

      <div className="reveal mx-auto h-[1.5px] max-w-[1280px] bg-[linear-gradient(to_right,rgba(22,17,13,0),rgba(22,17,13,.34)_14%,rgba(22,17,13,.34)_86%,rgba(22,17,13,0))]" />

      <div className="reveal mt-10">
        {/* A fita é um circuito, não uma fila: gira sozinha, devagar, e o
            visitante roda para os dois lados sem chegar a ponta nenhuma. Sem
            fileira de bolinhas embaixo, porque com giro contínuo a posição na
            lista não quer dizer nada — e a bolinha marcada era o único ponto do
            site que anunciava uma ordem que a seção não tem.

            A altura vem em classe porque quem conhece a proporção do card é
            este arquivo: 16/9 no desktop, 4/5 no tile de mobile. */}
        <CarrosselContinuo
          alturaClasse="h-[calc(var(--cw)*0.5625)] max-mob:h-[calc(var(--cw)*1.25)]"
          gap={26}
          label="Plataformas Outdoormídia"
          velocidade={0.055}
          width="min(820px,74vw)"
        >
          {PLATFORMS_LISTAGEM.map((p) => (
            <PlatformShowcaseCard key={p.slug} p={p} />
          ))}
        </CarrosselContinuo>
      </div>
    </section>
  )
}
