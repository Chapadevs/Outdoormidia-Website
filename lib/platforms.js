import { ICONICOS } from './iconicos'

export const PLATFORMS = [
  {
    slug: 'outdoors-digitais',
    num: '01',
    name: 'Outdoor Digital',
    desc: 'Digital · 175 telas',
    short:
      'Painéis de LED com troca de conteúdo em tempo real. Sem produção de lona, sem espera entre a decisão e o ar. A maior rede DOOH regional do Sul do Brasil, com 20 milhões de impactos semanais.',
    eyebrow: 'Plataforma · Digital',
    heading: 'Outdoor Digital.',
    intro:
      '175 telas de LED de alta definição, com troca dinâmica de criativos e câmeras ao vivo 24×7 em todos os pontos. A maior rede DOOH regional do Sul do Brasil, com 20 milhões de impactos semanais. Ideal para campanhas que precisam de flexibilidade, mensuração e agilidade de veiculação.',
    formats: [
      {
        aspect: '16/9',
        top: 'LED',
        side: 'HD',
        label: 'Digital',
        title: 'Painel LED HD',
        text: 'Telas de LED com troca dinâmica de criativos em alta circulação, sem produção de lona.',
      },
    ],
    faqs: [
      {
        q: 'Preciso produzir arte impressa?',
        a: 'Não. Nos outdoors digitais o criativo é trocado direto na tela, sem produção nem instalação de lona.',
      },
      {
        q: 'Com que frequência posso trocar a campanha?',
        a: 'A troca é dinâmica: você pode alternar criativos por horário, dia da semana ou período, sem custo de reimpressão.',
      },
      {
        q: 'Dá para medir quem viu o anúncio?',
        a: 'Sim. A tecnologia 4yousee/Everywhere mede CPM, frequência, gênero, faixa etária e renda do público impactado, com câmeras ao vivo 24×7 em todos os pontos.',
      },
    ],
  },
  {
    slug: 'front-lights',
    num: '02',
    name: 'Front Light',
    desc: 'Estático · 18 m² · Iluminado',
    short:
      'O outdoor clássico em vias de alta circulação, na horizontal e na vertical. Grande formato, presença contínua e a memorização que só a repetição diária constrói.',
    eyebrow: 'Plataforma · Grande formato',
    heading: 'Front Light.',
    intro:
      'O maior volume de ativos da Outdoormídia: outdoors de 18 m² iluminados, posicionados nos principais corredores e vias de maior fluxo das cidades. Formato horizontal ou vertical, sempre com face única por anunciante.',
    formats: [
      {
        aspect: '2/1',
        top: '6 m',
        side: '3 m',
        label: 'Horizontal',
        title: 'Frontlight 18 m² horizontal',
        text: 'Formato clássico de outdoor, iluminado, em vias de alto tráfego.',
      },
      {
        aspect: '0.7/1',
        top: '3,5 m',
        side: '5 m',
        label: 'Vertical',
        title: 'Frontlight 18 m² vertical',
        text: 'Versão vertical do frontlight, para espaços com maior visibilidade em altura.',
      },
    ],
    faqs: [
      {
        q: 'Qual a diferença entre o formato horizontal e o vertical?',
        a: 'Os dois têm 18 m², mudando apenas a orientação, e a escolha depende do ponto disponível e da leitura desejada na via.',
      },
      {
        q: 'A produção da lona está inclusa?',
        a: 'O Front Light é um formato impresso, então a produção do material segue junto com a locação do ponto.',
      },
      {
        q: 'Posso trocar de ponto ao longo da campanha?',
        a: 'Sim, com flexibilidade de rodízio entre pontos, otimizando o aproveitamento da sua mídia ao longo do período contratado.',
      },
    ],
  },
  {
    slug: 'shoppings',
    num: '03',
    name: 'Mídia Indoor',
    desc: 'Digital · Shoppings',
    short:
      'Operação 100% digital nos principais shoppings da região. Totens de corredor e painéis de estacionamento alcançam o público no lugar e no momento da compra.',
    eyebrow: 'Plataforma · Indoor',
    heading: 'Mídia Indoor.',
    intro:
      'Presença 100% digital nos principais shoppings de Curitiba e região (Mueller, São José e Park Shopping Boulevard), com totens e painéis próximos ao momento de decisão de compra.',
    formats: [
      {
        aspect: '9/16',
        top: '2,2 m',
        side: '1,2 m',
        label: 'Totem',
        title: 'Totem digital',
        text: 'Painel digital vertical posicionado em áreas de grande circulação dentro do mall.',
      },
    ],
    faqs: [
      {
        q: 'Em quais shoppings vocês têm pontos?',
        a: 'Mueller, São José e Park Shopping Boulevard, com presença 100% digital em totens e painéis.',
      },
      {
        q: 'O anúncio fica perto da decisão de compra?',
        a: 'Sim, os pontos são posicionados em áreas de grande circulação dentro do mall, próximos ao momento de decisão do consumidor.',
      },
      {
        q: 'Preciso produzir material impresso?',
        a: 'Não. Toda a operação indoor é digital, com troca de criativo direto na tela.',
      },
    ],
  },
  {
    slug: 'aeroporto',
    num: '04',
    name: 'Aeroporto',
    // Duas áreas, dois ativos: o Distrito de Mídia Duo Square tem 577,5 m² e
    // abriga o Aeroporto Square, o painel híbrido de 312 m² que aparece nos big
    // numbers da home e no diferencial de mesmo nome. A última frase do card é o
    // que amarra os dois números — sem ela o site cita as duas áreas sem
    // explicar a relação.
    desc: 'Híbrido · 577,5 m²',
    short:
      'Distrito de Mídia Duo Square: 5 telas de LED e 10 frontlights na única via de saída do Aeroporto Internacional Afonso Pena. Quem chega ou parte de Curitiba passa por ele. O conjunto abriga o Aeroporto Square, maior painel híbrido do Sul do Brasil.',
    eyebrow: 'Plataforma · Aeroporto Afonso Pena',
    heading: 'Aeroporto.',
    intro:
      'Operação privada, sem licitação, dentro do Aeroporto Afonso Pena, incluindo a maior empena digital do Sul do Brasil (6×18 m). Alcance direto de um público premium, de alto poder aquisitivo e em trânsito constante.',
    formats: [
      {
        aspect: '18/6',
        top: '18 m',
        side: '6 m',
        label: 'Empena',
        title: 'Empena digital 6×18 m',
        text: 'A maior empena digital do Sul do Brasil, com visibilidade total dentro do terminal.',
      },
    ],
    faqs: [
      {
        q: 'É preciso participar de licitação para anunciar no aeroporto?',
        a: 'Não. A operação é privada, sem licitação, o que agiliza bastante o processo de contratação.',
      },
      {
        q: 'Qual o perfil do público que passa pelo aeroporto?',
        a: 'Público premium, de alto poder aquisitivo, em trânsito constante, ideal para marcas que buscam associação a um ambiente sofisticado.',
      },
      {
        q: 'A empena digital permite trocar o criativo?',
        a: 'Sim, é um painel digital de 6×18 m, a maior do Sul do Brasil, com troca de criativo sem produção de lona.',
      },
    ],
  },
  {
    slug: 'midia-movel',
    num: '05',
    name: 'Mídia Móvel',
    desc: 'Estático · Bike e Bus',
    short:
      'Bike Mídia e Bus Mídia chegam onde a estrutura fixa não vai. Calçadões, parques e centros movimentados, seguindo o trajeto real de quem você precisa alcançar.',
    eyebrow: 'Plataforma · Ativações',
    heading: 'Mídia Móvel.',
    intro:
      'Ativações em praias, parques e calçadões, onde a mídia OOH fixa não chega. Ideal para campanhas sazonais, lançamentos e ações que precisam encontrar o público em movimento.',
    formats: [
      {
        aspect: '3/1',
        top: '4 m',
        side: '1,3 m',
        label: 'Móvel',
        title: 'Estrutura móvel',
        text: 'Estrutura itinerante para ativações pontuais em locais de alta circulação sazonal.',
      },
    ],
    faqs: [
      {
        q: 'Onde a Mídia Móvel costuma atuar?',
        a: 'Praias, parques e calçadões: locais de grande fluxo sazonal onde o OOH fixo não chega.',
      },
      {
        q: 'É indicada para campanhas de curta duração?',
        a: 'Sim, é ideal para ações sazonais, lançamentos pontuais e ativações que precisam de presença concentrada em um período curto.',
      },
      {
        q: 'A estrutura pode se mover entre localidades?',
        a: 'Sim, é uma estrutura itinerante: ela se desloca conforme o roteiro definido para a ativação.',
      },
    ],
  },
  {
    slug: 'mub',
    num: '06',
    name: 'MUB',
    desc: 'Digital · 6 circuitos',
    short:
      'Bancas e relógios digitais integrados ao tecido da cidade, organizados em circuitos por nicho: saúde, educação, shoppings, alto padrão. Você contrata o público, não o ponto.',
    eyebrow: 'Plataforma · Circuitos segmentados',
    heading: 'MUB.',
    intro:
      'Bancas e relógios digitais em 6 circuitos segmentados (Full, Saúde, Educação, Shoppings, Alto Padrão e Super & Hiper). O maior roteiro de MUB digitalizado em uma única cidade no Brasil.',
    formats: [
      {
        aspect: '10/3',
        top: '10 m',
        side: '3 m',
        label: 'Passarela',
        title: 'Passarela MUB',
        text: 'Formato padrão dos circuitos MUB, com flexibilidade de rodízio entre pontos.',
      },
    ],
    faqs: [
      {
        q: 'O MUB permite segmentar o público?',
        a: 'Sim. São 6 circuitos segmentados: Full, Saúde, Educação, Shoppings, Alto Padrão e Super & Hiper.',
      },
      {
        q: 'Quantos pontos e impactos o MUB tem?',
        a: 'São 6 circuitos segmentados, no maior roteiro de MUB digitalizado em uma única cidade no Brasil. A contagem de pontos de cada circuito entra na proposta, conforme a praça e o público.',
      },
      {
        q: 'Posso escolher só um circuito específico?',
        a: 'Sim, é possível contratar o circuito mais alinhado ao seu público-alvo, sem precisar veicular na rede completa.',
      },
    ],
  },
  // TODO(cliente): descritivo oficial, praças por trecho e os números de fluxo
  // das rodovias. As medidas (12×4 m e passarelas 10×3 m) vieram do inventário
  // interno e bastam para o card e a página existirem.
  {
    slug: 'rodovias',
    num: '07',
    name: 'Rodovias',
    desc: 'Sob demanda · BR 101 / 116 / 277 / 376',
    short:
      'Você escolhe a região, nós construímos o painel. Angariação em raio de 3 km do ponto indicado, no formato que a campanha pedir, nos maiores fluxos do Sul.',
    eyebrow: 'Plataforma · Rodovias',
    heading: 'Rodovias.',
    intro:
      'Você escolhe a região e nós construímos o painel, nas BR 101, 116, 277 e 376. Angariação em raio de 3 km do ponto indicado, em painéis de 12×4 m e passarelas de 10×3 m. Alcance de quem viaja a trabalho ou a lazer, em trechos de fluxo constante e leitura a distância.',
    formats: [
      {
        aspect: '3/1',
        top: '12 m',
        side: '4 m',
        label: 'Rodovia',
        title: 'Painel rodoviário 12×4 m',
        text: 'Grande formato dimensionado para leitura em velocidade, à beira das principais vias.',
      },
      {
        aspect: '10/3',
        top: '10 m',
        side: '3 m',
        label: 'Passarela',
        title: 'Passarela 10×3 m',
        text: 'Face sobre a pista, com visada frontal para quem trafega nos dois sentidos.',
      },
    ],
    faqs: [
      {
        q: 'Em quais rodovias vocês têm pontos?',
        a: 'A operação cobre as BR 101, 116, 277 e 376, no Paraná e em Santa Catarina. O painel é construído sob demanda, em raio de 3 km do ponto que você indicar; traga a região no briefing.',
      },
      {
        q: 'A leitura funciona com o carro em velocidade?',
        a: 'Sim. Os formatos rodoviários são maiores que o outdoor urbano justamente por isso: 12×4 m nos painéis e 10×3 m nas passarelas, com criativo pensado para poucas palavras.',
      },
      {
        q: 'Rodovias é digital ou impresso?',
        a: 'A operação rodoviária é majoritariamente impressa. Se a campanha precisa de troca dinâmica de criativo, o caminho é o Outdoor Digital, ou uma combinação das duas plataformas.',
      },
    ],
  },
  {
    slug: 'digital-signage',
    num: '08',
    name: 'Digital Signage',
    desc: 'Sob medida · Gestão 360 OM',
    short:
      'Painel exclusivo para o seu negócio: fachada digital, posto de combustível, passagem digital. Licenciamento, instalação, conteúdo e manutenção 24/7 inclusos.',
    eyebrow: 'Plataforma · Painel exclusivo',
    heading: 'Digital Signage.',
    intro:
      'Um painel digital que é só do seu negócio, construído no seu endereço. O Gestão 360 OM cuida do caminho inteiro: consultoria legal de licenciamento, dimensionamento dentro da norma, instalação, gestão de conteúdo e manutenção 24/7.',
    // Painel sob medida não tem CPM nem alcance de tabela: o simulador ignora
    // esta entrada em vez de estimá-la pelo padrão, que seria um número inventado.
    semEstimativa: true,
    formats: [
      // TODO(cliente): faltam as dimensões de cada tipo de painel exclusivo. Os
      // cards descrevem a aplicação sem cravar medida — ver lib/platforms.js nas
      // demais plataformas para o padrão de `top` e `side` quando o dado chegar.
      {
        aspect: '16/9',
        top: 'LED',
        side: 'Sob medida',
        label: 'Fachada',
        title: 'Fachada digital',
        text: 'Tela integrada à fachada do próprio negócio, com programação sob controle da marca.',
      },
      {
        aspect: '16/9',
        top: 'LED',
        side: 'Sob medida',
        label: 'Posto',
        title: 'Posto de combustível',
        text: 'Painel na área de abastecimento, onde o público fica parado por minutos a cada visita.',
      },
      {
        aspect: '3/1',
        top: 'LED',
        side: 'Sob medida',
        label: 'Passagem',
        title: 'Passagem digital',
        text: 'Estrutura em ponto de travessia ou acesso, dimensionada conforme a viabilidade do local.',
      },
    ],
    faqs: [
      {
        q: 'O painel é meu ou da Outdoormídia?',
        a: 'O painel é exclusivo do seu negócio e exibe só o que você determina. A Outdoormídia responde pela viabilidade, pela construção e pela operação.',
      },
      {
        q: 'Quem cuida do licenciamento?',
        a: 'Nós. Em projetos de painel exclusivo, o Gestão 360 OM inclui consultoria legal de licenciamento e o dimensionamento dentro dos decretos municipais.',
      },
      {
        q: 'E depois que o painel está no ar?',
        a: 'Instalação, gestão de conteúdo e manutenção 24/7 fazem parte do pacote. A equipe monitora a exibição e atua assim que algo sai do lugar.',
      },
    ],
  },
]

