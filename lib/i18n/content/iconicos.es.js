// Tradução de lib/iconicos.js. Nome de linha e de ativo é nome oficial e não
// se traduz; `name`, `heading`, `slug`, `href`, `image` e os endereços
// continuam vindo do arquivo em português.
//
// ATENÇÃO: os `ativos` de Elegancy terminam com `...ICONICOS_ASSINATURA` no
// arquivo em português, e o overlay repete o mesmo spread.

export const ICONICOS_ASSINATURA = [
  {
    name: 'Plaza Aeropuerto',
    kicker: 'Híbrido · 312 m²',
    text: 'El mayor panel híbrido de OOH del Sur de Brasil. Pantallas de LED de última generación combinadas con paneles front light en la misma estructura, uniendo el dinamismo de lo digital al poder de impacto de lo estático. Más de 700 mil impactos mensuales sobre el público de mayor poder adquisitivo del estado.',
    imageAlt:
      'Secuencia de paneles exhibiendo una campaña automotriz en la vía de salida del aeropuerto, bajo cielo azul',
    verEm: { label: 'Ver en la plataforma Aeropuerto' },
  },
  {
    name: 'Plaza Mosaico',
    kicker: 'Cara única · 265,5 m²',
    text: 'Donde la publicidad se vuelve arte. Aplica el concepto Cara Única: una marca, sin vecindad visual, sin disputa de atención. Vitrina de exclusividad total en la salida del Aeropuerto Internacional Afonso Pena.',
    imageAlt:
      'Conjunto de paneles en secuencia exhibiendo una única campaña automotriz, sin otras marcas alrededor',
    verEm: { label: 'Ver en la plataforma Aeropuerto' },
  },
  {
    name: 'Distrito de Medios Duo Square',
    kicker: 'Primero de Brasil · 577,5 m²',
    text: 'El primer Distrito de Medios del país. Cinco pantallas de LED y diez paneles front light en la única vía de salida del aeropuerto, más de 800 mil impactos mensuales sobre viajeros, ejecutivos y formadores de opinión.',
    imageAlt: 'Paneles alineados a lo largo de la vía curva de salida del aeropuerto, vistos desde la pista',
    verEm: { label: 'Ver en la plataforma Aeropuerto' },
  },
  {
    kicker: 'Sincronizado · Av. das Torres',
    text: 'Dos paneles digitales operando en sincronía, uno a cada lado de la vía. La Avenida das Torres vista desde los dos sentidos, a la misma hora, con el mismo mensaje: cobertura total del corredor, sin punto ciego.',
    specs: 'Av. das Torres, 2100 · Curitiba',
    imageAlt: 'Dos paneles digitales verticales, uno a cada lado de la avenida, al anochecer',
  },
]

