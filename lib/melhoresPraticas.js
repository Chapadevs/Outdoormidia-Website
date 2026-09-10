import { Award, Image as ImageIcon, Music2, Tag } from 'lucide-react'

// Melhores Práticas — as oito decisões que a página ensina, o checklist de
// aprovação de peças por categoria, as cinco perguntas de fechamento e as
// saídas.
//
// Origem: `claude/checklist-melhores-praticas.md` (fechado em 06/09/2026,
// revisado em 08/09 e 09/09). Nenhuma prática foi inventada: todas saíram de
// dor relatada em campo pelos líderes das três frentes comerciais.
//
// A página não cita preço, CPM, faixa de investimento, promessa de alcance nem
// o prazo de 15 meses de Rodovias, que é condição comercial e muda. Prazo de
// veiculação, quem faz a arte, exclusividade do ponto e comprovação são do FAQ:
// nenhuma prática daqui pode repetir resposta que já esteja lá.

export const PRATICAS = [
  {
    titulo: 'Comece pelo objetivo, não pelo ponto',
    corpo: 'Levar gente até a loja, lançar um produto, construir marca na região e divulgar uma data são quatro campanhas diferentes. Elas pedem praças diferentes, formatos diferentes e períodos diferentes. O ponto certo é consequência do objetivo, nunca o contrário.',
    pratica: 'antes de escolher onde, escreva em uma frase o que a campanha precisa resolver.',
  },
  {
    titulo: 'Escolha a praça pelo trajeto do seu público',
    corpo: 'Estar na cidade e estar na rotina são coisas diferentes. Quem sai de casa às sete e volta às sete passa por corredores previsíveis, e é neles que a marca precisa aparecer. Distribuir faces por toda a cidade sem olhar trajeto custa mais e é lembrado menos.',
    pratica: 'liste os três trajetos que o seu cliente faz em um dia comum. A praça sai daí.',
  },
  {
    // A listagem do que cada família de formato resolve fica só na tabela do
    // bloco seguinte: no corpo da prática ela reaparecia três parágrafos antes.
    // A prática compara formatos sem colocar nenhum como inferior.
    titulo: 'Formato não é tamanho, é função',
    corpo: 'Cada formato resolve um problema diferente. Não existe formato melhor, existe formato certo para o que a campanha precisa fazer, e é por isso que a conversa começa no objetivo e não no catálogo.',
    pratica: 'use a tabela logo abaixo para cruzar objetivo e formato antes da primeira conversa.',
  },
  {
    // O ciclo de contratação não vira bloco próprio: o FAQ já responde
    // bi-semana em duas perguntas, e esta página declara que prazo de
    // veiculação é do FAQ. O conceito vive na linha de aplicação, com o link.
    titulo: 'Repetição é o que constrói lembrança',
    corpo: 'Mídia exterior não funciona por interrupção, funciona por acúmulo. A mesma pessoa passa pelo mesmo ponto várias vezes por semana, e é essa soma que vira memória de marca. Com a mesma verba, um período mais longo em menos pontos costuma render mais do que muitas faces em pouco tempo.',
    pratica:
      'antes de aumentar o número de faces, verifique se o período está certo. A unidade de contratação da mídia exterior é a bi-semana, e o FAQ explica os ciclos de cada ativo.',
    praticaLink: {
      href: '/area-do-anunciante/faq',
      trecho: 'o FAQ explica os ciclos de cada ativo',
    },
  },
  {
    titulo: 'A arte precisa ser lida em segundos',
    corpo: 'Quem está no trânsito tem poucos segundos e nenhuma intenção de ler. Uma peça de mídia exterior funciona com uma ideia, uma marca visível e um único elemento de contato. Texto pensado para anúncio de revista, aplicado em painel, não é lido, é ignorado.',
    pratica:
      'imprima a arte em uma folha A4, prenda na parede e olhe de três metros. Se em dois segundos você não souber de quem é a marca e o que está sendo dito, a peça ainda não está pronta.',
    // As duas primeiras são regra oficial da casa, já publicada na resposta de
    // especificações de arquivo do FAQ; aqui entram como critério de criação,
    // sem repetir a especificação técnica. A terceira vem do mnemônico oficial
    // de formatos: Top é vertical, Poster é horizontal.
    recomendacoes: {
      titulo: 'Três recomendações que a nossa equipe faz em toda campanha',
      texto:
        'Alto contraste entre o fundo e a tipografia. Fontes finas e serifadas somem à distância, e fundo branco ou preto não é recomendado. Formatos verticais e horizontais pedem composições diferentes, e a arte precisa ser pensada para o formato desde o começo, nunca adaptada depois.',
    },
  },
  {
    // A linha de aplicação não manda perguntar se o ponto opera em Face Única:
    // dentro do site da própria Outdoormídia isso sugere que alguns não
    // operam, e o FAQ apresenta o Face Única como padrão de toda face. A
    // pergunta vale ao comparar com quem não trabalha assim.
    titulo: 'O lugar onde a marca aparece também comunica',
    corpo: 'O entorno entra na leitura da peça. Um painel dividido com outras marcas divide também a atenção. É para isso que existe o Face Única: a face inteira, sem concorrência visual no mesmo campo de visão. Para quem vende posicionamento antes de preço, o ativo escolhido faz parte da mensagem.',
    pratica:
      'na hora de comparar propostas de veículos diferentes, verifique se a face é dedicada a uma marca só. Na nossa operação, é.',
  },
  {
    // Ensina a pergunta em vez de garantir a resposta: não há leitura de fluxo
    // e perfil por ponto validada na base. Se a Alexandra confirmar que existe,
    // a redação volta para a forma afirmativa (ponto de validação 04).
    titulo: 'Pergunte quais dados você recebe, antes e depois',
    corpo: 'Mídia exterior deixou de ser o canal sem número, mas o que cada veículo entrega varia. Antes de fechar, pergunte quais informações você recebe sobre o ponto e sobre quem circula por ali. Depois da veiculação, pergunte como a exibição é comprovada. Se você precisa defender o plano internamente, faça as duas perguntas já na primeira conversa.',
    pratica: 'leve para a reunião interna a leitura do ponto, não apenas a foto dele.',
  },
  {
    // Não cita o prazo de 15 meses de Rodovias: prazo é condição comercial e
    // muda. A prática ensina o princípio e joga o número para a conversa.
    titulo: 'Antecedência muda o que está disponível',
    corpo: 'Os pontos de maior circulação são também os mais disputados, e datas comerciais concentram procura sobre os mesmos ativos. Alguns produtos têm prazo próprio: painéis construídos sob demanda em rodovia trabalham com ciclo de contratação longo e não se resolvem em semanas. Quanto mais cedo a conversa começa, maior o número de opções em cima da mesa.',
    pratica: 'leve o calendário da campanha para a primeira conversa, não só o orçamento.',
  },
]

