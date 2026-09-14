import { Link } from '@/i18n/navigation'
import { metaDe } from '@/lib/seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import MapaCobertura from '@/components/ui/MapaCobertura'
import PracaChips from '@/components/ui/PracaChips'
import Diferenciais from '@/components/sections/Diferenciais'
import PlatformsCarousel from '@/components/sections/PlatformsCarousel'
import { getPlatformsListagem } from '@/lib/platforms'
import SolucoesHero from '@/components/sections/SolucoesHero'
import NovaCampanha from '@/components/sections/NovaCampanha'
import FormatosGallery from '@/components/sections/FormatosGallery'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// Os dois cards de tipo de mídia vivem em `SolucoesPage.tiposMidia` nos
// messages/*.json. Nos formatos, o nome é nome de produto e não se traduz;
// `tech` e o `label` de cada foto são chaves do namespace `Tecnologia`
// (`estatico` / `digital`), resolvidas na página. A Bike Mídia é a exceção,
// com a linha própria em `SolucoesPage.techBike`.
const FORMATOS = [
  {
    name: 'Top Sight',
    tech: ['estatico', 'digital'],
    images: [
      { src: '/media/tipos-de-midia/top-sight-estatico.jpeg', label: 'estatico' },
      { src: '/media/tipos-de-midia/top-sight-digital.jpg', label: 'digital' },
    ],
  },
  {
    name: 'Top Sight Urbanity',
    tech: ['digital'],
    images: [{ src: '/media/tipos-de-midia/top-sight-urbanity-digital.jpg' }],
  },
  {
    name: 'Super Top Urbanity',
    tech: ['digital'],
    images: [{ src: '/media/tipos-de-midia/super-top-urbanity.jpg' }],
  },
  { name: 'Super Top Sequencial', tech: ['estatico'] },
  {
    name: 'Super Billboard',
    tech: ['estatico'],
    images: [{ src: '/media/tipos-de-midia/super-billboard.jpg' }],
  },
  {
    name: 'Poster Sight',
    tech: ['estatico', 'digital'],
    images: [{ src: '/media/tipos-de-midia/poster-sight-digital.jpg', label: 'digital' }],
  },
  {
    name: 'Super Poster',
    tech: ['estatico'],
    images: [{ src: '/media/tipos-de-midia/super-poster-estatico.jpg' }],
  },
  {
    name: 'Relógio Digital',
    tech: ['digital'],
    images: [{ src: '/media/tipos-de-midia/relogio-digital.jpg' }],
  },
  {
    name: 'Banca Horizontal',
    tech: ['digital'],
    images: [{ src: '/media/tipos-de-midia/banca-horizontal.jpg' }],
  },
  {
    name: 'Banca Vertical',
    tech: ['digital'],
    images: [{ src: '/media/tipos-de-midia/banca-vertical.jpg' }],
  },
  {
    name: 'Totem (Shoppings)',
    tech: ['digital'],
    images: [{ src: '/media/tipos-de-midia/totem.jpg' }],
  },
  { name: 'Empena (Shoppings)', tech: ['digital'] },
  {
    name: 'Mega Banner (Shoppings)',
    tech: ['digital'],
    images: [{ src: '/media/tipos-de-midia/mega-banner.jpg' }],
  },
  {
    name: 'Topo de Prédio',
    tech: ['digital', 'estatico'],
    images: [
      { src: '/media/tipos-de-midia/topo-de-predio-digital.jpg', label: 'digital' },
      { src: '/media/tipos-de-midia/topo-de-predio-estatico.jpg', label: 'estatico' },
    ],
  },
  { name: 'Billboard', tech: ['estatico', 'digital'] },
  {
    name: 'Bike Mídia',
    tech: 'bike',
    images: [{ src: '/media/tipos-de-midia/bike-midia.jpg' }],
  },
  {
    name: 'Bus Mídia',
    tech: ['estatico'],
    images: [{ src: '/media/tipos-de-midia/busdoor.jpeg' }],
  },
]


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/solucoes',
    locale,
    titulo: t('solucoes.titulo'),
    descricao: t('solucoes.descricao'),
  })
}