export const ICONICOS = [
  {
    tagline: 'Estructuras vegetadas',
    short: 'Vegetación viva: la marca aparece junto a una mejora visible para la calle.',
    imageAlt: 'Panel digital enmarcado por una pared viva de vegetación, en calle residencial',
    frase:
      'Vegetación viva integrada a la estructura. Jardín vivo incorporado al propio medio, asociando la marca al bienestar en vez de solo ocupar el campo de visión.',
    ctaLinha: 'Quiero evaluar un Green',
    ativos: [
      {
        name: 'Plaza Batel',
        kicker: 'Digital · 3D y 2D · Anamórfico',
        text: 'El primer proyecto de medios digitales 3D y 2D de Curitiba, alimentado por energía limpia. El efecto anamórfico hace que el contenido salte del panel hacia quien pasa, con hasta 1 millón de impactos mensuales en una de las esquinas más valorizadas de la ciudad.',
        specs:
          '2048×512 px en total, dos caras de 1024×512 px · distancia de la vereda 3 m · mejor visualización del 3D a aprox. 30 m · Av. Visconde de Guarapuava, 5292',
        imageAlt:
          'Esquina digital con dos caras de LED en ángulo exhibiendo una campaña, sobre edificio en avenida',
      },
      {
        name: 'Plaza Champagnat',
        kicker: 'Digital · 3D y 2D · Jardín vivo',
        text: 'La segunda esquina digital de Curitiba, con pared viva integrada a la estructura del panel. Medio de última generación en 2D, 3D y anamórfico junto a vegetación real, uniendo tecnología y bienestar en el mismo punto. Cerca de 1 millón de impactos mensuales.',
        specs:
          '1536×512 px en total, caras de 512×512 y 1024×512 px · distancia de la vereda 0,5 m · mejor visualización del 3D a aprox. 30 m · Rua Alferes Ângelo Sampaio, 2384',
        imageAlt:
          'Panel digital enmarcado por pared viva de vegetación, con campaña de retail, bajo cielo azul',
      },
      {
        name: 'Plaza Cascada',
        kicker: 'Digital · 3 paneles sincronizados · 4 puntos',
        text: 'Tres paneles de LED verticales en composición asimétrica, creando el efecto de una cascada digital en movimiento. Los paneles interactúan entre sí: la campaña puede fluir como pieza única o exhibir tres contenidos autónomos, con un flujo visual que atrapa la mirada.',
        specs: '1344×2520 px, divididos en tres paneles de 1344×840 px · MP4 · 10 segundos',
        imageAlt:
          'Composición de tres paneles digitales verticales en cascada exhibiendo una campaña, al atardecer',
        pontos: [
          {
            imageAlt:
              'Paneles digitales verticales en cascada con campaña de bebida, en calle de casonas al atardecer',
          },
          {
            imageAlt: 'Panel digital vertical en la fachada de un edificio, en calle arbolada',
          },
          {
            imageAlt:
              'Paneles digitales verticales en la avenida al anochecer, con tránsito intenso y pista mojada',
          },
          {
            imageAlt:
              'Tres paneles digitales verticales en composición de cascada al atardecer, con el skyline de la ciudad al fondo',
          },
        ],
      },
      {
        name: 'Jardín MUB',
        kicker: 'Mobiliario urbano digital · Jardín en la cima',
        text: 'El primer mobiliario urbano digital de Curitiba con jardín vivo en la cima. La estructura de calle gana cobertura verde, y la marca exhibida hereda el contexto de cuidado con la ciudad que solo un mobiliario así carga.',
        specs: 'Av. Iguaçu, 3925',
        imageAlt:
          'Mobiliario urbano digital con jardín vivo en la cima, en la vereda de una vía residencial',
        verEm: { label: 'Ver en la plataforma MUB' },
      },
      {
        name: 'Jardín Horizontal',
        kicker: 'Pared viva · Gran formato',
        text: 'Vegetación viva tomando la mitad de la estructura, al lado de la pieza publicitaria. La marca comparte el panel con un cantero vertical de verdad, en un formato que ya valorizó lanzamientos como el del GT.Building en Curitiba.',
        imageAlt:
          'Panel de gran formato dividido entre la pieza publicitaria y un cantero vertical vivo',
      },
      {
        name: 'Jardín Vertical',
        kicker: 'Pared viva · Poster Sight · 2 puntos',
        text: 'El panel publicitario como elemento vivo. Aplicado en un Poster Sight estratégico, asocia la marca a sostenibilidad y bienestar en medio del ritmo acelerado de la ciudad.',
        imageAlt: 'Panel publicitario enmarcado por vegetación viva en avenida arbolada',
        pontos: [
          {
            imageAlt: 'Panel publicitario enmarcado por vegetación viva en avenida arbolada',
          },
          {
            imageAlt:
              'Panel publicitario con aplicación en relieve y base vegetada, en esquina de avenida',
          },
        ],
      },
      {
        name: 'Jardín Digital',
        kicker: 'Pared viva · Letra corpórea · 17h diarias',
        text: 'Jardín vertical natural con letra corpórea integrada, exhibiendo la campaña del cliente de forma exclusiva por 17 horas diarias, sin compartir atención con ninguna otra marca. Un respiro verde en una de las áreas más nobles de Curitiba.',
        specs: 'Rua Desembargador Motta, 3220',
        imageAlt:
          'Panel digital con letra corpórea integrada a un jardín vertical natural, al borde de la vía',
      },
    ],
    eyebrow: 'Proyecto icónico · Sostenibilidad',
    intro:
      'Jardines verticales y estructuras con vegetación viva: la marca aparece junto a una mejora visible para la calle, con mantenimiento por nuestra cuenta. Es el proyecto para quien necesita que el discurso ambiental aparezca en el lugar por donde las personas pasan.',
    ctaLabel: 'Quiero un proyecto Green',
    aside: {
      text: 'La vegetación viva no es un adorno: exige riego, poda y reposición. Todo eso es nuestro, el anunciante contrata la cara, no el jardín.',
      footer: 'Mantenimiento de la vegetación incluido en el período',
    },
    oQueE: {
      lead: 'Green es medio exterior con vegetación real integrada a la estructura. La marca comparte la superficie con algo que la calle reconoce como mejora, y esa asociación es lo que la plataforma entrega.',
      cards: [
        {
          title: 'Vegetación viva',
          text: 'Jardines verticales y estructuras vegetadas con especies elegidas para el clima y la insolación de cada punto.',
        },
        {
          title: 'Mantenimiento por nuestra cuenta',
          text: 'El riego, la poda y la reposición de las plantas son responsabilidad de Outdoormídia durante toda la difusión.',
        },
        {
          title: 'Respaldo para el discurso',
          text: 'La campaña de sostenibilidad deja de ser solo mensaje: existe una estructura en la calle sosteniendo lo que la pieza dice.',
        },
      ],
    },
    faqs: [
      {
        q: '¿El mantenimiento de la vegetación entra en mi costo?',
        a: 'No. El riego, la poda y la reposición de las plantas son responsabilidad de Outdoormídia durante todo el período contratado.',
      },
      {
        q: '¿Tiene sentido para marcas fuera del segmento de sostenibilidad?',
        a: 'Sí. Cualquier marca que quiera reforzar un posicionamiento responsable puede usar el Green; la lectura viene de la estructura, no del segmento del anunciante.',
      },
      {
        q: '¿En qué tipo de punto quedan esas estructuras?',
        a: 'En vías y lugares con potencial de valorización paisajística, priorizando visibilidad e integración con el entorno. La elección pasa por la viabilidad técnica y por la insolación del lugar.',
      },
      {
        q: '¿Puedo comprobar la mejora ambiental en mi comunicación?',
        a: 'Trae esa necesidad en el briefing. Relevamos lo que es medible en el proyecto específico antes de que cualquier número entre en la pieza.',
      },
    ],
  },
  {
    name: 'Regenerativo',
    heading: 'Regenerativo.',
    tagline: 'Contrapartida a la ciudad',
    short: 'Espacios de convivencia requalificados como parte de la difusión.',
    imageAlt: 'Plaza pet iluminada de noche, con letrero y paneles del patrocinador',
    frase:
      'La difusión empieza fuera del panel. Plazas, canteros y puntos de convivencia requalificados por la marca, que devuelve a la ciudad el espacio que ocupa.',
    ctaLinha: 'Quiero evaluar un Regenerativo',
    ativos: [
      {
        name: 'Plaza Pet Guilherme Pugsley',
        kicker: 'Requalificación urbana · Primera de Curitiba',
        text: 'La primera Plaza Pet de Curitiba. Infraestructura de ocio y convivencia que transformó un espacio urbano común en punto de encuentro, con la marca patrocinadora asociada al inicio de ese movimiento en la ciudad.',
        specs: 'Rua Guilherme Pugsley, 820',
        imageAlt: 'Plaza pet iluminada de noche, con letrero, juegos y paneles del patrocinador',
      },
      {
        name: 'Plaza de Conveniencia Batel',
        kicker: 'Primer producto cóncavo de Curitiba',
        text: 'Espacio planificado para ocio, bienestar e inclusión, con infraestructura segura y moderna que revitaliza el entorno y crea un nuevo punto de encuentro entre marcas, personas y ciudad. Es también el primer producto cóncavo de Curitiba: la cara curva acompaña la esquina y entrega la marca en ángulo abierto, a quien llega por las dos vías.',
        specs: 'Rua Bento Viana, esquina con Sete de Setembro',
        imageAlt:
          'Espacio requalificado con vegetación en terrazas y panel digital, en esquina concurrida',
      },
      {
        name: 'Plaza Pet Silva Jardim',
        kicker: 'Requalificación urbana · Tercera entrega',
        text: 'La tercera Plaza Pet del proyecto Regenerativo. Consolida el compromiso de la marca patrocinadora con la valorización de espacios públicos, ampliando el legado iniciado en las dos plazas anteriores.',
        specs: 'Av. Silva Jardim, 3338',
        imageAlt: 'Panel digital vertical con base vegetada, en vía de barrio con tránsito',
      },
    ],
    eyebrow: 'Proyecto icónico · Ciudad',
    intro:
      'Proyectos que devuelven algo al espacio que ocupan: requalificación de espacios de convivencia y canteros como parte de la difusión. La marca no alquila un espacio en la ciudad: deja el espacio mejor de lo que lo encontró.',
    ctaLabel: 'Quiero llevar un Regenerativo',
    aside: {
      text: 'Regenerativo involucra al poder público, a la comunidad y un plazo más largo. Es el proyecto de mayor construcción, y el que rinde la relación más duradera con el espacio.',
      footer: 'Alcance y plazo definidos con la municipalidad de cada ciudad',
    },
    oQueE: {
      lead: 'La contrapartida es el producto. La marca patrocina la requalificación de un espacio público y gana presencia en él, con una asociación que ninguna cara de outdoor entrega sola.',
      cards: [
        {
          title: 'Requalificación real',
          text: 'Espacios de convivencia y canteros recuperados: piso, iluminación, vegetación y mobiliario de uso.',
        },
        {
          title: 'Presencia de largo plazo',
          text: 'Proyectos con horizonte mayor que una campaña; la marca queda asociada al espacio mientras él dure.',
        },
        {
          title: 'Aprobación ante el municipio',
          text: 'La negociación con el poder público y el licenciamiento los conducimos nosotros, del diseño a la entrega.',
        },
      ],
    },
    faqs: [
      {
        q: '¿Cuánto tiempo lleva un proyecto regenerativo?',
        a: 'Más que una campaña común. Entre briefing, aprobación municipal y obra, el plazo se define caso a caso, y traemos la estimación junto con el estudio de viabilidad.',
      },
      {
        q: '¿La marca puede elegir el lugar?',
        a: 'Puede indicar la región y el perfil deseado. El espacio final depende del interés del municipio y de la viabilidad técnica de la intervención.',
      },
      {
        q: '¿Cómo aparece la marca en el espacio?',
        a: 'Por señalización de patrocinio integrada al proyecto, dentro de lo que la legislación del municipio permite. No es una cara de medios convencional.',
      },
      {
        q: '¿Quién mantiene el espacio después de la entrega?',
        a: 'El mantenimiento forma parte del acuerdo firmado con el municipio y se define en el alcance del proyecto, junto con el período de presencia de la marca.',
      },
    ],
  },
  {
    tagline: 'Mobiliario de autor',
    short:
      'Diseño de autor en direcciones nobles: el medio suma al paisaje en vez de disputar con él.',
    imageAlt: 'Estructura vertical de diseño de autor con panel digital, en avenida de edificios altos',
    frase:
      'Diseño moderno en direcciones nobles: el medio valoriza el paisaje y la marca hereda ese contexto.',
    ctaLinha: 'Quiero evaluar un Elegancy',
    ativos: [
      {
        kicker: 'La arquitectura como proyecto',
        text: 'La arquitectura entró en el diseño del panel antes que la tecnología. Líneas que valorizan la calle en vez de disputar con ella, con un acabado que eleva la percepción de cualquier marca exhibida.',
        specs: 'Super Top Digital Urbanity: 768×1024 px · MP4 · 10 segundos',
        imageAlt:
          'Estructura vertical con panel digital y base iluminada de diseño propio, en avenida de edificios altos',
        verEm: { label: 'Ver en la plataforma Outdoor Digital' },
      },
      {
        kicker: 'La luz como firma',
        text: 'La iluminación contornea, revela y valoriza la estructura, creando una presencia reconocible incluso antes de que la campaña se lea. El panel se vuelve elemento de paisaje, y la marca hereda el contexto de modernidad y alto valor percibido.',
        specs: 'Rua Coronel Dulcídio, 457, esquina con Alameda Dom Pedro II',
        imageAlt: 'Panel digital vertical de estructura reducida, entre árboles en vía residencial',
        verEm: { label: 'Ver en la plataforma Outdoor Digital' },
      },
      ...ICONICOS_ASSINATURA,
    ],
    eyebrow: 'Proyecto icónico · Autor',
    intro:
      'Estructuras de diseño de autor en direcciones nobles, donde el medio necesita sumar al paisaje en vez de disputar con él. Dos líneas, Urbanity y Urbanity Light, para contextos con exigencia estética diferente.',
    ctaLabel: 'Quiero evaluar un Elegancy',
    aside: {
      text: 'Elegancy no es un formato de tabla. Cada estructura se diseña para la dirección donde va a quedar, con acabado, escala e iluminación decididos en el proyecto, no en el catálogo.',
      footer: 'Briefing → estudio de viabilidad → proyecto de la estructura',
    },
    oQueE: {
      lead: 'Existen direcciones en las que un outdoor común no entra: por regla, por contexto o por decisión de la marca. Elegancy es la respuesta para esos lugares: mobiliario urbano con diseño propio, que la calle acepta y la marca firma.',
      cards: [
        {
          title: 'Diseño para la dirección',
          text: 'La estructura nace del lugar: escala, material y acabado definidos a partir de la vía, del entorno y de la visual.',
        },
        {
          title: 'Contexto de alto nivel',
          text: 'Puntos elegidos en corredores y barrios donde la marca quiere ser vista junto a un repertorio específico.',
        },
        {
          title: 'Exclusividad total',
          text: 'Cara única, como en toda la operación: la estructura exhibe una sola marca, del primer al último día.',
        },
      ],
    },
    faqs: [
      {
        q: '¿Cuál es la diferencia entre Urbanity y Urbanity Light?',
        a: 'Es porte, no acabado. Urbanity es la estructura plena, de mayor presencia en la vía; Urbanity Light usa el mismo lenguaje en escala reducida, para veredas estrechas y direcciones con restricción de altura.',
      },
      {
        q: '¿Puedo contratar Elegancy por quincena, como un outdoor?',
        a: 'No del mismo modo. Elegancy es proyecto: el período se define junto con la viabilidad de la estructura, y suele ser más largo que una difusión de tabla. Trae el briefing y volvemos con plazo y formato.',
      },
      {
        q: '¿La estructura es mía o queda con Outdoormídia?',
        a: 'La estructura es nuestra: proyecto, instalación y mantenimiento por nuestra cuenta. Lo que contratas es la exclusividad de la cara por el período acordado.',
      },
      {
        q: '¿Puedo elegir la dirección?',
        a: 'Traes la región y el perfil de público deseado; nosotros evaluamos la viabilidad técnica y legal de cada punto y volvemos con las opciones que se sostienen.',
      },
    ],
  },
]

export const VER_NA_LINHA = 'Ver en la línea {linha}'
