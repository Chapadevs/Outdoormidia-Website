// Tradução de lib/produtos.js. Nome de produto é nome oficial e não se
// traduz em idioma nenhum; `slug`, `plataformas`, `tecnologias`, `image`,
// `imagemPor.<tecnologia>.src` e os endereços continuam vindo do arquivo em
// português. Só o `.alt` de cada `imagemPor` traduz.

export const PRODUTOS = [
  {
    kicker: 'Vertical',
    text: 'Vertical presence on the busiest corridors, filling the field of view of drivers and pedestrians alike. In static, lighting keeps the campaign alive after the sun goes down. In digital, the same framing as a reel: the campaign works both on social media and on the platform, with no change of proportion.',
    specsPor: { digital: '768×1024 px · MP4 · 10 seconds' },
    imagemPor: {
      estatico: { alt: 'Static Top Sight panel by Outdoormídia beside a roadway, in Curitiba' },
      digital: { alt: 'Digital Top Sight panel by Outdoormídia displaying an LED campaign' },
    },
  },
  {
    kicker: 'Horizontal',
    text: 'The billboard as it should be: large, horizontal, impossible not to read, on the roads that structure the city’s daily route. In digital, the classic video framing, with content swapped in real time and no physical production cost.',
    specsPor: { digital: '1024×512 px · MP4 · 10 seconds' },
    imagemPor: {
      digital: { alt: 'Digital Poster Sight panel by Outdoormídia with an LED campaign over the road' },
    },
  },
  {
    kicker: 'Large format',
    text: 'The large extended-ratio format, available in both technologies. Generous area for art direction to breathe, at heavy-traffic sites.',
    specsPor: { digital: '1536×512 px · MP4 · 10 seconds' },
    imagemPor: {
      digital: { alt: 'Outdoormídia Billboard structure lit at night, with a large-format campaign' },
    },
  },
  {
    name: 'Rooftop',
    kicker: 'Santa Catarina exclusive',
    selo: 'SC exclusive',
    text: 'The tallest format in the portfolio, high above the two most relevant cities in Santa Catarina. In Balneário Camboriú, a digital panel at a prime spot on Av. Brasil. In Joinville, a digital panel with real-time content and a static one for continuous presence. Premium visibility for brands seeking a leading role in the skyline, where only Outdoormídia reaches.',
    pontos: [
      { name: 'Balneário Camboriú' },
      { name: 'Joinville · digital' },
      { name: 'Joinville · static' },
    ],
    imagemPor: {
      estatico: { alt: 'Static Rooftop panel by Outdoormídia atop a building' },
      digital: { alt: 'Digital Rooftop panel by Outdoormídia atop a building' },
    },
  },
  {
    kicker: '2x larger',
    text: 'Everything the Poster Sight offers, at twice the size. For the campaign that needs to dominate the block, not just take part in it.',
  },
  {
    name: 'Sequential Super Top',
    kicker: 'Sequential',
    text: 'Vertical panels in sequence along the same road. The brand appears, reappears and confirms: repetition within a single journey, multiplying recall from one pass alone.',
  },
  {
    kicker: '2x larger',
    text: 'The largest static format in the portfolio. When the brief calls for landscape scale, the Super Billboard is the answer: twice the Billboard, for brands that want to be seen from afar and remembered up close.',
  },
  {
    name: 'Totem',
    kicker: 'Concourse',
    text: 'At eye level, in the middle of the flow. The Totem follows the visitor along the mall concourse and places your brand metres from the shelf. It is the last point of contact before the purchase decision.',
    specs: '1080×1920 px · MP4 · 10 seconds · available in all three malls',
    imageAlt: 'Outdoormídia digital totem at Park Shopping Boulevard',
  },
  {
    kicker: 'Suspended',
    text: 'Hanging over the central concourse, the Mega Banner is seen from a distance and from every angle. A vertical format with strong presence, ideal for launches and brand campaigns in high-footfall environments.',
    specs: '640×1024 px · MP4 · 10 seconds · Shopping São José',
    imageAlt: 'Outdoormídia Mega Banner suspended over a mall concourse',
  },
  {
    name: 'Gable Wall',
    kicker: 'Large indoor format',
    text: 'The largest visual area in the indoor environment. The Empena turns the mall wall into media, at a scale no other indoor format reaches.',
    specs: 'Park Shopping Boulevard',
    imageAlt: 'Outdoormídia digital Empena panel on a mall wall',
  },
  {
    name: 'Horizontal Newsstand',
    kicker: 'Pavement level',
    text: 'Digital media at walking height. The Banca Horizontal occupies corners and crossings with heavy pedestrian flow, comfortable to read while waiting for the lights to change.',
    specs: '1024×512 px · MP4 · 10 seconds',
  },
  {
    name: 'Vertical Newsstand',
    kicker: 'Pavement level',
    text: 'The vertical version of the kiosk, with mobile-phone framing. Perfect for reusing the social media piece at the physical site, speaking to pedestrians in the language they already consume.',
    specs: '768×1024 px · MP4 · 10 seconds',
  },
  {
    name: 'Digital Clock',
    kicker: 'Utility',
    text: 'The only format people actively look for. Time and temperature draw the eye, your campaign makes use of the attention. Presence spread across the city, at stopping and crossing points.',
    specs: '768×1024 px · MP4 · 10 seconds',
  },
  {
    name: 'Bike Media',
    kicker: 'Sequential trio',
    text: 'Three bikes in sequence, one message in motion. The trio circulates along promenades, parks and events, reaching where fixed structures cannot. A friendly, photogenic presence, impossible to ignore at pedestrian scale.',
  },
  {
    name: 'Bus Media',
    kicker: 'Urban route',
    text: 'Your brand on the daily journey of thousands of people. Bus Mídia travels the city corridors repeating exposure at different times and in different neighbourhoods, with the reach of an entire route for the cost of a single site.',
  },
  {
    name: 'Exclusive Panel',
    kicker: 'Bespoke · OM 360 Management',
    text: 'From legal licensing advice to maintenance 24 hours a day, seven days a week, OM 360 Management handles everything between your facade and a working panel. You bring the site and the brand. The operation brings the rest.',
  },
]
