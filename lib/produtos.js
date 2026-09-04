// Os produtos de catálogo, do handoff de Plataformas de 03/09/2026.
//
// Plataforma é onde, produto é como. A plataforma define o ambiente que a marca
// ocupa; o produto define tamanho, proporção e tipo de peça. Por isso os dois
// não moram no mesmo arquivo: um produto aparece em mais de uma plataforma, e
// `lib/platforms.js` guardaria uma segunda cópia do texto.
//
// `plataformas` é a lista de slugs de `lib/platforms.js` onde o card aparece.
// Um produto listado em duas plataformas é renderizado nas duas rotas a partir
// desta entrada única, que é a regra C8 do handoff: alterou aqui, mudou nos dois
// lugares na mesma revisão.
//
// `tecnologias` marca o produto de dupla tecnologia (componente C4): o card é um
// só, com seletor, nunca dois cards. `specsPor` guarda a ficha de cada
// tecnologia, e o seletor abre na tecnologia da plataforma que está exibindo o
// card (`tecnologiaPadrao` em `lib/platforms.js`). Onde a ficha de uma
// tecnologia ainda não veio, a linha de specs some naquele lado em vez de
// mostrar medida inventada.
//
// TODO(cliente): pendência 2 do handoff, as dimensões físicas em metros de Top
// Sight, Poster Sight, Super Poster, Super Billboard, Super Top Sequencial,
// Billboard, Empena, Bike e Bus. É o que preenche `specsPor.estatico` nos cards
// de dupla tecnologia e `specs` nos estáticos puros.
export const PRODUTOS = [
  {
    slug: 'top-sight',
    name: 'Top Sight',
    kicker: 'Vertical',
    tecnologias: ['estatico', 'digital'],
    text: 'Presença vertical nos corredores de maior circulação, ocupando o campo de visão de quem dirige e de quem caminha. No estático, iluminação que mantém a campanha viva depois que o sol se põe. No digital, o mesmo enquadramento de um reel: a campanha funciona tanto nas mídias sociais quanto na plataforma, sem adaptação de proporção.',
    specsPor: { digital: '768×1024 px · MP4 · 10 segundos' },
    plataformas: ['outdoors-digitais', 'front-lights'],
  },
  {
    slug: 'poster-sight',
    name: 'Poster Sight',
    kicker: 'Horizontal',
    tecnologias: ['estatico', 'digital'],
    text: 'O outdoor como ele deve ser: grande, horizontal, impossível de não ler, nas vias que estruturam o trajeto diário da cidade. No digital, o enquadramento clássico do vídeo, com troca de conteúdo em tempo real e sem custo de produção física.',
    specsPor: { digital: '1024×512 px · MP4 · 10 segundos' },
    plataformas: ['outdoors-digitais', 'front-lights'],
  },
  {
    slug: 'billboard',
    name: 'Billboard',
    kicker: 'Grande formato',
    tecnologias: ['estatico', 'digital'],
    text: 'O grande formato de proporção estendida, disponível nas duas tecnologias. Área generosa para a direção de arte respirar, nos pontos de tráfego intenso.',
    specsPor: { digital: '1536×512 px · MP4 · 10 segundos' },
    plataformas: ['outdoors-digitais', 'front-lights'],
  },
  {
    slug: 'topo-de-predio',
    name: 'Topo de Prédio',
    kicker: 'Exclusivo Santa Catarina',
    selo: 'Exclusivo SC',
    tecnologias: ['estatico', 'digital'],
    text: 'O formato mais alto do portfólio, no alto das duas cidades mais relevantes de Santa Catarina. Em Balneário Camboriú, painel digital em ponto nobre da Av. Brasil. Em Joinville, um painel digital com conteúdo em tempo real e um estático de presença contínua. Visibilidade premium para marcas que buscam protagonismo na paisagem, onde só a Outdoormídia chega.',
    pontos: [
      { name: 'Balneário Camboriú', endereco: 'Av. Brasil, 3830' },
      { name: 'Joinville · digital', endereco: 'Rua João Colin, 1875' },
      // TODO(cliente): endereço do estático de Joinville (pendência 9 do
      // handoff). Sem `endereco` o ponto não é listado.
      { name: 'Joinville · estático', endereco: null },
    ],
    plataformas: ['outdoors-digitais', 'front-lights'],
  },
  {
    slug: 'super-poster',
    name: 'Super Poster',
    kicker: '2x maior',
    text: 'Tudo do Poster Sight, no dobro do tamanho. Para a campanha que precisa dominar o quarteirão, não só participar dele.',
    plataformas: ['front-lights'],
  },
  {
    slug: 'super-top-sequencial',
    name: 'Super Top Sequencial',
    kicker: 'Sequencial',
    text: 'Painéis verticais em sequência na mesma via. A marca aparece, reaparece e confirma: repetição dentro do mesmo trajeto, multiplicando a memorização de uma única passagem.',
    plataformas: ['front-lights'],
  },
  {
    slug: 'super-billboard',
    name: 'Super Billboard',
    kicker: '2x maior',
    text: 'O maior formato estático do portfólio. Quando o briefing pede escala de paisagem, o Super Billboard é a resposta: o dobro do Billboard, para marcas que querem ser vistas de longe e lembradas de perto.',
    plataformas: ['front-lights'],
  },
  {
    slug: 'totem',
    name: 'Totem',
    kicker: 'Corredor',
    text: 'Na altura dos olhos, no meio do fluxo. O Totem acompanha o visitante pelo corredor do shopping e coloca sua marca a metros da prateleira. É o último ponto de contato antes da decisão de compra.',
    specs: '1080×1920 px · MP4 · 10 segundos · disponível nos três shoppings',
    image: '/media/shoppings/produto-totem.webp',
    imageAlt: 'Totem digital vertical da Outdoormídia no Park Shopping Boulevard',
    imageRatio: '9/16',
    plataformas: ['shoppings'],
  },
  {
    slug: 'mega-banner',
    name: 'Mega Banner',
    kicker: 'Suspenso',
    text: 'Pendurado sobre o corredor central, o Mega Banner é visto de longe e de todos os ângulos. Formato vertical de grande presença, ideal para lançamento e institucional em ambiente de alto fluxo.',
    specs: '640×1024 px · MP4 · 10 segundos · Shopping São José',
    image: '/media/shoppings/produto-mega-banner.webp',
    imageAlt: 'Mega Banner suspenso da Outdoormídia sobre o corredor de um shopping',
    plataformas: ['shoppings'],
  },
  {
    slug: 'empena',
    name: 'Empena',
    kicker: 'Grande formato interno',
    text: 'A maior área visual do ambiente indoor. A Empena transforma a parede do shopping em mídia, com escala que nenhum outro formato interno alcança.',
    // TODO(cliente): specs da Empena (pendência 11 do handoff). Até virem, o
    // card traz só o shopping onde o formato existe.
    specs: 'Park Shopping Boulevard',
    image: '/media/shoppings/produto-empena.webp',
    imageAlt: 'Painel de Empena digital da Outdoormídia em parede de shopping',
    plataformas: ['shoppings'],
  },
  {
    slug: 'banca-horizontal',
    name: 'Banca Horizontal',
    kicker: 'Nível da calçada',
    text: 'Mídia digital na altura de quem caminha. A Banca Horizontal ocupa esquinas e travessias de alto fluxo de pedestres, com leitura confortável para quem espera o sinal abrir.',
    specs: '1024×512 px · MP4 · 10 segundos',
    plataformas: ['mub'],
  },
  {
    slug: 'banca-vertical',
    name: 'Banca Vertical',
    kicker: 'Nível da calçada',
    text: 'A versão vertical da banca, com o enquadramento do celular. Perfeita para reaproveitar a peça do social no ponto físico, falando com o pedestre na linguagem que ele já consome.',
    specs: '768×1024 px · MP4 · 10 segundos',
    plataformas: ['mub'],
  },
  {
    slug: 'relogio-digital',
    name: 'Relógio Digital',
    kicker: 'Utilidade',
    text: 'O único formato que as pessoas procuram com os olhos. Hora e temperatura trazem o olhar, sua campanha aproveita a atenção. Presença pulverizada pela cidade, em pontos de parada e travessia.',
    specs: '768×1024 px · MP4 · 10 segundos',
    plataformas: ['mub'],
  },
  {
    slug: 'bike-midia',
    name: 'Bike Mídia',
    kicker: 'Trio sequencial',
    text: 'Três bikes em sequência, uma mensagem em movimento. O trio circula por calçadões, parques e eventos, chegando onde estrutura fixa não entra. Presença simpática, fotografável e impossível de ignorar na escala do pedestre.',
    plataformas: ['midia-movel'],
  },
  {
    slug: 'bus-midia',
    name: 'Bus Mídia',
    kicker: 'Rota urbana',
    text: 'Sua marca no trajeto diário de milhares de pessoas. O Bus Mídia percorre os corredores da cidade repetindo a exposição em horários e bairros diferentes, com o alcance de uma rota inteira pelo custo de um ponto.',
    plataformas: ['midia-movel'],
  },
  {
    slug: 'painel-exclusivo',
    name: 'Painel Exclusivo',
    kicker: 'Sob medida · Gestão 360 OM',
    text: 'Da consultoria legal de licenciamento à manutenção 24 horas por dia, sete dias por semana, o Gestão 360 OM cuida de tudo que fica entre a sua fachada e um painel funcionando. Você entra com o ponto e a marca. A operação entra com o resto.',
    plataformas: ['digital-signage'],
  },
]

export function getProdutosPorPlataforma(slug) {
  return PRODUTOS.filter((p) => p.plataformas.includes(slug))
}
