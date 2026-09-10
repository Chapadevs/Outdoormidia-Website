import ProposalForm from '@/components/forms/ProposalForm'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import { getLocations } from '@/lib/locations'
import { getPlatforms } from '@/lib/platforms'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('proposta.titulo')
  const descricao = t('proposta.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/proposta', locale),
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

export default async function PropostaPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  // getLocations() já cai em DEFAULT_LOCATIONS se o Firestore não responder.
  // Os formatos saem de PLATFORMS (o catálogo de 8), não de PLATFORMS_LISTAGEM:
  // os Projetos Icônicos são sob medida e têm CTA próprio, fora do briefing.
  const pracas = await getLocations(locale)
  const formatos = getPlatforms(locale).map(({ slug, name }) => ({ slug, name }))

  return <ProposalForm pracas={pracas} formatos={formatos} />
}
