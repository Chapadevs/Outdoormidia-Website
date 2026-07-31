export const PERGUNTAS = [
  'Sua empresa é facilmente lembrada?',
  'As pessoas encontram sua marca rapidamente?',
  'Sua marca aparece com frequência?',
  'Você acredita que sua empresa transmite autoridade?',
  'Você é lembrado antes do concorrente?',
  'Sua comunicação é consistente?',
  'Você investe continuamente em posicionamento?',
]

export const NOTA_MAXIMA = PERGUNTAS.length * 10

export const FAIXAS = [
  {
    key: 'invisivel',
    max: 30,
    range: '0–30',
    titulo: 'Empresa invisível',
    resumo: 'Sua marca existe, mas o mercado ainda não a enxerga.',
    diagnostico:
      'Quem não é visto não é lembrado. Nessa faixa, a marca só aparece para quem já é cliente — e some da cabeça do consumidor no momento da escolha. Não é um problema de produto, é um problema de presença.',
    recomendacao:
      'O primeiro passo é ocupar as ruas onde seu público circula todos os dias. Frequência e cobertura resolvem invisibilidade mais rápido que qualquer outra mídia: um ponto certo, visto no mesmo trajeto diário, constrói lembrança em semanas.',
    card: 'border-line bg-bone text-ink',
    tick: '[--tick-color:var(--color-ink)]',
    soft: 'text-ink-soft',
  },
  {
    key: 'conhecida',
    max: 50,
    range: '31–50',
    titulo: 'Empresa conhecida',
    resumo: 'Sua marca é reconhecida, mas ainda não é a primeira escolha.',
    diagnostico:
      'O mercado sabe que você existe, só não pensa em você primeiro. É a faixa mais comum — e a mais cara, porque a lembrança construída se perde toda vez que a comunicação para. Consistência é o que separa conhecida de preferida.',
    recomendacao:
      'Aqui vale sustentar presença o ano inteiro e garantir exclusividade: com Face Única, cada ponto é de um único anunciante — sua marca não divide espaço com a concorrência justamente onde a decisão acontece.',
    card: 'border-line bg-white text-ink',
    tick: '',
    soft: 'text-ink-soft',
  },
  {
    key: 'presente',
    max: 70,
    range: '51–70',
    titulo: 'Empresa presente',
    resumo: 'Sua marca está na rua, na memória e na decisão de compra.',
    diagnostico:
      'Você já construiu presença e lembrança. Nessa faixa o desafio deixa de ser aparecer e passa a ser defender o território: manter a frequência, medir o retorno e ocupar os espaços que a concorrência ainda não alcança.',
    recomendacao:
      'É hora de sofisticar. Dados de audiência via 4yousee/Everywhere (CPM, frequência, gênero, faixa etária e renda), a empena digital do Aeroporto Afonso Pena e os projetos Icônicos colocam a marca num patamar que o concorrente não copia.',
    card: 'border-orange bg-orange text-white',
    tick: '[--tick-color:#fff]',
    soft: 'text-white/[.92]',
  },
]

export function faixaDoScore(score) {
  return FAIXAS.find((faixa) => score <= faixa.max) ?? FAIXAS[FAIXAS.length - 1]
}
