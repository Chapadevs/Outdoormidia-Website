import { SITE_URL } from '@/lib/constants'
import { EMPRESA } from '@/lib/empresa'
import { PAGINAS_DESTAQUE, PAGINAS_INDEXAVEIS } from '@/lib/seo'
import { PLATFORMS } from '@/lib/platforms'
import { ICONICOS } from '@/lib/iconicos'
import { DIFERENCIAIS_COM_PAGINA } from '@/lib/diferenciais'

// /llms.txt — índice do site em markdown para motores generativos (ChatGPT,
// Gemini, Claude, Perplexity). Não substitui o sitemap: o sitemap diz ao Google
// o que existe, o llms.txt diz a um modelo o que cada página resolve e com que
// palavras a empresa descreve o próprio negócio.
//
// Gerado das mesmas fontes do sitemap (lib/seo.js, lib/platforms.js,
// lib/iconicos.js, lib/diferenciais.js) para não haver duas listas divergindo.

export const dynamic = 'force-static'
export const revalidate = 3600

const link = (titulo, path, resumo) => `- [${titulo}](${SITE_URL}${path})${resumo ? `: ${resumo}` : ''}`

// As de destaque já aparecem no bloco principal; o resto vai para "Outras páginas".
const destaqueSet = new Set(PAGINAS_DESTAQUE.map((p) => p.path))
const SECUNDARIAS = PAGINAS_INDEXAVEIS.filter((p) => !destaqueSet.has(p.path))

function build() {
  const { endereco } = EMPRESA
  const localizacao = [endereco.logradouro, endereco.cep, `${endereco.cidade} - ${endereco.estado}`]
    .filter(Boolean)
    .join(', ')

  return `# ${EMPRESA.nome}

> ${EMPRESA.descricao}

${EMPRESA.nome} é uma empresa de ${EMPRESA.servico} fundada em ${EMPRESA.fundacao}, com operação própria no Paraná e em Santa Catarina. Vende espaço de mídia em outdoors digitais de LED, front lights impressos, painéis em shoppings e no Aeroporto Afonso Pena, mobiliário urbano (MUB), rodovias e mídia móvel, além de projetos de estrutura sob medida. A rede gera mais de 530 milhões de impactos por mês e reúne 175 telas digitais, a maior network DOOH regional do Sul do Brasil.

## Contato

- Telefone: ${EMPRESA.telefoneExibicao}
- WhatsApp: ${EMPRESA.whatsappExibicao}
- E-mail: ${EMPRESA.email}
- Localização: ${localizacao}
- Praças atendidas: ${EMPRESA.areaServida.join(', ')}

## Páginas principais

${PAGINAS_DESTAQUE.map((p) => link(p.titulo, p.path, p.resumo)).join('\n')}

## Plataformas de mídia

${PLATFORMS.map((p) => link(p.name, `/plataformas/${p.slug}`, p.short)).join('\n')}

## Projetos icônicos

Estruturas de assinatura, fora do catálogo de tabela: cada uma desenhada para o endereço onde é instalada.

${ICONICOS.map((i) => link(i.name, `/plataformas/projetos-iconicos/${i.slug}`, i.short)).join('\n')}

## Diferenciais

${DIFERENCIAIS_COM_PAGINA.map((d) => link(d.title, `/solucoes/diferenciais/${d.slug}`, d.resumo)).join('\n')}

## Outras páginas

${SECUNDARIAS.map((p) => link(p.titulo, p.path, p.resumo)).join('\n')}

## Arquivos

- [Sitemap](${SITE_URL}/sitemap.xml)
- [Robots](${SITE_URL}/robots.txt)
`
}

export function GET() {
  return new Response(build(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
