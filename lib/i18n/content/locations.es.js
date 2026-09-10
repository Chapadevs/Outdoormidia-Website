// Tradução de lib/locations.js — só a lista padrão, que é o que o site mostra
// enquanto a coleção `locations` do Firestore estiver vazia. `id`, `lat` e
// `lng` continuam vindo do arquivo em português.

export const DEFAULT_LOCATIONS = [
  {
    desc: 'Capital y principales corredores',
    formats: ['Outdoor Digital', 'Front Light', 'Proyectos Icónicos', 'Malls', 'MUB'],
  },
  {
    name: 'Región Metropolitana',
    desc: 'Campo Largo, São José dos Pinhais, Pinhais, Fazenda Rio Grande',
    formats: ['Front Light', 'Outdoor Digital', 'Aeropuerto'],
  },
  {
    name: 'Litoral de Paraná',
    desc: 'Playas y accesos de temporada alta',
    formats: ['Front Light', 'Medios Móviles'],
  },
  {
    name: 'Carreteras',
    desc: 'BR 101, 116, 277 y 376, en los dos estados',
    formats: ['Carreteras', 'Front Light', 'Outdoor Digital'],
  },
  {
    desc: 'Itajaí, Joinville, Balneário Camboriú',
    formats: ['Outdoor Digital', 'Front Light', 'Carreteras'],
  },
]
