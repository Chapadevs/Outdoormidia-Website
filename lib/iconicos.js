// Os Projetos Icônicos.
//
// Icônicos são plataformas, mas não entram no catálogo das 8: são projetos de
// assinatura, sob medida, com fluxo comercial próprio (briefing → viabilidade →
// estrutura). Por isso vivem em arquivo separado de `lib/platforms.js` e ganham
// uma faixa própria na home, acima das plataformas.
//
// O arquivo tem duas listas, e a divisão é a do handoff de 03/09/2026:
// `ICONICOS_ASSINATURA` são os quatro ativos que não pertencem a nenhuma linha,
// porque cada um resolveu um problema que não se repete; `ICONICOS` são as três
// linhas, e cada linha carrega os ativos já instalados.
//
// Cada linha alimenta três lugares: os campos de topo (`num`, `name`,
// `tagline`, `short`, `image`, `href`) montam o carrossel da home e os cards do
// hub; `frase` e `ativos` montam a aba na página de Icônicos; o restante monta
// a página dedicada em /plataformas/projetos-iconicos/[slug]. Aba e página
// dedicada leem os mesmos `ativos` — é o que a regra C8 do handoff pede:
// conteúdo único por ativo, renderizado em mais de uma rota, nunca um texto
// reescrito em cada lugar.

// Os quatro ativos de assinatura, fora das linhas. Três estão no Distrito de
// Mídia do Aeroporto e por isso aparecem também em /plataformas/aeroporto,
// lendo esta mesma lista.
export const ICONICOS_ASSINATURA = [
  {
    slug: 'aeroporto-square',
    name: 'Aeroporto Square',
    kicker: 'Híbrido · 312 m²',
    text: 'O maior painel híbrido de OOH do Sul do Brasil. Telas de LED de última geração combinadas com painéis front light na mesma estrutura, unindo o dinamismo do digital ao poder de impacto do estático. Mais de 700 mil impactos mensais sobre o público de maior poder aquisitivo do estado.',
    image: '/media/iconicos/aeroporto-square.webp',
    imageAlt:
      'Sequência de painéis exibindo uma campanha automotiva na via de saída do aeroporto, sob céu azul',
    verEm: { label: 'Ver na plataforma Aeroporto', href: '/plataformas/aeroporto' },
  },
  {
    slug: 'mosaico-square',
    name: 'Mosaico Square',
    kicker: 'Face única · 265,5 m²',
    text: 'Onde a publicidade vira arte. Aplica o conceito Face Única: uma marca, sem vizinhança visual, sem disputa de atenção. Vitrine de exclusividade total na saída do Aeroporto Internacional Afonso Pena.',
    image: '/media/iconicos/mosaico-square.webp',
    imageAlt:
      'Conjunto de painéis em sequência exibindo uma única campanha automotiva, sem outras marcas ao redor',
    verEm: { label: 'Ver na plataforma Aeroporto', href: '/plataformas/aeroporto' },
  },
  {
    slug: 'distrito-de-midia-duo-square',
    name: 'Distrito de Mídia Duo Square',
    kicker: 'Primeiro do Brasil · 577,5 m²',
    text: 'O primeiro Distrito de Mídia do país. Cinco telas de LED e dez painéis front light na única via de saída do aeroporto, mais de 800 mil impactos mensais sobre viajantes, executivos e formadores de opinião.',
    image: '/media/iconicos/distrito-de-midia-duo-square.webp',
    imageAlt: 'Painéis alinhados ao longo da via curva de saída do aeroporto, vistos da pista',
    verEm: { label: 'Ver na plataforma Aeroporto', href: '/plataformas/aeroporto' },
  },
  {
    slug: 'duo-vision',
    name: 'Duo Vision',
    kicker: 'Sincronizado · Av. das Torres',
    text: 'Dois painéis digitais operando em sincronia, um em cada lado da via. A Avenida das Torres vista dos dois sentidos, na mesma hora, com a mesma mensagem: cobertura total do corredor, sem ponto cego.',
    specs: 'Av. das Torres, 2100 · Curitiba',
    image: '/media/iconicos/duo-vision.webp',
    imageAlt: 'Dois painéis digitais verticais, um de cada lado da avenida, ao anoitecer',
  },
]

