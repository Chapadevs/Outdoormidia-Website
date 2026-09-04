'use client'

import { MapPinned, MonitorCheck, PencilRuler } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollToButton from '@/components/widgets/ScrollToButton'

const ETAPAS = [
  {
    num: '01',
    title: 'Planejamento',
    Icone: MapPinned,
    text: 'Objetivo e região definidos, plataformas e pontos selecionados, audiência lida e proposta de mídia montada.',
  },
  {
    num: '02',
    title: 'Produção',
    Icone: PencilRuler,
    text: 'Especificação por formato, adequação do criativo ao ponto e preparo dos materiais, estáticos ou digitais.',
  },
  {
    num: '03',
    title: 'Veiculação e dados',
    Icone: MonitorCheck,
    text: 'Instalação ou upload, conferência, monitoramento e entrega dos dados de audiência do período.',
  },
]

// Ponto da pista em que o fecho entra, depois da terceira etapa já acesa. O que
// sobra de pista depois dele é o tempo em que o trilho segue preso com o texto
// inteiro na tela: é isso que impede a seção de sair antes de ele ser lido.
const ENTRADA_DO_FECHO = 0.78

// O mesmo bloco serve a home e /sobre — editar aqui reflete nos dois. Em /sobre
// ele entra sob o título "Por que a Outdoormídia", que é a seção que ele passou
// a ocupar; o conteúdo não muda de uma página para a outra.
//
// O trilho fica preso na tela enquanto a página rola: o progresso da rolagem
// dentro da pista acende as etapas uma a uma. Abaixo de 980px o trilho não
// existe (não há largura para três colunas), a seção vira lista empilhada e
// todas as etapas nascem acesas.
export default function Process({ num, title = 'Gestão 360 OM' }) {
  const pistaRef = useRef(null)
  // null enquanto não houve medição (SSR e sem JS): nesse estado tudo nasce aceso.
  const [progresso, setProgresso] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 981px)')
    let frame = 0

    const medir = () => {
      frame = 0
      const pista = pistaRef.current
      if (!pista) return
      const { top, height } = pista.getBoundingClientRect()
      // No trilho preso, o avanço é a rolagem consumida dentro da pista. No
      // vertical nada prende a tela: o avanço é o quanto da lista já passou da
      // linha de gatilho, a 55% da altura da janela.
      const bruto = mq.matches
        ? -top / (height - window.innerHeight)
        : (window.innerHeight * 0.55 - top) / height
      setProgresso(Math.min(Math.max(bruto, 0), 1))
    }

    const agendar = () => {
      if (!frame) frame = requestAnimationFrame(medir)
    }

    medir()
    mq.addEventListener('change', agendar)
    window.addEventListener('scroll', agendar, { passive: true })
    window.addEventListener('resize', agendar)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      mq.removeEventListener('change', agendar)
      window.removeEventListener('scroll', agendar)
      window.removeEventListener('resize', agendar)
    }
  }, [])

  const avanco = progresso ?? 1
  const ligada = (i) => progresso === null || avanco >= i / ETAPAS.length
  const preenchimento = (i) => Math.min(Math.max(avanco * ETAPAS.length - i, 0), 1)
  const fechoVisivel = progresso === null || avanco >= ENTRADA_DO_FECHO

  return (
    <section className="bg-bone pb-[110px] max-mob:pb-[72px]" id="processo">
      <div className="wrap pt-[110px] text-center max-mob:pt-[72px]">
        <SectionHeading className="reveal mb-4 justify-center" num={num} rule={false} title={title} />
        <p className="reveal mb-4 text-lg text-ink-soft">Do objetivo à notoriedade</p>
        <p className="reveal mx-auto max-w-[72ch] text-ink-soft">
          Você diz o objetivo, para quem e onde precisa aparecer. A Outdoormídia cruza região,
          fluxo, formato, audiência e investimento para montar o melhor caminho da campanha.
        </p>
      </div>

      <div className="relative -mt-[7vh] h-[300vh] max-tab:mt-0 max-tab:h-auto" ref={pistaRef}>
        <div className="sticky top-0 flex h-screen flex-col justify-center max-tab:static max-tab:h-auto max-tab:py-16">
          <div className="wrap w-full">
            <div className="grid grid-cols-3 max-tab:grid-cols-1">
              {ETAPAS.map((etapa, i) => (
                <div className="relative flex flex-col max-tab:pb-14 max-tab:pl-12" key={etapa.num}>
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-[9px] top-0 hidden border-l-2 border-dashed border-[rgba(22,17,13,0.22)] max-tab:block"
                  ></div>
                  <div
                    aria-hidden="true"
                    className="absolute left-[9px] top-0 hidden w-[2px] bg-orange max-tab:block"
                    style={{ height: `${preenchimento(i) * 100}%` }}
                  ></div>

                  <div
                    className={`flex flex-col items-center transition-opacity duration-700 ease-out max-tab:items-start ${
                      ligada(i) ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="display relative select-none px-6 text-center text-[104px] leading-none text-orange max-lap:text-[82px] max-tab:px-0 max-tab:text-left max-mob:text-[68px]"
                    >
                      <span className="absolute left-[-38px] top-1/2 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange max-tab:block"></span>
                      {etapa.num}
                    </span>

                    <div className="relative my-7 h-[3px] w-full max-tab:hidden">
                      <div className="absolute inset-x-0 top-[1px] border-t-2 border-dashed border-[rgba(22,17,13,0.22)]"></div>
                      <div
                        className="absolute left-0 top-0 h-[3px] bg-orange"
                        style={{ width: `${preenchimento(i) * 100}%` }}
                      ></div>
                      {preenchimento(i) > 0 && preenchimento(i) < 1 && (
                        <span
                          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange"
                          style={{ left: `${preenchimento(i) * 100}%` }}
                        ></span>
                      )}
                    </div>

                    <div className="flex flex-col items-center px-6 text-center max-tab:mt-6 max-tab:items-start max-tab:px-0 max-tab:text-left">
                      <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-orange text-white">
                        <etapa.Icone size={24} />
                      </span>

                      <h3 className="display m-0 mb-4 mt-6 text-[26px] leading-tight text-ink max-mob:text-[22px]">
                        {etapa.title}
                      </h3>
                      <div className="mb-6 h-[3px] w-9 bg-orange"></div>

                      <p className="m-0 max-w-[38ch] text-[15.5px] leading-relaxed text-ink-soft max-tab:max-w-[60ch]">
                        {etapa.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`mt-[72px] text-center transition-all duration-700 ease-out max-tab:mt-4 ${
                fechoVisivel
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-10 opacity-0'
              }`}
            >
              <p className="mx-auto max-w-[70ch] text-ink-soft">
                Em projetos de painel exclusivo, o Gestão 360 OM inclui ainda consultoria legal de
                licenciamento e instalação completa.{' '}
                <Link
                  className="font-bold text-orange transition-colors duration-150 hover:text-ink"
                  href="/plataformas/digital-signage"
                >
                  Saiba mais
                </Link>
                .
              </p>

              <div className="mt-9">
                <ScrollToButton className="btn btn-ghost" targetId="nova-campanha">
                  Quero anunciar
                </ScrollToButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
