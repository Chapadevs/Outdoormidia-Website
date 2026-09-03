// Diagnóstico de presença de marca — dados da página
// /area-do-anunciante/diagnostico-de-presenca.
//
// Texto verbatim de claude/copy-diagnostico-presenca.md. A copy é aprovada pelo
// cliente: ao mexer aqui, alterar lá primeiro. Não reescrever, não resumir.
//
// São 10 perguntas de 0 a 10 e a nota é a soma crua, sem normalização: 10 × 10
// fecha exatamente os 100 pontos das faixas.

import { Eye, EyeOff, Heart, Trophy, Users } from 'lucide-react'

export const GRUPOS = [
  { titulo: 'Lembrança' },
  { titulo: 'Percepção' },
  { titulo: 'Presença física' },
  { titulo: 'Frequência' },
  { titulo: 'Disputa e memória' },
]

// `fragil` é a leitura que entra no bloco de resultado quando a pergunta é a de
// menor nota. `link` só existe nas que apontam para uma página interna; nas
// outras o CTA fecha no botão de WhatsApp, que é o mesmo nas dez.
export const PERGUNTAS = [
  {
    pergunta: 'Quando alguém pensa no seu segmento, a sua marca é lembrada?',
    ajuda: 'Antes de comparar preço, o cliente compara nomes que ele já conhece.',
    minimo: 'Nunca lembram',
    maximo: 'Lembram primeiro',
    grupo: 0,
    fragil: {
      diagnostico:
        'Lembrança espontânea é o ativo mais caro de construir e o mais barato de manter. Ela começa pela exposição repetida no lugar certo.',
      cta: 'Podemos montar um plano de presença contínua para o seu segmento na sua praça.',
    },
  },
  {
    pergunta: 'A sua marca é conhecida além da sua base de clientes?',
    ajuda: 'Fora de quem já comprou, quantas pessoas sabem que a sua empresa existe?',
    minimo: 'Só quem já comprou',
    maximo: 'Muito além da base',
    grupo: 0,
    fragil: {
      diagnostico:
        'A sua marca está circulando dentro da própria base. Crescimento exige ser visto por quem ainda não comprou nada de você.',
      cta: 'Veja onde a sua marca alcançaria gente nova.',
      link: { label: 'Regiões e cobertura', href: '/solucoes/regioes' },
    },
  },
  {
    pergunta: 'A sua marca parece do tamanho que ela realmente é?',
    ajuda: 'Empresa sólida que aparece pouco passa impressão de empresa pequena.',
    minimo: 'Parece menor',
    maximo: 'Parece do tamanho',
    grupo: 1,
    fragil: {
      diagnostico:
        'Percepção de tamanho se constrói por onde a marca aparece. Empresa que ocupa espaço grande na cidade é lida como empresa grande.',
      cta: 'Conheça os formatos que mudam a percepção de porte de uma marca.',
      link: { label: 'Projetos Icônicos', href: '/plataformas/projetos-iconicos' },
    },
  },
  {
    pergunta: 'O seu time comercial precisa explicar quem é a empresa antes de vender?',
    ajuda:
      'Quando a marca já chegou antes, a conversa começa na proposta e não na apresentação.',
    minimo: 'Sempre precisa explicar',
    maximo: 'Já chegam sabendo',
    grupo: 1,
    fragil: {
      diagnostico:
        'Se o comercial precisa apresentar a empresa em toda reunião, a marca não está chegando antes do vendedor. Presença encurta essa conversa.',
      cta: 'Fale com a nossa equipe sobre como preparar o terreno antes da visita comercial.',
    },
  },
  {
    pergunta: 'A sua marca está nos lugares onde o seu público circula?',
    ajuda: 'Avenidas, rodovias, shoppings, aeroporto. Onde a rotina dele acontece de verdade.',
    minimo: 'Não está',
    maximo: 'Está no caminho dele',
    grupo: 2,
    fragil: {
      diagnostico:
        'Estar onde o público circula é a diferença entre ser procurado e ser encontrado. Território é decisão de mídia, não de sorte.',
      cta: 'Veja as plataformas disponíveis e onde cada uma alcança.',
      link: { label: 'Plataformas', href: '/plataformas' },
    },
  },
  {
    pergunta: 'A sua marca é conhecida em toda a região onde você atende?',
    ajuda: 'Muita empresa é forte no bairro da sede e desconhecida a quinze minutos dali.',
    minimo: 'Só onde fica a sede',
    maximo: 'Em toda a região',
    grupo: 2,
    fragil: {
      diagnostico:
        'Ser forte só no entorno da sede limita o negócio ao raio de quem já passa na porta. Região inteira exige presença distribuída.',
      cta: 'Veja a cobertura completa no Paraná e em Santa Catarina.',
      link: { label: 'Regiões e cobertura', href: '/solucoes/regioes' },
    },
  },
  {
    pergunta: 'A sua marca aparece o ano inteiro?',
    ajuda: 'Ou aparece em campanha pontual e some no resto do calendário.',
    minimo: 'Só em campanha',
    maximo: 'O ano inteiro',
    grupo: 3,
    fragil: {
      diagnostico:
        'Campanha pontual constrói pico, não memória. O ano inteiro custa menos por mês e entrega mais no acumulado.',
      cta: 'Entenda como montar um calendário anual de presença.',
      link: { label: 'Soluções', href: '/solucoes' },
    },
  },
  {
    pergunta: 'Quem nunca ouviu falar de você esbarraria na sua marca esta semana?',
    ajuda:
      'Não em uma busca, porque quem busca já conhece. No trajeto de carro, na fila do shopping, na estrada. Descoberta acontece sem intenção.',
    minimo: 'Passaria longe',
    maximo: 'Veria várias vezes',
    grupo: 3,
    fragil: {
      diagnostico:
        'Se ninguém te descobre sem procurar, todo cliente novo custa esforço ativo. Exposição transforma acaso em canal.',
      cta: 'Veja onde a sua marca entraria no trajeto diário do seu público.',
      link: { label: 'Plataformas', href: '/plataformas' },
    },
  },
  {
    pergunta: 'A sua marca tem tanta visibilidade quanto os seus principais concorrentes?',
    ajuda: 'Na mesma praça, quem aparece mais: você ou eles?',
    minimo: 'Eles aparecem mais',
    maximo: 'Apareço mais',
    grupo: 4,
    fragil: {
      diagnostico:
        'Aparecer menos que o concorrente na mesma praça é ceder espaço na memória do cliente. Esse espaço não fica vago, ele é ocupado.',
      cta: 'Com Face Única, cada ponto é de um único anunciante. Fale com a nossa equipe sobre exclusividade na sua praça.',
    },
  },
  {
    pergunta: 'Se parasse de anunciar hoje, a sua marca continuaria lembrada nos próximos meses?',
    ajuda: 'Exposição some quando para. Memória fica.',
    minimo: 'Sumiria rápido',
    maximo: 'Continuaria lembrada',
    grupo: 4,
    fragil: {
      diagnostico:
        'Se a marca some quando a campanha para, o que existe é exposição, não memória. Memória se constrói com constância.',
      cta: 'Podemos desenhar um plano de constância dentro do que a sua empresa investe hoje.',
    },
  },
]

