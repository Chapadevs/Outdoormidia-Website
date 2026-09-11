// Tradução de lib/iconicos.js. Nome de linha e de ativo é nome oficial e não
// se traduz (Green, Regenerativo, Elegancy, Batel Square, MUB Garden…), e por
// isso `name`, `heading`, `slug`, `href`, `image` e os endereços continuam
// vindo do arquivo em português.
//
// ATENÇÃO: os `ativos` de Elegancy terminam com `...ICONICOS_ASSINATURA` no
// arquivo em português. O overlay repete o mesmo spread para o merge por
// posição continuar alinhado, e para os quatro ícones de assinatura terem uma
// tradução só, servindo Icônicos e /plataformas/aeroporto.

export const ICONICOS_ASSINATURA = [
  {
    name: 'Airport Square',
    kicker: 'Hybrid · 312 m²',
    text: 'The largest hybrid OOH panel in Southern Brazil. Latest-generation LED screens combined with front light panels on the same structure, uniting the dynamism of digital with the impact of static. More than 700 thousand monthly impacts on the highest-income audience in the state.',
    imageAlt:
      'A sequence of panels showing an automotive campaign on the airport exit road, under a blue sky',
    verEm: { label: 'See it on the Airport platform' },
  },
  {
    name: 'Mosaic Square',
    kicker: 'Single face · 265.5 m²',
    text: 'Where advertising becomes art. It applies the Single Face concept: one brand, no visual neighbours, no competition for attention. A showcase of total exclusivity at the exit of Afonso Pena International Airport.',
    imageAlt:
      'A set of panels in sequence showing a single automotive campaign, with no other brands around',
    verEm: { label: 'See it on the Airport platform' },
  },
  {
    name: 'Duo Square Media District',
    kicker: 'First in Brazil · 577.5 m²',
    text: 'The country’s first Media District. Five LED screens and ten front light panels on the only exit road from the airport, more than 800 thousand monthly impacts on travellers, executives and opinion formers.',
    imageAlt: 'Panels lined up along the curved airport exit road, seen from the roadway',
    verEm: { label: 'See it on the Airport platform' },
  },
  {
    kicker: 'Synchronised · Av. das Torres',
    text: 'Two digital panels operating in sync, one on each side of the road. Avenida das Torres seen from both directions, at the same time, with the same message: full coverage of the corridor, with no blind spot.',
    specs: 'Av. das Torres, 2100 · Curitiba',
    imageAlt: 'Two vertical digital panels, one on each side of the avenue, at dusk',
  },
]

