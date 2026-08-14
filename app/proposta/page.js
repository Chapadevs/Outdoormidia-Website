import ProposalForm from '@/components/forms/ProposalForm'
import { getLocations } from '@/lib/locations'
import { PLATFORMS } from '@/lib/platforms'

export const metadata = {
  title: 'Solicitar Proposta — Outdoormídia',
  description: 'Preencha o briefing e receba uma proposta de mídia exterior sob medida em até 1 dia útil.',
}

export const revalidate = 3600

export default async function PropostaPage() {
  // getLocations() já cai em DEFAULT_LOCATIONS se o Firestore não responder.
  // Os formatos saem de PLATFORMS (o catálogo de 7), não de PLATFORMS_LISTAGEM:
  // os Projetos Icônicos são sob medida e têm CTA próprio, fora do briefing.
  const pracas = await getLocations()
  const formatos = PLATFORMS.map(({ slug, name }) => ({ slug, name }))

  return <ProposalForm pracas={pracas} formatos={formatos} />
}
