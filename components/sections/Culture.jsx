import { MapPin, TrendingUp, Users } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import StatGrid from '@/components/ui/StatGrid'
import { getLocale, getTranslations } from 'next-intl/server'
import { getNumerosMarca } from '@/lib/numeros'

// Os 67 anos saíram do quadro de números e ficaram no hero e no card 2, que é
// onde eles falam com candidato: ali o número é estabilidade, não inventário.
const PILARES = [
  {
    title: 'A rua é o produto',
    text: 'Nossa mídia não vive numa aba do navegador. Está a caminho de casa, na rodovia, no aeroporto. Quem trabalha aqui vê na prática o resultado do próprio trabalho.',
    Icone: MapPin,
  },
  {
    title: '67 anos, mercado em movimento',
    text: 'A empresa é de 1959 e se digitalizou: 175 telas digitais, dados de audiência por campanha e câmeras ao vivo 24×7. Estabilidade de quem atravessou seis décadas, com a tecnologia de quem não parou.',
    Icone: TrendingUp,
  },
  {
    title: 'Time enxuto, dono do que faz',
    text: 'Da negociação ao ponto instalado, quem faz assina. São poucas camadas entre a ideia e a rua, e isso vale tanto para o cliente quanto para quem trabalha aqui.',
    Icone: Users,
  },
]

export default async function Culture() {
  const t = await getTranslations('Culture')
  const locale = await getLocale()
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
          {PILARES.map((p) => (
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
