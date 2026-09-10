// Tradução de lib/programatica.js. `publicado`, `sigla`, `num`, `id` e
// `verbete` continuam vindo do arquivo em português.
//
// As siglas e os nomes de mercado (Preferred Deal, DSP, SSP, JBP) não são
// traduzidos em idioma nenhum: o vocabulário programático é inglês, e trocar o
// termo aqui quebra o reconhecimento de quem compra por trading desk.

export const DADO_MERCADO = {
  texto:
    'In 2025, US$ 1.4 billion was invested globally in programmatic DOOH, the equivalent of 7% of everything invested in digital out of home media worldwide.',
  fonte: 'Source: World Out of Home Organization, Global pDOOH Spend Study 2025.',
}

export const MODELOS = [
  {
    texto:
      'Priority access to a defined inventory, with commercial terms negotiated before the campaign runs.',
  },
  {
    texto: 'A volume of impressions or of investment agreed in advance between the parties.',
  },
  {
    texto: 'No prior commitment to volume or investment. The purchase happens in an open auction.',
  },
]

export const FLUXO = [
  {
    etapa: 'Advertiser',
    texto: 'The brand defines the campaign objective and the audience it needs to reach.',
  },
  {
    etapa: 'Agency or trading desk',
    texto:
      'Plans the strategy, manages the campaign and defines the channels. The trading desk may sit inside the agency or operate independently.',
  },
  {
    texto: 'Demand is configured and bids happen in real time.',
  },
  {
    texto: 'Receives demand from the DSPs and connects it to the available inventory.',
  },
  {
    etapa: 'Outdoormídia inventory',
    texto: 'The screens in our operation enter the offer through our partner SSPs.',
  },
  {
    etapa: 'Display',
    texto: 'The ad is shown on site, reaching the right audience at the right moment.',
  },
]

export const GLOSSARIO = [
  {
    texto: 'The platform where the buyer configures the campaign and places bids.',
  },
  {
    texto: 'The platform where the inventory owner offers screens to the DSPs.',
  },
  {
    nome: 'Cost per mille',
    texto:
      'The amount paid for every thousand displays. It is the main pricing metric in programmatic DOOH.',
  },
  {
    nome: 'Continuous campaign',
    texto: 'A campaign with no fixed end date, to keep a constant brand presence.',
  },
  {
    texto:
      'Joint commercial planning between partners, with shared objectives, targets and growth strategies.',
  },
  {
    nome: 'Ad network',
    texto:
      'An intermediary platform that connects advertisers and publishers, pooling inventory from different media owners.',
  },
  {
    nome: 'Integrated solution',
    texto:
      'A platform that brings buying, selling, delivery, measurement and optimisation together in a single ecosystem.',
  },
]
