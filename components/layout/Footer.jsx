import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { PLATFORMS } from '@/lib/platforms'

const COLUNAS = [
  {
    title: 'Plataformas',
    links: [
      ...PLATFORMS.slice(0, 4).map((p) => ({ label: p.name, href: `/plataformas/${p.slug}` })),
      { label: 'Ver todas', href: '/plataformas' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'A Outdoormídia', href: '/#institucional' },
      { label: 'Cases', href: '/cases' },
      { label: 'Blog', href: '/blog' },
      { label: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
    ],
  },
]

const SOCIAIS = [
  { label: 'Instagram', href: 'https://www.instagram.com/outdoormidia/' },
  { label: 'LinkedIn', href: 'https://br.linkedin.com/company/outdoormidia' },
]

export default function Footer() {
  return (
    <footer className="bg-paper pb-[38px] pt-[70px] text-ink-soft max-mob:pb-8 max-mob:pt-14">
      <div className="wrap">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 max-tab:grid-cols-2 max-tab:gap-x-10 max-tab:gap-y-8 max-mob:gap-x-6 max-mob:gap-y-[30px] max-xs:grid-cols-1">
          <div className="max-tab:col-span-full max-xs:col-span-1">
            <Logo className="bg-ink" />
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
                <Link
                  key={l.label}
                  href={l.href}
                  className="mb-[11px] block text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <div>
            <h4 className="m-0 mb-[18px] text-xs font-bold uppercase tracking-[0.14em] text-ink">
              Contato
            </h4>
            <a
              href="tel:+554132076400"
              className="mb-[11px] block text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
            >
              +55 41 3207.6400
            </a>
            <a
              href="mailto:contato@outdoormidia.com.br"
              className="mb-[11px] block text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
            >
              contato@outdoormidia.com.br
            </a>
            {SOCIAIS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="mb-[11px] block text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
              >
                {s.label}
              </a>
            ))}
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
