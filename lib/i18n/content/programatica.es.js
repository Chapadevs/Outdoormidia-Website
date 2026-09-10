// Tradução de lib/programatica.js. `publicado`, `sigla`, `num`, `id` e
// `verbete` continuam vindo do arquivo em português.
//
// As siglas e os nomes de mercado (Preferred Deal, DSP, SSP, JBP) não são
// traduzidos em idioma nenhum: o vocabulário programático é inglês, e trocar o
// termo aqui quebra o reconhecimento de quem compra por trading desk.

export const DADO_MERCADO = {
  texto:
    'En 2025 se invirtieron globalmente US$ 1,4 mil millones en DOOH programático, el equivalente al 7% de todo lo que se invirtió en medios exteriores digitales en el mundo.',
  fonte: 'Fuente: World Out of Home Organization, Global pDOOH Spend Study 2025.',
}

export const MODELOS = [
  {
    texto:
      'Acceso prioritario a un inventario determinado, con condiciones comerciales negociadas antes de la difusión.',
  },
  {
    texto: 'Volumen de impresiones o de inversión acordado previamente entre las partes.',
  },
  {
    texto: 'Sin compromiso previo de volumen ni de inversión. La compra ocurre en subasta abierta.',
  },
]

export const FLUXO = [
  {
    etapa: 'Anunciante',
    texto: 'La marca define el objetivo de la campaña y el público que necesita alcanzar.',
  },
  {
    etapa: 'Agencia o trading desk',
    texto:
      'Planifica la estrategia, gestiona la campaña y define los canales. La trading desk puede estar dentro de la agencia o actuar de forma independiente.',
  },
  {
    texto: 'Se configura la demanda y las pujas ocurren en tiempo real.',
  },
  {
    texto: 'Recibe las demandas de las DSP y las conecta al inventario disponible.',
  },
  {
    etapa: 'Inventario Outdoormídia',
    texto: 'Las pantallas de nuestra operación entran en la oferta a través de las SSP asociadas.',
  },
  {
    etapa: 'Exhibición',
    texto: 'El anuncio se exhibe en el lugar, impactando al público correcto en el momento correcto.',
  },
]

export const GLOSSARIO = [
  {
    texto: 'La plataforma donde el comprador configura la campaña y realiza las pujas.',
  },
  {
    texto: 'La plataforma donde el dueño del inventario oferta las pantallas a las DSP.',
  },
  {
    nome: 'Costo por mil',
    texto:
      'Valor pagado por cada mil exhibiciones. Es la principal métrica de precificación en el DOOH programático.',
  },
  {
    nome: 'Campaña continua',
    texto: 'Campaña sin fecha fija de cierre, para mantener una presencia constante de la marca.',
  },
  {
    texto:
      'Planificación comercial conjunta entre socios, con objetivos, metas y estrategias de crecimiento.',
  },
  {
    nome: 'Red de anuncios',
    texto:
      'Plataforma intermediaria que conecta anunciantes y publishers, agrupando inventario de distintos medios.',
  },
  {
    nome: 'Solución integrada',
    texto:
      'Plataforma que reúne compra, venta, entrega, medición y optimización en un único ecosistema.',
  },
]
