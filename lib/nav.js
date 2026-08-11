// Árvore de navegação do site — fonte única do Header e do Footer.
//
// Os hubs seguem os ramos do fluxo de decisões; as filhas que já existiam
// mantêm a URL antiga (/plataformas, /diagnostico, /trabalhe-conosco) para não
// quebrar links indexados.
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
      { label: 'Regiões / Cobertura', href: '/solucoes/regioes' },
      { label: 'Plataformas', href: '/plataformas' },
    ],
  },
  {
    label: 'Área do anunciante',
    href: '/anunciante',
    children: [
      { label: 'Diagnóstico de presença', href: '/diagnostico' },
      { label: 'Mídia Kit', href: '/anunciante/midia-kit' },
      { label: 'Simulador OOH', href: '/anunciante/simulador' },
      { label: 'FAQ', href: '/anunciante/faq' },
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
