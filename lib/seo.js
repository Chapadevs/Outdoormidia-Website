// Inventário das rotas estáticas públicas — fonte única do sitemap.xml
// (app/sitemap.js) e do llms.txt (app/llms.txt/route.js).
//
// As rotas dinâmicas (plataformas, projetos icônicos, diferenciais e posts do
// blog) não entram aqui: o sitemap as monta a partir de lib/platforms.js,
// lib/iconicos.js, lib/diferenciais.js e do Firestore.
//
// `noindex: true` acompanha a página que exporta `robots: { index: false }`.
// Página fora do índice também fica fora do sitemap — mandar as duas coisas ao
// mesmo tempo é sinal contraditório para o Google. Ao liberar a página, apagar
// a flag aqui e o `robots` de lá na mesma alteração.
//
// `resumo` é a mesma frase da meta description da página. É o texto que o
// llms.txt entrega aos motores generativos, então precisa dizer o que a página
// resolve — não repetir o título.

export const PAGINAS = [
  {
    path: '/',
    titulo: 'Home',
    resumo:
      'Out of Home no Sul do Brasil desde 1959: plataformas, cobertura em PR e SC, cases e proposta.',
    priority: 1.0,
    changeFrequency: 'weekly',
    destaque: true,
  },
  {
    path: '/sobre',
    titulo: 'Sobre nós',
    resumo:
      'A Outdoormídia coloca marcas nas ruas do Paraná e de Santa Catarina desde 1959: 67 anos de operação própria em mídia exterior, do outdoor impresso ao painel de LED.',
    priority: 0.7,
    changeFrequency: 'monthly',
    destaque: true,
  },
  {
    path: '/sobre/ambiental',
    titulo: 'Ambiental',
    resumo:
      'Gestão de resíduos de lona, iluminação LED, origem da energia dos painéis e contrapartida em mobiliário urbano.',
    priority: 0.4,
    changeFrequency: 'yearly',
    noindex: true,
  },
  {
    path: '/sobre/social',
    titulo: 'Social',
    resumo:
      'Campanhas de utilidade pública, instituições apoiadas e patrocínio a cultura e esporte.',
    priority: 0.4,
    changeFrequency: 'yearly',
    noindex: true,
  },
  {
    path: '/sobre/governanca',
    titulo: 'Governança',
    resumo:
      'Licenças dos pontos, exclusividade em contrato, tratamento de dados de audiência e documentos para cadastro de fornecedor.',
    priority: 0.4,
    changeFrequency: 'yearly',
    noindex: true,
  },
  {
    path: '/trabalhe-conosco',
    titulo: 'Trabalhe conosco',
    resumo:
      'Banco de talentos da Outdoormídia: cadastre-se e seja avisado quando abrir uma vaga na sua área.',
    priority: 0.5,
    changeFrequency: 'monthly',
  },
  {
    path: '/solucoes',
    titulo: 'Soluções',
    resumo:
      'Tudo o que a Outdoormídia coloca na rua: os diferenciais que sustentam a operação, as praças de PR e SC, as 7 plataformas de mídia exterior e os projetos icônicos.',
    priority: 0.9,
    changeFrequency: 'monthly',
    destaque: true,
  },
  {
    path: '/solucoes/diferenciais',
    titulo: 'Diferenciais',
    resumo:
      'Face única, audiência mensurada, câmeras ao vivo 24×7 e circuitos MUB segmentados: o que separa uma campanha que a cidade vê de uma que passa despercebida.',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/solucoes/regioes',
    titulo: 'Regiões e cobertura',
    resumo:
      'Onde a Outdoormídia coloca sua marca: Curitiba e região metropolitana, litoral do Paraná, rodovias de PR e SC, Joinville, Itajaí e Balneário Camboriú.',
    priority: 0.8,
    changeFrequency: 'monthly',
    destaque: true,
  },
  {
    path: '/plataformas',
    titulo: 'Plataformas',
    resumo:
      'As plataformas de mídia exterior da Outdoormídia: do outdoor digital ao MUB, mais os Projetos Icônicos, cobrindo Paraná e Santa Catarina.',
    priority: 0.9,
    changeFrequency: 'monthly',
    destaque: true,
  },
  {
    path: '/plataformas/projetos-iconicos',
    titulo: 'Projetos Icônicos',
    resumo:
      'Elegancy, Green e Regenerativo: estruturas de assinatura desenhadas ponto a ponto, fora do catálogo de plataformas.',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/anunciante',
    titulo: 'Área do anunciante',
    resumo:
      'Diagnóstico de presença, mídia kit para download, simulador de campanha e FAQ: as ferramentas para resolver sozinho antes de falar com o comercial.',
    priority: 0.8,
    changeFrequency: 'monthly',
    destaque: true,
  },
  {
    path: '/anunciante/simulador',
    titulo: 'Simulador OOH',
    resumo:
      'Escolha praça, plataforma e período e veja quantos impactos a sua campanha de mídia exterior pode gerar no Paraná e em Santa Catarina.',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/anunciante/midia-kit',
    titulo: 'Mídia Kit e materiais de apoio',
    resumo:
      'Kit comercial, especificações técnicas por plataforma, tabela de praças e assets de marca para download.',
    priority: 0.6,
    changeFrequency: 'monthly',
  },
  {
    path: '/anunciante/faq',
    titulo: 'FAQ',
    resumo:
      'Dúvidas sobre anunciar em mídia exterior no Paraná e em Santa Catarina: praças, formatos, medição de resultados, exclusividade do ponto e como pedir uma proposta.',
    priority: 0.7,
    changeFrequency: 'monthly',
    destaque: true,
  },
  {
    path: '/diagnostico',
    titulo: 'Diagnóstico de Presença de Marca',
    resumo:
      'Responda 7 perguntas e descubra em menos de um minuto se a sua marca é invisível, conhecida ou presente no mercado.',
    priority: 0.6,
    changeFrequency: 'monthly',
  },
  {
    path: '/proposta',
    titulo: 'Solicitar proposta',
    resumo:
      'Briefing de campanha: praça, formato, período e verba. A proposta de mídia exterior volta em até 1 dia útil.',
    priority: 0.9,
    changeFrequency: 'monthly',
    destaque: true,
  },
  {
    path: '/cases',
    titulo: 'Cases',
    resumo:
      'Campanhas reais em outdoor, LED, MUB, aeroporto e projetos icônicos no Paraná e em Santa Catarina.',
    priority: 0.8,
    changeFrequency: 'weekly',
    destaque: true,
  },
  {
    path: '/blog',
    titulo: 'Blog',
    resumo:
      'Conteúdo Out of Home da Outdoormídia: cases de campanhas reais e artigos sobre mídia exterior, audiência e formatos.',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  {
    path: '/blog/artigos',
    titulo: 'Artigos',
    resumo:
      'Artigos sobre mídia Out of Home no Sul do Brasil: outdoor, painéis de LED, MUB, aeroporto e estratégias para sua marca ocupar as ruas.',
    priority: 0.7,
    changeFrequency: 'weekly',
  },
  {
    path: '/blog/podcast',
    titulo: 'Podcast Rua Principal',
    resumo: 'Conversas sobre marcas, cidades e mídia Out of Home no Paraná e em Santa Catarina.',
    priority: 0.4,
    changeFrequency: 'monthly',
    noindex: true,
  },
  {
    path: '/privacidade',
    titulo: 'Política de Privacidade',
    resumo:
      'Como a Outdoormídia coleta, usa e protege os dados de quem entra em contato pelo site: finalidades, bases legais da LGPD, prazos de guarda e como exercer os seus direitos.',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  {
    path: '/termos',
    titulo: 'Termos de Uso',
    resumo:
      'As regras de uso do site da Outdoormídia: propriedade do conteúdo, materiais para download, caráter estimativo do simulador e do diagnóstico, e limites de responsabilidade.',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
]

export const PAGINAS_INDEXAVEIS = PAGINAS.filter((p) => !p.noindex)

export const PAGINAS_DESTAQUE = PAGINAS.filter((p) => p.destaque && !p.noindex)
