'use client'

import { useTranslations } from 'next-intl'

import { useEffect, useRef, useState } from 'react'
import CoverMedia from '@/components/ui/CoverMedia'
import SectionHeading from '@/components/ui/SectionHeading'

// A onda é desenhada para os cinco marcos: pico, vale, pico, vale, pico. Cada nó
// fica em cima do traçado e o texto cai do lado oposto à curva, para não cobrir
// a linha. Entrando um sexto marco, a curva e NOS mudam juntos.
//
// O palco tem viewBox fixo e o container a mesma proporção, então o SVG preenche
// exato e nada distorce. Tudo o que é posição vira porcentagem desse viewBox: a
// peça encolhe inteira entre 980px e 1280px sem que nó e texto se desencontrem,
// que é o que aconteceria com posição em px.
const LARGURA = 1200
const ALTURA = 560

const ONDA =
  'M 20 280 C 60 280, 80 210, 130 210 C 208 210, 287 350, 365 350 ' +
  'C 443 350, 522 210, 600 210 C 678 210, 757 350, 835 350 ' +
  'C 913 350, 992 210, 1070 210 C 1120 210, 1140 280, 1180 280'

// `traco` é onde o nó fica ao longo do caminho, na mesma escala do dash: o marco
// acende quando a linha chega nele, e não numa contagem paralela que pode
// divergir do desenho. Os valores são a fração do comprimento da ONDA em cada
// nó, medidos uma vez fora do build.
const NOS = [
  { cx: 130, cy: 210, traco: 0.1 },
  { cx: 365, cy: 350, traco: 0.3 },
  { cx: 600, cy: 210, traco: 0.5 },
  { cx: 835, cy: 350, traco: 0.7 },
  { cx: 1070, cy: 210, traco: 0.9 },
]

// Toco que já nasce desenhado, para a linha não começar do nada. O resto do
// caminho é consumido pela rolagem.
const TOCO = 0.04

// Abaixo de 980px a onda vira um trilho vertical à esquerda da lista. A linha
// se preenche conforme a rolagem traz a lista para cima, e o ponto de leitura
// é esta fração da altura da tela: o card acende quando o seu nó chega aí, com
// o resto dele ainda entrando pela dobra de baixo.
const GATILHO = 0.72
// Distância do topo de cada <li> até o centro do seu nó no trilho.
const NO_MOBILE = 25

const pc = (v, total) => `${(v / total) * 100}%`

