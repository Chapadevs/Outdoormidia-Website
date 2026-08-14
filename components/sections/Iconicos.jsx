'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ICONICOS } from '@/lib/iconicos'

export default function Iconicos({ num = '03' }) {
  const [active, setActive] = useState(0)
  const item = ICONICOS[active]

  const go = (i) => setActive(((i % ICONICOS.length) + ICONICOS.length) % ICONICOS.length)

  return (
    <section
      className="relative overflow-hidden bg-orange py-[110px] text-white max-mob:py-[72px]"
      id="iconicos"
    >
      {/* número gigante da vez — assinatura visual da faixa, atrás do conteúdo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[.2em] -right-[.05em] z-[1] select-none text-[clamp(200px,30vw,460px)] font-extrabold leading-[.8] tracking-[-0.05em] text-white/15"
      >
        {item.num}
      </span>

      <div className="wrap relative z-[2]">
        <div className="reveal flex items-center gap-3.5">
          <span className="font-display text-[15px] text-white/75">{num}</span>
          <h2 className="m-0 text-[clamp(28px,4.4vw,54px)] font-extrabold leading-none tracking-[-0.02em]">
            <Link
              className="text-white transition-opacity duration-150 hover:opacity-70"
              href="/plataformas/projetos-iconicos"
            >
              Icônicos
            </Link>
          </h2>
          <span className="h-px flex-1 bg-white/40"></span>
          <span className="eyebrow shrink-0 text-white/85 max-tab:hidden">Fora do catálogo</span>
          <div className="flex shrink-0 gap-2.5 max-tab:hidden">
            <button
              aria-label="Projeto anterior"
              className="grid size-[46px] cursor-pointer place-items-center rounded-full border-[1.5px] border-white/55 text-[17px] text-white transition duration-200 hover:bg-white hover:text-orange"
              onClick={() => go(active - 1)}
              type="button"
            >
              ←
            </button>
            <button
              aria-label="Próximo projeto"
              className="grid size-[46px] cursor-pointer place-items-center rounded-full border-[1.5px] border-white/55 text-[17px] text-white transition duration-200 hover:bg-white hover:text-orange"
              onClick={() => go(active + 1)}
              type="button"
            >
              →
            </button>
          </div>
        </div>

        <div className="reveal py-20 max-mob:py-12">
          <div className="eyebrow text-white">{item.tagline}</div>
          <h3 className="display m-0 mt-[26px] text-[clamp(52px,7.4vw,116px)]">{item.name}</h3>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-12 max-mob:gap-8">
            <p className="m-0 max-w-[34ch] text-[clamp(18px,1.5vw,23px)] leading-[1.45] text-white/90">
              {item.short}
            </p>
            <Link className="btn btn-on-orange px-[34px] py-[19px] text-[15px]" href={item.href}>
              {item.ctaLabel} →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-white/40 max-mob:grid-cols-1">
          {ICONICOS.map((i, index) => (
            <button
              className={`-mt-px flex cursor-pointer items-baseline gap-3.5 border-0 border-t-[3px] bg-transparent pb-[34px] pt-[30px] text-left font-sans transition-[color,border-color] duration-200 max-mob:py-6 ${
                index === active ? 'border-t-white text-white' : 'border-t-transparent text-white/65'
              }`}
              key={i.slug}
              onClick={() => setActive(index)}
              type="button"
            >
              <span className="text-[13px] font-semibold">{i.num}</span>
              <span className="text-[clamp(20px,2vw,30px)] font-extrabold leading-none tracking-[-0.02em]">
                {i.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
