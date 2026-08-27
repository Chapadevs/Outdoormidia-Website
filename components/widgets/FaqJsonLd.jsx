// Marcação FAQPage das perguntas frequentes. No mercado de mídia exterior a
// maior parte da busca é feita em forma de pergunta, e é esta marcação que faz a
// resposta aparecer direto no resultado.
//
// Instalada uma vez, na página que traz o FAQ completo. A seção da home mostra
// um recorte das mesmas perguntas e não repete o schema: duas FAQPage com o
// mesmo conteúdo em URLs diferentes é conteúdo duplicado para o rastreador.
// A resposta chega em parágrafos; no schema ela é um texto só, sem as marcas de
// negrito, que fora da página apareceriam cruas no resultado de busca. A linha
// de fonte entra junto: dado com atribuição na página e sem atribuição no
// resultado de busca é a mesma afirmação contada de dois jeitos.
export default function FaqJsonLd({ faqs }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a, fonte }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: [...(Array.isArray(a) ? a : [a]), fonte]
          .filter(Boolean)
          .join(' ')
          .replace(/\*\*/g, ''),
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
