// Fonte única das origens de lead. Quem valida o body e quem renderiza o lead
// no admin leem daqui — os rótulos existem uma vez só.
//
// Para acrescentar um fluxo (diagnóstico, simulador, talentos), basta uma
// entrada nova aqui: a validação, a listagem e a tela de detalhe passam a
// aceitá-lo sem outra alteração.
export const ORIGENS = {
  proposta: {
    label: 'Proposta',
    desc: 'Briefing completo enviado em /proposta.',
    campos: [
      { key: 'cidade', label: 'Onde quer aparecer' },
      { key: 'formato', label: 'Formato de interesse' },
      { key: 'periodo', label: 'Período da campanha' },
      { key: 'objetivo', label: 'Objetivo da campanha', longo: true },
    ],
  },
  qualificador: {
    label: 'Qualificador',
    desc: 'Pré-qualificação da seção “Sua campanha em poucos passos”.',
    campos: [
      { key: 'intencao', label: 'Momento' },
      { key: 'objetivo', label: 'Objetivo' },
      { key: 'praca', label: 'Praça' },
      { key: 'periodo', label: 'Período' },
      { key: 'segmento', label: 'Segmento' },
    ],
  },
}

export const STATUS_LEAD = [
  { id: 'novo', label: 'Novo' },
  { id: 'contatado', label: 'Contatado' },
  { id: 'descartado', label: 'Descartado' },
]

export function isOrigem(valor) {
  return Object.hasOwn(ORIGENS, valor)
}

export function isStatusLead(valor) {
  return STATUS_LEAD.some((s) => s.id === valor)
}

export function rotuloOrigem(origem) {
  return ORIGENS[origem]?.label || origem
}

export function rotuloStatus(status) {
  return STATUS_LEAD.find((s) => s.id === status)?.label || status
}

// Os campos da origem preenchidos, prontos para render. Campo vazio some — o
// visitante não respondeu e uma linha "—" só polui a leitura do comercial.
export function camposPreenchidos(lead) {
  const campos = ORIGENS[lead.origem]?.campos || []
  return campos
    .map((campo) => ({ ...campo, valor: lead.dados?.[campo.key] || '' }))
    .filter((campo) => campo.valor)
}
