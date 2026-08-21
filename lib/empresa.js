// Fonte única dos dados institucionais (NAP: nome, endereço, telefone).
//
// Consumido pelo JSON-LD de LocalBusiness (components/widgets/JsonLd.jsx) e
// pelo llms.txt. Alterar aqui reflete nos dois — nunca repetir esses valores
// soltos em componente ou página.
//
// Campo vazio é omitido do JSON-LD de propósito: dado errado em structured data
// vira endereço/horário errado no Google e no perfil da empresa. Melhor ausente
// que inventado.

export const EMPRESA = {
  nome: 'Outdoormídia',
  slogan: 'Toda Hora em Todo Lugar',
  descricao:
    'Empresa de mídia Out of Home (OOH) no Sul do Brasil desde 1959. Outdoors digitais, front lights, mídia indoor, aeroporto, rodovias, mobiliário urbano e mídia móvel no Paraná e em Santa Catarina.',
  servico: 'mídia exterior Out of Home (OOH)',
  fundacao: '1959',

  // TODO(cliente): razão social, CNPJ e o e-mail do encarregado de dados (LGPD,
  // art. 41). A Política de Privacidade nomeia o controlador com o que existir
  // aqui e omite cada linha vazia — dado jurídico ausente é melhor que dado
  // inventado. Sem `encarregado`, o canal do titular vira o `email` abaixo.
  razaoSocial: '',
  cnpj: '',
  encarregado: '',

  telefone: '+554132076400',
  telefoneExibicao: '+55 41 3207-6400',
  whatsapp: '+5541998350210',
  whatsappExibicao: '+55 41 99835-0210',
  email: 'contato@outdoormidia.com.br',

  endereco: {
    // TODO(cliente): logradouro, número e CEP da sede em Curitiba. Enquanto
    // vazios, o PostalAddress sai só com cidade/estado/país.
    logradouro: '',
    cep: '',
    cidade: 'Curitiba',
    estado: 'PR',
    pais: 'BR',
  },

  // TODO(cliente): confirmar o horário de atendimento comercial. Formato:
  // { dias: ['Monday', ...], abre: '08:00', fecha: '18:00' }
  // Enquanto vazio, o openingHoursSpecification é omitido do JSON-LD.
  horarios: [],

  areaServida: [
    'Curitiba',
    'Região Metropolitana de Curitiba',
    'Litoral do Paraná',
    'Paraná',
    'Santa Catarina',
  ],

  // Mesmos perfis linkados no rodapé — ver o TODO(cliente) em
  // components/layout/Footer.jsx sobre X e Facebook.
  redes: [
    'https://www.instagram.com/outdoormidia/',
    'https://br.linkedin.com/company/outdoormidia',
    'https://www.facebook.com/outdoormidia',
    'https://x.com/outdoormidia',
  ],
}