export const ICONICOS = [
  {
    slug: 'green',
    num: '01',
    name: 'Green',
    tagline: 'Estruturas vegetadas',
    short: 'Vegetação viva: a marca aparece junto de um ganho visível para a rua.',
    image: '/media/iconicos/champagnat-square.webp',
    imageAlt: 'Painel digital emoldurado por uma parede viva de vegetação, em rua residencial',
    href: '/plataformas/projetos-iconicos/green',
    frase:
      'Vegetação viva integrada à estrutura. Jardim vivo incorporado à própria mídia, associando a marca a bem-estar em vez de só ocupar o campo de visão.',
    ctaLinha: 'Quero avaliar um Green',
    ativos: [
      {
        slug: 'batel-square',
        name: 'Batel Square',
        kicker: 'Digital · 3D e 2D · Anamórfico',
        text: 'O primeiro projeto de mídia digital 3D e 2D de Curitiba, alimentado por energia limpa. O efeito anamórfico faz o conteúdo saltar do painel para quem passa, com até 1 milhão de impactos mensais em uma das esquinas mais valorizadas da cidade.',
        specs:
          '2048×512 px no total, duas faces de 1024×512 px · distância da calçada 3 m · melhor visualização do 3D a aprox. 30 m · Av. Visconde de Guarapuava, 5292',
        image: '/media/iconicos/batel-square.webp',
        imageAlt:
          'Esquina digital com duas faces de LED em ângulo exibindo uma campanha, sobre edifício em avenida',
      },
      {
        slug: 'champagnat-square',
        name: 'Champagnat Square',
        kicker: 'Digital · 3D e 2D · Jardim vivo',
        text: 'A segunda esquina digital de Curitiba, com parede viva integrada à estrutura do painel. Mídia de última geração em 2D, 3D e anamórfico ao lado de vegetação real, unindo tecnologia e bem-estar no mesmo ponto. Cerca de 1 milhão de impactos mensais.',
        specs:
          '1536×512 px no total, faces de 512×512 e 1024×512 px · distância da calçada 0,5 m · melhor visualização do 3D a aprox. 30 m · Rua Alferes Ângelo Sampaio, 2384',
        image: '/media/iconicos/champagnat-square.webp',
        imageAlt:
          'Painel digital emoldurado por parede viva de vegetação, com campanha de varejo, sob céu azul',
      },
      {
        slug: 'cascata-square',
        name: 'Cascata Square',
        kicker: 'Digital · 3 painéis sincronizados · 4 pontos',
        text: 'Três painéis de LED verticais em composição assimétrica, criando o efeito de uma cascata digital em movimento. Os painéis interagem entre si: a campanha pode fluir como peça única ou exibir três conteúdos autônomos, com fluxo visual que prende o olhar.',
        specs: '1344×2520 px, divididos em três painéis de 1344×840 px · MP4 · 10 segundos',
        image: '/media/iconicos/cascata-square-martim-afonso.webp',
        imageAlt:
          'Composição de três painéis digitais verticais em cascata exibindo uma campanha, ao entardecer',
        // A Cascata é um ativo com quatro endereços, cada um com foto própria. O
        // card lista os pontos; a foto do topo é a de Martim Afonso.
        pontos: [
          {
            name: 'Curitiba Martim Afonso',
            endereco: 'Rua Martim Afonso, 642',
            image: '/media/iconicos/cascata-square-martim-afonso.webp',
            imageAlt:
              'Painéis digitais verticais em cascata com campanha de bebida, em rua de casario ao entardecer',
          },
          {
            name: 'Curitiba Água Verde',
            endereco: 'Av. Iguaçu, 3083',
            image: '/media/iconicos/cascata-square-agua-verde.webp',
            imageAlt: 'Painel digital vertical na fachada de um edifício, em rua arborizada',
          },
          {
            name: 'Curitiba Batel',
            endereco: 'Av. Silva Jardim, 2427 / Rua Bento Viana, 806',
            image: '/media/iconicos/cascata-square-batel.webp',
            imageAlt:
              'Painéis digitais verticais na avenida ao anoitecer, com trânsito intenso e pista molhada',
          },
          {
            name: 'Joinville',
            endereco: 'Av. Juscelino Kubitschek, 110',
            image: '/media/iconicos/cascata-square-joinville.webp',
            imageAlt:
              'Três painéis digitais verticais em composição de cascata ao entardecer, com o skyline da cidade ao fundo',
          },
        ],
      },
      {
        slug: 'mub-garden',
        name: 'MUB Garden',
        kicker: 'Mobiliário urbano digital · Jardim no topo',
        text: 'O primeiro mobiliário urbano digital de Curitiba com jardim vivo no topo. A estrutura de rua ganha cobertura verde, e a marca exibida herda o contexto de cuidado com a cidade que só um mobiliário assim carrega.',
        specs: 'Av. Iguaçu, 3925',
        image: '/media/iconicos/mub-garden.webp',
        imageAlt:
          'Mobiliário urbano digital com jardim vivo no topo, na calçada de uma via residencial',
        verEm: { label: 'Ver na plataforma MUB', href: '/plataformas/mub' },
      },
    ],
    eyebrow: 'Projeto icônico · Sustentabilidade',
    heading: 'Green.',
    intro:
      'Jardins verticais e estruturas com vegetação viva: a marca aparece junto de um ganho visível para a rua, com manutenção por nossa conta. É o projeto para quem precisa que o discurso ambiental apareça no lugar onde as pessoas passam.',
    ctaLabel: 'Quero um projeto Green',
    aside: {
      text: 'Vegetação viva não é adereço: exige irrigação, poda e reposição. Tudo isso é nosso, o anunciante contrata a face, não o jardim.',
      footer: 'Manutenção da vegetação incluída no período',
    },
    oQueE: {
      lead: 'Green é mídia exterior com vegetação real integrada à estrutura. A marca divide a superfície com algo que a rua reconhece como melhoria, e essa associação é o que a plataforma entrega.',
      cards: [
        {
          title: 'Vegetação viva',
          text: 'Jardins verticais e estruturas vegetadas com espécies escolhidas para o clima e a insolação de cada ponto.',
        },
        {
          title: 'Manutenção por nossa conta',
          text: 'Irrigação, poda e reposição das mudas são responsabilidade da Outdoormídia durante toda a veiculação.',
        },
        {
          title: 'Lastro para o discurso',
          text: 'A campanha de sustentabilidade deixa de ser só mensagem: existe uma estrutura na rua sustentando o que a peça diz.',
        },
      ],
    },
    faqs: [
      {
        q: 'A manutenção da vegetação entra no meu custo?',
        a: 'Não. Irrigação, poda e reposição das mudas são de responsabilidade da Outdoormídia durante todo o período contratado.',
      },
      {
        q: 'Faz sentido para marcas fora do segmento de sustentabilidade?',
        a: 'Sim. Qualquer marca que queira reforçar um posicionamento responsável pode usar o Green, a leitura vem da estrutura, não do segmento do anunciante.',
      },
      {
        q: 'Em que tipo de ponto essas estruturas ficam?',
        a: 'Em vias e locais com potencial de valorização paisagística, priorizando visibilidade e integração com o entorno. A escolha passa por viabilidade técnica e pela insolação do local.',
      },
      {
        q: 'Consigo comprovar o ganho ambiental na minha comunicação?',
        a: 'Traga essa necessidade no briefing. Levantamos o que é mensurável no projeto específico antes de qualquer número entrar na peça.',
      },
    ],
  },
  {
    slug: 'regenerativo',
    num: '02',
    name: 'Regenerativo',
    tagline: 'Contrapartida à cidade',
    short: 'Espaços de convívio requalificados como parte da veiculação.',
    image: '/media/iconicos/praca-pet-guilherme-pugsley.webp',
    imageAlt: 'Praça pet iluminada à noite, com letreiro e painéis do patrocinador',
    href: '/plataformas/projetos-iconicos/regenerativo',
    frase:
      'A veiculação começa fora do painel. Praças, canteiros e pontos de convívio requalificados pela marca, que devolve à cidade o espaço que ocupa.',
    ctaLinha: 'Quero avaliar um Regenerativo',
    ativos: [
      {
        slug: 'jardim-horizontal',
        name: 'Jardim Horizontal',
        kicker: 'Parede viva · Grande formato',
        text: 'Vegetação viva tomando conta de metade da estrutura, ao lado da peça publicitária. A marca divide o painel com um canteiro vertical de verdade, num formato que já valorizou lançamentos como o do GT.Building em Curitiba.',
        image: '/media/iconicos/jardim-horizontal.webp',
        imageAlt:
          'Painel de grande formato dividido entre a peça publicitária e um canteiro vertical vivo',
      },
      {
        slug: 'jardim-vertical',
        name: 'Jardim Vertical',
        kicker: 'Parede viva · Poster Sight · 2 pontos',
        text: 'O painel publicitário como elemento vivo. Aplicado em Poster Sight estratégico, associa a marca a sustentabilidade e bem-estar em meio ao ritmo acelerado da cidade.',
        image: '/media/iconicos/jardim-vertical.webp',
        imageAlt: 'Painel publicitário emoldurado por vegetação viva em avenida arborizada',
        pontos: [
          {
            name: 'Curitiba',
            endereco: 'Rua Bispo Dom José, 2866',
            image: '/media/iconicos/jardim-vertical.webp',
            imageAlt: 'Painel publicitário emoldurado por vegetação viva em avenida arborizada',
          },
          // TODO(cliente): o segundo ponto tem foto e não tem endereço (pendência
          // 8 do handoff de 03/09/2026). Sem `endereco` o card mostra só a foto,
          // em vez de anunciar na página que falta um dado.
          {
            name: 'Curitiba',
            endereco: null,
            image: '/media/iconicos/jardim-vertical-2.webp',
            imageAlt:
              'Painel publicitário com aplicação em relevo e base vegetada, em esquina de avenida',
          },
        ],
      },
      {
        slug: 'jardim-digital',
        name: 'Jardim Digital',
        kicker: 'Parede viva · Letra caixa · 17h diárias',
        text: 'Jardim vertical natural com letra caixa integrada, exibindo a campanha do cliente de forma exclusiva por 17 horas diárias, sem dividir atenção com nenhuma outra marca. Um respiro verde em uma das áreas mais nobres de Curitiba.',
        specs: 'Rua Desembargador Motta, 3220',
        image: '/media/iconicos/jardim-digital.webp',
        imageAlt:
          'Painel digital com letra caixa integrada a um jardim vertical natural, à beira da via',
      },
      {
        slug: 'praca-pet-guilherme-pugsley',
        name: 'Praça Pet Guilherme Pugsley',
        kicker: 'Requalificação urbana · Primeira de Curitiba',
        text: 'A primeira Praça Pet de Curitiba. Infraestrutura de lazer e convivência que transformou um espaço urbano comum em ponto de encontro, com a marca patrocinadora associada ao início desse movimento na cidade.',
        specs: 'Rua Guilherme Pugsley, 820',
        image: '/media/iconicos/praca-pet-guilherme-pugsley.webp',
        imageAlt: 'Praça pet iluminada à noite, com letreiro, brinquedos e painéis do patrocinador',
      },
      {
        slug: 'praca-pet-bento-viana',
        name: 'Praça Pet Bento Viana',
        kicker: 'Requalificação urbana',
        text: 'Espaço planejado para lazer, bem-estar e inclusão, com infraestrutura segura e moderna que revitaliza o entorno e cria um novo ponto de encontro entre marcas, pessoas e cidade.',
        specs: 'Rua Bento Viana, esquina com Sete de Setembro',
        image: '/media/iconicos/praca-pet-bento-viana.webp',
        imageAlt:
          'Espaço requalificado com vegetação em socalcos e painel digital, em esquina movimentada',
      },
      {
        slug: 'praca-pet-silva-jardim',
        name: 'Praça Pet Silva Jardim',
        kicker: 'Requalificação urbana · Terceira entrega',
        text: 'A terceira Praça Pet do projeto Gentileza Urbana. Consolida o compromisso da marca patrocinadora com a valorização de espaços públicos, ampliando o legado iniciado nas duas praças anteriores.',
        specs: 'Av. Silva Jardim, 3338',
        image: '/media/iconicos/praca-pet-silva-jardim.webp',
        imageAlt: 'Painel digital vertical com base vegetada, em via de bairro com trânsito',
      },
    ],
    eyebrow: 'Projeto icônico · Cidade',
    heading: 'Regenerativo.',
    intro:
      'Projetos que devolvem algo ao espaço que ocupam: requalificação de espaços de convívio e canteiros como parte da veiculação. A marca não aluga um espaço na cidade: ela deixa o espaço melhor do que encontrou.',
    ctaLabel: 'Quero levar um Regenerativo',
    aside: {
      text: 'Regenerativo envolve poder público, comunidade e prazo mais longo. É o projeto de maior construção, e o que rende a relação mais duradoura com o espaço.',
      footer: 'Escopo e prazo definidos com a prefeitura de cada município',
    },
    oQueE: {
      lead: 'A contrapartida é o produto. A marca patrocina a requalificação de um espaço público e ganha presença nele, com uma associação que nenhuma face de outdoor entrega sozinha.',
      cards: [
        {
          title: 'Requalificação real',
          text: 'Espaços de convívio e canteiros recuperados: piso, iluminação, vegetação e mobiliário de uso.',
        },
        {
          title: 'Presença de longo prazo',
          text: 'Projetos com horizonte maior que uma campanha, a marca fica associada ao espaço enquanto ele durar.',
        },
        {
          title: 'Aprovação junto ao município',
          text: 'A negociação com o poder público e o licenciamento são conduzidos por nós, do desenho à entrega.',
        },
      ],
    },
    faqs: [
      {
        q: 'Quanto tempo leva um projeto regenerativo?',
        a: 'Mais que uma campanha comum. Entre briefing, aprovação municipal e obra, o prazo é definido caso a caso, e trazemos a estimativa junto do estudo de viabilidade.',
      },
      {
        q: 'A marca pode escolher o local?',
        a: 'Pode indicar a região e o perfil desejado. O espaço final depende do interesse do município e da viabilidade técnica da intervenção.',
      },
      {
        q: 'Como a marca aparece no espaço?',
        a: 'Por sinalização de patrocínio integrada ao projeto, dentro do que a legislação do município permite. Não é uma face de mídia convencional.',
      },
      {
        q: 'Quem mantém o espaço depois da entrega?',
        a: 'A manutenção faz parte do acordo firmado com o município e é definida no escopo do projeto, junto com o período de presença da marca.',
      },
    ],
  },
  {
    slug: 'elegancy',
    num: '03',
    name: 'Elegancy',
    tagline: 'Mobiliário de assinatura',
    short:
      'Desenho autoral em endereços nobres: a mídia soma à paisagem em vez de disputar com ela.',
    image: '/media/iconicos/top-sight-digital-urbanity.webp',
    imageAlt: 'Estrutura vertical de desenho autoral com painel digital, em avenida de prédios altos',
    href: '/plataformas/projetos-iconicos/elegancy',
    frase:
      'Design moderno em endereços nobres: a mídia valoriza a paisagem e a marca herda esse contexto.',
    ctaLinha: 'Quero avaliar um Elegancy',
    ativos: [
      {
        slug: 'top-sight-digital-urbanity',
        name: 'Top Sight Digital Urbanity',
        kicker: 'Arquitetura como projeto',
        text: 'A arquitetura entrou no desenho do painel antes da tecnologia. Linhas que valorizam a rua em vez de disputar com ela, com acabamento que eleva a percepção de qualquer marca exibida.',
        specs: 'Super Top Digital Urbanity: 768×1024 px · MP4 · 10 segundos',
        image: '/media/iconicos/top-sight-digital-urbanity.webp',
        imageAlt:
          'Estrutura vertical com painel digital e base iluminada em desenho próprio, em avenida de prédios altos',
        verEm: {
          label: 'Ver na plataforma Outdoor Digital',
          href: '/plataformas/outdoors-digitais',
        },
      },
      {
        slug: 'top-sight-digital-urbanity-light',
        name: 'Top Sight Digital Urbanity Light',
        kicker: 'Luz como assinatura',
        text: 'A iluminação contorna, revela e valoriza a estrutura, criando presença reconhecível mesmo antes da campanha ser lida. O painel se torna elemento de paisagem, e a marca herda o contexto de modernidade e alto valor percebido.',
        specs: 'Rua Coronel Dulcídio, 457, esquina com Alameda Dom Pedro II',
        image: '/media/iconicos/top-sight-digital-urbanity-light.webp',
        imageAlt: 'Painel digital vertical de estrutura reduzida, entre árvores em via residencial',
        verEm: {
          label: 'Ver na plataforma Outdoor Digital',
          href: '/plataformas/outdoors-digitais',
        },
      },
    ],
    eyebrow: 'Projeto icônico · Assinatura',
    heading: 'Elegancy.',
    intro:
      'Estruturas de desenho autoral em endereços nobres, onde a mídia precisa somar à paisagem em vez de disputar com ela. Duas linhas, Urbanity e Urbanity Light, para contextos com exigência estética diferente.',
    ctaLabel: 'Quero avaliar um Elegancy',
    aside: {
      text: 'Elegancy não é um formato de tabela. Cada estrutura é desenhada para o endereço onde vai ficar, com acabamento, escala e iluminação decididos no projeto, não no catálogo.',
      footer: 'Briefing → estudo de viabilidade → projeto da estrutura',
    },
    oQueE: {
      lead: 'Existem endereços em que um outdoor comum não entra: por regra, por contexto ou por decisão da marca. Elegancy é a resposta para esses lugares: mobiliário urbano com desenho próprio, que a rua aceita e a marca assina.',
      cards: [
        {
          title: 'Desenho para o endereço',
          text: 'A estrutura nasce do local: escala, material e acabamento definidos a partir da via, do entorno e da visada.',
        },
        {
          title: 'Contexto de alto padrão',
          text: 'Pontos escolhidos em corredores e bairros onde a marca quer ser vista junto de um repertório específico.',
        },
        {
          title: 'Exclusividade total',
          text: 'Face única, como em toda a operação: a estrutura exibe uma marca só, do primeiro ao último dia.',
        },
      ],
    },
    faqs: [
      {
        q: 'Qual a diferença entre Urbanity e Urbanity Light?',
        a: 'É porte, não acabamento. Urbanity é a estrutura plena, de maior presença na via; Urbanity Light usa a mesma linguagem em escala reduzida, para calçadas estreitas e endereços com restrição de gabarito.',
      },
      {
        q: 'Consigo contratar Elegancy por bissemana, como um outdoor?',
        a: 'Não do mesmo jeito. Elegancy é projeto: o período é definido junto com a viabilidade da estrutura, e costuma ser mais longo que uma veiculação de tabela. Traga o briefing que voltamos com prazo e formato.',
      },
      {
        q: 'A estrutura é minha ou fica com a Outdoormídia?',
        a: 'A estrutura é nossa: projeto, instalação e manutenção por nossa conta. O que você contrata é a exclusividade da face pelo período combinado.',
      },
      {
        q: 'Posso escolher o endereço?',
        a: 'Você traz a região e o perfil de público desejado; nós avaliamos a viabilidade técnica e legal de cada ponto e voltamos com as opções que se sustentam.',
      },
    ],
  },
]

