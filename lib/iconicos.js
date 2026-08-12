// Os 3 projetos icônicos.
//
// Icônicos são plataformas, mas não entram no catálogo das 7: são projetos de
// assinatura, sob medida, com fluxo comercial próprio (briefing → viabilidade →
// estrutura). Por isso vivem em arquivo separado de `lib/platforms.js` e ganham
// uma faixa própria na home, acima das plataformas.
//
// Cada item alimenta dois lugares: os campos de topo (`num`, `name`, `tagline`,
// `short`, `image`, `href`) montam o carrossel da home e os cards do hub; o
// restante monta a página dedicada em /plataformas/projetos-iconicos/[slug],
// que é a mesma estrutura para os três — só o conteúdo muda.
//
// TODO(cliente): confirmar o texto de cada linha. Elegancy/Urbanity e
// Regenerativo vieram da nomenclatura interna — falta o descritivo oficial,
// as medidas de cada estrutura e as praças onde já estão instaladas. Por isso
// os cards de formato descrevem a estrutura sem cravar dimensão.
// TODO(cliente): `image` é a foto que ocupa o card inteiro no carrossel da home
// (16/9, mínimo 1600px de largura). Enquanto não vier, o card cai num painel
// escuro com o nome do projeto.
export const ICONICOS = [
  {
    slug: 'elegancy',
    num: '01',
    name: 'Elegancy',
    tagline: 'Mobiliário de assinatura',
    short: 'Desenho autoral em endereços nobres — a mídia soma à paisagem em vez de disputar com ela.',
    image: null,
    href: '/plataformas/projetos-iconicos/elegancy',
    eyebrow: 'Projeto icônico · Assinatura',
    heading: 'Elegancy.',
    intro:
      'Estruturas de desenho autoral em endereços nobres, onde a mídia precisa somar à paisagem em vez de disputar com ela. Duas linhas — Urbanity e Urbanity Light — para contextos com exigência estética diferente.',
    ctaLabel: 'Quero avaliar um Elegancy',
    aside: {
      text: 'Elegancy não é um formato de tabela. Cada estrutura é desenhada para o endereço onde vai ficar, com acabamento, escala e iluminação decididos no projeto — não no catálogo.',
      footer: 'Briefing → estudo de viabilidade → projeto da estrutura',
    },
    oQueE: {
      lead: 'Existem endereços em que um outdoor comum não entra — por regra, por contexto ou por decisão da marca. Elegancy é a resposta para esses lugares: mobiliário urbano com desenho próprio, que a rua aceita e a marca assina.',
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
    linhas: [
      {
        slug: 'urbanity',
        name: 'Urbanity',
        tagline: 'Estrutura plena',
        text: 'A linha completa do Elegancy: estrutura de maior porte, presença marcante na via e acabamento de mobiliário — para quando a marca é o próprio ponto de referência do endereço.',
        formats: [
          {
            aspect: '1/1.4',
            top: 'vert.',
            side: 'plena',
            label: 'Urbanity',
            title: 'Face vertical iluminada',
            text: 'Estrutura de desenho autoral com face iluminada, dimensionada por projeto conforme o endereço.',
          },
          {
            aspect: '1/1.4',
            top: 'vert.',
            side: 'dupla',
            label: 'Urbanity',
            title: 'Dupla face',
            text: 'Versão com leitura nos dois sentidos da via, mantendo uma única marca nas duas faces.',
          },
        ],
      },
      {
        slug: 'urbanity-light',
        name: 'Urbanity Light',
        tagline: 'Estrutura reduzida',
        text: 'A mesma linguagem do Urbanity em escala menor, para calçadas estreitas, vias de bairro e endereços com restrição de gabarito — sem abrir mão do acabamento.',
        formats: [
          {
            aspect: '1/1.4',
            top: 'vert.',
            side: 'reduz.',
            label: 'Light',
            title: 'Face vertical compacta',
            text: 'Estrutura de porte reduzido para calçadas e vias onde a versão plena não cabe.',
          },
          {
            aspect: '16/9',
            top: 'horiz.',
            side: 'baixa',
            label: 'Light',
            title: 'Módulo horizontal',
            text: 'Variante horizontal de baixa altura, pensada para não bloquear fachada nem visada da via.',
          },
        ],
      },
    ],
    formats: [
      {
        aspect: '1/1.4',
        top: 'vert.',
        side: 'projeto',
        label: 'Elegancy',
        title: 'Mobiliário de assinatura',
        text: 'Estrutura desenhada caso a caso. As medidas saem do estudo de viabilidade do endereço.',
      },
      {
        aspect: '16/9',
        top: 'horiz.',
        side: 'projeto',
        label: 'Elegancy',
        title: 'Módulo horizontal',
        text: 'Variante de baixa altura para pontos com restrição de gabarito ou de fachada.',
      },
    ],
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
        a: 'A estrutura é nossa — projeto, instalação e manutenção por nossa conta. O que você contrata é a exclusividade da face pelo período combinado.',
      },
      {
        q: 'Posso escolher o endereço?',
        a: 'Você traz a região e o perfil de público desejado; nós avaliamos a viabilidade técnica e legal de cada ponto e voltamos com as opções que se sustentam.',
      },
    ],
  },
  {
    slug: 'green',
    num: '02',
    name: 'Green',
    tagline: 'Estruturas vegetadas',
    short: 'Vegetação viva: a marca aparece junto de um ganho visível para a rua.',
    image: null,
    href: '/plataformas/projetos-iconicos/green',
    eyebrow: 'Projeto icônico · Sustentabilidade',
    heading: 'Green.',
    intro:
      'Jardins verticais e estruturas com vegetação viva: a marca aparece junto de um ganho visível para a rua, com manutenção por nossa conta. É o projeto para quem precisa que o discurso ambiental apareça no lugar onde as pessoas passam.',
    ctaLabel: 'Quero um projeto Green',
    aside: {
      text: 'Vegetação viva não é adereço: exige irrigação, poda e reposição. Tudo isso é nosso — o anunciante contrata a face, não o jardim.',
      footer: 'Manutenção da vegetação incluída no período',
    },
    oQueE: {
      lead: 'Green é mídia exterior com vegetação real integrada à estrutura. A marca divide a superfície com algo que a rua reconhece como melhoria — e essa associação é o que a plataforma entrega.',
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
    linhas: [],
    formats: [
      {
        aspect: '1/1.4',
        top: 'vert.',
        side: 'jardim',
        label: 'Green',
        title: 'Jardim vertical',
        text: 'Painel vegetado com área de marca integrada. Estrutura e espécies definidas por ponto.',
      },
      {
        aspect: '16/9',
        top: 'horiz.',
        side: 'misto',
        label: 'Green',
        title: 'Face mista',
        text: 'Combinação de face de mídia e faixa vegetada na mesma estrutura.',
      },
    ],
    faqs: [
      {
        q: 'A manutenção da vegetação entra no meu custo?',
        a: 'Não. Irrigação, poda e reposição das mudas são de responsabilidade da Outdoormídia durante todo o período contratado.',
      },
      {
        q: 'Faz sentido para marcas fora do segmento de sustentabilidade?',
        a: 'Sim. Qualquer marca que queira reforçar um posicionamento responsável pode usar o Green — a leitura vem da estrutura, não do segmento do anunciante.',
      },
      {
        q: 'Em que tipo de ponto essas estruturas ficam?',
        a: 'Em vias e praças com potencial de valorização paisagística, priorizando visibilidade e integração com o entorno. A escolha passa por viabilidade técnica e pela insolação do local.',
      },
      {
        q: 'Consigo comprovar o ganho ambiental na minha comunicação?',
        a: 'Traga essa necessidade no briefing. Levantamos o que é mensurável no projeto específico antes de qualquer número entrar na peça.',
      },
    ],
  },
  {
    slug: 'regenerativo',
    num: '03',
    name: 'Regenerativo',
    tagline: 'Contrapartida à cidade',
    short: 'Praças, canteiros e pontos de convívio requalificados como parte da veiculação.',
    image: null,
    href: '/plataformas/projetos-iconicos/regenerativo',
    eyebrow: 'Projeto icônico · Cidade',
    heading: 'Regenerativo.',
    intro:
      'Projetos que devolvem algo ao espaço que ocupam — requalificação de praças, canteiros e pontos de convívio como parte da veiculação. A marca não aluga um espaço na cidade: ela deixa o espaço melhor do que encontrou.',
    ctaLabel: 'Quero levar um Regenerativo',
    aside: {
      text: 'Regenerativo envolve poder público, comunidade e prazo mais longo. É o projeto de maior construção — e o que rende a relação mais duradoura com a praça.',
      footer: 'Escopo e prazo definidos com a prefeitura de cada praça',
    },
    oQueE: {
      lead: 'A contrapartida é o produto. A marca patrocina a requalificação de um espaço público e ganha presença nele — com uma associação que nenhuma face de outdoor entrega sozinha.',
      cards: [
        {
          title: 'Requalificação real',
          text: 'Praças, canteiros e pontos de convívio recuperados: piso, iluminação, vegetação e mobiliário de uso.',
        },
        {
          title: 'Presença de longo prazo',
          text: 'Projetos com horizonte maior que uma campanha — a marca fica associada ao espaço enquanto ele durar.',
        },
        {
          title: 'Aprovação junto ao município',
          text: 'A negociação com o poder público e o licenciamento são conduzidos por nós, do desenho à entrega.',
        },
      ],
    },
    linhas: [],
    formats: [
      {
        aspect: '16/9',
        top: 'praça',
        side: 'projeto',
        label: 'Regener.',
        title: 'Requalificação de praça',
        text: 'Intervenção completa no espaço, com a marca presente na sinalização e no mobiliário entregue.',
      },
      {
        aspect: '1/1.4',
        top: 'vert.',
        side: 'canteiro',
        label: 'Regener.',
        title: 'Canteiro e corredor verde',
        text: 'Adoção e recuperação de canteiros e faixas verdes, com identificação do patrocinador.',
      },
    ],
    faqs: [
      {
        q: 'Quanto tempo leva um projeto regenerativo?',
        a: 'Mais que uma campanha comum. Entre briefing, aprovação municipal e obra, o prazo é definido caso a caso — trazemos a estimativa junto do estudo de viabilidade.',
      },
      {
        q: 'A marca pode escolher a praça?',
        a: 'Pode indicar a região e o perfil desejado. A praça final depende do interesse do município e da viabilidade técnica da intervenção.',
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
]

export function getIconicoBySlug(slug) {
  return ICONICOS.find((i) => i.slug === slug)
}

export function getOutrosIconicos(slug) {
  return ICONICOS.filter((i) => i.slug !== slug)
}
