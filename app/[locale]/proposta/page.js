import ProposalForm from '@/components/forms/ProposalForm'
import { metaDe } from '@/lib/seo'
import { getLocations } from '@/lib/locations'
import { getPlatforms } from '@/lib/platforms'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/proposta',
    locale,
    titulo: t('proposta.titulo'),
    descricao: t('proposta.descricao'),
  })
}

export const revalidate = 3600

export default async function PropostaPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  // getLocations() já cai em DEFAULT_LOCATIONS se o Firestore não responder.
  // Os formatos saem de PLATFORMS (o catálogo de 8), não de PLATFORMS_LISTAGEM:
  // os Projetos Icônicos são sob medida e têm CTA próprio, fora do briefing.
  // `valor` é o nome PT do catálogo: é o que vai para o lead e o que o
  // comercial reconhece; `name` é só o que o visitante vê no select.
  const pracas = await getLocations(locale)
  const nomesPt = new Map(getPlatforms('pt').map(({ slug, name }) => [slug, name]))
  const formatos = getPlatforms(locale).map(({ slug, name }) => ({
    slug,
    name,
    valor: nomesPt.get(slug) ?? name,
  }))

  return <ProposalForm pracas={pracas} formatos={formatos} />
}
