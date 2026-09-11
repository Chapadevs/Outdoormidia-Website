import { Link } from '@/i18n/navigation'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
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

const PRACAS = [
  'Curitiba',
  'Região Metropolitana',
  'Litoral do Paraná',
  'Joinville',
  'Itajaí',
  'Balneário Camboriú',
  'Rodovias PR-SC',
]

const TIPOS_MIDIA = [
  {
    title: 'Digital (DOOH)',
    text: 'Veiculação programada em telas de LED com tecnologia de ponta, flexibilidade de conteúdo e alto impacto visual. Ideal para campanhas dinâmicas, segmentadas e em tempo real.',
  },
  {
    title: 'Front Light (Estático)',
    text: 'Mídia tradicional e contínua com forte presença física, visibilidade prolongada e alta memorização. Ideal para reforço de marca e ocupação estratégica de território.',
  },
]

const FORMATOS = [
  {
    name: 'Top Sight',
    tech: 'Estático / Digital',
    images: [
      { src: '/media/tipos-de-midia/top-sight-estatico.jpeg', label: 'Estático' },
      { src: '/media/tipos-de-midia/top-sight-digital.jpg', label: 'Digital' },
    ],
  },
  {
    name: 'Top Sight Urbanity',
    tech: 'Digital',
    images: [{ src: '/media/tipos-de-midia/top-sight-urbanity-digital.jpg' }],
  },
  {
    name: 'Super Top Urbanity',
    tech: 'Digital',
    images: [{ src: '/media/tipos-de-midia/super-top-urbanity.jpg' }],
  },
  { name: 'Super Top Sequencial', tech: 'Estático' },
  {
    name: 'Super Billboard',
    tech: 'Estático',
    images: [{ src: '/media/tipos-de-midia/super-billboard.jpg' }],
  },
  {
    name: 'Poster Sight',
    tech: 'Estático / Digital',
    images: [{ src: '/media/tipos-de-midia/poster-sight-digital.jpg', label: 'Digital' }],
  },
  {
    name: 'Super Poster',
    tech: 'Estático',
    images: [{ src: '/media/tipos-de-midia/super-poster-estatico.jpg' }],
  },
  {
    name: 'Relógio Digital',
    tech: 'Digital',
    images: [{ src: '/media/tipos-de-midia/relogio-digital.jpg' }],
  },
  {
    name: 'Banca Horizontal',
    tech: 'Digital',
    images: [{ src: '/media/tipos-de-midia/banca-horizontal.jpg' }],
  },
  {
    name: 'Banca Vertical',
    tech: 'Digital',
    images: [{ src: '/media/tipos-de-midia/banca-vertical.jpg' }],
  },
  {
    name: 'Totem (Shoppings)',
    tech: 'Digital',
    images: [{ src: '/media/tipos-de-midia/totem.jpg' }],
  },
  { name: 'Empena (Shoppings)', tech: 'Digital' },
  {
    name: 'Mega Banner (Shoppings)',
    tech: 'Digital',
    images: [{ src: '/media/tipos-de-midia/mega-banner.jpg' }],
  },
  {
    name: 'Topo de Prédio',
    tech: 'Digital / Estático',
    images: [
      { src: '/media/tipos-de-midia/topo-de-predio-digital.jpg', label: 'Digital' },
      { src: '/media/tipos-de-midia/topo-de-predio-estatico.jpg', label: 'Estático' },
    ],
  },
  { name: 'Billboard', tech: 'Estático / Digital' },
  {
    name: 'Bike Mídia',
    tech: 'Mídia Móvel: trio bikes sequenciais / estático',
    images: [{ src: '/media/tipos-de-midia/bike-midia.jpg' }],
  },
  {
    name: 'Bus Mídia',
    tech: 'Estático',
    images: [{ src: '/media/tipos-de-midia/busdoor.jpeg' }],
  },
]


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('solucoes.titulo')
  const descricao = t('solucoes.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/solucoes', locale),
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

export default async function SolucoesPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: 'Soluções' }]} />

        <SolucoesHero />

        <Diferenciais moreHref="/solucoes/diferenciais" />

        <section className="py-[110px] max-mob:py-[72px]" id="regioes">
          <div className="wrap">
            <div className="reveal mb-[34px] flex items-end justify-between gap-5">
              <SectionHeading title="Regiões" className="flex-1" />
              <Link
                className="eyebrow self-end whitespace-nowrap transition-colors duration-150 hover:text-orange"
                href="/solucoes/regioes-cobertura"
              >
                Ver o mapa →
              </Link>
            </div>
            <p className="reveal mb-10 max-w-[54ch] text-lg text-ink-soft">
              Uma rede contínua nos dois estados onde o Sul se movimenta. Escolha a praça e a
              gente mostra o que existe nela.
            </p>
            <div className="reveal grid grid-cols-[minmax(0,1fr)_minmax(0,560px)] items-start gap-[54px] max-tab:grid-cols-1 max-tab:gap-8">
              <div className="flex max-w-[52ch] flex-col gap-5">
                <div className="eyebrow text-orange">Presença</div>
                <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">
                  Estamos presentes em Curitiba, Região Metropolitana, Litoral do Paraná,
                  Joinville, Itajaí e Balneário Camboriú, sempre nos pontos de maior fluxo,
                  visibilidade e impacto real.
                </p>
                <PracaChips pracas={PRACAS} />
              </div>
              <div className="w-full max-tab:mx-auto max-tab:max-w-[520px]">
                <MapaCobertura />
              </div>
            </div>
          </div>
        </section>

        <section className="py-[110px] max-mob:py-[72px]" id="tipos-de-midia">
          <div className="wrap">
            <SectionHeading title="Tipos de mídia" className="reveal mb-[34px]" />
            <p className="reveal mb-10 max-w-[54ch] text-lg text-ink-soft">
              Tecnologia e dinâmica da exposição: escolha entre o alcance programável do digital
              e a presença contínua do estático.
            </p>
            <div className="grid grid-cols-2 gap-[18px] max-tab:grid-cols-1">
              {TIPOS_MIDIA.map((t) => (
                <div
                  className="ticks reveal flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 max-mob:p-6"
                  key={t.title}
                >
                  <h3 className="m-0 text-[22px] font-extrabold leading-tight text-ink">
                    {t.title}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{t.text}</p>
                </div>
              ))}
            </div>

            <h3 className="reveal mb-3 mt-[54px] text-[13px] font-bold uppercase tracking-[0.1em] text-ink-soft">
              Formatos
            </h3>
            <p className="reveal mb-6 max-w-[54ch] text-lg text-ink-soft">
              Variações físicas e visuais dos nossos produtos.
            </p>
            <FormatosGallery formatos={FORMATOS} />
            <p className="reveal mt-6 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
              Cada formato foi desenvolvido para unir estética, impacto e performance,
              adaptando-se a diferentes contextos urbanos e objetivos de marca.
            </p>
            <div className="ticks reveal mt-6 max-w-[62ch] rounded-[16px] border border-line bg-bone p-6 text-[14px] leading-relaxed text-ink-soft">
              <strong className="text-ink">Ajuda a lembrar:</strong> Top (vertical, nosso reel
              no digital) · Poster (horizonte, horizontal, nosso vídeo do YouTube no digital) ·
              o que vem de super é 2x maior.
            </div>
          </div>
        </section>

        <PlatformsCarousel plataformas={getPlatformsListagem(locale)} />

        <NovaCampanha />
      </main>
    </>
  )
}
