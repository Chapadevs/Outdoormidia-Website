// Tradução de lib/produtos.js. Nome de produto é nome oficial e não se
// traduz em idioma nenhum; `slug`, `plataformas`, `tecnologias`, `image` e os
// endereços continuam vindo do arquivo em português.

export const PRODUTOS = [
  {
    kicker: 'Vertical',
    text: 'Presencia vertical en los corredores de mayor circulación, ocupando el campo de visión de quien conduce y de quien camina. En el estático, iluminación que mantiene la campaña viva después de que se pone el sol. En el digital, el mismo encuadre de un reel: la campaña funciona tanto en las redes sociales como en la plataforma, sin adaptación de proporción.',
    specsPor: { digital: '768×1024 px · MP4 · 10 segundos' },
  },
  {
    kicker: 'Horizontal',
    text: 'El outdoor como debe ser: grande, horizontal, imposible de no leer, en las vías que estructuran el trayecto diario de la ciudad. En el digital, el encuadre clásico del video, con cambio de contenido en tiempo real y sin costo de producción física.',
    specsPor: { digital: '1024×512 px · MP4 · 10 segundos' },
  },
  {
    kicker: 'Gran formato',
    text: 'El gran formato de proporción extendida, disponible en las dos tecnologías. Área generosa para que la dirección de arte respire, en los puntos de tráfico intenso.',
    specsPor: { digital: '1536×512 px · MP4 · 10 segundos' },
  },
  {
    name: 'Azotea',
    kicker: 'Exclusivo Santa Catarina',
    selo: 'Exclusivo SC',
    text: 'El formato más alto del portafolio, en lo alto de las dos ciudades más relevantes de Santa Catarina. En Balneário Camboriú, panel digital en punto destacado de la Av. Brasil. En Joinville, un panel digital con contenido en tiempo real y un estático de presencia continua. Visibilidad premium para marcas que buscan protagonismo en el paisaje, donde solo Outdoormídia llega.',
    pontos: [
      { name: 'Balneário Camboriú' },
      { name: 'Joinville · digital' },
      { name: 'Joinville · estático' },
    ],
  },
  {
    kicker: '2x mayor',
    text: 'Todo lo del Poster Sight, al doble del tamaño. Para la campaña que necesita dominar la cuadra, no solo participar de ella.',
  },
  {
    name: 'Super Top Secuencial',
    kicker: 'Secuencial',
    text: 'Paneles verticales en secuencia en la misma vía. La marca aparece, reaparece y confirma: repetición dentro del mismo trayecto, multiplicando la memorización de un único paso.',
  },
  {
    kicker: '2x mayor',
    text: 'El mayor formato estático del portafolio. Cuando el briefing pide escala de paisaje, el Super Billboard es la respuesta: el doble del Billboard, para marcas que quieren ser vistas de lejos y recordadas de cerca.',
  },
  {
    name: 'Tótem',
    kicker: 'Corredor',
    text: 'A la altura de los ojos, en medio del flujo. El Totem acompaña al visitante por el corredor del shopping y coloca tu marca a metros de la góndola. Es el último punto de contacto antes de la decisión de compra.',
    specs: '1080×1920 px · MP4 · 10 segundos · disponible en los tres shoppings',
    imageAlt: 'Totem digital de Outdoormídia en el Park Shopping Boulevard',
  },
  {
    kicker: 'Suspendido',
    text: 'Colgado sobre el corredor central, el Mega Banner se ve de lejos y desde todos los ángulos. Formato vertical de gran presencia, ideal para lanzamiento e institucional en ambiente de alto flujo.',
    specs: '640×1024 px · MP4 · 10 segundos · Shopping São José',
    imageAlt: 'Mega Banner suspendido de Outdoormídia sobre el corredor de un shopping',
  },
  {
    name: 'Medianera',
    kicker: 'Gran formato interno',
    text: 'La mayor área visual del ambiente indoor. La Empena transforma la pared del shopping en medio, con una escala que ningún otro formato interno alcanza.',
    specs: 'Park Shopping Boulevard',
    imageAlt: 'Panel de Empena digital de Outdoormídia en pared de shopping',
  },
  {
    name: 'Quiosco Horizontal',
    kicker: 'Nivel de la vereda',
    text: 'Medio digital a la altura de quien camina. La Banca Horizontal ocupa esquinas y cruces de alto flujo de peatones, con lectura cómoda para quien espera que el semáforo cambie.',
    specs: '1024×512 px · MP4 · 10 segundos',
  },
  {
    name: 'Quiosco Vertical',
    kicker: 'Nivel de la vereda',
    text: 'La versión vertical de la banca, con el encuadre del celular. Perfecta para reaprovechar la pieza de las redes en el punto físico, hablándole al peatón en el lenguaje que ya consume.',
    specs: '768×1024 px · MP4 · 10 segundos',
  },
  {
    name: 'Reloj Digital',
    kicker: 'Utilidad',
    text: 'El único formato que las personas buscan con los ojos. Hora y temperatura atraen la mirada, tu campaña aprovecha la atención. Presencia distribuida por la ciudad, en puntos de parada y cruce.',
    specs: '768×1024 px · MP4 · 10 segundos',
  },
  {
    name: 'Bike Media',
    kicker: 'Trío secuencial',
    text: 'Tres bikes en secuencia, un mensaje en movimiento. El trío circula por paseos peatonales, parques y eventos, llegando donde la estructura fija no entra. Presencia simpática, fotografiable e imposible de ignorar en la escala del peatón.',
  },
  {
    name: 'Bus Media',
    kicker: 'Ruta urbana',
    text: 'Tu marca en el trayecto diario de miles de personas. El Bus Mídia recorre los corredores de la ciudad repitiendo la exposición en horarios y barrios diferentes, con el alcance de una ruta entera por el costo de un punto.',
  },
  {
    name: 'Panel Exclusivo',
    kicker: 'A medida · Gestión 360 OM',
    text: 'De la consultoría legal de licenciamiento al mantenimiento 24 horas al día, siete días por semana, el Gestión 360 OM cuida de todo lo que queda entre tu fachada y un panel funcionando. Tú entras con el punto y la marca. La operación entra con el resto.',
  },
]
