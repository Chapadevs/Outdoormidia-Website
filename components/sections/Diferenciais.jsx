'use client'
import { useState } from 'react'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { DIFERENCIAIS } from '@/lib/diferenciais'

export default function Diferenciais({ num = '01', moreHref }) {
  const [ativo, setAtivo] = useState(0)
  const d = DIFERENCIAIS[ativo]

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="diferenciais">
      <div className="wrap">
        <div className="reveal mb-[34px] flex items-end justify-between gap-5">
          <SectionHeading num={num} title="Diferenciais" className="flex-1" />
          {moreHref && (
            <Link
              className="eyebrow self-end whitespace-nowrap transition-colors duration-150 hover:text-orange"
              href={moreHref}
            >
              Ver todos →
            </Link>
          )}
        </div>
        <p className="reveal mb-[34px] max-w-[54ch] text-lg text-ink-soft">
          O que separa uma campanha que a cidade vê de uma que passa despercebida.
        </p>

        <div className="reveal mb-12 flex flex-wrap gap-2 max-mob:mb-8" role="tablist">
          {DIFERENCIAIS.map((item, i) => (
            <button
              aria-controls="diferencial-painel"
              aria-selected={i === ativo}
              className={`inline-flex cursor-pointer items-center whitespace-nowrap rounded-full border px-[18px] py-[11px] text-[14.5px] font-semibold tracking-[-0.005em] transition-colors duration-200 ${
                i === ativo
                  ? 'border-ink bg-ink text-white'
                  : 'border-line bg-transparent text-ink-soft hover:border-line-2 hover:text-ink'
              }`}
              key={item.slug}
              onClick={() => setAtivo(i)}
              role="tab"
              type="button"
            >
              {item.title}
            </button>
          ))}
        </div>

        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-x-16 gap-y-8 border-t border-line pt-10 max-tab:gap-x-8 max-mob:pt-7"
          id="diferencial-painel"
        >
          <div className="reveal flex min-w-0 flex-col gap-4">
            <span className="eyebrow text-orange">{d.num}</span>
            <h3 className="m-0 text-balance text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.06] tracking-[-0.025em] text-ink">
              {d.title}
            </h3>
            <p className="m-0 max-w-[46ch] text-pretty text-[clamp(16px,1.35vw,17.5px)] leading-relaxed text-ink-soft">
              {d.intro}
            </p>
            <Link
              className="mt-1.5 text-sm font-bold text-orange transition-colors duration-150 hover:text-ink"
              href={d.href}
            >
              Ver diferencial →
            </Link>
          </div>

          <div className="reveal flex min-w-0 flex-col">
            {d.oQueE.cards.map((card) => (
              <div
                className="flex items-baseline gap-3.5 border-b border-line py-3.5"
                key={card.title}
              >
                <span className="h-[5px] w-[5px] flex-none rounded-full bg-orange"></span>
                <span className="text-pretty text-[clamp(15px,1.25vw,16px)] font-semibold leading-snug text-ink">
                  {card.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
