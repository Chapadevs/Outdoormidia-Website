// Tradução de lib/diferenciais.js. Slug, href, publicado, imagens, vídeos,
// ícones e números continuam vindo do arquivo em português.
//
// O overlay é aplicado por posição sobre TODOS_DIFERENCIAIS, que tem 11
// entradas. As 5 últimas estão com `publicado: false` e não aparecem em lugar
// nenhum do site: entram como `{}` e caem no português.
//
// Nome de produto é traduzido junto com o resto, por decisão de 10/09/2026:
// nada do site sai em português numa página que não é a portuguesa. A
// terminologia vale para o site inteiro e está aplicada em todos os overlays,
// para o título do card e o corpo do texto não divergirem.

export const TODOS_DIFERENCIAIS = [
  {
    heading: 'Cara única.',
    // face-unica
    title: 'Cara Única',
    tagline: 'Atención exclusiva',
    text: 'Una cara, una marca. Exhibición exclusiva en cada estructura, sin división de espacio y sin competencia visual.',
    resumo: 'Cada punto es de un solo anunciante, del primer al último día.',
    intro:
      'Una cara, una marca. El concepto Cara Única garantiza exhibición exclusiva en la estructura: sin división de espacio, sin competencia visual, sin ruido disputando la misma mirada. Es lo que ocurre en el Plaza Mosaico, 265,5 m² dedicados a una marca por vez.',
    ctaLabel: 'Quiero un punto exclusivo',
    ctaSecundario: { label: 'Verlo en la práctica' },
    imageAlt:
      'Distrito de Medios de Outdoormídia, estructura de front lights y el letrero "om" al borde de una vía en Curitiba',
    aside: {
      text: 'En medios exteriores, el estándar del mercado es dividir la estructura entre dos, tres o cuatro marcas. Aquí no: una cara, un anunciante, del primer al último día del período.',
    },
    oQueE: {
      lead: [
        'Cara Única garantiza exclusividad total para cada anunciante: elimina cualquier competencia visual y entrega una comunicación directa, clara y poderosa con el público. Un único anunciante ocupa todo el conjunto de medios, maximizando visibilidad, impacto y recuerdo para tu marca.',
        'Mientras otras empresas de medios exteriores comparten el mismo punto entre varias marcas, Outdoormídia dedica cada espacio publicitario exclusivamente a tu marca. Eso elimina la disputa por la atención del público y garantiza que tu mensaje sea el único percibido en ese lugar.',
      ],
      cardsTitle: 'Beneficios para la marca',
      cards: [
        { title: 'Visibilidad ampliada', text: 'Tu marca es protagonista absoluta.' },
        {
          title: 'Sin distracciones',
          text: 'Atención total del público, sin interferencia de otras campañas.',
        },
        {
          title: 'Experiencia visual premium',
          text: 'Mayor impacto, mejor lectura y recuerdo más duradero.',
        },
      ],
    },
    comparativo: {
      amador: {
        label: 'Amateur',
        imageAlt: 'Tres outdoors genéricos compartiendo la misma estructura, cada uno de una marca diferente',
      },
      especialista: {
        label: 'Especialista',
        imageAlt:
          'Estructura entera ocupada por la campaña Trolls 2 de Telecine, una sola marca de principio a fin',
        legenda: 'La cara entera, el período entero. Un solo mensaje para quien pasa: el tuyo.',
      },
      nota: 'Creación de layouts en los outdoors realizados por nosotros para ejemplificar el mensaje.',
    },
  },
  {
    heading: 'Plaza Aeropuerto.',
    // aeroporto-square
    title: 'Plaza Aeropuerto',
    tagline: 'Formato inédito',
    text: 'El mayor panel híbrido del Sur de Brasil: 312 m² donde presencia física y contenido digital comparten la misma estructura.',
    resumo: 'El mayor panel híbrido del Sur de Brasil, 312 m² en una sola estructura.',
    intro:
      'El mayor panel híbrido del Sur de Brasil: 312 m² donde presencia física y contenido digital comparten la misma estructura. Público en desplazamiento, alto poder adquisitivo y un tiempo de exposición que la calle no ofrece. Un formato que solo existe aquí.',
    ctaLabel: 'Quiero anunciar en el Plaza Aeropuerto',
    ctaSecundario: { label: 'Ver el producto Aeropuerto' },
    imageAlt:
      'Plaza Aeropuerto, panel híbrido curvo de Outdoormídia, con la campaña de un único anunciante ocupando toda la extensión de la estructura',
    aside: {
      text: 'Híbrido quiere decir estático y digital en la misma estructura: la permanencia del gran formato sumada al cambio de contenido en tiempo real, en una escala que ninguna otra plaza del Sur ofrece.',
    },
    oQueE: {
      lead: 'Un formato inédito en la región, donde la permanencia del gran formato se suma a la dinámica del contenido digital, sin equivalente en otra plaza del Sur de Brasil.',
      imageAlt: null,
    },
  },
  {
    // inteligencia-e-audiencia
    title: 'Inteligencia y audiencia',
    tagline: 'Audiencia medida',
    text: 'Wi-Fi tracking y eye tracking responden por dónde circulan las personas, quién vio y cómo reaccionó.',
    resumo: 'CPM, frecuencia, género, franja etaria e ingresos por campaña.',
    heading: 'Inteligencia y audiencia.',
    intro:
      'Wi-Fi tracking y eye tracking responden lo que los medios exteriores nunca respondieron: por dónde circulan las personas, quién realmente vio y cómo reaccionó. Recibes un informe completo, métricas reales y monitoreo 24/7. Nada de estimaciones, solo dato medido campaña por campaña.',
    subtitulo:
      'Toda campaña de medios exteriores termina con la misma pregunta en la reunión siguiente: ¿cuántas personas vieron de verdad? Outdoormídia responde con dato medido punto a punto, no con estimación de flujo. Wi-Fi tracking, eye tracking y monitoreo en tiempo real transforman la presencia urbana en un informe que se presenta y se defiende.',
    seo: {
      title: 'Audiencia medida en medios exteriores | Outdoormídia',
      description:
        'Wi-Fi tracking y eye tracking miden quién circula y quién vio tu campaña. Informe con impactos, frecuencia, CPM, CPI y perfil de audiencia.',
    },
    imageAlt:
      'Panel digital de Outdoormídia en operación, con flujo de vehículos y peatones en el entorno',
    oQueE: {
      cards: [
        {
          title: 'CPM comparable',
          text: 'Costo por mil impactos calculado sobre el flujo medido, el mismo indicador que usas para comparar con medios online.',
        },
        {
          title: 'Frecuencia real',
          text: 'Cuántas veces la misma persona fue impactada en el período, no un promedio genérico de la vía.',
        },
        {
          title: 'Perfil del público',
          text: 'Género, franja etaria e ingresos de quien circuló por el punto. Sirve para elegir la plaza y para defender el presupuesto después.',
        },
      ],
    },
    monitoramento: {
      title: 'La campaña acompañada mientras está al aire',
      paragrafos: [
        'Wi-Fi tracking y eye tracking miden por dónde circulan las personas y quién efectivamente vio la pieza. La exhibición se acompaña por cámara durante la difusión, con un equipo dedicado 24 horas al día, siete días por semana, que actúa apenas algo se sale de lugar.',
        'El acompañamiento es diario. El informe consolidado llega cada semana.',
      ],
      imagensAlt:
        'Punto de medios de Outdoormídia acompañado por cámara durante la difusión de la campaña',
    },
    relatorio: {
      title: 'Qué entra en el informe',
      lead: 'El informe no es un resumen de difusión. Es la lectura completa de lo que la campaña entregó, punto a punto, en el vocabulario que la planificación de medios ya usa.',
      itens: [
        {
          title: 'Total de impactos por punto',
          text: 'Cuánto entregó cada cara, aislado. Permite comparar el desempeño dentro de la propia campaña.',
        },
        {
          title: 'Frecuencia promedio',
          text: 'Cuántas veces la misma persona fue impactada en el período. Alcance sin frecuencia no construye memoria.',
        },
        {
          title: 'Tasa de eficiencia',
          text: 'La relación entre el público expuesto y el público efectivamente alcanzado en cada punto.',
        },
        {
          title: 'CPM',
          text: 'Costo por mil impactos, en la misma métrica que usa el resto del plan de medios.',
        },
        {
          title: 'CPI',
          text: 'Costo por impacto, para comparación directa entre formatos y plazas.',
        },
        {
          title: 'Perfil de audiencia',
          text: 'Género, franja etaria y franja de ingresos del público alcanzado en cada punto.',
        },
        {
          title: 'Cruce entre puntos',
          text: 'Cuánto se superponen los puntos de la campaña y cuánto amplían el alcance de verdad.',
        },
        {
          title: 'Datos en tiempo real',
          text: 'Acompañamiento diario durante la difusión, con informe consolidado cada semana.',
        },
      ],
      fechamento:
        'No pagas aparte por acompañamiento ni por informe. La comprobación forma parte de la campaña.',
      imageAlt:
        'Pantalla del informe de audiencia de Outdoormídia, con impactos, frecuencia y perfil de público por punto',
    },
    leitura: {
      title: 'La lectura en la práctica',
      lead: 'Una medición de audiencia de la red, realizada entre octubre y diciembre de 2022, muestra el tipo de respuesta que entrega el informe:',
      dados: [
        { label: 'del público entre 18 y 60 años' },
        { label: 'masculino' },
        { label: 'femenino' },
        { label: 'clase C+' },
        { label: 'clases A/B' },
      ],
    },
    privacidade: {
      title: 'Dato de audiencia, no dato personal',
      paragrafos: [
        'Las métricas de la red digital son agregadas y anónimas. La medición describe público, no persona: ningún dato identificable es recopilado, almacenado ni entregado al anunciante.',
      ],
    },
  },
  {
    // midia-regenerativa
    title: 'Medios Regenerativos',
    tagline: 'Legado en la ciudad',
    text: 'El primer activo de medios exteriores conectado a la Muralha Digital de Curitiba.',
    resumo: 'Medios exteriores que devuelven un servicio a la ciudad, de la seguridad pública a las plazas pet.',
    heading: 'Medios regenerativos.',
    intro:
      'El primer activo de medios exteriores conectado a la Muralha Digital de Curitiba, en la Plaza de Conveniencia Batel, con monitoreo integrado y botón de emergencia. Es la misma lógica de las plazas pet, del Jardín MUB y de la Plaza de Carga Eléctrica: estructura que la ciudad usa incluso cuando no está mirando la marca. Presencia urbana también es responsabilidad urbana.',
    ctaLabel: 'Quiero un punto con contrapartida urbana',
    imageAlt:
      'Tótem de medios de Outdoormídia con cámara de monitoreo en lo alto, instalado en una esquina del Batel, en Curitiba',
    aside: {
      text: 'Una estructura de medios ocupa espacio público todos los días del año. Conectarla a la red de seguridad de la ciudad es devolver parte de ese espacio a quien pasa por él.',
      footer: 'Plaza de Conveniencia Batel, Curitiba',
    },
    oQueGanha: {
      title: 'Aparecer es diferente de formar parte',
      lead: [
        'Toda campaña de medios exteriores disputa la atención con lo que la rodea. En los proyectos de Medios Regenerativos, la estructura es lo que la rodea. No interrumpe la rutina del barrio, participa de ella.',
        'Eso cambia el tipo de presencia que la marca compra. En una plaza de convivencia las personas no pasan, se quedan, y permanencia es tiempo de exposición que la vía no entrega. Y el público vuelve, porque el lugar sigue sirviendo para algo después de que la campaña sale del aire.',
        'También cambia lo que la marca se lleva consigo. Patrocinar un espacio que la ciudad usa es ser percibida como socia del barrio, no como anunciante de él. Es el tipo de asociación que los medios sueltos no compran, en un mercado donde casi toda marca habla de propósito y casi ninguna tiene a dónde apuntar.',
      ],
    },
    carteira: {
      title: 'Los proyectos en el aire',
      lead: 'Cada proyecto resuelve algo diferente para la ciudad, y por eso asocia a la marca con algo diferente. Lo que tienen en común es que siguen sirviendo después de que termina la campaña.',
      projetos: [
        {
          title: 'Plazas Pet',
          text: 'Ocio y convivencia en barrios de alta circulación. La marca aparece donde la familia elige pasar la tarde.',
          label: 'Ver el proyecto',
        },
        {
          title: 'Jardín MUB',
          text: 'El primer mobiliario urbano digital de Curitiba con jardín vivo. Tecnología y naturaleza en la misma estructura, y la marca en medio de las dos.',
          label: 'Ver el proyecto',
        },
        {
          title: 'Jardín Digital',
          text: 'Exhibición exclusiva en un soporte que la ciudad mira por ser bonito, no por ser un anuncio.',
          label: 'Ver el proyecto',
        },
        {
          title: 'Plaza de Carga Eléctrica',
          text: 'La primera del Sur de Brasil, impulsada por energía solar. Presencia asociada a un servicio que la persona usa mientras espera.',
          label: 'Ver el proyecto',
        },
      ],
    },
  },
  {
    // circuito-mub
    title: 'Circuito MUB por nicho',
    tagline: 'Público correcto, no público grande',
    text: 'Seis circuitos semanales armados por perfil de público, en el mobiliario urbano que él ya usa en su rutina.',
    cardCta: 'Ver la plataforma',
    resumo: 'Seis circuitos de mobiliario urbano armados por perfil de público.',
    heading: 'Circuito MUB por nicho.',
    intro:
      'Seis circuitos semanales armados por perfil de público: Full, Salud, Educación, Shoppings, Alto Nivel y Súper e Hipermercados. En vez de esparcir la campaña por toda la ciudad, corre en el mobiliario urbano que tu público ya usa en su rutina.',
    imageAlt:
      'Mobiliario urbano MUB con jardín en la cima y campaña de anunciante en la cara iluminada, en una calle de Curitiba',
  },
  {
    heading: 'Gestión 360 OM.',
    // gestao-360-om
    title: 'Gestión 360 OM',
    tagline: 'Consultoría de principio a fin',
    text: 'Planificación, producción y difusión conducidas por quien opera la estructura.',
    cardCta: 'Ver cómo funciona',
    resumo: 'Planificación, producción y difusión conducidas por quien opera la estructura.',
    intro:
      'Planificación, producción y difusión conducidas por quien opera la estructura. En proyectos de panel exclusivo, incluye consultoría legal de licenciamiento, dimensionamiento dentro de la norma e instalación completa. Tú apruebas la campaña, no administras proveedores.',
  },
  {},
  {},
  {},
  {},
  {},
]
