import Logo from '@/components/ui/Logo'

const COLUNAS = [
  {
    title: 'Plataformas',
    links: [
      { label: 'Outdoor Digital', href: '#' },
      { label: 'Front Light', href: '#' },
      { label: 'Rodovias', href: '#' },
      { label: 'Aeroporto', href: '#' },
      { label: 'Malls', href: '#' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'A Outdoormídia', href: '#' },
      { label: 'Responsabilidade Social', href: '#' },
      { label: 'Blog', href: '/blog' },
      { label: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-paper pb-[38px] pt-[70px] text-ink-soft max-mob:pb-8 max-mob:pt-14">
      <div className="wrap">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 max-tab:grid-cols-2 max-tab:gap-x-10 max-tab:gap-y-8 max-mob:gap-x-6 max-mob:gap-y-[30px] max-xs:grid-cols-1">
          <div className="max-tab:col-span-full max-xs:col-span-1">
            <Logo />
            <p className="mt-[18px] max-w-[32ch] text-[14.5px]">
              Out of Home no Sul do Brasil há 66 anos. Sua marca onde as pessoas estão.
            </p>
          </div>
          {COLUNAS.map((col) => (
            <div key={col.title}>
              <h4 className="m-0 mb-[18px] text-xs font-bold uppercase tracking-[0.14em] text-ink">
                {col.title}
              </h4>
              {col.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="mb-[11px] block text-[14.5px] text-ink-soft hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
          <div>
            <h4 className="m-0 mb-[18px] text-xs font-bold uppercase tracking-[0.14em] text-ink">
              Contato
            </h4>
            <p className="mb-[11px] block text-[14.5px]">+55 41 3207.6400</p>
            <a
              href="mailto:contato@outdoormidia.com.br"
              className="mb-[11px] block text-[14.5px] text-ink-soft hover:text-ink"
            >
              contato@outdoormidia.com.br
            </a>
            <a
              href="https://www.instagram.com/outdoormidia/"
              className="mb-[11px] block text-[14.5px] text-ink-soft hover:text-ink"
            >
              Instagram
            </a>
            <a
              href="https://br.linkedin.com/company/outdoormidia"
              className="mb-[11px] block text-[14.5px] text-ink-soft hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="mt-[54px] flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-xs uppercase tracking-[0.06em]">
          <span>© 2026 Outdoormídia</span>
          <span>PT · EN · ES · 中文</span>
        </div>
      </div>
    </footer>
  )
}
