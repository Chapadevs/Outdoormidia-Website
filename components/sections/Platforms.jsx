import SectionHeading from '@/components/ui/SectionHeading'
import { PLATFORMS } from '@/lib/platforms'

export default function Platforms() {
  return (
    <section className="pb-[110px] max-mob:pb-[72px]" id="plataformas">
      <div className="wrap">
        <SectionHeading num="02" title="Plataformas" className="reveal mb-[34px]" />
        <div className="reveal border-t border-ink">
          {PLATFORMS.map((p) => (
            <a
              className="group relative grid grid-cols-[64px_1fr_auto_54px] items-center gap-6 overflow-hidden border-b border-line px-2 py-[26px] max-mob:grid-cols-[40px_1fr_34px] max-mob:gap-3.5 max-mob:px-1 max-mob:py-[22px]"
              href={`/plataformas/${p.slug}`}
              key={p.num}
            >
              <span
                aria-hidden
                className="absolute inset-0 z-[1] translate-y-[101%] bg-orange transition-transform duration-[320ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-y-0"
              ></span>
              <span className="font-display text-xl text-ink-soft transition-colors duration-[250ms] group-hover:text-white/65">
                {p.num}
              </span>
              <span className="relative z-[2] text-[clamp(26px,4vw,50px)] font-extrabold leading-none tracking-[-0.02em] transition-colors duration-[250ms] group-hover:text-white">
                {p.name}
              </span>
              <span className="relative z-[2] text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft transition-colors duration-[250ms] group-hover:text-white max-mob:hidden">
                {p.desc}
              </span>
              <span className="relative z-[2] justify-self-end text-[22px] text-ink-soft transition-all duration-[250ms] group-hover:translate-x-1.5 group-hover:text-white">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
