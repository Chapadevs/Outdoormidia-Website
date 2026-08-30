'use client'
import { useState } from 'react'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { DIFERENCIAIS } from '@/lib/diferenciais'

export default function Diferenciais({ num, moreHref }) {
  const [ativo, setAtivo] = useState(0)
  const d = DIFERENCIAIS[ativo]
  const cards = d.oQueE?.cards ?? []

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="diferenciais">
      <div className="wrap">
        <div className="reveal mb-[34px] flex items-start justify-between gap-10 max-tab:flex-col max-tab:gap-4">
          <SectionHeading num={num} title="Diferenciais" className="flex-1 max-tab:w-full" />
          <div className="flex w-[34ch] flex-col gap-2 max-tab:w-full">
            <p className="m-0 text-pretty text-lg leading-snug text-ink-soft">
              O que separa uma campanha que a cidade vê de uma que passa despercebida.
            </p>
            {moreHref && (
              <Link
                className="eyebrow whitespace-nowrap transition-colors duration-150 hover:text-orange"
                href={moreHref}
              >
                Ver todos →
              </Link>
            )}
          </div>
        </div>

        <div className="reveal grid grid-cols-[minmax(240px,320px)_1fr] items-start gap-x-14 gap-y-8 rounded-[16px] bg-ink p-10 max-tab:grid-cols-1 max-mob:gap-x-0 max-mob:p-6">
          <div className="flex min-w-0 flex-col" role="tablist">
            {DIFERENCIAIS.map((item, i) => (
              <button
                aria-controls="diferencial-painel"
                aria-selected={i === ativo}
                className={`relative flex w-full cursor-pointer items-center gap-4 border-b border-white/10 py-3.5 pl-4 text-left transition-colors duration-200 ${
                  i === ativo ? 'text-white' : 'text-white/55 hover:text-white/85'
                }`}
                key={item.slug}
                onClick={() => setAtivo(i)}
                role="tab"
                type="button"
              >
                {i === ativo && (
                  <span className="absolute left-0 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-full bg-orange"></span>
                )}
                <span className="font-display text-[12px] tracking-[0.12em] text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-pretty text-[15px] font-semibold leading-snug tracking-[-0.005em]">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          <div className="flex min-w-0 flex-col gap-4" id="diferencial-painel">
            {d.tagline && <span className="eyebrow text-orange">{d.tagline}</span>}
            <h3 className="m-0 text-balance text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.06] tracking-[-0.025em] text-white">
              {d.title}
            </h3>
            <p className="m-0 max-w-[52ch] text-pretty text-[clamp(16px,1.35vw,17.5px)] leading-relaxed text-white/70">
              {d.intro}
            </p>

            {cards.length > 0 && (
              <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8 gap-y-3.5 border-t border-white/12 pt-6">
                {cards.map((card) => (
                  <div className="flex items-baseline gap-3" key={card.title}>
                    <span className="h-[5px] w-[5px] flex-none rounded-full bg-orange"></span>
                    <span className="text-pretty text-[15px] font-semibold leading-snug text-white">
                      {card.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Link
              className="mt-2 text-sm font-bold text-orange transition-colors duration-150 hover:text-white"
              href={d.href}
            >
              Ver diferencial →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
