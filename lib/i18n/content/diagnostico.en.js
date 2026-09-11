// Tradução de lib/diagnostico.js. As classes de estilo dos degraus, os
// `href`, `key`, `n`, `max` e `range` continuam vindo do arquivo em português.

export const GRUPOS = [
  { titulo: 'Recall' },
  { titulo: 'Perception' },
  { titulo: 'Physical presence' },
  { titulo: 'Frequency' },
  { titulo: 'Competition and memory' },
]

export const PERGUNTAS = [
  {
    pergunta: 'When someone thinks of your sector, is your brand remembered?',
    ajuda: 'Before comparing prices, customers compare names they already know.',
    minimo: 'Never remembered',
    maximo: 'Remembered first',
    fragil: {
      diagnostico:
        'Spontaneous recall is the most expensive asset to build and the cheapest to maintain. It starts with repeated exposure in the right place.',
      cta: 'We can put together a continuous presence plan for your sector in your area.',
    },
  },
  {
    pergunta: 'Is your brand known beyond your existing customer base?',
    ajuda: 'Outside of those who have already bought, how many people know your company exists?',
    minimo: 'Only past customers',
    maximo: 'Far beyond the base',
    fragil: {
      diagnostico:
        'Your brand is circulating inside its own base. Growth requires being seen by people who have never bought anything from you.',
      cta: 'See where your brand would reach new people.',
      link: { label: 'Regions and coverage' },
    },
  },
  {
    pergunta: 'Does your brand look the size it actually is?',
    ajuda: 'A solid company that rarely shows up gives the impression of a small company.',
    minimo: 'Looks smaller',
    maximo: 'Looks its size',
    fragil: {
      diagnostico:
        'The perception of size is built by where the brand appears. A company that occupies large space in the city is read as a large company.',
      cta: 'Discover the formats that change how big a brand is perceived to be.',
      link: { label: 'Iconic Projects' },
    },
  },
  {
    pergunta: 'Does your sales team have to explain who the company is before selling?',
    ajuda:
      'When the brand has arrived first, the conversation starts at the proposal and not at the introduction.',
    minimo: 'Always has to explain',
    maximo: 'They already know us',
    fragil: {
      diagnostico:
        'If sales has to introduce the company in every meeting, the brand is not arriving before the salesperson. Presence shortens that conversation.',
      cta: 'Talk to our team about preparing the ground before the sales visit.',
    },
  },
  {
    pergunta: 'Is your brand in the places where your audience moves?',
    ajuda: 'Avenues, highways, malls, the airport. Where their routine actually happens.',
    minimo: 'It is not',
    maximo: 'It is on their route',
    fragil: {
      diagnostico:
        'Being where the audience moves is the difference between being searched for and being found. Territory is a media decision, not luck.',
      cta: 'See the available platforms and where each one reaches.',
      link: { label: 'Platforms' },
    },
  },
  {
    pergunta: 'Is your brand known across the whole region you serve?',
    ajuda: 'Many companies are strong in the neighbourhood of their head office and unknown fifteen minutes away.',
    minimo: 'Only around head office',
    maximo: 'Across the whole region',
    fragil: {
      diagnostico:
        'Being strong only around head office limits the business to the radius of those already passing the door. A whole region calls for distributed presence.',
      cta: 'See the full coverage across Paraná and Santa Catarina.',
      link: { label: 'Regions and coverage' },
    },
  },
  {
    pergunta: 'Does your brand show up all year round?',
    ajuda: 'Or does it appear in a one-off campaign and vanish for the rest of the calendar.',
    minimo: 'Only during campaigns',
    maximo: 'All year round',
    fragil: {
      diagnostico:
        'A one-off campaign builds a peak, not memory. All year round costs less per month and delivers more in the aggregate.',
      cta: 'Understand how to build an annual presence calendar.',
      link: { label: 'Solutions' },
    },
  },
  {
    pergunta: 'Would someone who has never heard of you run into your brand this week?',
    ajuda:
      'Not in a search, because whoever searches already knows you. On the drive, in the mall queue, on the road. Discovery happens without intent.',
    minimo: 'Nowhere near it',
    maximo: 'Would see it several times',
    fragil: {
      diagnostico:
        'If nobody discovers you without looking, every new customer costs active effort. Exposure turns chance into a channel.',
      cta: 'See where your brand would enter your audience’s daily route.',
      link: { label: 'Platforms' },
    },
  },
  {
    pergunta: 'Does your brand have as much visibility as your main competitors?',
    ajuda: 'In the same area, who shows up more: you or them?',
    minimo: 'They show up more',
    maximo: 'I show up more',
    fragil: {
      diagnostico:
        'Showing up less than a competitor in the same area means giving up space in the customer’s memory. That space does not stay empty, it gets occupied.',
      cta: 'With Single Face, each site belongs to a single advertiser. Talk to our team about exclusivity in your area.',
    },
  },
  {
    pergunta: 'If you stopped advertising today, would your brand still be remembered in the coming months?',
    ajuda: 'Exposure disappears when it stops. Memory stays.',
    minimo: 'Would fade fast',
    maximo: 'Would still be remembered',
    fragil: {
      diagnostico:
        'If the brand vanishes when the campaign stops, what exists is exposure, not memory. Memory is built through consistency.',
      cta: 'We can design a consistency plan within what your company already invests today.',
    },
  },
]

