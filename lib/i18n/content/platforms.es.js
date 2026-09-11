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
    desc: 'Digital · 175 pantallas',
    short:
      'Pantallas LED con cambio de contenido en tiempo real. Sin producción de lona, sin espera entre la decisión y la salida al aire. La mayor red DOOH regional del Sur de Brasil, con 20 millones de impactos semanales.',
    eyebrow: 'Plataforma · Digital · 175 pantallas',
    heading: 'Outdoor Digital.',
    intro:
      'Briefing en la mano por la mañana, campaña al aire por la tarde. El circuito digital elimina la etapa más lenta del OOH tradicional: producción, impresión e instalación entre la aprobación de la pieza y la exhibición. La mayor red DOOH regional del Sur de Brasil.',
    quando: [
      'Campaña con cambio frecuente de creatividad',
      'Promoción con fecha corta',
      'Presencia continua con mensaje que cambia por horario',
    ],
    bignumbers: [
      { label: 'Pantallas digitales' },
      { n: '+20 M', label: 'Impactos por semana' },
      { label: 'Mayor red DOOH regional del Sur' },
    ],
    formats: [
      {
        label: 'Digital',
        title: 'Pantalla LED HD',
        text: 'Pantallas LED con cambio dinámico de creatividades en alta circulación, sin producción de lona.',
      },
    ],
    faqs: [
      {
        q: '¿Necesito producir arte impreso?',
        a: 'No. En las pantallas digitales la creatividad se cambia directo en la pantalla, sin producción ni instalación de lona.',
      },
      {
        q: '¿Con qué frecuencia puedo cambiar la campaña?',
        a: 'El cambio es dinámico: puede alternar creatividades por horario, día de la semana o período, sin costo de reimpresión.',
      },
      {
        q: '¿Se puede medir quién vio el anuncio?',
        a: 'Sí. La tecnología 4yousee/Everywhere mide CPM, frecuencia, género, franja etaria e ingresos del público impactado, con cámaras en vivo 24×7 en todos los puntos.',
      },
    ],
  },
  {
    // front-lights
    desc: 'Estático · 18 m² · Iluminado',
    short:
      'La valla clásica en vías de alta circulación, en horizontal y en vertical. Gran formato, presencia continua y la memorización que solo la repetición diaria construye.',
    eyebrow: 'Plataforma · Estático · 18 m² · Iluminado',
    heading: 'Front Light.',
    intro:
      'El formato que construyó los medios exteriores y sigue entregando lo que ningún otro entrega: la misma marca, en el mismo lugar, todos los días, para las mismas personas. La memorización se construye por repetición, y la repetición es la especialidad de la casa desde hace 67 años.',
    quando: [
      'Refuerzo de marca a largo plazo',
      'Ocupación de territorio',
      'Presencia en corredor de trayecto diario',
    ],
    formats: [
      {
        label: 'Horizontal',
        title: 'Frontlight 18 m² horizontal',
        text: 'Formato clásico de valla, iluminado, en vías de alto tráfico.',
      },
      {
        label: 'Vertical',
        title: 'Frontlight 18 m² vertical',
        text: 'Versión vertical del frontlight, para espacios con mayor visibilidad en altura.',
      },
    ],
    faqs: [
      {
        q: '¿Cuál es la diferencia entre el formato horizontal y el vertical?',
        a: 'Los dos tienen 18 m², cambia solo la orientación, y la elección depende del punto disponible y de la lectura deseada en la vía.',
      },
      {
        q: '¿La producción de la lona está incluida?',
        a: 'El Front Light es un formato impreso, así que la producción del material va junto con la locación del punto.',
      },
      {
        q: '¿Puedo cambiar de punto a lo largo de la campaña?',
        a: 'Sí, con flexibilidad de rotación entre puntos, optimizando el aprovechamiento de su medio a lo largo del período contratado.',
      },
    ],
  },
  {
    // shoppings
    name: 'Medios Indoor',
    desc: 'Digital · 3 centros comerciales',
    short:
      'Operación 100% digital en los principales centros comerciales de la región. Tótems de pasillo y pantallas de estacionamiento alcanzan al público en el lugar y en el momento de la compra.',
    eyebrow: 'Plataforma · Digital · 3 centros comerciales',
    heading: 'Medios Indoor.',
    intro:
      'En el centro comercial, el público no está pasando. Está decidiendo. La operación es 100% digital, en tres centros con perfiles distintos de consumo, del familiar al corporativo. Usted elige el ambiente que conversa con su cliente.',
    imageAlt: 'Tótem digital de Outdoormídia en pasillo de centro comercial',
    quando: [
      'Campaña de retail con conversión cercana',
      'Lanzamiento de producto en punto de venta',
      'Construcción de marca junto a público de alta recurrencia',
    ],
    bignumbers: [
      { label: 'Personas/mes en el Shopping São José' },
      { label: 'Personas/mes en el Shopping Itália' },
      { label: 'Personas/mes en el Park Shopping Boulevard' },
      { label: 'Personas/mes en los centros comerciales' },
    ],
    blocosTitle: 'Los tres ambientes',
    blocos: [
      {
        title: 'Shopping São José · São José dos Pinhais',
        text: 'El mayor centro comercial de la Región Metropolitana de Curitiba, a 7 minutos del Aeropuerto Internacional Afonso Pena. Más de 170 tiendas, eventos recurrentes y perfil familiar de alto flujo, sumando consumidores locales, turistas y profesionales en desplazamiento.',
        apoio: 'Mega Banner y Tótem · Rua Dona Izabel A Redentora, 1434, Centro',
        imageAlt: 'Tótem digital de Outdoormídia en pasillo del Shopping São José',
      },
      {
        title: 'Park Shopping Boulevard · Curitiba, región Sur',
        text: 'El mayor centro comercial del extremo sur de Curitiba, en el eje que conecta Sítio Cercado, Portão, Novo Mundo, Capão Raso, Pinheirinho, Vila Hauer, Alto Boqueirão y Xaxim. Público en una de las regiones que más crecen en la ciudad, con consumo cotidiano y fuerte fidelización.',
        apoio: 'Medianera y Tótem · BR-116, 16303, Xaxim',
        imageAlt: 'Pantalla digital de Outdoormídia en el Park Shopping Boulevard',
      },
      {
        title: 'Shopping Itália · Curitiba, Centro',
        text: 'Uno de los emprendimientos más consolidados de Curitiba, en operación desde 1982. Son 26 pisos que reúnen comercio, servicios y oficinas en circulación constante: flujo medio de 70 mil personas por mes, con público corporativo, profesional y recurrente.',
        apoio: 'Tótem · Rua Marechal Deodoro, 630, Centro',
        imageAlt: 'Tótem digital de Outdoormídia en el Shopping Itália, cerca de la escalera mecánica',
      },
    ],
    formats: [
      {
        dims: 'Tótem 2,2 m',
        label: 'Tótem',
        title: 'Tótem digital',
        text: 'Pantalla digital vertical ubicada en áreas de gran circulación dentro del centro comercial.',
      },
    ],
    faqs: [
      {
        q: '¿En qué centros comerciales tienen puntos?',
        a: 'São José, Park Shopping Boulevard e Itália, con presencia 100% digital en tótems y pantallas.',
      },
      {
        q: '¿El anuncio queda cerca de la decisión de compra?',
        a: 'Sí, los puntos están ubicados en áreas de gran circulación dentro del centro comercial, cerca del momento de decisión del consumidor.',
      },
      {
        q: '¿Necesito producir material impreso?',
        a: 'No. Toda la operación indoor es digital, con cambio de creatividad directo en la pantalla.',
      },
    ],
  },
  {
    // aeroporto
    name: 'Aeropuerto',
    desc: 'Híbrido · 577,5 m²',
    short:
      'Distrito de Medios Duo Square: 5 pantallas LED y 10 frontlights en la única vía de salida del Aeropuerto Internacional Afonso Pena. El conjunto alberga el Plaza Aeropuerto, mayor panel híbrido del Sur de Brasil.',
    eyebrow: 'Plataforma · Híbrido · 577,5 m²',
    heading: 'Aeropuerto.',
    intro:
      'Quien llega a Curitiba en avión pasa por una única vía de salida, en la región metropolitana con casi 3,7 millones de habitantes. Es ahí donde está el Distrito de Medios Duo Square, el primer proyecto del tipo en Brasil, concebido para generar presencia calificada ya en el desembarque.',
    quando: [
      'Hablar con decisores en tránsito: ejecutivos, inversores y formadores de opinión',
      'Construir percepción de porte nacional para la marca',
      'Campaña B2B o institucional de alto valor, sin necesidad de segmentación por barrio',
    ],
    bignumbers: [
      { label: 'Área visual' },
      { label: 'Impactos por mes' },
      { n: '14,8 M', label: 'Pasajeros por año' },
      { label: 'Habitantes en la región' },
    ],
    blocosTitle: 'El Distrito',
    blocos: [
      {
        title: 'Dónde está',
        text: 'El Distrito está ubicado en la Av. Rocha Pombo, en la única salida del Aeropuerto Internacional Afonso Pena, en el municipio de São José dos Pinhais, región metropolitana de Curitiba.',
        apoio: 'Media de 20 mil pasajeros por día',
      },
      {
        title: 'Público',
        text: 'Los viajeros aéreos tienen mayor poder adquisitivo. El perfil de quien pasa por el Distrito incluye ejecutivos, turistas, compradores internacionales, inversores, profesionales en tránsito y formadores de opinión, el tipo de audiencia que ninguna otra plataforma del portafolio entrega en el mismo volumen.',
      },
    ],
    faqs: [
      {
        q: '¿Hay que participar de una licitación para anunciar en el aeropuerto?',
        a: 'No. La operación es privada, sin licitación, lo que agiliza bastante el proceso de contratación.',
      },
      {
        q: '¿Cuál es el perfil del público que pasa por el aeropuerto?',
        a: 'Público premium, de alto poder adquisitivo, en tránsito constante, ideal para marcas que buscan asociación con un ambiente sofisticado.',
      },
      {
        q: '¿La medianera digital permite cambiar la creatividad?',
        a: 'Sí, es una pantalla digital de 6×18 m, la mayor del Sur de Brasil, con cambio de creatividad sin producción de lona.',
      },
    ],
  },
  {
    // midia-movel
    name: 'Medios Móviles',
    desc: 'Estático · Bike y Bus',
    short:
      'Bike Mídia y Bus Mídia llegan donde la estructura fija no va. Peatonales, parques y centros concurridos, siguiendo el trayecto real de quien usted necesita alcanzar.',
    eyebrow: 'Plataforma · Estático · Bike y Bus',
    heading: 'Medios Móviles.',
    intro:
      'No todo el público está en una avenida. Bike Mídia y Bus Mídia llevan la campaña adentro de la peatonal, del parque y del centro, en el trayecto que las personas hacen a pie.',
    quando: [
      'Activación en evento o fecha específica',
      'Cobertura de área cerrada al tránsito',
      'Refuerzo táctico de una campaña mayor',
    ],
    formats: [
      {
        label: 'Móvil',
        title: 'Estructura móvil',
        text: 'Estructura itinerante para activaciones puntuales en lugares de alta circulación estacional.',
      },
    ],
    faqs: [
      {
        q: '¿Dónde suele actuar Medios Móviles?',
        a: 'Playas, parques y peatonales: lugares de gran flujo estacional donde el OOH fijo no llega.',
      },
      {
        q: '¿Es indicada para campañas de corta duración?',
        a: 'Sí, es ideal para acciones estacionales, lanzamientos puntuales y activaciones que necesitan presencia concentrada en un período corto.',
      },
      {
        q: '¿La estructura puede moverse entre localidades?',
        a: 'Sí, es una estructura itinerante: se desplaza según el recorrido definido para la activación.',
      },
    ],
  },
  {
    // mub
    desc: 'Digital · 6 circuitos',
    short:
      'Quioscos y relojes digitales integrados al tejido de la ciudad, organizados en circuitos por nicho: salud, educación, centros comerciales, alto estándar. Usted contrata el público, no el punto.',
    eyebrow: 'Plataforma · Digital · 6 circuitos',
    heading: 'MUB.',
    intro:
      'Los quioscos y relojes digitales forman parte de la calle, no compiten con ella. La red está organizada en circuitos por perfil de público, así que usted contrata a quien quiere alcanzar, no una dirección aislada.',
    imageAlt: 'Quiosco digital MUB Garden integrado a un jardín vertical',
    quando: [
      'Campaña segmentada por nicho',
      'Presencia de barrio con costo controlado',
      'Marca que necesita aparecer cerca del punto de decisión',
    ],
    bignumbers: [
      { label: 'Circuitos por nicho' },
      { label: 'Puntos' },
      { n: '13 M', label: 'Impactos por mes' },
      { label: 'Inserciones de 10s por mes' },
    ],
    formats: [
      {
        label: 'Pasarela',
        title: 'Pasarela MUB',
        text: 'Formato estándar de los circuitos MUB, con flexibilidad de rotación entre puntos.',
      },
    ],
    faqs: [
      {
        q: '¿El MUB permite segmentar el público?',
        a: 'Sí. Son 6 circuitos segmentados: Full, Salud, Educación, Centros Comerciales, Alto Estándar y Súper & Híper.',
      },
      {
        q: '¿Cuántos puntos e impactos tiene el MUB?',
        a: 'Son 6 circuitos segmentados, en el mayor recorrido de MUB digitalizado en una única ciudad de Brasil. El conteo de puntos de cada circuito entra en la propuesta, según la plaza y el público.',
      },
      {
        q: '¿Puedo elegir solo un circuito específico?',
        a: 'Sí, es posible contratar el circuito más alineado a su público objetivo, sin necesidad de exhibir en la red completa.',
      },
    ],
  },
  {
    // rodovias
    name: 'Carreteras',
    desc: 'A demanda · BR 101 · 116 · 277 · 376 · 407 · 470',
    short:
      'Usted elige la región, nosotros construimos el panel. Búsqueda en un radio de 3 km del punto indicado, en el formato que la campaña pida, en los mayores flujos del Sur.',
    eyebrow: 'Plataforma · A demanda · Paraná y Santa Catarina',
    heading: 'Carreteras.',
    intro:
      'Usted elige la región, nosotros construimos el panel. La red Carreteras conecta los principales corredores entre Paraná y Santa Catarina, de Ponta Grossa a Florianópolis, pasando por el litoral y por Joinville, alcanzando a quien se desplaza todos los días entre esas regiones.',
    quandoKicker: 'Transformando carreteras en oportunidades',
    quando: [
      {
        title: 'Cobertura estratégica',
        text: 'Los paneles en carreteras de alto flujo conectan regiones clave como Curitiba y Florianópolis, alcanzando públicos locales y turísticos.',
      },
      {
        title: 'Alta visibilidad',
        text: 'La campaña de medios exteriores tiene como principal objetivo generar alto impacto visual, consolidar presencia de marca y transmitir exclusividad en cada punto de contacto con el público.',
      },
      {
        title: 'Diversidad y flujo diario',
        text: 'Impactan a miles de vehículos diariamente, alcanzando distintos públicos a lo largo del día y creando múltiples oportunidades de interacción con su audiencia.',
      },
      {
        title: 'Exposición y conexión',
        text: 'Mensajes rápidos y marcantes crean asociaciones duraderas con el público en movimiento.',
      },
    ],
    bignumbers: [
      { label: 'Paneles en carreteras' },
      { label: 'Plazas en carreteras' },
      { n: '2,8 M', label: 'Impactos por mes por punto' },
      { n: '42 M', label: 'Impactos en 15 meses' },
    ],
    passos: [
      {
        title: 'Elija la región.',
        text: 'Indique el punto aproximado donde la campaña necesita estar. La operación hace la **búsqueda en 3 km**, localizando y negociando el mejor punto disponible a partir del lugar indicado.',
      },
      {
        title: 'Elija el tamaño del panel.',
        text: 'La estructura se construye a medida, en las opciones 16 x 4 m (64 m²) o 20 x 5 m (100 m²). Si desea iluminación, queda sujeta a la viabilidad operativa.',
      },
      {
        title: 'Contrato de 15 meses.',
        text: 'Plazo mínimo de exhibición, con la primera lona incluida, compatible con la construcción de un panel exclusivo para su marca.',
      },
    ],
    passosFases: [
      {
        title: '1ª fase',
        text: 'Recolección del briefing/pedido y etapa de prospección del punto en hasta 30 días.',
      },
      {
        title: '2ª fase',
        text: 'Plazo de entrega del panel instalado en hasta 90 días a contar de la fecha de firma del contrato.',
      },
    ],
    formats: [
      {
        label: 'Carretera',
        title: 'Panel de carretera 12×4 m',
        text: 'Gran formato dimensionado para lectura en velocidad, al borde de las principales vías.',
      },
      {
        label: 'Pasarela',
        title: 'Pasarela 10×3 m',
        text: 'Cara sobre la pista, con visual frontal para quien circula en ambos sentidos.',
      },
    ],
    faqs: [
      {
        q: '¿En qué carreteras tienen puntos?',
        a: 'La operación cubre las BR 101, 116, 277, 376, 407 y 470, en Paraná y Santa Catarina. El panel se construye a demanda, en un radio de 3 km del punto que usted indique; traiga la región en el briefing.',
      },
      {
        q: '¿La lectura funciona con el auto en velocidad?',
        a: 'Sí. Los formatos de carretera son mayores que la valla urbana justamente por eso: 12×4 m en los paneles y 10×3 m en las pasarelas, con creatividad pensada para pocas palabras.',
      },
      {
        q: '¿Carreteras es digital o impreso?',
        a: 'La operación de carretera es mayoritariamente impresa. Si la campaña necesita cambio dinámico de creatividad, el camino es el Outdoor Digital, o una combinación de las dos plataformas.',
      },
    ],
  },
  {
    clientesImageAlt: 'Cartel "Empresas que atendemos" con los logotipos de Ademicon, Direção Marcas e Patentes, Jota Imóveis, Servopa, Audiotec, Laguna, Suprema Propriedade Intelectual y Vanguard',
    // digital-signage
    desc: 'A medida · Gestión 360 OM',
    short:
      'Panel exclusivo para su negocio: fachada digital, estación de servicio, pasaje digital. Licenciamiento, instalación, contenido y mantenimiento 24 horas al día, siete días por semana.',
    eyebrow: 'Plataforma · Panel exclusivo',
    heading: 'Digital Signage.',
    intro:
      'Un panel que es solo de su marca, en su dirección. Fachada digital, estación de servicio, pasaje digital: Outdoormídia proyecta, licencia, instala y opera, y el contenido queda bajo su control.',
    imageAlt:
      'Fachada digital de Outdoormídia, pantalla LED integrada al lateral de un edificio comercial, orientada hacia la avenida',
    galeria: [
      { alt: 'Pantalla LED vertical de Outdoormídia instalada junto a la entrada de un edificio' },
      { alt: 'Pantalla LED vertical de Outdoormídia en la fachada de un edificio comercial' },
    ],
    quando: [
      'Transformar la propia fachada en medio',
      'Comunicar promoción en el punto de venta en tiempo real',
      'Proyecto de red propia con gestión tercerizada',
    ],
    formats: [
      {
        dims: 'Fachada',
        side: 'A medida',
        label: 'Fachada',
        title: 'Fachada digital',
        text: 'Pantalla integrada a la fachada del propio negocio, con programación bajo control de la marca.',
      },
      {
        dims: 'Estación',
        side: 'A medida',
        label: 'Estación',
        title: 'Estación de servicio',
        text: 'Panel en el área de carga de combustible, donde el público queda detenido por minutos en cada visita.',
      },
      {
        dims: 'Pasaje',
        side: 'A medida',
        label: 'Pasaje',
        title: 'Pasaje digital',
        text: 'Estructura en punto de cruce o acceso, dimensionada según la viabilidad del lugar.',
      },
    ],
    faqs: [
      {
        q: '¿El panel es mío o de Outdoormídia?',
        a: 'El panel es exclusivo de su negocio y exhibe solo lo que usted determina. Outdoormídia responde por la viabilidad, la construcción y la operación.',
      },
      {
        q: '¿Quién se encarga del licenciamiento?',
        a: 'Nosotros. En proyectos de panel exclusivo, el Gestión 360 OM incluye consultoría legal de licenciamiento y el dimensionamiento dentro de los decretos municipales.',
      },
      {
        q: '¿Y después de que el panel está al aire?',
        a: 'Instalación, gestión de contenido y mantenimiento 24/7 forman parte del paquete. El equipo monitorea la exhibición y actúa apenas algo sale de lugar.',
      },
    ],
  },
]

// A entrada dos Icônicos na listagem. O `intro` do arquivo em português é
// montado com os nomes das três linhas; aqui ele é literal, porque Elegancy,
// Green e Regenerativo são nomes de linha e não mudam de idioma.
export const ICONICOS_NA_LISTAGEM = {
  name: 'Proyectos Icónicos',
  desc: 'Exclusivo · Alto impacto',
  short:
    'Estructuras únicas en los puntos más nobles de la ciudad. Esquinas digitales en 3D, paneles híbridos y jardines vivos integrados a la estructura. Donde la marca se vuelve el paisaje.',
  intro: 'Estructuras únicas en los puntos más nobles de la ciudad: Elegancy, Green, Regenerativo.',
}

export const CTA_PADRAO = 'Ver plataforma'
