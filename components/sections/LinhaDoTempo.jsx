'use client'

import { useTranslations } from 'next-intl'

import { useEffect, useRef, useState } from 'react'
import CoverMedia from '@/components/ui/CoverMedia'
import SectionHeading from '@/components/ui/SectionHeading'

// A onda é desenhada para os quatro marcos: pico, vale, pico, vale. Cada nó fica
// em cima do traçado e o texto cai do lado oposto à curva, para não cobrir a
// linha. Entrando um quinto marco, a curva e NOS mudam juntos.
//
// O palco tem viewBox fixo e o container a mesma proporção, então o SVG preenche
// exato e nada distorce. Tudo o que é posição vira porcentagem desse viewBox: a
// peça encolhe inteira entre 980px e 1280px sem que nó e texto se desencontrem,
// que é o que aconteceria com posição em px.
const LARGURA = 1200
const ALTURA = 560

const ONDA =
  'M 60 280 C 120 280, 140 210, 200 210 C 293 210, 387 350, 480 350 ' +
  'C 573 350, 667 210, 760 210 C 853 210, 947 350, 1040 350 ' +
  'C 1100 350, 1120 280, 1180 280'

// `traco` é onde o nó fica ao longo do caminho, na mesma escala do dash: o marco
// acende quando a linha chega nele, e não numa contagem paralela que pode
// divergir do desenho.
const NOS = [
  { cx: 200, cy: 210, traco: 0.13 },
  { cx: 480, cy: 350, traco: 0.38 },
  { cx: 760, cy: 210, traco: 0.62 },
  { cx: 1040, cy: 350, traco: 0.87 },
]

// Toco que já nasce desenhado, para a linha não começar do nada. O resto do
// caminho é consumido pela rolagem.
const TOCO = 0.04

const pc = (v, total) => `${(v / total) * 100}%`

