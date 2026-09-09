'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import CoverMedia from '@/components/ui/CoverMedia'
import SectionHeading from '@/components/ui/SectionHeading'
import { MARCOS } from '@/lib/sobre'

// A onda é desenhada para os quatro marcos de MARCOS: pico, vale, pico, vale.
// Cada nó fica em cima do traçado e o texto cai do lado oposto à curva, para não
// cobrir a linha. Entrando um quinto marco, a curva e NOS mudam juntos.
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

const NOS = [
  { cx: 200, cy: 210 },
  { cx: 480, cy: 350 },
  { cx: 760, cy: 210 },
  { cx: 1040, cy: 350 },
]

// pathLength="1" reescala o traçado para 1: o dash passa a ser fração do
// caminho, sem precisar medir o comprimento real no navegador. Cada parada
// desenha um pouco além do nó que acabou de acender, para a linha chegar antes
// da foto e não sair dela.
const DESENHO = [0.04, 0.3, 0.53, 0.77, 1]

// Onde cada marco acende dentro do trilho de rolagem. A faixa de leitura é o
// miolo da tela (o rootMargin corta 45% em cima e embaixo), então a parada é o
// ponto em que o sentinela cruza o centro.
const PARADAS = ['14%', '38%', '61%', '84%']

const pc = (v, total) => `${(v / total) * 100}%`

// A preferência por menos movimento é estado de fora do React, então entra por
// useSyncExternalStore: lida no render, sem setState dentro do efeito. No
// servidor não há matchMedia, e o snapshot é o caso comum (com movimento).
const CONSULTA_MOVIMENTO = '(prefers-reduced-motion: reduce)'
const assinarMovimento = (avisar) => {
  const mq = window.matchMedia(CONSULTA_MOVIMENTO)
  mq.addEventListener('change', avisar)
  return () => mq.removeEventListener('change', avisar)
}
const lerMovimento = () => window.matchMedia(CONSULTA_MOVIMENTO).matches
const semMovimentoNoServidor = () => false

export default function LinhaDoTempo() {
  const [revelados, setRevelados] = useState(0)
  const sentinelas = useRef([])
  const semMovimento = useSyncExternalStore(
    assinarMovimento,
    lerMovimento,
    semMovimentoNoServidor
  )

  useEffect(() => {
    // Sem movimento os quatro já entram acesos e o trilho encolhe para uma tela
    // (motion-reduce:h-screen), senão sobrariam três telas de rolagem sem nada
    // acontecendo. Nada a observar nesse caso.
    if (semMovimento) return

    const passou = new Array(NOS.length).fill(false)
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const i = Number(e.target.dataset.marco)
          // `top < 0` mantém o marco aceso depois que ele sobe e sai da faixa:
          // sem isso a onda apagaria de trás para frente ao continuar rolando.
          passou[i] = e.isIntersecting || e.boundingClientRect.top < 0
        }
        setRevelados(passou.filter(Boolean).length)
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )

    for (const el of sentinelas.current) if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [semMovimento])

  const acesos = semMovimento ? NOS.length : revelados
  const desenho = DESENHO[Math.min(acesos, DESENHO.length - 1)]

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="linha-do-tempo">
      <div className="wrap">
        <SectionHeading className="reveal mb-[34px]" title="Linha do tempo" />
        <p className="reveal max-w-[54ch] text-lg text-ink-soft">
          O que mudou desde a primeira face na rua, e o que não mudou.
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
          <span className="eyebrow">Role para percorrer</span>
        </div>
      </div>

      {/* Trilho de rolagem: o palco fica preso no meio da tela enquanto os
          quatro sentinelas passam por ele. */}
      <div className="relative mt-10 h-[340vh] max-tab:hidden motion-reduce:h-screen">
        {PARADAS.map((top, i) => (
          <div
            aria-hidden="true"
            className="absolute left-0 size-px"
            data-marco={i}
            key={top}
            ref={(el) => {
              sentinelas.current[i] = el
            }}
            style={{ top }}
          />
        ))}

        <div className="sticky top-0 flex h-screen items-center">
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
                <path
                  className="stroke-orange"
                  d={ONDA}
                  fill="none"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeLinecap="round"
                  strokeWidth="9"
                  style={{
                    strokeDashoffset: 1 - desenho,
                    transition: 'stroke-dashoffset 900ms cubic-bezier(.4,0,.2,1)',
                  }}
                />
              </svg>

              {MARCOS.slice(0, NOS.length).map((m, i) => {
                const { cx, cy } = NOS[i]
                const aceso = i < acesos
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
          {MARCOS.map((m) => (
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
