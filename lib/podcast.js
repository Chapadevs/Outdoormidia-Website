// Episódios do podcast da Outdoormídia.
//
// TODO(cliente): conteúdo de exemplo — nenhum episódio foi gravado ainda.
// Episódio com `audio` vazio aparece como "Em breve"; para publicar, é só
// preencher o link do player (Spotify, YouTube ou arquivo em /public/podcast/)
// — nada muda no componente.
export const PODCAST = {
  title: 'Rua Principal',
  tagline: 'O podcast da Outdoormídia sobre marcas, cidades e mídia exterior.',
  text: 'Conversas com quem decide onde uma marca aparece: anunciantes, agências e o time que planeja as ruas do Paraná e de Santa Catarina.',
}

export const EPISODIOS = [
  {
    slug: 'por-que-o-outdoor-voltou',
    num: '01',
    title: 'Por que o outdoor voltou para o plano de mídia',
    text: 'O que mudou na atenção do público e por que a rua virou o meio mais difícil de ignorar.',
    guest: 'Time comercial Outdoormídia',
    duration: '32 min',
    date: 'Em breve',
    audio: '',
  },
  {
    slug: 'led-x-lona',
    num: '02',
    title: 'LED ou lona: como escolher o formato certo',
    text: 'Produção, prazo, flexibilidade e custo por impacto: as trocas reais entre digital e impresso.',
    guest: 'Operações e planejamento',
    duration: '28 min',
    date: 'Em breve',
    audio: '',
  },
  {
    slug: 'medir-ooh',
    num: '03',
    title: 'Dá para medir Out of Home? Dá.',
    text: 'CPM, frequência e perfil de audiência: o que a tecnologia entrega hoje em cada campanha.',
    guest: 'Inteligência de dados',
    duration: '35 min',
    date: 'Em breve',
    audio: '',
  },
]