// O que o time de marketing confere em toda peça antes de aprovar a arte para
// veiculação, seja mockup de "Sua marca no OOH" ou material final de
// campanha, agrupado pelas quatro frentes que a peça precisa acertar.
export const CHECKLIST_CATEGORIAS = [
  {
    titulo: 'Produtos',
    Icone: Tag,
    itens: [
      'Usar nome oficial de cada produto',
      'Nunca usar abreviações ou apelidos como "Cascata" ou "Square"',
      'Na dúvida, consulte o time de Marketing da Outdoormídia',
    ],
    fechamento:
      'O nome de cada produto faz parte da construção de marca e deve ser tratado com rigor e consistência.',
  },
  {
    titulo: 'Imagens',
    Icone: ImageIcon,
    itens: [
      'Utilizar somente imagens reais dos painéis da Outdoormídia',
      'O painel deve estar 100% limpo e visível, sem sobreposição de textos, ícones ou elementos gráficos',
      'Não usar imagens que tenham ruídos visuais na tela',
      'Evitar filtros, distorções ou tratamentos de IA que alterem cor, estrutura ou proporção do produto',
      'Se houver fios elétricos ou de luz visivelmente à frente do painel, é obrigatório removê-los durante o tratamento da imagem, mantendo o realismo e a valorização do ponto',
    ],
    fechamento: 'Cada imagem publicada deve fortalecer nossa identidade: transparente, profissional e visualmente impactante.',
  },
  {
    titulo: 'Cases e referências',
    Icone: Award,
    intro:
      'A força de cada produto da Outdoormídia é amplificada quando associada a marcas de grande visibilidade e relevância. Por isso:',
    itens: [
      'Priorize sempre campanhas de grandes marcas que anunciam conosco, elas reforçam autoridade, resultado e confiança no produto',
      'Não utilize campanhas institucionais da Outdoormídia como case principal, nem como material de divulgação de produtos',
    ],
    fechamento: 'Quem valida nosso portfólio é o mercado. E grandes marcas são nossas melhores vitrines.',
  },
  {
    titulo: 'Trilha sonora',
    Icone: Music2,
    intro:
      'A trilha utilizada em vídeos e reels deve ser pensada com o mesmo cuidado estético e estratégico das imagens e textos. O som não deve competir com a mensagem, ele deve reforçá-la com leveza e neutralidade.',
    itens: [
      'Dê preferência a músicas neutras e instrumentais, sem letras cantadas ou ritmo que cause distração',
      'Utilize apenas trilhas com direitos autorais liberados (bancos de áudio confiáveis, royalty-free ou trilhas licenciadas)',
      'Evite músicas populares, com vocais ou efeitos dramáticos exagerados',
    ],
    fechamento: 'Som também é posicionamento. E na Outdoormídia, ele deve reforçar clareza, sofisticação e propósito.',
  },
]

