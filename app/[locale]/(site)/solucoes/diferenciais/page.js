import Breadcrumb from '@/components/ui/Breadcrumb'
import DiferencialCard from '@/components/ui/DiferencialCard'
import SectionHeading from '@/components/ui/SectionHeading'
import StatGrid from '@/components/ui/StatGrid'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { DIFERENCIAIS } from '@/lib/diferenciais'
import { setRequestLocale } from 'next-intl/server'

const DESCRIPTION =
  'Face única, o Aeroporto Square, audiência mensurada, mídia regenerativa, circuitos MUB por nicho e a Gestão 360 OM: o que separa uma campanha que a cidade vê de uma que passa despercebida.'

const PROVA = [
  { n: '+530M', label: 'Impactos por mês' },
  { n: '175', label: 'Telas digitais' },
  { n: '24×7', label: 'Câmeras ao vivo' },
  { n: '6', label: 'Circuitos MUB' },
]

export const metadata = {
  title: 'Diferenciais | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/solucoes/diferenciais' },
  openGraph: {
    title: 'Diferenciais | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default async function DiferenciaisPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: 'Soluções', href: '/solucoes' }, { label: 'Diferenciais' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Soluções · {DIFERENCIAIS.length} diferenciais</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Diferenciais.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Mídia exterior todo mundo vende. O que muda é a exclusividade do ponto, a medição
              do público e quem responde quando a campanha entra no ar.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading title="Os diferenciais" className="reveal mb-[34px]" />
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
              {DIFERENCIAIS.map((d) => (
                <div className="reveal" key={d.slug}>
                  <DiferencialCard
                    d={d}
                    sizes="(max-width: 560px) 86vw, (max-width: 980px) 44vw, 340px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading title="A prova" className="reveal mb-[34px]" />
            <p className="reveal mb-[54px] max-w-[54ch] text-lg text-ink-soft">
              Nenhum dos números acima depende de confiança: todos são medidos e podem ser
              conferidos com o nosso time.
            </p>
            <StatGrid stats={PROVA} size="md" className="reveal" />
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
