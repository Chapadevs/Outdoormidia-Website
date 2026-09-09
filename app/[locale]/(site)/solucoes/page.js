import { Link } from '@/i18n/navigation'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import MapaCobertura from '@/components/ui/MapaCobertura'
import Diferenciais from '@/components/sections/Diferenciais'
import Platforms from '@/components/sections/Platforms'
import SolucoesHero from '@/components/sections/SolucoesHero'
import NovaCampanha from '@/components/sections/NovaCampanha'
import FormatosGallery from '@/components/sections/FormatosGallery'
import { getLocations } from '@/lib/locations'
import { setRequestLocale } from 'next-intl/server'

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

const DESCRIPTION =
  'Tudo o que a Outdoormídia coloca na rua: os diferenciais que sustentam a operação, as praças de PR e SC, as 8 plataformas de mídia exterior e os projetos icônicos.'

export const metadata = {
  title: 'Soluções | Outdoormídia',
  description: DESCRIPTION,
  alternates: { canonical: '/solucoes' },
  openGraph: {
    title: 'Soluções | Outdoormídia',
    description: DESCRIPTION,
    locale: 'pt_BR',
    type: 'website',
  },
}

export const revalidate = 3600

export default async function SolucoesPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  const locations = await getLocations()

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
            <div className="reveal mb-10 grid grid-cols-[1fr_1fr] items-center gap-[54px] max-tab:grid-cols-1 max-tab:gap-8">
              <div className="grid grid-cols-[220px_1fr] gap-[54px] max-tab:grid-cols-1 max-tab:gap-3">
                <div className="eyebrow text-orange">Presença</div>
                <p className="m-0 max-w-[68ch] text-[15.5px] leading-relaxed text-ink-soft">
                  Estamos presentes em Curitiba, Região Metropolitana, Litoral do Paraná,
                  Joinville, Itajaí e Balneário Camboriú, sempre nos pontos de maior fluxo,
                  visibilidade e impacto real.
                </p>
              </div>
              <div className="w-full max-tab:mx-auto max-tab:max-w-[520px]">
                <MapaCobertura />
              </div>
            </div>
            <div className="grid grid-cols-5 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
              {locations.map((loc) => (
                <Link
                  className="ticks reveal flex flex-col gap-2.5 rounded-[16px] border border-line bg-white p-6 transition-colors duration-200 hover:border-orange"
                  href="/solucoes/regioes-cobertura"
                  key={loc.id}
                >
                  {loc.formats?.length > 0 && (
                    <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-orange">
                      {loc.formats.length}{' '}
                      {loc.formats.length === 1 ? 'plataforma' : 'plataformas'}
                    </span>
                  )}
                  <h3 className="m-0 text-[19px] font-extrabold leading-[1.15] text-ink">
                    {loc.name}
                  </h3>
                  {loc.desc && (
                    <p className="m-0 text-[13.5px] leading-[1.45] text-ink-soft">{loc.desc}</p>
                  )}
                </Link>
              ))}
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

        <Platforms />

        <NovaCampanha />
      </main>
    </>
  )
}
