// Tradução de lib/melhoresPraticas.js. `href` e o componente de ícone
// continuam vindo do arquivo em português.
//
// ATENÇÃO: `praticaLink.trecho` precisa ser um pedaço literal de `pratica` no
// mesmo idioma — é por busca de substring que o link é montado. Traduzir um
// sem o outro apaga o link da página.

export const PRATICAS = [
  {
    titulo: 'Empieza por el objetivo, no por el punto',
    corpo: 'Llevar gente hasta la tienda, lanzar un producto, construir marca en la región y difundir una fecha son cuatro campañas diferentes. Piden plazas diferentes, formatos diferentes y períodos diferentes. El punto correcto es consecuencia del objetivo, nunca al revés.',
    pratica: 'antes de elegir dónde, escribe en una frase lo que la campaña necesita resolver.',
  },
  {
    titulo: 'Elige la plaza por el trayecto de tu público',
    corpo: 'Estar en la ciudad y estar en la rutina son cosas distintas. Quien sale de casa a las siete y vuelve a las siete pasa por corredores previsibles, y es en ellos donde la marca necesita aparecer. Distribuir caras por toda la ciudad sin mirar el trayecto cuesta más y se recuerda menos.',
    pratica: 'lista los tres trayectos que tu cliente hace en un día común. La plaza sale de ahí.',
  },
  {
    titulo: 'El formato no es tamaño, es función',
    corpo: 'Cada formato resuelve un problema diferente. No existe un formato mejor, existe el formato correcto para lo que la campaña necesita hacer, y por eso la conversación empieza en el objetivo y no en el catálogo.',
    pratica: 'usa la tabla de abajo para cruzar objetivo y formato antes de la primera conversación.',
  },
  {
    titulo: 'La repetición es lo que construye recuerdo',
    corpo: 'Los medios exteriores no funcionan por interrupción, funcionan por acumulación. La misma persona pasa por el mismo punto varias veces por semana, y es esa suma la que se vuelve memoria de marca. Con la misma inversión, un período más largo en menos puntos suele rendir más que muchas caras en poco tiempo.',
    pratica:
      'antes de aumentar el número de caras, verifica que el período sea el correcto. La unidad de contratación de los medios exteriores es la quincena, y el FAQ explica los ciclos de cada activo.',
    praticaLink: {
      trecho: 'el FAQ explica los ciclos de cada activo',
    },
  },
  {
    titulo: 'El arte tiene que leerse en segundos',
    corpo: 'Quien está en el tránsito tiene pocos segundos y ninguna intención de leer. Una pieza de medios exteriores funciona con una idea, una marca visible y un único elemento de contacto. Un texto pensado para un anuncio de revista, aplicado en un panel, no se lee, se ignora.',
    pratica:
      'imprime el arte en una hoja A4, pégala en la pared y mírala desde tres metros. Si en dos segundos no sabes de quién es la marca y qué se está diciendo, la pieza todavía no está lista.',
    recomendacoes: {
      titulo: 'Tres recomendaciones que nuestro equipo hace en cada campaña',
      texto:
        'Alto contraste entre el fondo y la tipografía. Las fuentes finas y serifadas desaparecen a la distancia, y un fondo blanco o negro no es recomendable. Los formatos verticales y horizontales piden composiciones diferentes, y el arte debe pensarse para el formato desde el principio, nunca adaptarse después.',
    },
  },
  {
    titulo: 'El lugar donde aparece la marca también comunica',
    corpo: 'El entorno entra en la lectura de la pieza. Un panel dividido con otras marcas divide también la atención. Para eso existe el Cara Única: la cara entera, sin competencia visual en el mismo campo de visión. Para quien vende posicionamiento antes que precio, el activo elegido forma parte del mensaje.',
    pratica:
      'a la hora de comparar propuestas de distintos medios, verifica si la cara está dedicada a una sola marca. En nuestra operación, lo está.',
  },
  {
    titulo: 'Pregunta qué datos recibes, antes y después',
    corpo: 'Los medios exteriores dejaron de ser el canal sin números, pero lo que cada medio entrega varía. Antes de cerrar, pregunta qué información recibes sobre el punto y sobre quién circula por ahí. Después de la difusión, pregunta cómo se comprueba la exhibición. Si necesitas defender el plan internamente, haz las dos preguntas ya en la primera conversación.',
    pratica: 'lleva a la reunión interna la lectura del punto, no solamente su foto.',
  },
  {
    titulo: 'La anticipación cambia lo que está disponible',
    corpo: 'Los puntos de mayor circulación son también los más disputados, y las fechas comerciales concentran la demanda sobre los mismos activos. Algunos productos tienen plazo propio: los paneles construidos a demanda en carretera trabajan con un ciclo de contratación largo y no se resuelven en semanas. Cuanto antes empiece la conversación, mayor es el número de opciones sobre la mesa.',
    pratica: 'lleva el calendario de la campaña a la primera conversación, no solo el presupuesto.',
  },
]

