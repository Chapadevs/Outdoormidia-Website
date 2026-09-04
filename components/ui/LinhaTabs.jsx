'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import AtivoCard from '@/components/ui/AtivoCard'

// Componente C3 do handoff: navegação por abas com a frase da linha e os cards
// dos ativos dela. Exclusivo da página de Projetos Icônicos.
//
// Os três painéis saem no HTML e a aba só troca qual fica visível, pelo mesmo
// motivo da faixa de Icônicos da home: render condicional deixaria o texto de
// duas das três linhas fora do documento, invisível para o Google e para os
// rastreadores de IA.
//
// A âncora define a aba aberta. É o que faz `/plataformas/projetos-iconicos#green`
// funcionar, e é por onde chegam os links de espelhamento das outras rotas
// (o MUB Garden na plataforma MUB, o Urbanity no Outdoor Digital). Sem isso o
// link cairia numa aba fechada e o visitante não veria nada.
const CHIP =
  'radial-reveal cursor-pointer rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-150'

export default function LinhaTabs({ linhas }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const daHash = () => {
      const hash = window.location.hash.slice(1)
      const i = linhas.findIndex((l) => l.slug === hash)
      if (i >= 0) setActive(i)
    }
    daHash()
    window.addEventListener('hashchange', daHash)
    return () => window.removeEventListener('hashchange', daHash)
  }, [linhas])

  return (
    <div>
      <div className="reveal flex flex-wrap gap-2.5" role="tablist">
        {linhas.map((linha, i) => (
          <button
            aria-selected={i === active}
            className={`${CHIP} ${
              i === active
                ? 'border-orange bg-orange text-white [--rr-fill:var(--color-ink)]'
                : 'border-line text-ink-soft [--rr-fill:var(--color-ink)] hover:text-white'
            }`}
            key={linha.slug}
            onClick={() => setActive(i)}
            role="tab"
            type="button"
          >
            {linha.name}
          </button>
        ))}
      </div>

      {linhas.map((linha, i) => (
        <div
          className="scroll-mt-24 pt-[46px] max-mob:pt-9"
          hidden={i !== active}
          id={linha.slug}
          key={linha.slug}
          role="tabpanel"
        >
          <div className="flex items-end justify-between gap-8 max-tab:flex-col max-tab:items-start max-tab:gap-6">
            <p className="m-0 max-w-[58ch] text-lg text-ink-soft">{linha.frase}</p>
            <Link className="btn btn-ghost shrink-0" href="#nova-campanha">
              {linha.ctaLinha} →
            </Link>
          </div>

          <div className="mt-[42px] grid grid-cols-2 gap-[18px] max-tab:grid-cols-1">
            {linha.ativos.map((ativo) => (
              <AtivoCard ativo={ativo} key={ativo.slug} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
