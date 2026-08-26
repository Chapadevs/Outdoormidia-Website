// Marcação FAQPage das perguntas frequentes. No mercado de mídia exterior a
// maior parte da busca é feita em forma de pergunta, e é esta marcação que faz a
// resposta aparecer direto no resultado.
//
// Instalada uma vez, na página que traz o FAQ completo. A seção da home mostra
// um recorte das mesmas perguntas e não repete o schema: duas FAQPage com o
// mesmo conteúdo em URLs diferentes é conteúdo duplicado para o rastreador.
export default function FaqJsonLd({ faqs }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
