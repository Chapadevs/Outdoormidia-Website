import Breadcrumb from '@/components/ui/Breadcrumb'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import SimuladorForm from '@/components/forms/SimuladorForm'
import { getPeriodos } from '@/lib/simulador'
import NovaCampanha from '@/components/sections/NovaCampanha'
import { getLocations } from '@/lib/locations'
import { getPlatforms } from '@/lib/platforms'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('suaMarcaNoOoh.titulo')
  const descricao = t('suaMarcaNoOoh.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/area-do-anunciante/sua-marca-no-ooh', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export const revalidate = 3600

export default async function SimuladorPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  const locations = await getLocations(locale)
  // `semEstimativa` fica de fora: painel sob medida não tem CPM nem alcance de
  // tabela, e sem o filtro ele cairia no impacto padrão do simulador.
  const platforms = getPlatforms(locale).filter((p) => !p.semEstimativa).map(({ slug, name }) => ({
    slug,
    name,
  }))

  return (
    <>
      <main>
        <Breadcrumb
          items={[
            { label: 'Área do anunciante', href: '/area-do-anunciante' },
            { label: 'Sua marca no OOH' },
          ]}
        />

        <section className="pb-[54px] pt-[54px] max-mob:pb-9 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">Área do anunciante · Pré-visualização</div>
            <h1 className="display reveal mt-[18px] text-[clamp(40px,6.4vw,88px)] text-ink">
              Sua marca
              <br />
              no OOH.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Escolha a plataforma, suba a sua logo ou a sua peça pronta, e veja a sua marca
              aplicada em um painel real da Outdoormídia. Baixe a imagem em segundos.
            </p>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <div className="wrap">
            <SimuladorForm locations={locations} platforms={platforms} periodos={getPeriodos(locale)} />
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