export const DEGRAUS = [
  {
    nome: 'Existence',
    linha: 'The company exists, and the market still does not see it.',
    fraseDura: 'Your brand exists, and the market still does not see it.',
    paragrafos: [
      'The company works, delivers well and almost nobody knows it. Sales depend on referrals, on price and on luck. When those three fail in the same month, nothing is left holding up the revenue.',
      'What blocks you here is not quality, it is exposure. No company sells to people who do not know it exists, and the competitor who does show up takes the customer who would have been yours, even while delivering less.',
      'The next step is Discovery, and it begins the day your brand starts being seen by people who have never heard of you. That does not happen by chance: it happens where those people move.',
    ],
  },
  {
    nome: 'Discovery',
    linha: 'People are starting to know it, and they forget quickly.',
    fraseDura: 'Your brand appears, and then it disappears.',
    paragrafos: [
      'People are starting to know you, and they forget quickly. The brand appears in one strong month, disappears in the others, and the recall built up is lost before it turns into a decision. It is the most frustrating effort in communication: you pay to be seen and reap nothing.',
      'What blocks you here is the gap. Brand memory is not built with intensity, it is built with repetition. An isolated campaign creates a peak and a trough. The customer decides in the trough.',
      'The next step is Recognition, and it arrives when the brand stops being a novelty and becomes familiarity. That requires appearing in the same places, consistently, for long enough that the market stops forgetting you.',
    ],
  },
  {
    nome: 'Recognition',
    linha: 'They have heard of you. You are not the first choice yet.',
    fraseDura: 'They have heard of you. You are not the first choice yet.',
    paragrafos: [
      'The market knows you exist and does not think of you first. It is the most common band, and the most expensive, because the brand already has enough reputation to be considered and still argues about price in every negotiation.',
      'What blocks you here is comparison. When the customer remembers three names, the criterion becomes price. When they remember one, the criterion becomes trust. The difference between those two scenarios is how many times each brand appeared on their route during the year.',
      'The next step is Preference, and it grows out of consistency combined with exclusivity of space. With Single Face, each site belongs to a single advertiser: your brand does not share attention with the competition precisely where the decision is formed.',
    ],
  },
  {
    nome: 'Preference',
    linha: 'When the need arises, your name comes first.',
    fraseDura: 'When the need arises, your name comes first.',
    paragrafos: [
      'The customer thinks "when I need this, I will remember that company". The brand starts selling without arguing about price all the time, and negotiation gets shorter because trust already came ready made.',
      'What blocks you here is your own success. A preferred brand tends to cut investment in presence believing memory holds itself up, and it does not: the competitor who keeps showing up occupies the space you left.',
      'The next step is Reference, the top, where the brand becomes a synonym for the category. Those who get there treat presence as a permanent investment and occupy the city in more than one format, not just one.',
    ],
  },
  {
    nome: 'Reference',
    linha: 'The brand became a synonym for the category.',
    fraseDura: 'Your brand became a synonym for the category.',
    paragrafos: [
      'When someone describes the need, your name comes up before the category does. This is the top of the ladder, and it is the hardest place to reach and the easiest to lose.',
      'What blocks you here is maintenance. Reference is not a lifetime title, it is a position defended month by month. Every category has the case of the brand that was a synonym and became a memory, and in all of them the fall began when the brand stopped showing up.',
      'From here on the work changes in nature: it is no longer about building presence, it is about holding territory. That means being at the sites your competitor would like to occupy, before they do.',
    ],
  },
]

export const ESCALA = [
  { rotulo: 'Almost never' },
  { rotulo: 'Sometimes' },
  { rotulo: 'Almost always' },
]

export const ROTULOS_NOTA = [
  'Almost never',
  'Rarely',
  'Sometimes',
  'Often',
  'Almost always',
]

export const META_PERGUNTAS = 'Questions'
