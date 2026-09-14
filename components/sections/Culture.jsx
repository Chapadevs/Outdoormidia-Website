import { MapPin, TrendingUp, Users } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import StatGrid from '@/components/ui/StatGrid'
import { getLocale, getTranslations } from 'next-intl/server'
import { getNumerosMarca } from '@/lib/numeros'

// Os 67 anos saíram do quadro de números e ficaram no hero e no card 2, que é
// onde eles falam com candidato: ali o número é estabilidade, não inventário.
// Título e texto de cada pilar vivem em `Culture.pilares` nos messages/*.json e
// entram por posição sobre esta lista, que só guarda o ícone.
const PILARES = [MapPin, TrendingUp, Users]

export default async function Culture() {
  const t = await getTranslations('Culture')
  const locale = await getLocale()
  const pilares = PILARES.map((Icone, i) => ({ Icone, ...t.raw('pilares')[i] }))
  return (
    <section className="py-[110px] max-mob:py-[72px]" id="cultura">
      <div className="wrap">
        <SectionHeading title={t('titulo')} className="reveal mb-[34px]" />
        {/* "A cidade inteira vê" vive só no hero da página: aparecia aqui e no
            card 1 também, e a repetição gastava o argumento. */}
        <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
          {t('lead')}
        </p>

        <StatGrid stats={getNumerosMarca(locale)} size="md" className="reveal mb-[54px]" />

        <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
          {pilares.map((p) => (
            <article
              className="ticks reveal flex flex-col gap-4 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
              key={p.title}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-orange text-white">
                <p.Icone size={24} />
              </span>
              <h3 className="m-0 text-[19px] font-extrabold text-ink">{p.title}</h3>
              <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
