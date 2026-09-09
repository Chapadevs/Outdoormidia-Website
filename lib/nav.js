// Árvore de navegação do site — fonte única do Header e do Footer.
//
// Os hubs seguem os ramos do fluxo de decisões; as filhas que já existiam
// mantêm a URL antiga (/plataformas, /trabalhe-conosco) para não quebrar links
// indexados.
//
// A área do anunciante é a exceção: mudou de /anunciante para
// /area-do-anunciante, o diagnóstico passou para dentro dela e o Simulador OOH
// virou Sua marca no OOH, trocando de rota junto. As URLs antigas seguem vivas
// como redirect permanente em next.config.mjs.
//
// O rótulo não mora mais aqui: `key` aponta para o namespace `Nav` dos arquivos
// de mensagem, e quem resolve o texto é o Header ou o Footer, no idioma ativo.
// O `href` continua em português nos quatro idiomas, porque os slugs não são
// traduzidos: o prefixo de locale é adicionado pelo Link de @/i18n/navigation.
export const NAV = [
  {
    key: 'sobre',
    href: '/sobre',
    children: [
      { key: 'ambiental', href: '/sobre/ambiental' },
      { key: 'social', href: '/sobre/social' },
      { key: 'governanca', href: '/sobre/governanca' },
      { key: 'trabalheConosco', href: '/trabalhe-conosco' },
    ],
  },
  {
    key: 'solucoes',
    href: '/solucoes',
    children: [
      { key: 'diferenciais', href: '/solucoes/diferenciais' },
      { key: 'regioesCobertura', href: '/solucoes/regioes-cobertura' },
      { key: 'plataformas', href: '/plataformas' },
      { key: 'projetosIconicos', href: '/plataformas/projetos-iconicos' },
    ],
  },
  {
    key: 'areaDoAnunciante',
    href: '/area-do-anunciante',
    children: [
      { key: 'diagnostico', href: '/area-do-anunciante/diagnostico-de-presenca' },
      { key: 'suaMarcaNoOoh', href: '/area-do-anunciante/sua-marca-no-ooh' },
      { key: 'melhoresPraticas', href: '/area-do-anunciante/melhores-praticas' },
      { key: 'programatica', href: '/area-do-anunciante/programatica' },
      { key: 'faq', href: '/area-do-anunciante/faq' },
    ],
  },
  {
    key: 'blog',
    href: '/blog',
    children: [
      { key: 'cases', href: '/cases' },
      { key: 'artigos', href: '/blog/artigos' },
      { key: 'podcast', href: '/blog/podcast' },
    ],
  },
]
