// Tradução de lib/diagnostico.js. As classes de estilo dos degraus, os
// `href`, `key`, `n`, `max` e `range` continuam vindo do arquivo em português.

export const GRUPOS = [
  { titulo: 'Recuerdo' },
  { titulo: 'Percepción' },
  { titulo: 'Presencia física' },
  { titulo: 'Frecuencia' },
  { titulo: 'Disputa y memoria' },
]

export const PERGUNTAS = [
  {
    pergunta: 'Cuando alguien piensa en tu sector, ¿se acuerda de tu marca?',
    ajuda: 'Antes de comparar precio, el cliente compara nombres que ya conoce.',
    minimo: 'Nunca se acuerdan',
    maximo: 'Se acuerdan primero',
    fragil: {
      diagnostico:
        'El recuerdo espontáneo es el activo más caro de construir y el más barato de mantener. Empieza por la exposición repetida en el lugar correcto.',
      cta: 'Podemos armar un plan de presencia continua para tu sector en tu plaza.',
    },
  },
  {
    pergunta: '¿Tu marca es conocida más allá de tu base de clientes?',
    ajuda: 'Fuera de quien ya compró, ¿cuántas personas saben que tu empresa existe?',
    minimo: 'Solo quien ya compró',
    maximo: 'Mucho más allá de la base',
    fragil: {
      diagnostico:
        'Tu marca está circulando dentro de su propia base. Crecer exige ser visto por quien todavía no te compró nada.',
      cta: 'Mira dónde tu marca alcanzaría gente nueva.',
      link: { label: 'Regiones y cobertura' },
    },
  },
  {
    pergunta: '¿Tu marca parece del tamaño que realmente tiene?',
    ajuda: 'Una empresa sólida que aparece poco da la impresión de ser una empresa pequeña.',
    minimo: 'Parece menor',
    maximo: 'Parece de su tamaño',
    fragil: {
      diagnostico:
        'La percepción de tamaño se construye por dónde aparece la marca. Una empresa que ocupa un espacio grande en la ciudad se lee como una empresa grande.',
      cta: 'Conoce los formatos que cambian la percepción de porte de una marca.',
      link: { label: 'Proyectos Icónicos' },
    },
  },
  {
    pergunta: '¿Tu equipo comercial necesita explicar quién es la empresa antes de vender?',
    ajuda:
      'Cuando la marca llegó antes, la conversación empieza en la propuesta y no en la presentación.',
    minimo: 'Siempre necesita explicar',
    maximo: 'Ya llegan sabiendo',
    fragil: {
      diagnostico:
        'Si el comercial necesita presentar la empresa en cada reunión, la marca no está llegando antes que el vendedor. La presencia acorta esa conversación.',
      cta: 'Habla con nuestro equipo sobre cómo preparar el terreno antes de la visita comercial.',
    },
  },
  {
    pergunta: '¿Tu marca está en los lugares donde circula tu público?',
    ajuda: 'Avenidas, carreteras, shoppings, aeropuerto. Donde su rutina ocurre de verdad.',
    minimo: 'No está',
    maximo: 'Está en su camino',
    fragil: {
      diagnostico:
        'Estar donde circula el público es la diferencia entre ser buscado y ser encontrado. El territorio es una decisión de medios, no de suerte.',
      cta: 'Mira las plataformas disponibles y hasta dónde llega cada una.',
      link: { label: 'Plataformas' },
    },
  },
  {
    pergunta: '¿Tu marca es conocida en toda la región donde atiendes?',
    ajuda: 'Muchas empresas son fuertes en el barrio de la sede y desconocidas a quince minutos de ahí.',
    minimo: 'Solo donde está la sede',
    maximo: 'En toda la región',
    fragil: {
      diagnostico:
        'Ser fuerte solo alrededor de la sede limita el negocio al radio de quien ya pasa por la puerta. Una región entera exige presencia distribuida.',
      cta: 'Mira la cobertura completa en Paraná y en Santa Catarina.',
      link: { label: 'Regiones y cobertura' },
    },
  },
  {
    pergunta: '¿Tu marca aparece todo el año?',
    ajuda: 'O aparece en una campaña puntual y desaparece en el resto del calendario.',
    minimo: 'Solo en campaña',
    maximo: 'Todo el año',
    fragil: {
      diagnostico:
        'Una campaña puntual construye pico, no memoria. Todo el año cuesta menos por mes y entrega más en el acumulado.',
      cta: 'Entiende cómo armar un calendario anual de presencia.',
      link: { label: 'Soluciones' },
    },
  },
  {
    pergunta: 'Quien nunca oyó hablar de ti, ¿se cruzaría con tu marca esta semana?',
    ajuda:
      'No en una búsqueda, porque quien busca ya te conoce. En el trayecto en auto, en la fila del shopping, en la carretera. El descubrimiento ocurre sin intención.',
    minimo: 'Pasaría lejos',
    maximo: 'La vería varias veces',
    fragil: {
      diagnostico:
        'Si nadie te descubre sin buscar, cada cliente nuevo cuesta esfuerzo activo. La exposición transforma el azar en canal.',
      cta: 'Mira dónde entraría tu marca en el trayecto diario de tu público.',
      link: { label: 'Plataformas' },
    },
  },
  {
    pergunta: '¿Tu marca tiene tanta visibilidad como tus principales competidores?',
    ajuda: 'En la misma plaza, ¿quién aparece más: tú o ellos?',
    minimo: 'Ellos aparecen más',
    maximo: 'Aparezco más',
    fragil: {
      diagnostico:
        'Aparecer menos que el competidor en la misma plaza es ceder espacio en la memoria del cliente. Ese espacio no queda vacío, es ocupado.',
      cta: 'Con Cara Única, cada punto es de un único anunciante. Habla con nuestro equipo sobre exclusividad en tu plaza.',
    },
  },
  {
    pergunta: 'Si dejaras de anunciar hoy, ¿tu marca seguiría siendo recordada en los próximos meses?',
    ajuda: 'La exposición desaparece cuando se detiene. La memoria queda.',
    minimo: 'Desaparecería rápido',
    maximo: 'Seguiría siendo recordada',
    fragil: {
      diagnostico:
        'Si la marca desaparece cuando la campaña se detiene, lo que existe es exposición, no memoria. La memoria se construye con constancia.',
      cta: 'Podemos diseñar un plan de constancia dentro de lo que tu empresa invierte hoy.',
    },
  },
]

