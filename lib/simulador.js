// Parâmetros do simulador de campanha.
//
// TODO(cliente): os números abaixo são uma ordem de grandeza derivada dos dados
// públicos da empresa (380 milhões de impactos/mês, 82 equipamentos digitais,
// 13 milhões/mês só em Curitiba) e servem para o visitante ter uma noção antes
// de falar com o comercial. Substituir por CPM e alcance oficiais por
// plataforma antes de tratar a estimativa como proposta.

export const PERIODOS = [
  { slug: 'bissemana', label: 'Bissemana (14 dias)', semanas: 2 },
  { slug: 'mensal', label: 'Mensal (4 semanas)', semanas: 4 },
  { slug: 'trimestral', label: 'Trimestral (12 semanas)', semanas: 12 },
]

// Impactos estimados por semana, por face contratada. Só o catálogo — os
// projetos icônicos são sob medida e não entram na estimativa automática.
const IMPACTOS_SEMANA = {
  'outdoors-digitais': 420000,
  'front-lights': 260000,
  shoppings: 290000,
  aeroporto: 340000,
  'midia-movel': 200000,
  mub: 380000,
  rodovias: 310000,
}

const IMPACTOS_PADRAO = 250000

// Peso da praça sobre o alcance — Curitiba concentra o maior fluxo.
const PESO_PRACA = {
  curitiba: 1,
  'regiao-metropolitana': 0.65,
  'litoral-pr': 0.5,
  rodovias: 0.8,
  'santa-catarina': 0.7,
}

const PESO_PADRAO = 0.6

// Faixa de CPM (custo por mil impactos) usada para estimar o investimento.
const CPM_MIN = 8
const CPM_MAX = 14

export function estimarCampanha({ plataformaSlug, pracaId, periodoSlug, faces = 1 }) {
  const periodo = PERIODOS.find((p) => p.slug === periodoSlug)
  if (!plataformaSlug || !pracaId || !periodo) return null

  const base = IMPACTOS_SEMANA[plataformaSlug] ?? IMPACTOS_PADRAO
  const peso = PESO_PRACA[pracaId] ?? PESO_PADRAO
  const impactos = Math.round(base * peso * periodo.semanas * faces)

  return {
    impactos,
    semanas: periodo.semanas,
    investimentoMin: Math.round((impactos / 1000) * CPM_MIN),
    investimentoMax: Math.round((impactos / 1000) * CPM_MAX),
  }
}

const NUMERO = new Intl.NumberFormat('pt-BR')

const MOEDA = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

export function formatarImpactos(valor) {
  return NUMERO.format(valor)
}

export function formatarMoeda(valor) {
  return MOEDA.format(valor)
}