export const NOTA_MAXIMA = PERGUNTAS.length * 10

// A Escada da Presença. `Icone` acompanha a progressão da escada (do que
// ninguém vê ao que virou referência). `linha` é a frase curta dos cards, usada nos dois
// estados do componente (bloco educativo neutro e resultado com o degrau
// aceso). `fraseDura` e `paragrafos` só aparecem no resultado.
export const DEGRAUS = [
  {
    n: 1,
    key: 'existencia',
    max: 20,
    range: '0 a 20',
    nome: 'Existência',
    Icone: EyeOff,
    linha: 'A empresa existe, e o mercado ainda não a enxerga.',
    fraseDura: 'Sua marca existe, e o mercado ainda não a enxerga.',
    paragrafos: [
      'A empresa funciona, entrega bem e quase ninguém sabe disso. A venda depende de indicação, de preço e de sorte. Quando essas três falham no mesmo mês, não sobra nada segurando o faturamento.',
      'O que trava aqui não é qualidade, é exposição. Nenhuma empresa vende para quem não sabe que ela existe, e o concorrente que aparece leva o cliente que seria seu, mesmo entregando menos.',
      'O degrau seguinte é a Descoberta, e ele começa no dia em que a sua marca passa a ser vista por gente que nunca ouviu falar de você. Isso não acontece por acaso: acontece onde essas pessoas circulam.',
    ],
    card: 'border-line bg-bone text-ink',
    icone: 'bg-orange/10 text-orange',
    soft: 'text-ink-soft',
    btn: 'btn btn-ghost',
    divisor: 'border-line',
  },
  {
    n: 2,
    key: 'descoberta',
    max: 40,
    range: '21 a 40',
    nome: 'Descoberta',
    Icone: Eye,
    linha: 'As pessoas começam a conhecer, e esquecem rápido.',
    fraseDura: 'Sua marca aparece, e depois some.',
    paragrafos: [
      'As pessoas já começam a conhecer, e esquecem rápido. A marca aparece em um mês forte, desaparece nos outros, e a lembrança construída se perde antes de virar decisão. É o esforço mais frustrante da comunicação: você paga para ser visto e não colhe.',
      'O que trava aqui é intervalo. Memória de marca não se constrói com intensidade, se constrói com repetição. Uma campanha isolada gera pico e vale. O cliente decide no vale.',
      'O degrau seguinte é o Reconhecimento, e ele chega quando a marca deixa de ser novidade e vira familiaridade. Isso exige aparecer nos mesmos lugares, com constância, por tempo suficiente para o mercado parar de te esquecer.',
    ],
    card: 'border-line bg-bone text-ink',
    icone: 'bg-orange/10 text-orange',
    soft: 'text-ink-soft',
    btn: 'btn btn-ghost',
    divisor: 'border-line',
  },
  {
    n: 3,
    key: 'reconhecimento',
    max: 60,
    range: '41 a 60',
    nome: 'Reconhecimento',
    Icone: Users,
    linha: 'Já ouviram falar. Ainda não é a primeira escolha.',
    fraseDura: 'Já ouviram falar. Ainda não é a primeira escolha.',
    paragrafos: [
      'O mercado sabe que você existe e não pensa em você primeiro. É a faixa mais comum, e a mais cara, porque a marca já tem reputação suficiente para ser considerada e ainda disputa preço em toda negociação.',
      'O que trava aqui é a comparação. Quando o cliente lembra de três nomes, o critério vira valor. Quando lembra de um, o critério vira confiança. A diferença entre os dois cenários é quantas vezes cada marca apareceu no caminho dele durante o ano.',
      'O degrau seguinte é a Preferência, e ele nasce da constância combinada com exclusividade de espaço. Com Face Única, cada ponto é de um único anunciante: a sua marca não divide atenção com a concorrência justamente onde a decisão se forma.',
    ],
    card: 'border-line bg-white text-ink',
    icone: 'bg-orange/10 text-orange',
    soft: 'text-ink-soft',
    btn: 'btn btn-ghost',
    divisor: 'border-line',
  },
  {
    n: 4,
    key: 'preferencia',
    max: 80,
    range: '61 a 80',
    nome: 'Preferência',
    Icone: Heart,
    linha: 'Quando surge a necessidade, o seu nome vem antes.',
    fraseDura: 'Quando surge a necessidade, o seu nome vem antes.',
    paragrafos: [
      'O cliente pensa "quando eu precisar disso, vou lembrar dessa empresa". A marca começa a vender sem disputar preço o tempo todo, e a negociação fica mais curta porque a confiança já veio pronta.',
      'O que trava aqui é o próprio sucesso. Marca preferida costuma reduzir investimento em presença acreditando que a memória se sustenta sozinha, e ela não se sustenta: o concorrente que continua aparecendo ocupa o espaço que você deixou.',
      'O degrau seguinte é a Referência, o topo, onde a marca vira sinônimo da categoria. Chega lá quem trata presença como investimento permanente e ocupa a cidade em mais de um formato, não em um só.',
    ],
    card: 'border-orange bg-white text-ink',
    icone: 'bg-orange/10 text-orange',
    soft: 'text-ink-soft',
    btn: 'btn btn-ghost',
    divisor: 'border-line',
  },
  {
    n: 5,
    key: 'referencia',
    max: 100,
    range: '81 a 100',
    nome: 'Referência',
    Icone: Trophy,
    linha: 'A marca virou sinônimo da categoria.',
    fraseDura: 'Sua marca virou sinônimo da categoria.',
    paragrafos: [
      'Quando alguém descreve a necessidade, o seu nome aparece antes da categoria. Esse é o topo da escada, e é o lugar mais difícil de alcançar e o mais fácil de perder.',
      'O que trava aqui é a manutenção. Referência não é título vitalício, é posição defendida mês a mês. Toda categoria tem o caso da marca que era sinônimo e virou lembrança, e em todos eles a queda começou quando a marca parou de aparecer.',
      'Daqui para frente o trabalho muda de natureza: não é mais construir presença, é sustentar território. Isso significa estar nos pontos que o concorrente gostaria de ocupar, antes que ele ocupe.',
    ],
    card: 'border-orange bg-orange text-white',
    icone: 'bg-white/15 text-white',
    soft: 'text-white/[.92]',
    btn: 'btn btn-on-orange',
    divisor: 'border-white/30',
  },
]

