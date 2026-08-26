import { SITE_URL } from '@/lib/constants'
import { EMPRESA } from '@/lib/empresa'

// Structured data da empresa, instalado uma vez em app/layout.js — vale para o
// site inteiro. É o que permite ao Google montar o painel de conhecimento e o
// que os motores generativos leem para citar a empresa com dados certos.
//
// Campo sem valor em lib/empresa.js é omitido: `streetAddress: ''` no schema é
// pior que ausência de streetAddress — vira endereço vazio no índice.

const ID_NEGOCIO = `${SITE_URL}/#negocio`

function postalAddress({ logradouro, cep, cidade, estado, pais }) {
  return {
    '@type': 'PostalAddress',
    ...(logradouro && { streetAddress: logradouro }),
    ...(cep && { postalCode: cep }),
    addressLocality: cidade,
    addressRegion: estado,
    addressCountry: pais,
  }
}

function openingHours(horarios) {
  if (!horarios.length) return undefined
  return horarios.map(({ dias, abre, fecha }) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: dias,
    opens: abre,
    closes: fecha,
  }))
}

function localBusiness() {
  return {
    '@type': 'LocalBusiness',
    '@id': ID_NEGOCIO,
    name: EMPRESA.nome,
    legalName: EMPRESA.razaoSocial,
    taxID: EMPRESA.cnpj,
    description: EMPRESA.descricao,
    slogan: EMPRESA.slogan,
    url: SITE_URL,
    image: `${SITE_URL}/media/OM-Foto.jpeg`,
    telephone: [EMPRESA.telefone, EMPRESA.telefoneSc].filter(Boolean),
    email: EMPRESA.email,
    foundingDate: EMPRESA.fundacao,
    address: postalAddress(EMPRESA.endereco),
    openingHoursSpecification: openingHours(EMPRESA.horarios),
    sameAs: EMPRESA.redes,
    areaServed: EMPRESA.areaServida.map((nome) => ({ '@type': 'Place', name: nome })),
    knowsAbout: [
      'Mídia Out of Home',
      'Outdoor digital',
      'Painel de LED',
      'Front light',
      'Mobiliário urbano (MUB)',
      'Mídia aeroportuária',
      'Mídia rodoviária',
      'Publicidade exterior em Curitiba',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: EMPRESA.telefone,
        email: EMPRESA.email,
        areaServed: 'BR',
        availableLanguage: ['Portuguese'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: EMPRESA.whatsapp,
        areaServed: 'BR',
        availableLanguage: ['Portuguese'],
      },
    ],
  }
}

// Nó mínimo de WebSite: amarra o domínio à empresa, para o motor não tratar
// site e negócio como duas entidades soltas.
function webSite() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#site`,
    url: SITE_URL,
    name: EMPRESA.nome,
    inLanguage: 'pt-BR',
    publisher: { '@id': ID_NEGOCIO },
  }
}

export default function JsonLd() {
  const graph = { '@context': 'https://schema.org', '@graph': [localBusiness(), webSite()] }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
