// Melhores Práticas — as oito decisões que a página ensina e as saídas.
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
    titulo: 'Repetição é o que constrói lembrança',
    corpo: 'Mídia exterior não funciona por interrupção, funciona por acúmulo. A mesma pessoa passa pelo mesmo ponto várias vezes por semana, e é essa soma que vira memória de marca. Com a mesma verba, um período mais longo em menos pontos costuma render mais do que muitas faces em pouco tempo.',
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
const conteudoSaidas = porLocale(SAIDAS, { en: mpEn.SAIDAS, es: mpEs.SAIDAS, zh: mpZh.SAIDAS })

export function getPraticas(locale) {
  return conteudoPraticas(locale)
}

export function getSaidas(locale) {
  return conteudoSaidas(locale)
}
