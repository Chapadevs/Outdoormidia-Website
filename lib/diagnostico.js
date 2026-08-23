export const GRUPOS = [
  { titulo: 'Lembrança' },
  { titulo: 'Presença e alcance' },
  { titulo: 'Autoridade e consistência' },
]

export const PERGUNTAS = [
  {
    pergunta: 'Sua empresa é facilmente lembrada?',
    ajuda: 'Quando alguém pensa no seu segmento, seu nome aparece primeiro?',
    minimo: 'Ninguém lembra',
    maximo: 'Lembram sempre',
    grupo: 0,
  },
  {
    pergunta: 'Você é lembrado antes do concorrente?',
    ajuda: 'Na hora de decidir, seu nome vem antes ou depois dos outros.',
    minimo: 'Sempre depois',
    maximo: 'Sempre antes',
    grupo: 0,
  },
  {
    pergunta: 'As pessoas encontram sua marca rapidamente?',
    ajuda: 'Site, mapa, redes, ponto físico: quanto atrito existe até chegar em você.',
    minimo: 'Com dificuldade',
    maximo: 'Na hora',
    grupo: 1,
  },
  {
    pergunta: 'Sua marca aparece com frequência?',
    ajuda: 'Frequência é o que transforma quem viu uma vez em quem lembra.',
    minimo: 'Quase nunca',
    maximo: 'O ano inteiro',
    grupo: 1,
  },
  {
    pergunta: 'Você acredita que sua empresa transmite autoridade?',
    ajuda: 'Onde e como você aparece diz o tamanho que o mercado te atribui.',
    minimo: 'Nada',
    maximo: 'Muito',
    grupo: 2,
  },
  {
    pergunta: 'Sua comunicação é consistente?',
    ajuda: 'Mesma identidade, mesma mensagem, em todos os pontos de contato.',
    minimo: 'Cada hora uma',
    maximo: 'Sempre a mesma',
    grupo: 2,
  },
  {
    pergunta: 'Você investe continuamente em posicionamento?',
    ajuda: 'Investimento contínuo ou só em campanha pontual e sazonal.',
    minimo: 'Só em campanha',
    maximo: 'Continuamente',
    grupo: 2,
  },
]

export const SOMA_MAXIMA = PERGUNTAS.length * 10
export const NOTA_MAXIMA = 100

export function notaFinal(soma) {
  return Math.round((soma / SOMA_MAXIMA) * NOTA_MAXIMA)
}

export const ESCALA = [
  { faixa: '0–3', rotulo: 'Quase nunca' },
  { faixa: '4–6', rotulo: 'Às vezes' },
  { faixa: '7–10', rotulo: 'Quase sempre' },
]

export const FAIXAS = [
  {
    key: 'invisivel',
    max: 40,
    range: '0–40',
    titulo: 'Empresa invisível',
    resumo: 'Sua marca existe, mas o mercado ainda não a enxerga.',
    diagnostico:
      'Quem não é visto não é lembrado. Nessa faixa, a marca só aparece para quem já é cliente, e some da cabeça do consumidor no momento da escolha. Não é um problema de produto, é um problema de presença.',
    recomendacao:
      'O primeiro passo é ocupar as ruas onde seu público circula todos os dias. Frequência e cobertura resolvem invisibilidade mais rápido que qualquer outra mídia: um ponto certo, visto no mesmo trajeto diário, constrói lembrança em semanas.',
    card: 'border-line bg-bone text-ink',
    tick: '[--tick-color:var(--color-ink)]',
    soft: 'text-ink-soft',
  },
  {
    key: 'conhecida',
    max: 70,
    range: '41–70',
    titulo: 'Empresa conhecida',
    resumo: 'Sua marca é reconhecida, mas ainda não é a primeira escolha.',
    diagnostico:
      'O mercado sabe que você existe, só não pensa em você primeiro. É a faixa mais comum, e a mais cara, porque a lembrança construída se perde toda vez que a comunicação para. Consistência é o que separa conhecida de preferida.',
    recomendacao:
      'Aqui vale sustentar presença o ano inteiro e garantir exclusividade: com Face Única, cada ponto é de um único anunciante; sua marca não divide espaço com a concorrência justamente onde a decisão acontece.',
    card: 'border-line bg-white text-ink',
    tick: '',
    soft: 'text-ink-soft',
  },
  {
    key: 'presente',
    max: 100,
    range: '71–100',
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

export function rotuloDaNota(nota) {
  if (nota === null || nota === undefined) return ''
  if (nota <= 2) return 'Quase nunca'
  if (nota <= 4) return 'Raramente'
  if (nota <= 6) return 'Às vezes'
  if (nota <= 8) return 'Com frequência'
  return 'Quase sempre'
}

export function gruposDePerguntas() {
  return GRUPOS.map((grupo, gi) => {
    const itens = PERGUNTAS.map((p, i) => ({ ...p, i })).filter((p) => p.grupo === gi)
    const primeira = String(itens[0].i + 1).padStart(2, '0')
    const ultima = String(itens[itens.length - 1].i + 1).padStart(2, '0')
    return { ...grupo, itens, meta: `Perguntas ${primeira}–${ultima}` }
  })
}