export default function LinhaDoTempo({ marcos }) {
  const t = useTranslations('LinhaDoTempo')
  const pistaRef = useRef(null)
  const tracoRef = useRef(null)
  // null enquanto não houve medição (SSR e sem JS): nesse estado tudo nasce
  // aceso, como em Process. É o que mantém o texto dos quatro no documento para
  // busca e leitor de tela mesmo sem JS.
  const [acesos, setAcesos] = useState(null)

  useEffect(() => {
    const daOnda = window.matchMedia('(min-width: 981px)')
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const medir = () => {
      frame = 0
      const pista = pistaRef.current
      if (!pista) return

      // Abaixo de 980px quem aparece é a lista empilhada, e com menos movimento
      // o trilho encolhe para uma tela (motion-reduce:h-screen). Nos dois casos
      // não há rolagem para medir: tudo fica aceso e a linha, inteira.
      if (!daOnda.matches || semMovimento.matches) {
        if (tracoRef.current) tracoRef.current.style.strokeDashoffset = '0'
        setAcesos(null)
        return
      }

      const { top, height } = pista.getBoundingClientRect()
      // No trilho preso, o avanço é a rolagem já consumida dentro da pista —
      // a mesma conta de Process. Medir a posição absoluta a cada frame é o que
      // torna isto imune a rolagem rápida: não existe faixa estreita para o
      // gatilho pular, que era o defeito dos sentinelas com IntersectionObserver
      // (rolagem de trackpad passa dos 72px da faixa entre dois frames, o
      // observer não reporta mudança de estado e o marco nunca acendia).
      const curso = height - window.innerHeight
      const avanco = curso > 0 ? Math.min(Math.max(-top / curso, 0), 1) : 1
      const desenho = TOCO + avanco * (1 - TOCO)

      // A linha muda em todo frame de rolagem, então ela é escrita direto no
      // elemento: como estado do React, os quatro nós e os quatro textos
      // reconciliariam 60 vezes por segundo. O que o React conhece é só a
      // contagem de acesos, que muda quatro vezes na rolagem inteira.
      if (tracoRef.current) tracoRef.current.style.strokeDashoffset = String(1 - desenho)

      let n = 0
      while (n < NOS.length && desenho >= NOS[n].traco) n++
      setAcesos((anterior) => (anterior === n ? anterior : n))
    }

    const agendar = () => {
      if (!frame) frame = requestAnimationFrame(medir)
    }

    medir()
    daOnda.addEventListener('change', agendar)
    semMovimento.addEventListener('change', agendar)
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      daOnda.removeEventListener('change', agendar)
      semMovimento.removeEventListener('change', agendar)
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', agendar)
    }
  }, [])

  const todos = acesos === null
  const daOndaMarcos = marcos.slice(0, NOS.length)

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="linha-do-tempo">
      <div className="wrap">
        <SectionHeading className="reveal mb-[34px]" title="Linha do tempo" />
        <p className="reveal max-w-[54ch] text-lg text-ink-soft">
          {t('lead')}
        </p>
        <div className="reveal mt-8 flex items-center gap-3 text-ink-soft max-tab:hidden">
          <svg
            aria-hidden="true"
            className="animate-desce-dica motion-reduce:animate-none"
            fill="none"
            height="22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="22"
          >
            <path d="M12 4v14" />
            <path d="M6 13l6 6 6-6" />
          </svg>
          <span className="eyebrow">{t('role')}</span>
        </div>
      </div>

      {/* Trilho de rolagem: o palco fica preso na tela enquanto a pista é
          consumida. O padding do topo é a altura do Header, que também é
          sticky e passaria por cima do palco. */}
      <div
        className="relative mt-10 h-[240vh] max-tab:hidden motion-reduce:h-screen"
        ref={pistaRef}
      >
        <div className="sticky top-0 flex h-screen items-center pt-[74px]">
          <div className="wrap">
            <ol
              className="relative m-0 list-none p-0"
              style={{ aspectRatio: `${LARGURA} / ${ALTURA}` }}
            >
              <svg
                aria-hidden="true"
                className="absolute inset-0 block size-full"
                viewBox={`0 0 ${LARGURA} ${ALTURA}`}
              >
                <path
                  className="stroke-line"
                  d={ONDA}
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth="9"
                />
                {/* pathLength="1" reescala o traçado para 1: o dash passa a ser
                    fração do caminho, sem medir o comprimento no navegador. Sem
                    transição de propósito — quem move o dash é a rolagem, e uma
                    transição de 900ms ficaria correndo atrás dela.
                    `strokeDashoffset` não entra no JSX: o que o React conhece
                    ele reescreve na re-renderização seguinte, e apagaria o valor
                    que `medir` acabou de gravar pelo ref. Sem ele o dash nasce
                    em 0, que é a linha inteira — o estado certo para SSR e para
                    quem está sem JS. */}
                <path
                  className="stroke-orange"
                  d={ONDA}
                  fill="none"
                  pathLength="1"
                  ref={tracoRef}
                  strokeDasharray="1"
                  strokeLinecap="round"
                  strokeWidth="9"
                />
              </svg>

              {daOndaMarcos.map((m, i) => {
                const { cx, cy } = NOS[i]
                const aceso = todos || i < acesos
                // Pico: a curva sobe, o texto desce. Vale: o contrário. É o que
                // mantém o texto sempre do lado livre do traçado.
                const pico = cy < ALTURA / 2

                return (
                  <li key={m.ano}>
                    <div
                      className="absolute w-[20%] -translate-x-1/2 -translate-y-1/2"
                      style={{ left: pc(cx, LARGURA), top: pc(cy, ALTURA) }}
                    >
                      <div
                        className={`relative transition-[opacity,translate,scale] duration-700 ease-[cubic-bezier(.2,.8,.25,1)] motion-reduce:transition-none ${
                          aceso
                            ? 'scale-100 opacity-100'
                            : `scale-95 opacity-0 ${pico ? '-translate-y-6' : 'translate-y-6'}`
                        }`}
                      >
                        <CoverMedia
                          alt={m.imageAlt}
                          label={m.ano}
                          ratio="16/10"
                          sizes="(max-width: 1280px) 20vw, 250px"
                          src={m.image}
                        />
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute -inset-1.5 rounded-[22px] border-[6px] transition-colors duration-500 ${
                            aceso ? 'border-orange' : 'border-bone'
                          }`}
                        />
                      </div>
                    </div>

                    <div
                      className={`absolute flex w-[20%] -translate-x-1/2 flex-col text-center transition-[opacity,translate] delay-150 duration-700 ease-[cubic-bezier(.2,.8,.25,1)] motion-reduce:transition-none motion-reduce:delay-0 ${
                        pico ? 'pt-[30px]' : 'pb-[30px]'
                      } ${
                        aceso
                          ? 'opacity-100'
                          : `opacity-0 ${pico ? 'translate-y-4' : '-translate-y-4'}`
                      }`}
                      style={
                        pico
                          ? { left: pc(cx, LARGURA), top: pc(cy + 96, ALTURA) }
                          : { left: pc(cx, LARGURA), bottom: pc(ALTURA - (cy - 96), ALTURA) }
                      }
                    >
                      <svg
                        aria-hidden="true"
                        className={`absolute left-1/2 -translate-x-1/2 transition-colors duration-500 ${
                          pico ? 'top-0 rotate-180' : 'bottom-0'
                        } ${aceso ? 'text-orange' : 'text-line-2'}`}
                        fill="none"
                        height="28"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.2"
                        viewBox="0 0 24 34"
                        width="20"
                      >
                        <path d="M12 2 C 12 14, 12 20, 12 30" />
                        <path d="M6 24 L12 31 L18 24" />
                      </svg>
                      <span
                        className={`display text-[clamp(22px,2.5vw,30px)] leading-none transition-colors duration-500 ${
                          aceso ? 'text-orange' : 'text-line-2'
                        }`}
                      >
                        {m.ano}
                      </span>
                      <h3 className="m-0 mt-2 text-[clamp(13px,1.35vw,17px)] font-extrabold leading-tight text-ink">
                        {m.title}
                      </h3>
                      <p className="m-0 mt-1.5 text-[clamp(11px,1.15vw,14px)] leading-[1.5] text-ink-soft">
                        {m.text}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* Abaixo de 980px a onda não cabe: posição absoluta em px não reflui, e
          encolher mais deixaria o texto do card ilegível. A lista empilhada é a
          mesma de antes, com o mesmo conteúdo. */}
      <div className="wrap">
        <ol className="m-0 mt-10 hidden list-none grid-cols-2 gap-[18px] p-0 max-tab:grid max-mob:grid-cols-1">
          {marcos.map((m) => (
            <li
              className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-6"
              key={m.ano}
            >
              <CoverMedia
                alt={m.imageAlt}
                className="-mx-1 mb-1"
                label={m.ano}
                ratio="16/9"
                sizes="(max-width: 560px) 100vw, 50vw"
                src={m.image}
              />
              <span className="display text-[30px] leading-none text-orange">{m.ano}</span>
              <h3 className="m-0 text-[17px] font-extrabold leading-tight text-ink">{m.title}</h3>
              <p className="m-0 text-[14.5px] leading-relaxed text-ink-soft">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
