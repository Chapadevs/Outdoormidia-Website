// Tradução de lib/locations.js — só a lista padrão, que é o que o site mostra
// enquanto a coleção `locations` do Firestore estiver vazia. `id`, `lat` e
// `lng` continuam vindo do arquivo em português.
//
// Nome de plataforma segue o critério de lib/i18n/content/platforms.*: o
// descritivo é traduzido, o nome de produto fica como está.

export const DEFAULT_LOCATIONS = [
  {
    desc: 'Capital and main corridors',
    formats: ['Outdoor Digital', 'Front Light', 'Iconic Projects', 'Malls', 'MUB'],
  },
  {
    name: 'Metropolitan Region',
    desc: 'Campo Largo, São José dos Pinhais, Pinhais, Fazenda Rio Grande',
    formats: ['Front Light', 'Outdoor Digital', 'Airport'],
  },
  {
    name: 'Paraná coast',
    desc: 'Beaches and high-season access roads',
    formats: ['Front Light', 'Mobile Media'],
  },
  {
    name: 'Highways',
    desc: 'BR 101, 116, 277 and 376, across both states',
    formats: ['Highways', 'Front Light', 'Outdoor Digital'],
  },
  {
    desc: 'Itajaí, Joinville, Balneário Camboriú',
    formats: ['Outdoor Digital', 'Front Light', 'Highways'],
  },
]
