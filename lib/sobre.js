// Linha do tempo da Outdoormídia, na redação do checklist de Sobre nós
// (claude/checklist-sobre-nos.md, item 05).
//
// Quatro tempos: nasce, cresce, consolida, digitaliza. Os marcos 2000s e 2010s
// contavam o mesmo movimento de expansão e foram fundidos num só.
//
// TODO(cliente): só 1959 (fundação) e os números atuais estão confirmados. As
// eras intermediárias foram escritas a partir do material institucional e
// precisam de data e fato revisados pelo time antes de publicar.
//
// Fotos de acervo do cliente, uma por marco. Originais em
// public/media/images/ (fora do versionamento); os WebP servidos aqui foram
// gerados a partir deles, 1600×900, mesmo tratamento dos ativos icônicos.
export const MARCOS = [
  {
    ano: '1959',
    title: 'A primeira face na rua',
    text: 'Painéis de estrada nas margens das rodovias do Paraná. A Outdoormídia nasce colocando marcas onde a cidade passa: no começo, uma face de cada vez.',
    image: '/media/linha-do-tempo/1959.webp',
    imageAlt: 'Painel de estrada da Outdoormídia em 1959, anúncio de adubos Azophoska.',
  },
  {
    ano: '1980s',
    title: 'A rede se espalha',
    text: 'A operação sai da capital e chega à Região Metropolitana e ao Litoral, acompanhando o crescimento do Paraná.',
    image: '/media/linha-do-tempo/1980s.webp',
    imageAlt: 'Painel pintado na parede com o nome Curitiba, rua da capital nos anos 1980.',
  },
  {
    ano: '2000s',
    title: 'Dois estados, nove plataformas',
    text: 'As rodovias de PR e SC e as regiões catarinenses entram no roteiro. O portfólio se expande até formar as nove plataformas integradas de OOH: a única operação do Paraná com esse alcance.',
    image: '/media/linha-do-tempo/2000s.webp',
    imageAlt: 'Painéis publicitários em ponto de ônibus movimentado de Curitiba nos anos 2000.',
  },
  {
    ano: 'Hoje',
    title: 'A rua em tempo real',
    text: '175 telas digitais, mais de 20 milhões de impactos semanais e a maior network DOOH regional do Sul do Brasil. Troca dinâmica de criativos, medição de audiência e câmeras ao vivo 24×7.',
    image: '/media/linha-do-tempo/hoje.webp',
    imageAlt: 'Painel de LED da Outdoormídia em fachada de prédio, veiculação digital atual.',
  },
]

// Versao de cada idioma. O overlay traz so os campos de texto; numeros,
// slugs e caminhos de imagem continuam vindo daqui.
import { porLocale } from '@/lib/i18n/overlay'
import { MARCOS as en } from '@/lib/i18n/content/sobre.en'
import { MARCOS as es } from '@/lib/i18n/content/sobre.es'
import { MARCOS as zh } from '@/lib/i18n/content/sobre.zh'

const conteudo = porLocale(MARCOS, { en, es, zh })

export function getMarcos(locale) {
  return conteudo(locale)
}