export const CHECKLIST_CATEGORIAS = [
  {
    titulo: 'Productos',
    itens: [
      'Usar el nombre oficial de cada producto',
      'Nunca usar abreviaciones ni apodos como "Cascata" o "Square"',
      'Ante la duda, consulta al equipo de Marketing de Outdoormídia',
    ],
    fechamento:
      'El nombre de cada producto forma parte de la construcción de marca y debe tratarse con rigor y consistencia.',
  },
  {
    titulo: 'Imágenes',
    itens: [
      'Utilizar solamente imágenes reales de los paneles de Outdoormídia',
      'El panel debe estar 100% limpio y visible, sin superposición de textos, íconos o elementos gráficos',
      'No usar imágenes que tengan ruidos visuales en la pantalla',
      'Evitar filtros, distorsiones o tratamientos de IA que alteren color, estructura o proporción del producto',
      'Si hay cables eléctricos o de luz visiblemente delante del panel, es obligatorio removerlos durante el tratamiento de la imagen, manteniendo el realismo y la valorización del punto',
    ],
    fechamento:
      'Cada imagen publicada debe fortalecer nuestra identidad: transparente, profesional y visualmente impactante.',
  },
  {
    titulo: 'Cases y referencias',
    intro:
      'La fuerza de cada producto de Outdoormídia se amplifica cuando se asocia a marcas de gran visibilidad y relevancia. Por eso:',
    itens: [
      'Prioriza siempre campañas de grandes marcas que anuncian con nosotros, refuerzan autoridad, resultado y confianza en el producto',
      'No utilices campañas institucionales de Outdoormídia como case principal, ni como material de difusión de productos',
    ],
    fechamento:
      'Quien valida nuestro portafolio es el mercado. Y las grandes marcas son nuestras mejores vitrinas.',
  },
  {
    titulo: 'Banda sonora',
    intro:
      'La música utilizada en videos y reels debe pensarse con el mismo cuidado estético y estratégico que las imágenes y los textos. El sonido no debe competir con el mensaje, debe reforzarlo con ligereza y neutralidad.',
    itens: [
      'Da preferencia a músicas neutras e instrumentales, sin letras cantadas ni ritmo que cause distracción',
      'Utiliza solo pistas con derechos de autor liberados (bancos de audio confiables, royalty-free o pistas licenciadas)',
      'Evita músicas populares, con voces o efectos dramáticos exagerados',
    ],
    fechamento:
      'El sonido también es posicionamiento. Y en Outdoormídia debe reforzar claridad, sofisticación y propósito.',
  },
]

export const PERGUNTAS_ANTES_DE_FECHAR = [
  {
    pergunta: '¿La cara está dedicada solo a mi marca?',
    porque:
      'Define si tu marca comparte o no la atención en ese campo de visión. En Outdoormídia, el Cara Única garantiza que sí',
  },
  {
    pergunta: '¿El punto tiene iluminación?',
    porque:
      'La iluminación sigue la viabilidad de cada punto y cambia el rendimiento en el período nocturno',
  },
  {
    pergunta: '¿Cuál es el ciclo de contratación de este activo?',
    porque: 'Quincena, mes y ciclos más largos cambian el cálculo de inversión',
  },
  {
    pergunta: '¿La instalación está incluida?',
    porque:
      'En los productos de panel exclusivo, lo está. Preguntar evita la mayor duda de esta frente',
  },
  {
    pergunta: '¿Qué está incluido en el valor de la campaña?',
    porque:
      'Separa lo que ya está pagado de lo que aparece como línea extra, antes de que llegue la propuesta',
  },
]

export const SAIDAS = [
  {
    titulo: 'Diagnóstico de presencia',
    texto: 'Diez preguntas y una lectura de la presencia de tu marca hoy.',
  },
  {
    titulo: 'Tu marca en OOH',
    texto: 'Mira tu marca aplicada en un panel real de nuestra red.',
  },
  {
    titulo: 'FAQ',
    texto:
      'Precio, plazo, arte y exclusividad del punto. Las preguntas que el comercial más recibe.',
  },
]