export const ICONICOS = [
  {
    tagline: 'Vegetated structures',
    short: 'Living vegetation: the brand appears alongside a visible gain for the street.',
    imageAlt: 'A digital panel framed by a living wall of vegetation, on a residential street',
    frase:
      'Living vegetation integrated into the structure. A living garden built into the media itself, associating the brand with wellbeing rather than merely occupying the field of view.',
    ctaLinha: 'I want to consider a Green',
    ativos: [
      {
        name: 'Batel Square',
        kicker: 'Digital · 3D and 2D · Anamorphic',
        text: 'The first 3D and 2D digital media project in Curitiba, powered by clean energy. The anamorphic effect makes the content leap out of the panel for passers-by, with up to 1 million monthly impacts on one of the most valuable corners in the city.',
        specs:
          '2048×512 px in total, two faces of 1024×512 px · 3 m from the pavement · best 3D viewing at approx. 30 m · Av. Visconde de Guarapuava, 5292',
        imageAlt:
          'A digital corner with two angled LED faces showing a campaign, on a building on an avenue',
      },
      {
        name: 'Champagnat Square',
        kicker: 'Digital · 3D and 2D · Living garden',
        text: 'Curitiba’s second digital corner, with a living wall built into the panel structure. Latest-generation media in 2D, 3D and anamorphic alongside real vegetation, uniting technology and wellbeing at the same site. Around 1 million monthly impacts.',
        specs:
          '1536×512 px in total, faces of 512×512 and 1024×512 px · 0.5 m from the pavement · best 3D viewing at approx. 30 m · Rua Alferes Ângelo Sampaio, 2384',
        imageAlt:
          'A digital panel framed by a living wall of vegetation, with a retail campaign, under a blue sky',
      },
      {
        name: 'Cascade Square',
        kicker: 'Digital · 3 synchronised panels · 4 sites',
        text: 'Three vertical LED panels in an asymmetric composition, creating the effect of a digital cascade in motion. The panels interact with each other: the campaign can flow as a single piece or show three independent pieces of content, with a visual flow that holds the eye.',
        specs: '1344×2520 px, split across three panels of 1344×840 px · MP4 · 10 seconds',
        imageAlt:
          'A composition of three vertical digital panels in a cascade showing a campaign, at dusk',
        pontos: [
          {
            imageAlt:
              'Vertical digital panels in a cascade with a drinks campaign, on a street of townhouses at dusk',
          },
          {
            imageAlt: 'A vertical digital panel on a building facade, on a tree-lined street',
          },
          {
            imageAlt:
              'Vertical digital panels on the avenue at nightfall, with heavy traffic and a wet road',
          },
          {
            imageAlt:
              'Three vertical digital panels in a cascade composition at dusk, with the city skyline behind',
          },
        ],
      },
      {
        name: 'MUB Garden',
        kicker: 'Digital street furniture · Garden on top',
        text: 'The first digital street furniture in Curitiba with a living garden on top. The street structure gains a green roof, and the brand on display inherits the sense of care for the city that only furniture like this carries.',
        specs: 'Av. Iguaçu, 3925',
        imageAlt:
          'Digital street furniture with a living garden on top, on the pavement of a residential road',
        verEm: { label: 'See it on the MUB platform' },
      },
      {
        name: 'Horizontal Garden',
        kicker: 'Living wall · Large format',
        text: 'Living vegetation taking over half the structure, alongside the advertising piece. The brand shares the panel with a real vertical planter, in a format that has already lifted launches such as GT.Building in Curitiba.',
        imageAlt:
          'A large-format panel split between the advertising piece and a living vertical planter',
      },
      {
        name: 'Vertical Garden',
        kicker: 'Living wall · Poster Sight · 2 sites',
        text: 'The advertising panel as a living element. Applied to a strategic Poster Sight, it associates the brand with sustainability and wellbeing amid the fast pace of the city.',
        imageAlt: 'An advertising panel framed by living vegetation on a tree-lined avenue',
        pontos: [
          {
            imageAlt: 'An advertising panel framed by living vegetation on a tree-lined avenue',
          },
          {
            imageAlt:
              'An advertising panel with a raised application and a vegetated base, on an avenue corner',
          },
        ],
      },
      {
        name: 'Digital Garden',
        kicker: 'Living wall · Channel letters · 17 hours a day',
        text: 'A natural vertical garden with integrated channel letters, showing the client’s campaign exclusively for 17 hours a day, sharing attention with no other brand. A green breath in one of the most upmarket areas of Curitiba.',
        specs: 'Rua Desembargador Motta, 3220',
        imageAlt:
          'A digital panel with channel letters built into a natural vertical garden, at the roadside',
      },
    ],
    eyebrow: 'Iconic project · Sustainability',
    intro:
      'Vertical gardens and structures with living vegetation: the brand appears alongside a visible gain for the street, with maintenance on us. It is the project for those who need their environmental message to show up where people actually pass.',
    ctaLabel: 'I want a Green project',
    aside: {
      text: 'Living vegetation is not an ornament: it requires irrigation, pruning and replacement. All of that is ours, the advertiser contracts the face, not the garden.',
      footer: 'Vegetation maintenance included for the period',
    },
    oQueE: {
      lead: 'Green is outdoor media with real vegetation built into the structure. The brand shares the surface with something the street recognises as an improvement, and that association is what the platform delivers.',
      cards: [
        {
          title: 'Living vegetation',
          text: 'Vertical gardens and vegetated structures with species chosen for the climate and the sunlight of each site.',
        },
        {
          title: 'Maintenance on us',
          text: 'Irrigation, pruning and replacement of the plants are Outdoormídia’s responsibility throughout the campaign.',
        },
        {
          title: 'Backing for the message',
          text: 'The sustainability campaign stops being only a message: there is a structure on the street backing up what the piece says.',
        },
      ],
    },
    faqs: [
      {
        q: 'Is the maintenance of the vegetation part of my cost?',
        a: 'No. Irrigation, pruning and replacement of the plants are Outdoormídia’s responsibility throughout the contracted period.',
      },
      {
        q: 'Does it make sense for brands outside the sustainability sector?',
        a: 'Yes. Any brand wanting to reinforce a responsible position can use Green; the reading comes from the structure, not from the advertiser’s sector.',
      },
      {
        q: 'What kind of sites do these structures occupy?',
        a: 'Roads and locations with potential for landscape enhancement, prioritising visibility and integration with the surroundings. The choice depends on technical feasibility and on how much sun the site gets.',
      },
      {
        q: 'Can I evidence the environmental gain in my communication?',
        a: 'Bring that requirement into the brief. We assess what is measurable in the specific project before any figure goes into the piece.',
      },
    ],
  },
  {
    name: 'Regenerative',
    heading: 'Regenerative.',
    tagline: 'Giving back to the city',
    short: 'Community spaces regenerated as part of the campaign.',
    imageAlt: 'A pet square lit at night, with signage and the sponsor’s panels',
    frase:
      'The campaign begins outside the panel. Squares, planters and community spaces regenerated by the brand, which gives back to the city the space it occupies.',
    ctaLinha: 'I want to consider a Regenerativo',
    ativos: [
      {
        name: 'Guilherme Pugsley Pet Square',
        kicker: 'Urban regeneration · The first in Curitiba',
        text: 'The first Pet Square in Curitiba. Leisure and community infrastructure that turned an ordinary urban space into a meeting point, with the sponsoring brand associated with the start of that movement in the city.',
        specs: 'Rua Guilherme Pugsley, 820',
        imageAlt: 'A pet square lit at night, with signage, play equipment and the sponsor’s panels',
      },
      {
        name: 'Batel Convenience Square',
        kicker: 'The first concave product in Curitiba',
        text: 'A space designed for leisure, wellbeing and inclusion, with safe, modern infrastructure that revitalises the surroundings and creates a new meeting point between brands, people and the city. It is also the first concave product in Curitiba: the curved face follows the corner and delivers the brand at a wide angle, to those arriving from both roads.',
        specs: 'Rua Bento Viana, corner of Sete de Setembro',
        imageAlt:
          'A regenerated space with terraced planting and a digital panel, on a busy corner',
      },
      {
        name: 'Silva Jardim Pet Square',
        kicker: 'Urban regeneration · Third delivery',
        text: 'The third Pet Square in the Regenerativo project. It consolidates the sponsoring brand’s commitment to the value of public space, extending the legacy begun in the two previous squares.',
        specs: 'Av. Silva Jardim, 3338',
        imageAlt: 'A vertical digital panel with a vegetated base, on a neighbourhood road with traffic',
      },
    ],
    eyebrow: 'Iconic project · City',
    intro:
      'Projects that give something back to the space they occupy: regeneration of community spaces and planters as part of the campaign. The brand does not rent a space in the city: it leaves the space better than it found it.',
    ctaLabel: 'I want to bring a Regenerativo',
    aside: {
      text: 'Regenerativo involves public authorities, the community and a longer timeline. It is the project that takes the most building, and the one that yields the longest-lasting relationship with the space.',
      footer: 'Scope and timeline agreed with each municipality',
    },
    oQueE: {
      lead: 'The give-back is the product. The brand sponsors the regeneration of a public space and gains presence in it, with an association no billboard face delivers on its own.',
      cards: [
        {
          title: 'Real regeneration',
          text: 'Community spaces and planters restored: paving, lighting, vegetation and usable furniture.',
        },
        {
          title: 'Long-term presence',
          text: 'Projects with a horizon longer than a campaign; the brand stays associated with the space for as long as it lasts.',
        },
        {
          title: 'Approval with the municipality',
          text: 'Negotiation with the public authorities and the licensing are handled by us, from design to delivery.',
        },
      ],
    },
    faqs: [
      {
        q: 'How long does a regenerative project take?',
        a: 'Longer than an ordinary campaign. Between the brief, municipal approval and construction, the timeline is set case by case, and we bring the estimate with the feasibility study.',
      },
      {
        q: 'Can the brand choose the location?',
        a: 'It can indicate the area and the profile it wants. The final space depends on the municipality’s interest and on the technical feasibility of the intervention.',
      },
      {
        q: 'How does the brand appear in the space?',
        a: 'Through sponsorship signage integrated into the project, within what the municipality’s legislation allows. It is not a conventional media face.',
      },
      {
        q: 'Who maintains the space after delivery?',
        a: 'Maintenance is part of the agreement signed with the municipality and is defined in the project scope, along with the period of the brand’s presence.',
      },
    ],
  },
  {
    tagline: 'Signature street furniture',
    short:
      'Authored design at prime addresses: the media adds to the landscape instead of competing with it.',
    imageAlt: 'A vertical structure of authored design with a digital panel, on an avenue of tall buildings',
    frase:
      'Modern design at prime addresses: the media enhances the landscape and the brand inherits that context.',
    ctaLinha: 'I want to consider an Elegancy',
    ativos: [
      {
        kicker: 'Architecture as the project',
        text: 'Architecture entered the design of the panel before the technology did. Lines that enhance the street instead of competing with it, with a finish that lifts the perception of any brand on display.',
        specs: 'Super Top Digital Urbanity: 768×1024 px · MP4 · 10 seconds',
        imageAlt:
          'A vertical structure with a digital panel and an illuminated base of bespoke design, on an avenue of tall buildings',
        verEm: { label: 'See it on the Outdoor Digital platform' },
      },
      {
        kicker: 'Light as a signature',
        text: 'The lighting outlines, reveals and enhances the structure, creating a recognisable presence even before the campaign is read. The panel becomes part of the landscape, and the brand inherits that context of modernity and high perceived value.',
        specs: 'Rua Coronel Dulcídio, 457, corner of Alameda Dom Pedro II',
        imageAlt: 'A vertical digital panel on a slim structure, among trees on a residential road',
        verEm: { label: 'See it on the Outdoor Digital platform' },
      },
      ...ICONICOS_ASSINATURA,
    ],
    eyebrow: 'Iconic project · Signature',
    intro:
      'Structures of authored design at prime addresses, where the media has to add to the landscape instead of competing with it. Two lines, Urbanity and Urbanity Light, for contexts with different aesthetic demands.',
    ctaLabel: 'I want to consider an Elegancy',
    aside: {
      text: 'Elegancy is not a rate-card format. Each structure is designed for the address where it will stand, with finish, scale and lighting decided in the project, not in the catalogue.',
      footer: 'Brief → feasibility study → structural design',
    },
    oQueE: {
      lead: 'There are addresses an ordinary billboard cannot enter: by rule, by context or by the brand’s own decision. Elegancy is the answer for those places: street furniture with its own design, that the street accepts and the brand signs.',
      cards: [
        {
          title: 'Designed for the address',
          text: 'The structure comes from the location: scale, material and finish defined from the road, the surroundings and the sightline.',
        },
        {
          title: 'Upmarket context',
          text: 'Sites chosen in corridors and neighbourhoods where the brand wants to be seen alongside a specific repertoire.',
        },
        {
          title: 'Total exclusivity',
          text: 'A single face, as across the whole operation: the structure shows one brand only, from the first day to the last.',
        },
      ],
    },
    faqs: [
      {
        q: 'What is the difference between Urbanity and Urbanity Light?',
        a: 'It is scale, not finish. Urbanity is the full structure, with greater presence on the road; Urbanity Light uses the same language at reduced scale, for narrow pavements and addresses with height restrictions.',
      },
      {
        q: 'Can I book Elegancy by the fortnight, like a billboard?',
        a: 'Not in the same way. Elegancy is a project: the period is defined together with the feasibility of the structure, and it tends to be longer than a rate-card campaign. Bring us the brief and we will come back with a timeline and a format.',
      },
      {
        q: 'Is the structure mine or does it stay with Outdoormídia?',
        a: 'The structure is ours: design, installation and maintenance on us. What you contract is exclusivity of the face for the agreed period.',
      },
      {
        q: 'Can I choose the address?',
        a: 'You bring the area and the audience profile you want; we assess the technical and legal feasibility of each site and come back with the options that stand up.',
      },
    ],
  },
]

// Rótulo montado por getAtivoBySlug quando um ativo é exibido fora dos
// Icônicos. `{linha}` é o nome da linha, que não se traduz.
export const VER_NA_LINHA = 'See it in the {linha} line'