export const revalidate = 3600

export default async function SolucoesPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('SolucoesPage')
  const tt = await getTranslations('Tecnologia')

  const formatos = FORMATOS.map((f) => ({
    ...f,
    tech: Array.isArray(f.tech) ? f.tech.map((k) => tt(k)).join(' / ') : t('techBike'),
    images: f.images?.map((img) => ({ ...img, label: img.label ? tt(img.label) : undefined })),
  }))

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: t('breadcrumb') }]} />

        <SolucoesHero />

        <Diferenciais moreHref="/solucoes/diferenciais" />

        <section className="py-[110px] max-mob:py-[72px]" id="regioes">
          <div className="wrap">
            <div className="reveal mb-[34px] flex items-end justify-between gap-5">
              <SectionHeading title={t('regioesTitulo')} className="flex-1" />
              <Link
                className="eyebrow self-end whitespace-nowrap transition-colors duration-150 hover:text-orange"
                href="/solucoes/regioes-cobertura"
              >
                {t('verOMapa')}
              </Link>
            </div>
            <p className="reveal mb-10 max-w-[54ch] text-lg text-ink-soft">{t('regioesLead')}</p>
            <div className="reveal grid grid-cols-[minmax(0,1fr)_minmax(0,560px)] items-start gap-[54px] max-tab:grid-cols-1 max-tab:gap-8">
              <div className="flex max-w-[52ch] flex-col gap-5">
                <div className="eyebrow text-orange">{t('presencaLabel')}</div>
                <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">
                  {t('presencaTexto')}
                </p>
                <PracaChips pracas={t.raw('pracas')} />
              </div>
              <div className="w-full max-tab:mx-auto max-tab:max-w-[520px]">
                <MapaCobertura />
              </div>
            </div>
          </div>
        </section>

        <section className="py-[110px] max-mob:py-[72px]" id="tipos-de-midia">
          <div className="wrap">
            <SectionHeading title={t('tiposTitulo')} className="reveal mb-[34px]" />
            <p className="reveal mb-10 max-w-[54ch] text-lg text-ink-soft">{t('tiposLead')}</p>
            <div className="grid grid-cols-2 gap-[18px] max-tab:grid-cols-1">
              {t.raw('tiposMidia').map((tipo) => (
                <div
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                  key={tipo.title}
                >
                  <h3 className="m-0 text-[22px] font-extrabold leading-tight text-ink">
                    {tipo.title}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{tipo.text}</p>
                </div>
              ))}
            </div>

            <h3 className="reveal mb-3 mt-[54px] text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft">
              {t('formatosTitulo')}
            </h3>
            <p className="reveal mb-6 max-w-[54ch] text-lg text-ink-soft">{t('formatosLead')}</p>
            <FormatosGallery formatos={formatos} />
            <p className="reveal mt-6 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
              {t('formatosTexto')}
            </p>
            <div className="ticks reveal mt-6 max-w-[62ch] rounded-[16px] border border-line bg-bone p-6 text-[14px] leading-relaxed text-ink-soft">
              <strong className="text-ink">{t('ajudaLembrarTitulo')}</strong> {t('ajudaLembrarTexto')}
            </div>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]" id="programatica">
          <div className="wrap">
            <div className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
              <h3 className="m-0 text-[22px] font-extrabold leading-tight text-ink">
                {t('programaticaTitulo')}
              </h3>
              <p className="m-0 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-soft">
                {t('programaticaTexto')}
              </p>
            </div>
          </div>
        </section>

        <PlatformsCarousel plataformas={getPlatformsListagem(locale)} />

        <NovaCampanha />
      </main>
    </>
  )
}
