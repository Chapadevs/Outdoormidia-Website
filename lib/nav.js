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
export const NAV = [
  {
    label: 'Sobre nós',
    href: '/sobre',
    children: [
      { label: 'Ambiental', href: '/sobre/ambiental' },
      { label: 'Social', href: '/sobre/social' },
      { label: 'Governança', href: '/sobre/governanca' },
      { label: 'Trabalhe conosco', href: '/trabalhe-conosco' },
    ],
  },
  {
    label: 'Soluções',
    href: '/solucoes',
    children: [
      { label: 'Diferenciais', href: '/solucoes/diferenciais' },
      { label: 'Regiões / Cobertura', href: '/solucoes/regioes-cobertura' },
      { label: 'Plataformas', href: '/plataformas' },
      { label: 'Projetos Icônicos', href: '/plataformas/projetos-iconicos' },
    ],
  },
  {
    label: 'Área do anunciante',
    href: '/area-do-anunciante',
    children: [
      {
        label: 'Diagnóstico de presença',
        href: '/area-do-anunciante/diagnostico-de-presenca',
      },
      { label: 'Sua marca no OOH', href: '/area-do-anunciante/sua-marca-no-ooh' },
      { label: 'FAQ', href: '/area-do-anunciante/faq' },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
    children: [
      { label: 'Cases', href: '/cases' },
      { label: 'Artigos', href: '/blog/artigos' },
      { label: 'Podcast', href: '/blog/podcast' },
    ],
  },
]
