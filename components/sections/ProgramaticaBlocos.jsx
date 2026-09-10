'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLocale } from 'next-intl'
import { getFluxo, getGlossario } from '@/lib/programatica'

// Os dois blocos longos de /area-do-anunciante/programatica, fechados por
// padrão desde a revisão de 08/09: quem opera programática não precisa dos seis
// passos nem do glossário, e quem não opera precisa dos dois inteiros.
//
// Fechado é recolhimento visual, nunca remoção do documento: o conteúdo fica no
// HTML para a busca indexar e para o leitor de tela alcançar. Por isso o painel
// colapsa por `grid-template-rows` e não por `hidden`, que tiraria o texto da
// árvore de acessibilidade junto com a tela.
const PAINEL = 'grid transition-[grid-template-rows] duration-300 ease-out'

const CABECALHO =
  'flex w-full cursor-pointer items-center justify-between gap-5 py-[22px] text-left transition-colors duration-150 hover:text-orange'

export default function ProgramaticaBlocos() {
  const locale = useLocale()
  const FLUXO = getFluxo(locale)
  const GLOSSARIO = getGlossario(locale)
  const [fluxoAberto, setFluxoAberto] = useState(false)
  const [glossarioAberto, setGlossarioAberto] = useState(false)
  const verbeteAlvo = useRef(null)

  // Âncora que rola para um bloco fechado leva o leitor para lugar nenhum, e é
  // justamente o leitor que menos entende do assunto. O destino abre antes de a
  // página rolar, tanto no link interno do fluxo quanto em quem chega de fora
  // com o verbete no hash.
  // O hash é estado que mora fora do React, e a leitura precisa acontecer
  // depois da hidratação: o servidor não conhece a âncora, e resolver isso no
  // valor inicial do estado abriria divergência entre HTML e primeiro render.
  useEffect(() => {
    function aplicarHash() {
      const alvo = window.location.hash.slice(1)
      if (!alvo) return
      if (GLOSSARIO.some((v) => `verbete-${v.id}` === alvo)) {
        verbeteAlvo.current = alvo
        setGlossarioAberto(true)
      } else if (alvo === 'fluxo') {
        setFluxoAberto(true)
      }
    }

    const frame = requestAnimationFrame(aplicarHash)
    window.addEventListener('hashchange', aplicarHash)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', aplicarHash)
    }
    // GLOSSARIO é memoizado por locale em porLocale: a referência só muda se o
    // idioma mudar, e aí o efeito precisa mesmo reler os verbetes.
  }, [GLOSSARIO])

  // O painel só tem altura no frame seguinte ao que abre, então a rolagem
  // espera o estado virar layout.
  useEffect(() => {
    if (!glossarioAberto || !verbeteAlvo.current) return
    const alvo = document.getElementById(verbeteAlvo.current)
    verbeteAlvo.current = null
    if (alvo) requestAnimationFrame(() => alvo.scrollIntoView({ block: 'center' }))
  }, [glossarioAberto])

  function abrirVerbete(event, id) {
    event.preventDefault()
    verbeteAlvo.current = `verbete-${id}`
    if (glossarioAberto) {
      const alvo = document.getElementById(verbeteAlvo.current)
      verbeteAlvo.current = null
      if (alvo) alvo.scrollIntoView({ block: 'center' })
      return
    }
    setGlossarioAberto(true)
  }

  return (
    <>
      <section className="scroll-mt-24 pb-[110px] max-tab:pb-[92px] max-mob:pb-[72px]" id="fluxo">
        <div className="wrap">
          <div className="eyebrow reveal">Como funciona</div>
          <h2 className="reveal m-0 mt-3.5 max-w-[22ch] text-balance text-[clamp(28px,4.4vw,54px)] font-extrabold leading-none tracking-[-0.02em] text-ink">
            Da decisão da marca até a exibição no painel.
          </h2>

          <div className="reveal mt-9 border-t border-ink">
            <h3 className="m-0">
              <button
                aria-controls="fluxo-painel"
                aria-expanded={fluxoAberto}
                className={`${CABECALHO} text-[clamp(17px,2.2vw,20px)] font-extrabold text-ink`}
                id="fluxo-botao"
                onClick={() => setFluxoAberto((aberto) => !aberto)}
                type="button"
              >
                <span>Como a compra acontece, passo a passo</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`flex-none text-orange transition-transform duration-200 ${
                    fluxoAberto ? 'rotate-180' : ''
                  }`}
                  size={22}
                />
              </button>
            </h3>
            <div
              aria-labelledby="fluxo-botao"
              className={`${PAINEL} ${fluxoAberto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              id="fluxo-painel"
              role="region"
            >
              <div className="overflow-hidden">
                <ol className="m-0 grid list-none grid-cols-3 gap-[18px] p-0 pb-[26px] max-tab:grid-cols-2 max-mob:grid-cols-1">
                  {FLUXO.map((passo) => (
                    <li
                      className="ticks flex flex-col gap-2 rounded-[16px] border border-line bg-white p-6"
                      key={passo.num}
                    >
                      <span className="eyebrow text-orange">{passo.num}</span>
                      <h4 className="m-0 text-[19px] font-extrabold leading-tight text-ink">
                        {passo.etapa}
                      </h4>
                      <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">
                        {passo.texto}
                      </p>
                      {passo.verbete && (
                        <a
                          className="mt-auto pt-3 text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-150 hover:text-orange"
                          href={`#verbete-${passo.verbete}`}
                          onClick={(event) => abrirVerbete(event, passo.verbete)}
                        >
                          O que é {passo.etapa}
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-24 bg-bone py-[110px] max-tab:py-[92px] max-mob:py-[72px]"
        id="glossario"
      >
        <div className="wrap">
          <div className="eyebrow reveal">Glossário</div>
          <div className="reveal mt-3.5 border-t border-ink">
            <h2 className="m-0">
              <button
                aria-controls="glossario-painel"
                aria-expanded={glossarioAberto}
                className={`${CABECALHO} text-[clamp(22px,3.2vw,34px)] font-extrabold leading-tight tracking-[-0.02em] text-ink`}
                id="glossario-botao"
                onClick={() => setGlossarioAberto((aberto) => !aberto)}
                type="button"
              >
                <span>As siglas desta página, em uma frase cada.</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`flex-none text-orange transition-transform duration-200 ${
                    glossarioAberto ? 'rotate-180' : ''
                  }`}
                  size={22}
                />
              </button>
            </h2>
            <div
              aria-labelledby="glossario-botao"
              className={`${PAINEL} ${glossarioAberto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              id="glossario-painel"
              role="region"
            >
              <div className="overflow-hidden">
                <dl className="m-0 grid grid-cols-2 gap-[18px] pb-[26px] max-mob:grid-cols-1">
                  {GLOSSARIO.map((verbete) => (
                    <div
                      className="ticks scroll-mt-32 rounded-[16px] border border-line bg-white p-6"
                      id={`verbete-${verbete.id}`}
                      key={verbete.id}
                    >
                      <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-[21px] font-extrabold leading-tight text-ink">
                          {verbete.sigla}
                        </span>
                        <span className="eyebrow">{verbete.nome}</span>
                      </dt>
                      <dd className="m-0 mt-2.5 text-[15.5px] leading-relaxed text-ink-soft">
                        {verbete.texto}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
