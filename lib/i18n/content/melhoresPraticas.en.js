// Tradução de lib/melhoresPraticas.js. `href` e o componente de ícone
// continuam vindo do arquivo em português.
//
// ATENÇÃO: `praticaLink.trecho` precisa ser um pedaço literal de `pratica` no
// mesmo idioma — é por busca de substring que o link é montado. Traduzir um
// sem o outro apaga o link da página.

export const PRATICAS = [
  {
    titulo: 'Start from the objective, not from the site',
    corpo: 'Driving people to a store, launching a product, building a brand in the region and promoting a date are four different campaigns. They call for different locations, different formats and different periods. The right site is a consequence of the objective, never the other way round.',
    pratica: 'before choosing where, write in one sentence what the campaign needs to solve.',
  },
  {
    titulo: 'Choose the location by your audience’s route',
    corpo: 'Being in the city and being in the routine are different things. Someone who leaves home at seven and comes back at seven travels predictable corridors, and that is where the brand needs to appear. Spreading faces across the whole city without looking at routes costs more and is remembered less.',
    pratica: 'list the three routes your customer takes on an ordinary day. The location comes from there.',
  },
  {
    titulo: 'Format is not size, it is function',
    corpo: 'Each format solves a different problem. There is no better format, there is the right format for what the campaign needs to do, and that is why the conversation starts at the objective and not at the catalogue.',
    pratica: 'use the table just below to cross objective and format before the first conversation.',
  },
  {
    titulo: 'Repetition is what builds recall',
    corpo: 'Outdoor media does not work by interruption, it works by accumulation. The same person passes the same site several times a week, and it is that sum that turns into brand memory. With the same budget, a longer period across fewer sites usually pays off more than many faces over a short time.',
    pratica:
      'before increasing the number of faces, check that the period is right. The contracting unit for outdoor media is the fortnight, and the FAQ explains the cycles of each asset.',
    praticaLink: {
      trecho: 'the FAQ explains the cycles of each asset',
    },
  },
  {
    titulo: 'The artwork has to be read in seconds',
    corpo: 'People in traffic have few seconds and no intention of reading. An outdoor piece works with one idea, a visible brand and a single point of contact. Copy written for a magazine ad, applied to a panel, is not read, it is ignored.',
    pratica:
      'print the artwork on an A4 sheet, pin it to the wall and look at it from three metres away. If in two seconds you cannot tell whose brand it is and what is being said, the piece is not ready yet.',
    recomendacoes: {
      titulo: 'Three recommendations our team makes on every campaign',
      texto:
        'High contrast between background and typography. Thin and serif fonts disappear at a distance, and a white or black background is not recommended. Vertical and horizontal formats call for different compositions, and the artwork needs to be conceived for the format from the start, never adapted afterwards.',
    },
  },
  {
    titulo: 'Where the brand appears also communicates',
    corpo: 'The surroundings become part of how the piece is read. A panel shared with other brands also splits attention. That is what Face Única exists for: the whole face, with no visual competition in the same field of view. For anyone selling positioning before price, the chosen asset is part of the message.',
    pratica:
      'when comparing proposals from different media owners, check whether the face is dedicated to a single brand. In our operation, it is.',
  },
  {
    titulo: 'Ask which data you receive, before and after',
    corpo: 'Outdoor media is no longer the channel without numbers, but what each media owner delivers varies. Before closing, ask what information you receive about the site and about who moves through it. After the campaign runs, ask how the display is evidenced. If you need to defend the plan internally, ask both questions in the very first conversation.',
    pratica: 'take the reading of the site into the internal meeting, not just a photo of it.',
  },
  {
    titulo: 'Lead time changes what is available',
    corpo: 'The busiest sites are also the most contested, and commercial dates concentrate demand on the same assets. Some products have their own lead time: panels built on demand along highways work on a long contracting cycle and are not resolved in weeks. The earlier the conversation starts, the more options are on the table.',
    pratica: 'take the campaign calendar to the first conversation, not just the budget.',
  },
]

export const CHECKLIST_CATEGORIAS = [
  {
    titulo: 'Products',
    itens: [
      'Use the official name of every product',
      'Never use abbreviations or nicknames such as "Cascata" or "Square"',
      'When in doubt, check with the Outdoormídia Marketing team',
    ],
    fechamento:
      'The name of each product is part of building the brand and must be treated with rigour and consistency.',
  },
  {
    titulo: 'Images',
    itens: [
      'Use only real images of Outdoormídia panels',
      'The panel must be 100% clean and visible, with no text, icons or graphic elements overlaid on it',
      'Do not use images with visual noise on the screen',
      'Avoid filters, distortions or AI treatments that change the colour, structure or proportion of the product',
      'If power or light cables are visibly in front of the panel, they must be removed during image treatment, keeping the shot realistic and the site well presented',
    ],
    fechamento:
      'Every published image must strengthen our identity: transparent, professional and visually striking.',
  },
  {
    titulo: 'Cases and references',
    intro:
      'The strength of each Outdoormídia product is amplified when it is associated with highly visible, relevant brands. Therefore:',
    itens: [
      'Always give priority to campaigns from major brands that advertise with us, they reinforce authority, results and confidence in the product',
      'Do not use Outdoormídia’s own institutional campaigns as a main case, nor as product promotion material',
    ],
    fechamento:
      'It is the market that validates our portfolio. And major brands are our best showcase.',
  },
  {
    titulo: 'Soundtrack',
    intro:
      'The music used in videos and reels must be considered with the same aesthetic and strategic care as the images and the copy. Sound should not compete with the message, it should reinforce it lightly and neutrally.',
    itens: [
      'Prefer neutral, instrumental music, with no sung lyrics or distracting rhythm',
      'Use only tracks cleared for copyright (trusted audio libraries, royalty-free or licensed tracks)',
      'Avoid popular songs, vocals or exaggerated dramatic effects',
    ],
    fechamento:
      'Sound is positioning too. And at Outdoormídia it must reinforce clarity, sophistication and purpose.',
  },
]

export const PERGUNTAS_ANTES_DE_FECHAR = [
  {
    pergunta: 'Is the face dedicated to my brand alone?',
    porque:
      'It determines whether your brand shares attention in that field of view. At Outdoormídia, Face Única guarantees that it does not',
  },
  {
    pergunta: 'Is the site illuminated?',
    porque:
      'Lighting follows the feasibility of each site and changes performance at night',
  },
  {
    pergunta: 'What is the contracting cycle for this asset?',
    porque: 'Fortnights, months and longer cycles change the investment calculation',
  },
  {
    pergunta: 'Is installation included?',
    porque:
      'On exclusive panel products, it is. Asking avoids the most common doubt on this front',
  },
  {
    pergunta: 'What is included in the campaign price?',
    porque:
      'It separates what is already paid for from what shows up as an extra line, before the proposal arrives',
  },
]

export const SAIDAS = [
  {
    titulo: 'Brand presence diagnosis',
    texto: 'Ten questions and a reading of where your brand stands today.',
  },
  {
    titulo: 'Your brand in OOH',
    texto: 'See your brand applied to a real panel from our network.',
  },
  {
    titulo: 'FAQ',
    texto:
      'Price, lead time, artwork and site exclusivity. The questions the sales team hears most.',
  },
]
