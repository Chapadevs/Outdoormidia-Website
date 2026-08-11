import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { DIFERENCIAIS } from '@/lib/diferenciais'

export default function Diferenciais({ num = '01', moreHref }) {
  return (
    <section className="py-[110px] max-mob:py-[72px]" id="diferenciais">
      <div className="wrap">
        <div className="reveal mb-[34px] flex items-end justify-between gap-5">
          <SectionHeading num={num} title="Diferenciais" className="flex-1" />
          {moreHref ? (
            <Link
              className="eyebrow self-end whitespace-nowrap transition-colors duration-150 hover:text-orange"
              href={moreHref}
            >
              Ver todos →
            </Link>
          ) : (
            <span className="eyebrow self-end whitespace-nowrap max-mob:hidden">Arraste →</span>
          )}
        </div>
        <p className="reveal mb-10 max-w-[54ch] text-lg text-ink-soft">
          O que separa uma campanha que a cidade vê de uma que passa despercebida.
        </p>
      </div>
      <div className="wrap">
        <div className="rail">
          {DIFERENCIAIS.map((d) => (
            <article
              className="ticks reveal flex flex-[0_0_360px] snap-start flex-col gap-4 rounded-[16px] border border-line bg-white p-7 max-mob:flex-[0_0_82vw] max-mob:p-6"
              key={d.slug}
            >
              <span className="display text-[30px] leading-none text-orange">{d.num}</span>
              <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink">{d.title}</h3>
              <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{d.text}</p>
              {d.href && (
                <Link
                  href={d.href}
                  className="mt-auto pt-5 text-sm font-bold text-orange transition-colors duration-150 hover:text-ink"
                >
                  Ver diferencial →
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