// O roteiro da própria negociação, que é o que o hero da Área do anunciante
// promete. As perguntas 02, 04 e 05 saíram de dúvida recorrente relatada em
// campo pelas frentes de Rodovias e Digital Signage.
export const PERGUNTAS_ANTES_DE_FECHAR = [
  {
    pergunta: 'A face é dedicada só à minha marca?',
    porque:
      'Define se a sua marca divide ou não a atenção naquele campo de visão. Na Outdoormídia, o Face Única garante que sim',
  },
  {
    pergunta: 'O ponto tem iluminação?',
    porque: 'A iluminação segue a viabilidade de cada ponto e muda a performance no período noturno',
  },
  {
    pergunta: 'Qual é o ciclo de contratação deste ativo?',
    porque: 'Bi-semana, mês e ciclos mais longos mudam o cálculo de investimento',
  },
  {
    pergunta: 'A instalação está inclusa?',
    porque: 'Nos produtos de painel exclusivo, está. Perguntar evita a maior dúvida da frente',
  },
  {
    pergunta: 'O que está incluso no valor da campanha?',
    porque:
      'Separa o que já está pago do que aparece como linha extra, antes de a proposta chegar',
  },
]

export const SAIDAS = [
  {
    titulo: 'Diagnóstico de presença',
    texto: 'Dez perguntas e uma leitura da presença da sua marca hoje.',
    href: '/area-do-anunciante/diagnostico-de-presenca',
  },
  {
    titulo: 'Sua marca no OOH',
    texto: 'Veja a sua marca aplicada em um painel real da nossa rede.',
    href: '/area-do-anunciante/sua-marca-no-ooh',
  },
  {
    titulo: 'FAQ',
    texto:
      'Preço, prazo, arte e exclusividade do ponto. As perguntas que o comercial mais recebe.',
    href: '/area-do-anunciante/faq',
  },
]

// Versao de cada idioma. O overlay traz so texto; `href` e o componente de
// icone continuam vindo daqui.
import { porLocale } from '@/lib/i18n/overlay'
import * as mpEn from '@/lib/i18n/content/melhoresPraticas.en'
import * as mpEs from '@/lib/i18n/content/melhoresPraticas.es'
import * as mpZh from '@/lib/i18n/content/melhoresPraticas.zh'

const conteudoPraticas = porLocale(PRATICAS, {
  en: mpEn.PRATICAS,
  es: mpEs.PRATICAS,
  zh: mpZh.PRATICAS,
})
const conteudoChecklist = porLocale(CHECKLIST_CATEGORIAS, {
  en: mpEn.CHECKLIST_CATEGORIAS,
  es: mpEs.CHECKLIST_CATEGORIAS,
  zh: mpZh.CHECKLIST_CATEGORIAS,
})
const conteudoPerguntas = porLocale(PERGUNTAS_ANTES_DE_FECHAR, {
  en: mpEn.PERGUNTAS_ANTES_DE_FECHAR,
  es: mpEs.PERGUNTAS_ANTES_DE_FECHAR,
  zh: mpZh.PERGUNTAS_ANTES_DE_FECHAR,
})
const conteudoSaidas = porLocale(SAIDAS, { en: mpEn.SAIDAS, es: mpEs.SAIDAS, zh: mpZh.SAIDAS })

export function getPraticas(locale) {
  return conteudoPraticas(locale)
}

export function getChecklistCategorias(locale) {
  return conteudoChecklist(locale)
}

export function getPerguntasAntesDeFechar(locale) {
  return conteudoPerguntas(locale)
}

export function getSaidas(locale) {
  return conteudoSaidas(locale)
}
