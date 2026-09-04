import { ICONICOS } from './iconicos'

export const PLATFORMS = [
  {
    slug: 'outdoors-digitais',
    num: '01',
    name: 'Outdoor Digital',
    desc: 'Digital · 175 telas',
    short:
      'Painéis de LED com troca de conteúdo em tempo real. Sem produção de lona, sem espera entre a decisão e o ar. A maior rede DOOH regional do Sul do Brasil, com 20 milhões de impactos semanais.',
    eyebrow: 'Plataforma · Digital · 175 telas',
    heading: 'Outdoor Digital.',
    intro:
      'Briefing na mão pela manhã, campanha no ar pela tarde. O circuito digital elimina a etapa mais lenta do OOH tradicional: produção, impressão e instalação entre a aprovação da peça e a veiculação. A maior rede DOOH regional do Sul do Brasil.',
    video: '/media/plataformas/outdoor-digital.mp4',
    // O seletor dos produtos de dupla tecnologia abre neste lado.
    tecnologiaPadrao: 'digital',
    // Os dois Urbanity são da linha Elegancy e aparecem aqui pela mesma entrada
    // de dados, com o link de volta para a linha (regra C8 do handoff).
    ativos: ['top-sight-digital-urbanity', 'top-sight-digital-urbanity-light'],
    quando: [
      'Campanha com troca frequente de criativo',
      'Promoção com data curta',
      'Presença contínua com mensagem que muda por horário',
    ],
    bignumbers: [
      { n: '175', label: 'Telas digitais' },
      { n: '+20 mi', label: 'Impactos por semana' },
      { n: '1º', label: 'Maior rede DOOH regional do Sul' },
    ],
    formats: [
      {
        aspect: '16/9',
        dims: 'LED HD',
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
    eyebrow: 'Plataforma · Estático · 18 m² · Iluminado',
    heading: 'Front Light.',
    intro:
      'O formato que construiu a mídia exterior e continua entregando o que nenhum outro entrega: a mesma marca, no mesmo lugar, todos os dias, para as mesmas pessoas. Memorização se constrói por repetição, e repetição é a especialidade da casa há 67 anos.',
    video: '/media/plataformas/frontlights.mp4',
    tecnologiaPadrao: 'estatico',
    quando: [
      'Reforço de marca no longo prazo',
      'Ocupação de território',
      'Presença em corredor de trajeto diário',
    ],
    // TODO(cliente): sem contagem de pontos Front Light na rede (pendência 5 do
    // handoff de 03/09/2026: o Marketing confirmou que não há o dado hoje). Sem
    // `bignumbers` o quadro não renderiza, que é o que o handoff manda fazer
    // onde não há número validado.
    formats: [
      {
        aspect: '2/1',
        dims: '6 × 3 m',
        top: '6 m',
        side: '3 m',
        label: 'Horizontal',
        title: 'Frontlight 18 m² horizontal',
        text: 'Formato clássico de outdoor, iluminado, em vias de alto tráfego.',
      },
      {
        aspect: '0.7/1',
        dims: '3,5 × 5 m',
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
    desc: 'Digital · 3 shoppings',
    short:
      'Operação 100% digital nos principais shoppings da região. Totens de corredor e painéis de estacionamento alcançam o público no lugar e no momento da compra.',
    eyebrow: 'Plataforma · Digital · 3 shoppings',
    heading: 'Mídia Indoor.',
    intro:
      'No shopping, o público não está passando. Está decidindo. A operação é 100% digital, em três centros com perfis distintos de consumo, do familiar ao corporativo. Você escolhe o ambiente que conversa com o seu cliente.',
    image: '/media/shoppings/midia-indoor-hero.webp',
    imageAlt: 'Totem digital da Outdoormídia em corredor de shopping',
    quando: [
      'Campanha de varejo com conversão próxima',
      'Lançamento de produto em ponto de venda',
      'Construção de marca junto a público de alta recorrência',
    ],
    bignumbers: [
      { n: '3', label: 'Shoppings' },
      { n: '+170', label: 'Lojas no Shopping São José' },
      { n: '70 mil', label: 'Pessoas/mês no Shopping Itália' },
    ],
    blocosTitle: 'Os três ambientes',
    blocos: [
      {
        title: 'Shopping São José · São José dos Pinhais',
        text: 'O maior shopping da Região Metropolitana de Curitiba, a 7 minutos do Aeroporto Internacional Afonso Pena. Mais de 170 lojas, eventos recorrentes e perfil familiar de alto fluxo, somando consumidores locais, turistas e profissionais em deslocamento.',
        apoio: 'Mega Banner e Totem · Rua Dona Izabel A Redentora, 1434, Centro',
        image: '/media/shoppings/shopping-sao-jose.webp',
        imageAlt: 'Totem digital da Outdoormídia em corredor do Shopping São José',
      },
      {
        title: 'Park Shopping Boulevard · Curitiba, região Sul',
        text: 'O maior shopping do extremo sul de Curitiba, no eixo que conecta Sítio Cercado, Portão, Novo Mundo, Capão Raso, Pinheirinho, Vila Hauer, Alto Boqueirão e Xaxim. Público em uma das regiões que mais crescem na cidade, com consumo cotidiano e forte fidelização.',
        apoio: 'Empena e Totem · BR-116, 16303, Xaxim',
        image: '/media/shoppings/shopping-boulevard.webp',
        imageAlt: 'Painel digital da Outdoormídia no Park Shopping Boulevard',
      },
      {
        title: 'Shopping Itália · Curitiba, Centro',
        text: 'Um dos empreendimentos mais consolidados de Curitiba, em operação desde 1982. São 26 andares que reúnem comércio, serviços e escritórios em circulação constante: fluxo médio de 70 mil pessoas por mês, com público corporativo, profissional e recorrente.',
        apoio: 'Totem · Rua Marechal Deodoro, 630, Centro',
        image: '/media/shoppings/shopping-italia.webp',
        imageAlt: 'Totem digital da Outdoormídia no Shopping Itália, próximo à escada rolante',
      },
    ],
    formats: [
      {
        aspect: '9/16',
        dims: 'Totem 2,2 m',
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
        a: 'São José, Park Shopping Boulevard e Itália, com presença 100% digital em totens e painéis.',
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
      'Distrito de Mídia Duo Square: 5 telas de LED e 10 frontlights na única via de saída do Aeroporto Internacional Afonso Pena. O conjunto abriga o Aeroporto Square, maior painel híbrido do Sul do Brasil.',
    eyebrow: 'Plataforma · Híbrido · 577,5 m²',
    heading: 'Aeroporto.',
    intro:
      'Quem chega a Curitiba de avião passa por uma única via de saída, na região metropolitana com quase 3,7 milhões de habitantes. É nela que está o Distrito de Mídia Duo Square, o primeiro projeto do tipo no Brasil, concebido para gerar presença qualificada já no desembarque.',
    video: '/media/plataformas/aeroporto.mp4',
    quando: [
      'Falar com decisor em trânsito: executivos, investidores e formadores de opinião',
      'Construir percepção de porte nacional para a marca',
      'Campanha B2B ou institucional de alto valor, sem necessidade de segmentação por bairro',
    ],
    bignumbers: [
      { n: '577,5 m²', label: 'Área visual' },
      { n: '800 mil', label: 'Impactos por mês' },
      { n: '14,8 mi', label: 'Passageiros por ano' },
      { n: '3.697.928', label: 'Habitantes na região' },
    ],
    blocosTitle: 'O Distrito',
    blocos: [
      {
        title: 'Onde está',
        text: 'O Distrito está posicionado na Av. Rocha Pombo, na única saída do Aeroporto Internacional Afonso Pena, no município de São José dos Pinhais, região metropolitana de Curitiba.',
        apoio: 'Média de 20 mil passageiros por dia',
      },
      {
        title: 'Público',
        text: 'Viajantes aéreos têm maior poder aquisitivo. O perfil de quem passa pelo Distrito inclui executivos, turistas, compradores internacionais, investidores, profissionais em trânsito e formadores de opinião, o tipo de audiência que nenhuma outra plataforma do portfólio entrega no mesmo volume.',
      },
    ],
    // Os três ativos de assinatura que ficam no Distrito. A página lê a entrada
    // em `ICONICOS_ASSINATURA` por este slug, em vez de repetir o texto: é a
    // regra C8 do handoff, que proíbe a mesma estrutura ter duas descrições.
    ativos: ['distrito-de-midia-duo-square', 'aeroporto-square', 'mosaico-square'],
    formats: [
      {
        aspect: '18/6',
        dims: '18 × 6 m',
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
    eyebrow: 'Plataforma · Estático · Bike e Bus',
    heading: 'Mídia Móvel.',
    intro:
      'Nem todo público está em uma avenida. Bike Mídia e Bus Mídia levam a campanha para dentro do calçadão, do parque e do centro, no trajeto que as pessoas fazem a pé.',
    video: '/media/plataformas/midia-movel.mp4',
    quando: [
      'Ativação em evento ou data específica',
      'Cobertura de área fechada ao trânsito',
      'Reforço tático de uma campanha maior',
    ],
    // TODO(cliente): sem dados de rota, frota ou alcance (pendência 6 do handoff
    // de 03/09/2026). O quadro de números fica fora até o Marketing enviar.
    formats: [
      {
        aspect: '3/1',
        dims: '4 × 1,3 m',
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
    eyebrow: 'Plataforma · Digital · 6 circuitos',
    heading: 'MUB.',
    intro:
      'Bancas e relógios digitais fazem parte da rua, não competem com ela. A rede é organizada em circuitos por perfil de público, então você contrata quem quer alcançar, não um endereço isolado.',
    image: '/media/plataformas/mub-garden.jpeg',
    imageAlt: 'Banca digital MUB Garden integrada a jardim vertical',
    quando: [
      'Campanha segmentada por nicho',
      'Presença de bairro com custo controlado',
      'Marca que precisa aparecer perto do ponto de decisão',
    ],
    bignumbers: [
      { n: '6', label: 'Circuitos por nicho' },
      { n: '3', label: 'Formatos digitais' },
    ],
    // O MUB Garden é da linha Green e aparece aqui pela mesma entrada de dados,
    // com o selo e o link de volta para a linha (regra C8 do handoff).
    ativos: ['mub-garden'],
    formats: [
      {
        aspect: '10/3',
        dims: '10 × 3 m',
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
    desc: 'Sob demanda · BR 101 · 116 · 277 · 376 · 407 · 470',
    short:
      'Você escolhe a região, nós construímos o painel. Angariação em raio de 3 km do ponto indicado, no formato que a campanha pedir, nos maiores fluxos do Sul.',
    eyebrow: 'Plataforma · Sob demanda · PR e SC',
    heading: 'Rodovias.',
    intro:
      'Você escolhe a região, nós construímos o painel. A rede Rodovias conecta os principais corredores entre o Paraná e Santa Catarina, de Ponta Grossa a Florianópolis, passando pelo litoral e por Joinville, alcançando quem se desloca todos os dias entre essas regiões.',
    video: '/media/plataformas/rodovias.mp4',
    quando: [
      'Cobertura de rota entre regiões',
      'Campanha regional fora do perímetro urbano',
      'Presença em corredor logístico ou turístico',
    ],
    bignumbers: [
      { n: '1,6 mi', label: 'Impactos por mês' },
      { n: '19,2 mi', label: 'Impactos em 12 meses' },
      { n: '38,4 mi', label: 'Impactos em 24 meses' },
      { n: '6', label: 'BRs cobertas' },
    ],
    // Componente C2 do handoff: os quatro passos do Sob Demanda.
    passos: [
      {
        title: 'Escolha a região.',
        text: 'Indique o ponto aproximado onde a campanha precisa estar, no corredor que conecta seu público.',
      },
      {
        title: 'Angariação em 3 km.',
        text: 'A operação localiza e negocia o melhor ponto disponível num raio de 3 km do local indicado.',
      },
      {
        title: 'Escolha o tamanho do painel.',
        text: 'A estrutura é construída sob medida, no formato que a campanha pedir.',
      },
      {
        title: 'Contrato de 15 meses.',
        text: 'Prazo mínimo de veiculação, compatível com a construção de um painel exclusivo para sua marca.',
      },
    ],
    passosApoio:
      'Rodovias é a plataforma de maior volume do portfólio. Onde as outras plataformas segmentam por perfil de público, Rodovias entrega escala: milhares de veículos por dia, em corredores que as pessoas percorrem repetidamente entre uma cidade e outra.',
    formats: [
      {
        aspect: '3/1',
        dims: '12 × 4 m',
        top: '12 m',
        side: '4 m',
        label: 'Rodovia',
        title: 'Painel rodoviário 12×4 m',
        text: 'Grande formato dimensionado para leitura em velocidade, à beira das principais vias.',
      },
      {
        aspect: '10/3',
        dims: '10 × 3 m',
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
        a: 'A operação cobre as BR 101, 116, 277, 376, 407 e 470, no Paraná e em Santa Catarina. O painel é construído sob demanda, em raio de 3 km do ponto que você indicar; traga a região no briefing.',
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
      'Painel exclusivo para o seu negócio: fachada digital, posto de combustível, passagem digital. Licenciamento, instalação, conteúdo e manutenção 24 horas por dia, sete dias por semana.',
    eyebrow: 'Plataforma · Painel exclusivo',
    heading: 'Digital Signage.',
    intro:
      'Um painel que é só da sua marca, no seu endereço. Fachada digital, posto de combustível, passagem digital: a Outdoormídia projeta, licencia, instala e opera, e o conteúdo fica no seu controle.',
    quando: [
      'Transformar a própria fachada em mídia',
      'Comunicar promoção no ponto de venda em tempo real',
      'Projeto de rede própria com gestão terceirizada',
    ],
    // TODO(cliente): dados prometidos pelo Marketing para 05/09/2026 (pendência
    // 3 do handoff). Até lá o quadro de números não renderiza.
    // Painel sob medida não tem CPM nem alcance de tabela: o simulador ignora
    // esta entrada em vez de estimá-la pelo padrão, que seria um número inventado.
    semEstimativa: true,
    formats: [
      // TODO(cliente): faltam as dimensões de cada tipo de painel exclusivo. Os
      // cards descrevem a aplicação sem cravar medida — ver lib/platforms.js nas
      // demais plataformas para o padrão de `top` e `side` quando o dado chegar.
      {
        aspect: '16/9',
        dims: 'Fachada',
        top: 'LED',
        side: 'Sob medida',
        label: 'Fachada',
        title: 'Fachada digital',
        text: 'Tela integrada à fachada do próprio negócio, com programação sob controle da marca.',
      },
      {
        aspect: '16/9',
        dims: 'Posto',
        top: 'LED',
        side: 'Sob medida',
        label: 'Posto',
        title: 'Posto de combustível',
        text: 'Painel na área de abastecimento, onde o público fica parado por minutos a cada visita.',
      },
      {
        aspect: '3/1',
        dims: 'Passagem',
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
  // Cada projeto icônico entra como um "formato" do diagrama do catálogo: a
  // proporção é a silhueta da estrutura, e `dims` traz o nome do projeto porque
  // as medidas ainda não vieram do cliente (ver TODO em lib/iconicos.js).
  formats: ICONICOS.map((i) => ({
    aspect: i.slug === 'green' ? '16/9' : '1/1.4',
    dims: i.name,
  })),
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
  // Só o que o diagrama do catálogo consome: proporção e rótulo curto.
  formats: (p.formats ?? []).map((f) => ({ aspect: f.aspect, dims: f.dims })),
  image: p.image ?? null,
  video: p.video ?? null,
  // TODO(cliente): `imageAlt` acompanha cada `image` — descrever a cena da foto
  // (formato, praça, o que aparece), não repetir o nome da plataforma.
  imageAlt: p.imageAlt ?? null,
  href: p.href ?? `/plataformas/${p.slug}`,
  cta: p.cta ?? 'Ver plataforma',
  marcador: p.marcador ?? null,
}))