export const ESCALA = [
  { faixa: '0–3', rotulo: 'Quase nunca' },
  { faixa: '4–6', rotulo: 'Às vezes' },
  { faixa: '7–10', rotulo: 'Quase sempre' },
]

export function degrauDoScore(score) {
  return DEGRAUS.find((degrau) => score <= degrau.max) ?? DEGRAUS[DEGRAUS.length - 1]
}

export function rotuloDaNota(nota) {
  if (nota === null || nota === undefined) return ''
  if (nota <= 2) return 'Quase nunca'
  if (nota <= 4) return 'Raramente'
  if (nota <= 6) return 'Às vezes'
  if (nota <= 8) return 'Com frequência'
  return 'Quase sempre'
}

// O ponto frágil é a pergunta de menor nota; no empate vale a de número menor,
// porque a ordem das perguntas vai do alicerce para o topo. `indexOf` já
// devolve a primeira ocorrência, que é exatamente esse critério.
export function pontoMaisFragil(notas) {
  if (notas.some((n) => n === null || n === undefined)) return -1
  return notas.indexOf(Math.min(...notas))
}

export function gruposDePerguntas() {
  return GRUPOS.map((grupo, gi) => {
    const itens = PERGUNTAS.map((p, i) => ({ ...p, i })).filter((p) => p.grupo === gi)
    const primeira = String(itens[0].i + 1).padStart(2, '0')
    const ultima = String(itens[itens.length - 1].i + 1).padStart(2, '0')
    return { ...grupo, itens, meta: `Perguntas ${primeira}-${ultima}` }
  })
}
