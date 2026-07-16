import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import CasesExplorer from '@/components/cases/CasesExplorer'
import { listPublishedCases } from '@/lib/cases/cases'
import { listTags } from '@/lib/tags/tags'
import { listTagGroups } from '@/lib/tags/groups'

const DESCRIPTION =
  'Cases de mídia Out of Home da Outdoormídia: campanhas em outdoor, LED, MUB, aeroporto e projetos icônicos no Paraná e em Santa Catarina.'

export const metadata = {
  title: 'Cases — Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/cases' },
  openGraph: {
    title: 'Cases — Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export const dynamic = 'force-dynamic'

export default async function CasesPage() {
  const [cases, tags, groups] = await Promise.all([
    listPublishedCases(),
    listTags('cases'),
    listTagGroups('cases'),
  ])

  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: 'Cases' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Resultados · Out of Home</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Cases.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Campanhas reais nas ruas do Paraná e de Santa Catarina — do lançamento que ocupou
              Curitiba ao circuito segmentado que falou com o público certo. Filtre por segmento e
              veja o que o Out of Home entrega.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SectionHeading num="01" title="Todos os cases" className="reveal mb-[34px]" />
            <CasesExplorer cases={cases} tags={tags} groups={groups} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