export default function LinhaDoTempo({ marcos }) {
  const t = useTranslations('LinhaDoTempo')
  const pistaRef = useRef(null)
  const tracoRef = useRef(null)
  const listaRef = useRef(null)
  const trilhoRef = useRef(null)
  // null enquanto não houve medição (SSR e sem JS): nesse estado tudo nasce
  // aceso, como em Process. É o que mantém o texto dos cinco no documento para
  // busca e leitor de tela mesmo sem JS.
  const [acesos, setAcesos] = useState(null)

  useEffect(() => {
    const daOnda = window.matchMedia('(min-width: 981px)')
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const acender = (n) => setAcesos((anterior) => (anterior === n ? anterior : n))

    // Só um dos dois palcos está no documento por vez, mas os dois refs
    // existem sempre: ao trocar de breakpoint o palco que saiu volta ao estado
    // inteiro, para não reaparecer pela metade se a janela voltar.
    const medirOnda = () => {
      const pista = pistaRef.current
      if (!pista) return

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
      // elemento: como estado do React, os cinco nós e os cinco textos
      // reconciliariam 60 vezes por segundo. O que o React conhece é só a
      // contagem de acesos, que muda cinco vezes na rolagem inteira.
      if (tracoRef.current) tracoRef.current.style.strokeDashoffset = String(1 - desenho)
      if (trilhoRef.current) trilhoRef.current.style.transform = 'scaleY(1)'

      let n = 0
      while (n < NOS.length && desenho >= NOS[n].traco) n++
      acender(n)
    }

    // A lista não é presa na tela: quem avança é o ponto de leitura, fixo na
    // janela, descendo pela lista conforme ela sobe. O trilho se preenche até
    // esse ponto, e o card acende quando o preenchimento passa pelo seu nó.
    const medirTrilho = () => {
      const lista = listaRef.current
      if (!lista) return

      const { top, height } = lista.getBoundingClientRect()
      const gatilho = window.innerHeight * GATILHO
      const preenchido = Math.min(Math.max(gatilho - top, 0), height)

      // `scaleY` em vez de `height`: é a única propriedade que muda por frame e
      // fica na composição, sem refazer layout da lista inteira.
      if (trilhoRef.current) trilhoRef.current.style.transform = `scaleY(${preenchido / height})`
      if (tracoRef.current) tracoRef.current.style.strokeDashoffset = '0'

      let n = 0
      for (const item of lista.children) {
        const no = item.getBoundingClientRect().top - top + NO_MOBILE
        if (preenchido < no) break
        n++
      }
      acender(n)
    }

    const medir = () => {
      frame = 0

      // Com menos movimento não há o que animar em nenhum dos dois palcos:
      // tudo fica aceso e a linha, inteira (o trilho da onda encolhe para uma
      // tela com motion-reduce:h-screen).
      if (semMovimento.matches) {
        if (tracoRef.current) tracoRef.current.style.strokeDashoffset = '0'
        if (trilhoRef.current) trilhoRef.current.style.transform = 'scaleY(1)'
        setAcesos(null)
        return
      }

      if (daOnda.matches) medirOnda()
      else medirTrilho()
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
                      className="absolute w-[18.5%] -translate-x-1/2 -translate-y-1/2"
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
                          sizes="(max-width: 1280px) 18.5vw, 230px"
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
                      className={`absolute flex w-[18.5%] -translate-x-1/2 flex-col text-center transition-[opacity,translate] delay-150 duration-700 ease-[cubic-bezier(.2,.8,.25,1)] motion-reduce:transition-none motion-reduce:delay-0 ${
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
          encolher mais deixaria o texto do card ilegível. A lista empilhada tem
          o mesmo conteúdo, com a linha virada para a vertical: o trilho à
          esquerda se preenche com a rolagem e cada card acende quando ele chega
          no seu nó. `transform` não entra no JSX do preenchimento pela mesma
          razão do dash da onda; sem ele o trilho nasce inteiro. */}
      <div className="wrap hidden max-tab:block">
        <div className="relative mt-10 pl-[38px]">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[9px] top-0 w-1 overflow-hidden rounded-full bg-line"
          >
            <div className="absolute inset-0 origin-top bg-orange" ref={trilhoRef} />
          </div>
          <ol className="m-0 flex list-none flex-col gap-[34px] p-0" ref={listaRef}>
            {marcos.map((m, i) => {
              const aceso = todos || i < acesos

              return (
                <li className="relative" key={m.ano}>
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[38px] top-[14px] size-[22px] rounded-full border-[5px] bg-paper transition-colors duration-500 ${
                      aceso ? 'border-orange' : 'border-bone'
                    }`}
                  />
                  {/* No tablet o card é deitado, foto à esquerda e texto à
                      direita: em coluna única a foto 16/9 ocuparia a largura
                      inteira da tela. No telefone volta a empilhar. */}
                  <div
                    className={`ticks grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 rounded-[16px] border border-line bg-white p-6 transition-[opacity,translate] duration-700 ease-[cubic-bezier(.2,.8,.25,1)] motion-reduce:transition-none max-mob:grid-cols-1 max-mob:gap-4 ${
                      aceso ? 'opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    <CoverMedia
                      alt={m.imageAlt}
                      label={m.ano}
                      ratio="16/9"
                      sizes="(max-width: 560px) 100vw, 40vw"
                      src={m.image}
                    />
                    <div className="flex flex-col gap-3">
                      <span className="display text-[30px] leading-none text-orange">{m.ano}</span>
                      <h3 className="m-0 text-[17px] font-extrabold leading-tight text-ink">
                        {m.title}
                      </h3>
                      <p className="m-0 text-[14.5px] leading-relaxed text-ink-soft">{m.text}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
