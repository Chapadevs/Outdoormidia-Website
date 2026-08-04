'use client'
import { useState } from 'react'
import Logo from '@/components/ui/Logo'
import { WHATSAPP_URL } from '@/lib/constants'

const LINKS = [
  { label: 'Plataformas', href: '/plataformas' },
  { label: 'Cases', href: '/cases' },
  { label: 'Cobertura', href: '/#cobertura' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
]

const LANGS = ['PT', 'EN', 'ES', '中文']

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('PT')

  return (
    <header className="sticky top-0 z-[60] border-b border-ink/15 bg-orange/95 backdrop-blur-[10px]">
      <div className="wrap flex h-[74px] items-center gap-[30px] max-mob:h-16 max-mob:gap-4">
        <Logo />
        <nav
          className={`ml-[18px] flex gap-[26px] text-sm font-semibold ${
            menuOpen
              ? 'max-tab:absolute max-tab:inset-x-0 max-tab:top-[74px] max-tab:flex-col max-tab:gap-4 max-tab:border-b max-tab:border-ink/15 max-tab:bg-orange max-tab:px-8 max-tab:pb-[26px] max-tab:pt-[22px] max-tab:shadow-[0_24px_32px_-24px_rgba(22,17,13,.3)] max-mob:top-16'
              : 'max-tab:hidden'
          }`}
        >
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white/85 transition-colors duration-150 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            className="btn btn-on-orange mt-1.5 hidden justify-center max-tab:inline-flex"
            onClick={() => setMenuOpen(false)}
          >
            Falar agora
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-[18px] max-mob:gap-0">
          <div className="flex gap-2.5 text-xs font-bold tracking-[0.04em] max-tab:hidden">
            {LANGS.map((l) => (
              <button
                key={l}
                className={`cursor-pointer transition-colors duration-150 ${
                  l === lang ? 'text-white' : 'text-white/55'
                }`}
                onClick={() => setLang(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <a href={WHATSAPP_URL} className="btn btn-on-orange max-mob:hidden">
            Falar agora
          </a>
          <button
            className="hidden cursor-pointer flex-col gap-[5px] p-2 max-tab:flex"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="h-0.5 w-[22px] bg-white"></span>
            <span className="h-0.5 w-[22px] bg-white"></span>
            <span className="h-0.5 w-[22px] bg-white"></span>
          </button>
        </div>
      </div>
    </header>
  )
}