export function getIconicoBySlug(slug) {
  return ICONICOS.find((i) => i.slug === slug)
}

// Busca um ativo nomeado nas duas listas. É por aqui que uma página de
// plataforma exibe um ativo que vive nos Icônicos (os três do Distrito em
// /plataformas/aeroporto, o MUB Garden em /plataformas/mub) sem copiar o texto:
// a plataforma guarda só o slug, e o conteúdo continua tendo um dono só.
export function getAtivoBySlug(slug) {
  const daAssinatura = ICONICOS_ASSINATURA.find((a) => a.slug === slug)
  if (daAssinatura) return daAssinatura

  for (const linha of ICONICOS) {
    const ativo = linha.ativos.find((a) => a.slug === slug)
    // Visto de fora, o link tem que voltar para a linha, não repetir o destino
    // que o ativo declara para uso dentro dos Icônicos. Sem esta troca o MUB
    // Garden exibido em /plataformas/mub apontaria para /plataformas/mub.
    if (ativo) {
      return {
        ...ativo,
        verEm: {
          label: `Ver na linha ${linha.name}`,
          href: `/plataformas/projetos-iconicos#${linha.slug}`,
        },
      }
    }
  }

  return null
}

export function getOutrosIconicos(slug) {
  return ICONICOS.filter((i) => i.slug !== slug)
}
