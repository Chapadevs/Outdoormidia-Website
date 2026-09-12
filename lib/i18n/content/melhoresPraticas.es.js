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
