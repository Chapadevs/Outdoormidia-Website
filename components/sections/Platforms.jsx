import SectionHeading from '@/components/ui/SectionHeading'
import { PLATFORMS } from '@/lib/platforms'

export default function Platforms() {
  return (
    <section className="py-[110px] max-mob:py-[72px]" id="plataformas">
      <div className="wrap">
        <SectionHeading num="01" title="Plataformas" className="reveal mb-[34px]" />
        <div className="reveal border-t border-ink">
          {PLATFORMS.map((p) => (
            <a
              className="group block border-b border-line"
              href={`/plataformas#${p.slug}`}
              key={p.num}
            >
              <div className="relative grid grid-cols-[64px_1fr_auto_54px] items-center gap-6 overflow-hidden px-2 py-[26px] max-mob:grid-cols-[40px_1fr_34px] max-mob:gap-3.5 max-mob:px-1 max-mob:py-[22px]">
                <span
                  aria-hidden
                  className="absolute inset-0 z-[1] translate-y-[101%] bg-orange transition-transform duration-[320ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
                ></span>
                <span className="relative z-[2] font-display text-xl text-ink-soft transition-colors duration-[250ms] group-hover:text-white/65 group-focus-visible:text-white/65">
                  {p.num}
                </span>
                <span className="relative z-[2] text-[clamp(26px,4vw,50px)] font-extrabold leading-none tracking-[-0.02em] transition-colors duration-[250ms] group-hover:text-white group-focus-visible:text-white">
                  {p.name}
                </span>
                <span className="relative z-[2] text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-[250ms] group-hover:text-white group-focus-visible:text-white max-mob:hidden">
                  {p.desc}
                </span>
                <span className="relative z-[2] justify-self-end text-[22px] text-ink-soft transition-all duration-[250ms] group-hover:translate-x-1.5 group-hover:text-white group-focus-visible:translate-x-1.5 group-focus-visible:text-white">
                  →
                </span>
              </div>

              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-[420ms] ease-[cubic-bezier(.2,.7,.2,1)] [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-focus-visible:grid-rows-[1fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="grid grid-cols-[1.4fr_1fr] items-center gap-8 px-2 pb-8 pt-1 max-tab:grid-cols-1 max-tab:gap-4 max-mob:px-1">
                    <div className="ticks flex aspect-[16/7] items-center justify-center border border-line bg-bone max-mob:aspect-[16/9]">
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-line-2">
                        Case · {p.name}
                      </span>
                    </div>
                    <p className="m-0 max-w-[38ch] text-[14.5px] leading-relaxed text-ink-soft">
                      {p.intro}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
