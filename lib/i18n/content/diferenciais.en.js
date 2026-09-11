// Tradução de lib/diferenciais.js. Slug, href, publicado, imagens, vídeos,
// ícones e números continuam vindo do arquivo em português.
//
// O overlay é aplicado por posição sobre TODOS_DIFERENCIAIS, que tem 11
// entradas. As 5 últimas estão com `publicado: false` e não aparecem em lugar
// nenhum do site: entram como `{}` e caem no português, em vez de gastar
// tradução em texto arquivado. Se alguma voltar ao ar, é aqui que a tradução
// dela entra, na mesma posição.
//
// Nome de produto é traduzido junto com o resto, por decisão de 10/09/2026:
// nada do site sai em português numa página que não é a portuguesa. A
// terminologia vale para o site inteiro e está aplicada em todos os overlays,
// para o título do card e o corpo do texto não divergirem.

export const TODOS_DIFERENCIAIS = [
  {
    heading: 'Single face.',
    // face-unica
    title: 'Single Face',
    tagline: 'Exclusive attention',
    text: 'One face, one brand. Exclusive display on every structure, with no space sharing and no visual competition.',
    resumo: 'Each site belongs to a single advertiser, from the first day to the last.',
    intro:
      'One face, one brand. The Single Face concept guarantees exclusive display on the structure: no shared space, no visual competition, no noise fighting for the same glance. That is what happens at Mosaic Square, 265.5 m² dedicated to one brand at a time.',
    ctaLabel: 'I want an exclusive site',
    ctaSecundario: { label: 'See it in practice' },
    imageAlt:
      'Outdoormídia’s Media District, a structure of front lights and the "om" sign beside a road in Curitiba',
    aside: {
      text: 'In outdoor media, the market standard is to split the structure between two, three or four brands. Not here: one face, one advertiser, from the first day of the period to the last.',
    },
    oQueE: {
      lead: [
        'Single Face guarantees total exclusivity for each advertiser: it removes any visual competition and delivers direct, clear, powerful communication with the audience. A single advertiser occupies the whole media set, maximising visibility, impact and recall for your brand.',
        'While other outdoor media companies share the same site between several brands, Outdoormídia dedicates each advertising space exclusively to your brand. That removes the fight for the audience’s attention and ensures your message is the only one perceived at that location.',
      ],
      cardsTitle: 'Benefits for the brand',
      cards: [
        { title: 'Amplified visibility', text: 'Your brand is the absolute protagonist.' },
        {
          title: 'No distractions',
          text: 'The audience’s full attention, with no interference from other campaigns.',
        },
        {
          title: 'Premium visual experience',
          text: 'Greater impact, better legibility and longer-lasting recall.',
        },
      ],
    },
    comparativo: {
      amador: {
        label: 'Amateur',
        imageAlt: 'Three generic billboards sharing the same structure, each from a different brand',
      },
      especialista: {
        label: 'Specialist',
        imageAlt:
          'The whole structure occupied by Telecine’s Trolls 2 campaign, a single brand from start to finish',
        legenda: 'The whole face, the whole period. One message for those passing by: yours.',
      },
      nota: 'Billboard layouts created by us to illustrate the point.',
    },
  },
  {
    heading: 'Airport Square.',
    // aeroporto-square
    title: 'Airport Square',
    tagline: 'An unprecedented format',
    text: 'The largest hybrid panel in Southern Brazil: 312 m² where physical presence and digital content share the same structure.',
    resumo: 'The largest hybrid panel in Southern Brazil, 312 m² in a single structure.',
    intro:
      'The largest hybrid panel in Southern Brazil: 312 m² where physical presence and digital content share the same structure. An audience on the move, high purchasing power and an exposure time the street does not offer. A format that exists only here.',
    ctaLabel: 'I want to advertise on the Airport Square',
    ctaSecundario: { label: 'See the Airport product' },
    imageAlt:
      'Airport Square, Outdoormídia’s curved hybrid panel, with a single advertiser’s campaign occupying the full length of the structure',
    aside: {
      text: 'Hybrid means static and digital on the same structure: the permanence of large format combined with content changing in real time, at a scale no other location in the South offers.',
    },
    oQueE: {
      lead: 'A format unprecedented in the region, where the permanence of large format is combined with the dynamics of digital content, with no equivalent anywhere else in Southern Brazil.',
      imageAlt: null,
    },
  },
  {
    // inteligencia-e-audiencia
    title: 'Intelligence and audience',
    tagline: 'Measured audience',
    text: 'Wi-Fi tracking and eye tracking answer where people move, who saw it and how they reacted.',
    resumo: 'CPM, frequency, gender, age bracket and income per campaign.',
    heading: 'Intelligence and audience.',
    intro:
      'Wi-Fi tracking and eye tracking answer what outdoor media never answered: where people move, who actually saw it and how they reacted. You receive a full report, real metrics and 24/7 monitoring. No estimates, only data measured campaign by campaign.',
    subtitulo:
      'Every outdoor campaign ends with the same question in the next meeting: how many people really saw it? Outdoormídia answers with data measured site by site, not with a traffic estimate. Wi-Fi tracking, eye tracking and real-time monitoring turn urban presence into a report you can present and defend.',
    seo: {
      title: 'Measured audience in outdoor media | Outdoormídia',
      description:
        'Wi-Fi tracking and eye tracking measure who moves through and who saw your campaign. A report with impacts, frequency, CPM, CPI and audience profile.',
    },
    imageAlt:
      'An Outdoormídia digital panel in operation, with vehicle and pedestrian flow around it',
    oQueE: {
      cards: [
        {
          title: 'Comparable CPM',
          text: 'Cost per thousand impacts calculated on measured flow, the same indicator you use to compare with online media.',
        },
        {
          title: 'Real frequency',
          text: 'How many times the same person was reached in the period, not a generic average for the road.',
        },
        {
          title: 'Audience profile',
          text: 'Gender, age bracket and income of those who passed the site. Useful for choosing the location and for defending the budget afterwards.',
        },
      ],
    },
    monitoramento: {
      title: 'The campaign watched while it is live',
      paragrafos: [
        'Wi-Fi tracking and eye tracking measure where people move and who actually saw the piece. The display is watched by camera during the campaign, with a dedicated team 24 hours a day, seven days a week, that acts as soon as anything is out of place.',
        'The monitoring is daily. The consolidated report arrives every week.',
      ],
      imagensAlt:
        'An Outdoormídia media site watched by camera while the campaign is running',
    },
    relatorio: {
      title: 'What goes into the report',
      lead: 'The report is not a run summary. It is the full reading of what the campaign delivered, site by site, in the vocabulary media planning already uses.',
      itens: [
        {
          title: 'Total impacts per site',
          text: 'What each face delivered, in isolation. It lets you compare performance within the campaign itself.',
        },
        {
          title: 'Average frequency',
          text: 'How many times the same person was reached in the period. Reach without frequency does not build memory.',
        },
        {
          title: 'Efficiency rate',
          text: 'The ratio between the exposed audience and the audience effectively reached at each site.',
        },
        {
          title: 'CPM',
          text: 'Cost per thousand impacts, in the same metric the rest of the media plan uses.',
        },
        {
          title: 'CPI',
          text: 'Cost per impact, for direct comparison between formats and locations.',
        },
        {
          title: 'Audience profile',
          text: 'Gender, age bracket and income bracket of the audience reached at each site.',
        },
        {
          title: 'Cross between sites',
          text: 'How much the campaign’s sites overlap and how much they genuinely extend reach.',
        },
        {
          title: 'Real-time data',
          text: 'Daily monitoring while the campaign runs, with a consolidated report every week.',
        },
      ],
      fechamento:
        'You do not pay separately for monitoring or for the report. The evidence is part of the campaign.',
      imageAlt:
        'A screen from Outdoormídia’s audience report, with impacts, frequency and audience profile per site',
    },
    leitura: {
      title: 'The reading in practice',
      lead: 'An audience measurement across the network, carried out between October and December 2022, shows the kind of answer the report delivers:',
      dados: [
        { label: 'of the audience aged between 18 and 60' },
        { label: 'male' },
        { label: 'female' },
        { label: 'class C+' },
        { label: 'A/B classes' },
      ],
    },
    privacidade: {
      title: 'Audience data, not personal data',
      paragrafos: [
        'The metrics from the digital network are aggregated and anonymous. The measurement describes an audience, not a person: no identifiable data is collected, stored or handed to the advertiser.',
      ],
    },
  },
  {
    // midia-regenerativa
    title: 'Regenerative Media',
    tagline: 'A legacy in the city',
    text: 'The first outdoor media asset connected to Curitiba’s Muralha Digital.',
    resumo: 'Outdoor media that gives a service back to the city, from public safety to pet squares.',
    heading: 'Regenerative media.',
    intro:
      'The first outdoor media asset connected to Curitiba’s Muralha Digital, at the Batel Convenience Square, with integrated monitoring and an emergency button. It is the same logic as the pet squares, the MUB Garden and the Electric Charging Square: a structure the city uses even when it is not looking at the brand. Urban presence is also urban responsibility.',
    ctaLabel: 'I want a site that gives something back',
    imageAlt:
      'An Outdoormídia media totem with a monitoring camera on top, installed on a corner in Batel, Curitiba',
    aside: {
      text: 'A media structure occupies public space every day of the year. Connecting it to the city’s safety network gives part of that space back to the people who pass by.',
      footer: 'Batel Convenience Square, Curitiba',
    },
    oQueGanha: {
      title: 'Showing up is different from belonging',
      lead: [
        'Every outdoor campaign competes for attention with what surrounds it. In Regenerative Media projects, the structure is what surrounds it. It does not interrupt the neighbourhood’s routine, it takes part in it.',
        'That changes the kind of presence the brand is buying. In a gathering square people do not pass by, they stay, and staying is exposure time the street does not offer. And the audience comes back, because the place still serves a purpose after the campaign ends.',
        'It also changes what the brand carries with it. Sponsoring a space the city uses gets the brand seen as a partner of the neighbourhood, not as an advertiser in it. It is the kind of association ordinary media does not buy, in a market where almost every brand talks about purpose and almost none has anywhere to point to.',
      ],
    },
    carteira: {
      title: 'The projects that are live',
      lead: 'Each project solves a different problem for the city, and that is why it associates the brand with a different thing. What they have in common is that they keep serving a purpose after the campaign ends.',
      projetos: [
        {
          title: 'Pet Squares',
          text: 'Leisure and gathering in high-traffic neighbourhoods. The brand shows up where the family chooses to spend the afternoon.',
          label: 'See the project',
        },
        {
          title: 'MUB Garden',
          text: 'Curitiba’s first digital street furniture with a living garden. Technology and nature on the same structure, with the brand between the two.',
          label: 'See the project',
        },
        {
          title: 'Digital Garden',
          text: 'Exclusive display on a fixture the city looks at because it is beautiful, not because it is an ad.',
          label: 'See the project',
        },
        {
          title: 'Electric Charging Square',
          text: 'The first in Southern Brazil, powered by solar energy. Presence associated with a service people use while they wait.',
          label: 'See the project',
        },
      ],
    },
  },
  {
    // circuito-mub
    title: 'MUB circuits by niche',
    tagline: 'The right audience, not the big one',
    text: 'Six weekly circuits built by audience profile, on the street furniture they already use in their routine.',
    cardCta: 'See the platform',
    resumo: 'Six street furniture circuits built by audience profile.',
    heading: 'MUB circuits by niche.',
    intro:
      'Six weekly circuits built by audience profile: Full, Health, Education, Malls, Premium and Supermarkets. Instead of spreading the campaign across the whole city, it runs on the street furniture your audience already uses in their routine.',
    imageAlt:
      'MUB street furniture with a garden on top and an advertiser’s campaign on the lit face, on a street in Curitiba',
  },
  {
    heading: 'OM 360 Management.',
    // gestao-360-om
    title: 'OM 360 Management',
    tagline: 'Consultancy from start to finish',
    text: 'Planning, production and campaign delivery run by the people who operate the structure.',
    cardCta: 'See how it works',
    resumo: 'Planning, production and campaign delivery run by the people who operate the structure.',
    intro:
      'Planning, production and campaign delivery run by the people who operate the structure. On exclusive panel projects, it includes legal licensing advice, sizing within regulations and full installation. You approve the campaign, you do not manage suppliers.',
  },
  {},
  {},
  {},
  {},
  {},
]