export function getPlatformBySlug(slug) {
  return PLATFORMS.find((p) => p.slug === slug)
}

// Icônicos entram na listagem como uma plataforma só: o card leva ao hub dos
// projetos, não a uma página de plataforma. Elegancy, Green e Regenerativo
// vivem lá dentro. Esta é a lista que a home e o hub de plataformas exibem;
// `PLATFORMS` segue sendo só o catálogo, porque é dele que o simulador, o
// validate de cases e o admin dependem — e por isso o `num` exibido aqui é
// recalculado por posição, não herdado do catálogo.
const ICONICOS_NA_LISTAGEM = {
  slug: 'projetos-iconicos',
  name: 'Projetos Icônicos',
  desc: 'Exclusivo · Alto impacto',
  short:
    'Estruturas únicas nos pontos mais nobres da cidade. Esquinas digitais em 3D, painéis híbridos e jardins vivos integrados à estrutura. Onde a marca se torna a paisagem.',
  intro: `Estruturas únicas nos pontos mais nobres da cidade: ${ICONICOS.map((i) => i.name).join(', ')}.`,
  href: '/plataformas/projetos-iconicos',
  // A única entrada da listagem com vídeo em vez de foto. O carrossel da home o
  // usa como fundo do card, mudo e em loop; onde só couber imagem estática, a
  // entrada continua caindo no painel do `CoverMedia`.
  video: '/media/cases-videos/video-iconicos.mp4',
}

// Primeira posição da listagem, como no documento de copy do cliente.
const POSICAO_ICONICOS = 0

export const PLATFORMS_LISTAGEM = [
  ...PLATFORMS.slice(0, POSICAO_ICONICOS),
  ICONICOS_NA_LISTAGEM,
  ...PLATFORMS.slice(POSICAO_ICONICOS),
].map((p, idx) => ({
  slug: p.slug,
  num: String(idx + 1).padStart(2, '0'),
  name: p.name,
  desc: p.desc,
  short: p.short,
  intro: p.intro,
  image: p.image ?? null,
  video: p.video ?? null,
  // TODO(cliente): `imageAlt` acompanha cada `image` — descrever a cena da foto
  // (formato, praça, o que aparece), não repetir o nome da plataforma.
  imageAlt: p.imageAlt ?? null,
  href: p.href ?? `/plataformas/${p.slug}`,
  cta: p.cta ?? 'Ver plataforma',
  marcador: p.marcador ?? null,
}))
