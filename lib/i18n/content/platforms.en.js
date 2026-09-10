// Tradução de lib/platforms.js. Só os campos de texto: slug, vídeo, imagem,
// ativos, ícones, proporções e todos os números continuam vindo de lá.
//
// Nome de plataforma: os descritivos são traduzidos (Mídia Indoor, Aeroporto,
// Mídia Móvel, Rodovias), os que já são nome de produto ficam como estão
// (Outdoor Digital, Front Light, MUB, Digital Signage). Mesmo critério do menu.
//
// A ordem das entradas tem de bater com a de lib/platforms.js: o overlay é
// aplicado por posição.
export const PLATFORMS = [
  {
    // outdoors-digitais
    desc: 'Digital · 175 screens',
    short:
      'LED panels with content changing in real time. No print production, no wait between the decision and going live. The largest regional DOOH network in Southern Brazil, with 20 million impacts a week.',
    eyebrow: 'Platform · Digital · 175 screens',
    heading: 'Outdoor Digital.',
    intro:
      'Brief in hand in the morning, campaign live in the afternoon. The digital circuit removes the slowest stage of traditional out-of-home: production, printing and installation between artwork approval and the run. The largest regional DOOH network in Southern Brazil.',
    quando: [
      'Campaign with frequent creative changes',
      'Promotion on a short deadline',
      'Continuous presence with a message that changes by time of day',
    ],
    bignumbers: [
      { label: 'Digital screens' },
      { label: 'Impacts per week' },
      { label: 'Largest regional DOOH network in the South' },
    ],
    formats: [
      {
        label: 'Digital',
        title: 'HD LED panel',
        text: 'LED screens with dynamic creative swapping in high-traffic locations, with no print production.',
      },
    ],
    faqs: [
      {
        q: 'Do I need to produce printed artwork?',
        a: 'No. On digital billboards the creative is swapped straight on the screen, with no printing and no installation.',
      },
      {
        q: 'How often can I change the campaign?',
        a: 'Swapping is dynamic: you can alternate creatives by time of day, day of the week or period, with no reprinting cost.',
      },
      {
        q: 'Can I measure who saw the ad?',
        a: 'Yes. The 4yousee/Everywhere technology measures CPM, frequency, gender, age bracket and income of the audience reached, with live cameras 24×7 at every site.',
      },
    ],
  },
  {
    // front-lights
    desc: 'Static · 18 m² · Lit',
    short:
      'The classic billboard on high-traffic roads, horizontal and vertical. Large format, continuous presence and the recall that only daily repetition builds.',
    eyebrow: 'Platform · Static · 18 m² · Lit',
    heading: 'Front Light.',
    intro:
      'The format that built out-of-home and still delivers what no other does: the same brand, in the same place, every day, for the same people. Recall is built by repetition, and repetition has been this house specialty for 67 years.',
    quando: [
      'Long-term brand reinforcement',
      'Territory occupation',
      'Presence along a daily commute corridor',
    ],
    formats: [
      {
        dims: '6 × 3 m',
        label: 'Horizontal',
        title: 'Horizontal 18 m² frontlight',
        text: 'Classic billboard format, lit, on high-traffic roads.',
      },
      {
        dims: '3.5 × 5 m',
        top: '3.5 m',
        label: 'Vertical',
        title: 'Vertical 18 m² frontlight',
        text: 'Vertical version of the frontlight, for spaces with greater visibility at height.',
      },
    ],
    faqs: [
      {
        q: 'What is the difference between the horizontal and the vertical format?',
        a: 'Both are 18 m², only the orientation changes, and the choice depends on the site available and the reading you want along the road.',
      },
      {
        q: 'Is print production included?',
        a: 'Front Light is a printed format, so producing the material goes together with renting the site.',
      },
      {
        q: 'Can I move between sites during the campaign?',
        a: 'Yes, with the flexibility to rotate between sites, making the most of your media across the booked period.',
      },
    ],
  },
  {
    // shoppings
    name: 'Indoor Media',
    desc: 'Digital · 3 malls',
    short:
      'A fully digital operation in the main malls of the region. Corridor totems and car park panels reach the audience at the place and the moment of purchase.',
    eyebrow: 'Platform · Digital · 3 malls',
    heading: 'Indoor Media.',
    intro:
      'In a mall, people are not passing through. They are deciding. The operation is fully digital, across three centres with distinct consumption profiles, from family to corporate. You choose the environment that speaks to your customer.',
    imageAlt: 'Outdoormídia digital totem in a mall corridor',
    quando: [
      'Retail campaign with conversion close at hand',
      'Product launch at the point of sale',
      'Brand building alongside a high-frequency audience',
    ],
    bignumbers: [
      { label: 'People/month at Shopping São José' },
      { label: 'People/month at Shopping Itália' },
      { label: 'People/month at Park Shopping Boulevard' },
      { label: 'People/month across the malls' },
    ],
    blocosTitle: 'The three environments',
    blocos: [
      {
        title: 'Shopping São José · São José dos Pinhais',
        text: 'The largest mall in the Metropolitan Region of Curitiba, 7 minutes from Afonso Pena International Airport. More than 170 stores, recurring events and a high-traffic family profile, combining local shoppers, tourists and professionals in transit.',
        apoio: 'Mega Banner and Totem · Rua Dona Izabel A Redentora, 1434, Centro',
        imageAlt: 'Outdoormídia digital totem in a corridor of Shopping São José',
      },
      {
        title: 'Park Shopping Boulevard · Curitiba, South region',
        text: 'The largest mall in the far south of Curitiba, on the axis connecting Sítio Cercado, Portão, Novo Mundo, Capão Raso, Pinheirinho, Vila Hauer, Alto Boqueirão and Xaxim. An audience in one of the fastest-growing areas of the city, with everyday consumption and strong loyalty.',
        apoio: 'Gable and Totem · BR-116, 16303, Xaxim',
        imageAlt: 'Outdoormídia digital panel at Park Shopping Boulevard',
      },
      {
        title: 'Shopping Itália · Curitiba, city centre',
        text: 'One of the most established developments in Curitiba, operating since 1982. Its 26 floors bring together retail, services and offices in constant circulation: an average flow of 70 thousand people a month, with a corporate, professional and recurring audience.',
        apoio: 'Totem · Rua Marechal Deodoro, 630, Centro',
        imageAlt: 'Outdoormídia digital totem at Shopping Itália, next to the escalator',
      },
    ],
    formats: [
      {
        dims: 'Totem 2.2 m',
        top: '2.2 m',
        side: '1.2 m',
        label: 'Totem',
        title: 'Digital totem',
        text: 'Vertical digital panel placed in high-circulation areas inside the mall.',
      },
    ],
    faqs: [
      {
        q: 'Which malls do you have sites in?',
        a: 'São José, Park Shopping Boulevard and Itália, with a fully digital presence across totems and panels.',
      },
      {
        q: 'Is the ad close to the purchase decision?',
        a: 'Yes, the sites are placed in high-circulation areas inside the mall, close to the moment the shopper decides.',
      },
      {
        q: 'Do I need to produce printed material?',
        a: 'No. The whole indoor operation is digital, with the creative swapped straight on the screen.',
      },
    ],
  },
  {
    // aeroporto
    name: 'Airport',
    desc: 'Hybrid · 577.5 m²',
    short:
      'Distrito de Mídia Duo Square: 5 LED screens and 10 frontlights on the only exit road of Afonso Pena International Airport. The set houses Aeroporto Square, the largest hybrid panel in Southern Brazil.',
    eyebrow: 'Platform · Hybrid · 577.5 m²',
    heading: 'Airport.',
    intro:
      'Everyone who arrives in Curitiba by plane passes through a single exit road, in a metropolitan region of almost 3.7 million people. That is where Distrito de Mídia Duo Square sits, the first project of its kind in Brazil, designed to build qualified presence right at arrival.',
    quando: [
      'Speaking to decision-makers in transit: executives, investors and opinion formers',
      'Building a perception of national scale for the brand',
      'High-value B2B or institutional campaigns, with no need for neighbourhood targeting',
    ],
    bignumbers: [
      { label: 'Visual area' },
      { label: 'Impacts per month' },
      { label: 'Passengers per year' },
      { label: 'Inhabitants in the region' },
    ],
    blocosTitle: 'The District',
    blocos: [
      {
        title: 'Where it is',
        text: 'The District sits on Av. Rocha Pombo, on the only exit from Afonso Pena International Airport, in the municipality of São José dos Pinhais, metropolitan region of Curitiba.',
        apoio: 'An average of 20 thousand passengers a day',
      },
      {
        title: 'Audience',
        text: 'Air travellers have higher purchasing power. The profile of those passing through the District includes executives, tourists, international buyers, investors, professionals in transit and opinion formers, the kind of audience no other platform in the portfolio delivers at the same volume.',
      },
    ],
    formats: [
      {
        label: 'Gable',
        title: 'Digital gable 6×18 m',
        text: 'The largest digital gable in Southern Brazil, with full visibility inside the terminal.',
      },
    ],
    faqs: [
      {
        q: 'Do I need to go through a public tender to advertise at the airport?',
        a: 'No. The operation is private, with no tender, which makes the booking process considerably faster.',
      },
      {
        q: 'What is the profile of the audience passing through the airport?',
        a: 'A premium audience, with high purchasing power, in constant transit, ideal for brands seeking association with a sophisticated environment.',
      },
      {
        q: 'Does the digital gable allow the creative to be changed?',
        a: 'Yes, it is a 6×18 m digital panel, the largest in Southern Brazil, with creative changes and no print production.',
      },
    ],
  },
  {
    // midia-movel
    name: 'Mobile Media',
    desc: 'Static · Bike and Bus',
    short:
      'Bike Mídia and Bus Mídia reach where fixed structures cannot. Pedestrian streets, parks and busy centres, following the real route of the people you need to reach.',
    eyebrow: 'Platform · Static · Bike and Bus',
    heading: 'Mobile Media.',
    intro:
      'Not every audience is on an avenue. Bike Mídia and Bus Mídia take the campaign into the pedestrian street, the park and the city centre, along the route people walk.',
    quando: [
      'Activation at an event or on a specific date',
      'Covering an area closed to traffic',
      'Tactical reinforcement of a larger campaign',
    ],
    formats: [
      {
        dims: '4 × 1.3 m',
        side: '1.3 m',
        label: 'Mobile',
        title: 'Mobile structure',
        text: 'Travelling structure for one-off activations in places with high seasonal circulation.',
      },
    ],
    faqs: [
      {
        q: 'Where does Mobile Media usually operate?',
        a: 'Beaches, parks and pedestrian streets: places with heavy seasonal flow where fixed out-of-home does not reach.',
      },
      {
        q: 'Is it suited to short campaigns?',
        a: 'Yes, it is ideal for seasonal actions, one-off launches and activations that need concentrated presence over a short period.',
      },
      {
        q: 'Can the structure move between locations?',
        a: 'Yes, it is a travelling structure: it moves according to the route defined for the activation.',
      },
    ],
  },
  {
    // mub
    desc: 'Digital · 6 circuits',
    short:
      'Digital newsstands and clocks woven into the fabric of the city, organised into circuits by niche: health, education, malls, premium. You book the audience, not the site.',
    eyebrow: 'Platform · Digital · 6 circuits',
    heading: 'MUB.',
    intro:
      'Digital newsstands and clocks are part of the street, they do not compete with it. The network is organised into circuits by audience profile, so you book who you want to reach, not an isolated address.',
    imageAlt: 'MUB Garden digital newsstand integrated into a vertical garden',
    quando: [
      'Campaign segmented by niche',
      'Neighbourhood presence with controlled cost',
      'A brand that needs to appear near the point of decision',
    ],
    bignumbers: [{ label: 'Circuits by niche' }, { label: 'Digital formats' }],
    formats: [
      {
        label: 'Footbridge',
        title: 'MUB footbridge',
        text: 'Standard format of the MUB circuits, with the flexibility to rotate between sites.',
      },
    ],
    faqs: [
      {
        q: 'Does MUB allow audience segmentation?',
        a: 'Yes. There are 6 segmented circuits: Full, Health, Education, Malls, Premium and Super & Hyper.',
      },
      {
        q: 'How many sites and impacts does MUB have?',
        a: 'There are 6 segmented circuits, in the largest digitised MUB roster in a single city in Brazil. The site count for each circuit goes into the proposal, according to the location and the audience.',
      },
      {
        q: 'Can I choose just one specific circuit?',
        a: 'Yes, you can book the circuit most aligned with your target audience, without running across the full network.',
      },
    ],
  },
  {
    // rodovias
    name: 'Highways',
    desc: 'On demand · BR 101 · 116 · 277 · 376 · 407 · 470',
    short:
      'You choose the region, we build the panel. Sourcing within a 3 km radius of the point you indicate, in whatever format the campaign calls for, along the heaviest flows in the South.',
    eyebrow: 'Platform · On demand · Paraná and Santa Catarina',
    heading: 'Highways.',
    intro:
      'You choose the region, we build the panel. The Highways network connects the main corridors between Paraná and Santa Catarina, from Ponta Grossa to Florianópolis, taking in the coast and Joinville, reaching people who travel between these regions every day.',
    quandoKicker: 'Turning highways into opportunities',
    quando: [
      {
        title: 'Strategic coverage',
        text: 'Panels on high-traffic highways connect key regions such as Curitiba and Florianópolis, reaching both local and tourist audiences.',
      },
      {
        title: 'High visibility',
        text: 'The main purpose of an out-of-home campaign is to generate high visual impact, consolidate brand presence and convey exclusivity at every point of contact with the audience.',
      },
      {
        title: 'Variety and daily flow',
        text: 'They reach thousands of vehicles every day, touching different audiences throughout the day and creating multiple opportunities to engage with your audience.',
      },
      {
        title: 'Exposure and connection',
        text: 'Short, striking messages build lasting associations with an audience on the move.',
      },
    ],
    bignumbers: [
      { label: 'Impacts per month' },
      { label: 'Impacts over 12 months' },
      { label: 'Impacts over 24 months' },
      { label: 'BR highways covered' },
    ],
    passos: [
      {
        title: 'Choose the region.',
        text: 'Tell us roughly where the campaign needs to be. The operation carries out **sourcing within 3 km**, finding and negotiating the best available site from the location you indicate.',
      },
      {
        title: 'Choose the panel size.',
        text: 'The structure is built to measure, in 16 x 4 m (64 m²) or 20 x 5 m (100 m²). Lighting is available subject to operational feasibility.',
      },
      {
        title: '15-month contract.',
        text: 'Minimum run length, with the first print included, matching the build of a panel exclusive to your brand.',
      },
    ],
    passosFases: [
      {
        title: 'Phase 1',
        text: 'Collecting the brief and prospecting the site, within 30 days.',
      },
      {
        title: 'Phase 2',
        text: 'The installed panel is delivered within 90 days from the date the contract is signed.',
      },
    ],
    formats: [
      {
        label: 'Highway',
        title: 'Highway panel 12×4 m',
        text: 'Large format sized for reading at speed, along the main roads.',
      },
      {
        label: 'Footbridge',
        title: 'Footbridge 10×3 m',
        text: 'A face over the road, facing traffic in both directions.',
      },
    ],
    faqs: [
      {
        q: 'Which highways do you have sites on?',
        a: 'The operation covers BR 101, 116, 277, 376, 407 and 470, in Paraná and Santa Catarina. The panel is built on demand, within a 3 km radius of the point you indicate; bring the region in the brief.',
      },
      {
        q: 'Does it work for a car at speed?',
        a: 'Yes. Highway formats are larger than urban billboards for exactly that reason: 12×4 m on panels and 10×3 m on footbridges, with creative designed around very few words.',
      },
      {
        q: 'Is Highways digital or printed?',
        a: 'The highway operation is mostly printed. If the campaign needs dynamic creative changes, the route is Outdoor Digital, or a combination of the two platforms.',
      },
    ],
  },
  {
    // digital-signage
    desc: 'Bespoke · Gestão 360 OM',
    short:
      'A panel exclusive to your business: digital facade, petrol station, digital passage. Licensing, installation, content and maintenance 24 hours a day, seven days a week.',
    eyebrow: 'Platform · Exclusive panel',
    heading: 'Digital Signage.',
    intro:
      'A panel that belongs only to your brand, at your address. Digital facade, petrol station, digital passage: Outdoormídia designs, licenses, installs and operates it, and the content stays under your control.',
    imageAlt:
      'Outdoormídia digital facade, an LED panel built into the side of a commercial building, facing the avenue',
    galeria: [
      { alt: 'Outdoormídia vertical LED panel installed by the entrance of a building' },
      { alt: 'Outdoormídia vertical LED panel on the facade of a commercial building' },
    ],
    quando: [
      'Turning your own facade into media',
      'Communicating a promotion at the point of sale in real time',
      'An own-network project with outsourced management',
    ],
    formats: [
      {
        dims: 'Facade',
        side: 'Bespoke',
        label: 'Facade',
        title: 'Digital facade',
        text: 'A screen built into the facade of the business itself, with programming under the brand control.',
      },
      {
        dims: 'Station',
        side: 'Bespoke',
        label: 'Station',
        title: 'Petrol station',
        text: 'A panel in the refuelling area, where people stand still for minutes on every visit.',
      },
      {
        dims: 'Passage',
        side: 'Bespoke',
        label: 'Passage',
        title: 'Digital passage',
        text: 'A structure at a crossing or access point, sized according to what the location allows.',
      },
    ],
    faqs: [
      {
        q: 'Is the panel mine or Outdoormídia property?',
        a: 'The panel is exclusive to your business and shows only what you decide. Outdoormídia answers for feasibility, construction and operation.',
      },
      {
        q: 'Who handles the licensing?',
        a: 'We do. On exclusive panel projects, Gestão 360 OM includes legal consulting on licensing and on sizing within municipal decrees.',
      },
      {
        q: 'And once the panel is live?',
        a: 'Installation, content management and 24/7 maintenance are part of the package. The team monitors the display and steps in as soon as anything goes out of place.',
      },
    ],
  },
]

// A entrada dos Icônicos na listagem. O `intro` do arquivo em português é
// montado com os nomes das três linhas; aqui ele é literal, porque Elegancy,
// Green e Regenerativo são nomes de linha e não mudam de idioma.
export const ICONICOS_NA_LISTAGEM = {
  name: 'Iconic Projects',
  desc: 'Exclusive · High impact',
  short:
    'Unique structures in the most prominent locations of the city. Digital 3D corners, hybrid panels and living gardens built into the structure. Where the brand becomes the landscape.',
  intro:
    'Unique structures in the most prominent locations of the city: Elegancy, Green, Regenerativo.',
}

export const CTA_PADRAO = 'View platform'
