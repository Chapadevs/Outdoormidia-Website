'use client'
import { useState } from 'react'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { PLATFORMS_LISTAGEM } from '@/lib/platforms'

export default function Platforms({ num = '02' }) {
  const [openSlug, setOpenSlug] = useState(null)

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="plataformas">
      <div className="wrap">
        <SectionHeading num={num} title="Plataformas" href="/plataformas" className="reveal mb-[34px]" />
        <div className="reveal border-t border-ink">
          {PLATFORMS_LISTAGEM.map((p) => {
            const isOpen = openSlug === p.slug
            return (
              <div className="border-b border-line" key={p.slug}>
                <button
                  type="button"
                  className="group block w-full cursor-pointer text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenSlug(isOpen ? null : p.slug)}
                >
                  <div className="relative grid grid-cols-[64px_1fr_auto_54px] items-center gap-6 overflow-hidden px-2 py-[26px] max-mob:grid-cols-[40px_1fr_34px] max-mob:gap-3.5 max-mob:px-1 max-mob:py-[22px]">
                    <span
                      aria-hidden
                      className={`absolute inset-0 z-[1] bg-orange transition-transform duration-[320ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
                        isOpen ? 'translate-y-0' : 'translate-y-[101%] group-hover:translate-y-0 group-focus-visible:translate-y-0'
                      }`}
                    ></span>
                    <span
                      className={`relative z-[2] font-display text-xl transition-colors duration-[250ms] ${
                        isOpen ? 'text-white/65' : 'text-ink-soft group-hover:text-white/65 group-focus-visible:text-white/65'
                      }`}
                    >
                      {p.num}
                    </span>
                    <span
                      className={`relative z-[2] text-[clamp(26px,4vw,50px)] font-extrabold leading-none tracking-[-0.02em] transition-colors duration-[250ms] ${
                        isOpen ? 'text-white' : 'group-hover:text-white group-focus-visible:text-white'
                      }`}
                    >
                      {p.name}
                    </span>
                    <span
                      className={`relative z-[2] text-[13px] font-bold uppercase tracking-[0.1em] transition-colors duration-[250ms] max-mob:hidden ${
                        isOpen ? 'text-white' : 'text-ink-soft group-hover:text-white group-focus-visible:text-white'
                      }`}
                    >
                      {p.desc}
                    </span>
                    <span
                      className={`relative z-[2] justify-self-end text-[22px] transition-all duration-[250ms] ${
                        isOpen
                          ? 'rotate-90 text-white'
                          : 'text-ink-soft group-hover:translate-x-1.5 group-hover:text-white group-focus-visible:translate-x-1.5 group-focus-visible:text-white'
                      }`}
                    >
                      →
                    </span>
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-[1.4fr_1fr] items-center gap-8 px-2 pb-8 pt-1 max-tab:grid-cols-1 max-tab:gap-4 max-mob:px-1">
                      <div className="ticks flex aspect-[16/7] items-center justify-center rounded-[16px] border border-line bg-bone max-mob:aspect-[16/9]">
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-line-2">
                          Case · {p.name}
                        </span>
                      </div>
                      <div>
                        {p.marcador && (
                          <span className="mb-3 inline-flex rounded-full border border-orange px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-orange">
                            {p.marcador}
                          </span>
                        )}
                        <p className="m-0 max-w-[38ch] text-[14.5px] leading-relaxed text-ink-soft">
                          {p.intro}
                        </p>
                        <Link
                          href={p.homeHref}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange transition-colors duration-150 hover:text-ink"
                        >
                          Ver detalhes →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