export const DEGRAUS = [
  {
    nome: 'Existencia',
    linha: 'La empresa existe, y el mercado todavía no la ve.',
    fraseDura: 'Tu marca existe, y el mercado todavía no la ve.',
    paragrafos: [
      'La empresa funciona, entrega bien y **casi nadie lo sabe**. La venta depende de recomendación, de precio y de suerte. Cuando esas tres fallan en el mismo mes, **no queda nada sosteniendo la facturación**.',
      'Lo que traba aquí no es la calidad, es la **exposición**. Ninguna empresa le vende a quien no sabe que existe, y **el competidor que aparece se lleva al cliente que hubiera sido tuyo**, incluso entregando menos.',
      'El siguiente escalón es el **Descubrimiento**, y empieza el día en que tu marca pasa a ser vista por gente que nunca oyó hablar de ti. Eso **no ocurre por casualidad**: ocurre donde esas personas circulan.',
    ],
  },
  {
    nome: 'Descubrimiento',
    linha: 'Las personas empiezan a conocer, y olvidan rápido.',
    fraseDura: 'Tu marca aparece, y después desaparece.',
    paragrafos: [
      'Las personas ya empiezan a conocer, y **olvidan rápido**. La marca aparece en un mes fuerte, desaparece en los otros, y el recuerdo construido se pierde antes de volverse decisión. Es el esfuerzo más frustrante de la comunicación: **pagas para ser visto y no cosechas**.',
      'Lo que traba aquí es el **intervalo**. La memoria de marca no se construye con intensidad, se construye con **repetición**. Una campaña aislada genera pico y valle. El cliente decide en el valle.',
      'El siguiente escalón es el **Reconocimiento**, y llega cuando la marca deja de ser novedad y se vuelve familiaridad. Eso exige aparecer en los mismos lugares, **con constancia**, durante el tiempo suficiente para que el mercado deje de olvidarte.',
    ],
  },
  {
    nome: 'Reconocimiento',
    linha: 'Ya oyeron hablar. Todavía no es la primera elección.',
    fraseDura: 'Ya oyeron hablar. Todavía no es la primera elección.',
    paragrafos: [
      'El mercado sabe que existes y no piensa en ti primero. Es la franja más común, y la más cara, porque la marca ya tiene reputación suficiente para ser considerada y **todavía disputa precio en cada negociación**.',
      'Lo que traba aquí es la **comparación**. Cuando el cliente recuerda tres nombres, el criterio pasa a ser el valor. Cuando recuerda uno, el criterio pasa a ser la **confianza**. La diferencia entre esos dos escenarios es cuántas veces apareció cada marca en su camino durante el año.',
      'El siguiente escalón es la **Preferencia**, y nace de la constancia combinada con **exclusividad de espacio**. Con Cara Única, cada punto es de un único anunciante: tu marca no comparte atención con la competencia justamente donde se forma la decisión.',
    ],
  },
  {
    nome: 'Preferencia',
    linha: 'Cuando surge la necesidad, tu nombre viene antes.',
    fraseDura: 'Cuando surge la necesidad, tu nombre viene antes.',
    paragrafos: [
      'El cliente piensa "cuando necesite esto, me voy a acordar de esa empresa". La marca empieza a vender **sin disputar precio todo el tiempo**, y la negociación es más corta porque la confianza ya vino lista.',
      'Lo que traba aquí es **el propio éxito**. La marca preferida suele reducir inversión en presencia creyendo que la memoria se sostiene sola, y no se sostiene: **el competidor que sigue apareciendo ocupa el espacio que dejaste**.',
      'El siguiente escalón es la **Referencia**, la cima, donde la marca se vuelve sinónimo de la categoría. Llega ahí quien trata la presencia como **inversión permanente** y ocupa la ciudad en más de un formato, no en uno solo.',
    ],
  },
  {
    nome: 'Referencia',
    linha: 'La marca se volvió sinónimo de la categoría.',
    fraseDura: 'Tu marca se volvió sinónimo de la categoría.',
    paragrafos: [
      'Cuando alguien describe la necesidad, tu nombre aparece antes que la categoría. Esta es la cima de la escalera, y es **el lugar más difícil de alcanzar y el más fácil de perder**.',
      'Lo que traba aquí es el **mantenimiento**. La referencia no es un título vitalicio, es una **posición defendida mes a mes**. Toda categoría tiene el caso de la marca que era sinónimo y se volvió recuerdo, y en todos ellos la caída empezó cuando la marca dejó de aparecer.',
      'De aquí en adelante el trabajo cambia de naturaleza: ya no es construir presencia, es **sostener territorio**. Eso significa estar en los puntos que el competidor querría ocupar, antes de que él los ocupe.',
    ],
  },
]

export const ESCALA = [
  { rotulo: 'Casi nunca' },
  { rotulo: 'A veces' },
  { rotulo: 'Casi siempre' },
]

export const ROTULOS_NOTA = [
  'Casi nunca',
  'Raramente',
  'A veces',
  'Con frecuencia',
  'Casi siempre',
]

export const META_PERGUNTAS = 'Preguntas'
