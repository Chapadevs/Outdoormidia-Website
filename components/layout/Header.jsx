'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
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
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let active = true
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (active) setIsAdmin(Boolean(data.isAdmin))
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  return (
    <header className="sticky top-0 z-[60] border-b border-line bg-paper/85 backdrop-blur-[10px]">
      <div className="wrap flex h-[74px] items-center gap-[30px] max-mob:h-16 max-mob:gap-4">
        <Logo />
        <nav
          className={`ml-[18px] flex gap-[26px] text-sm font-semibold ${
            menuOpen
              ? 'max-tab:absolute max-tab:inset-x-0 max-tab:top-[74px] max-tab:flex-col max-tab:gap-4 max-tab:border-b max-tab:border-line max-tab:bg-paper max-tab:px-8 max-tab:pb-[26px] max-tab:pt-[22px] max-tab:shadow-[0_24px_32px_-24px_rgba(22,17,13,.3)] max-mob:top-16'
              : 'max-tab:hidden'
          }`}
        >
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-ink-soft transition-colors duration-150 hover:text-orange"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden text-ink-soft transition-colors duration-150 hover:text-orange max-tab:inline"
              onClick={() => setMenuOpen(false)}
            >
              Painel Admin
            </Link>
          )}
          <a
            href={WHATSAPP_URL}
            className="btn btn-fill mt-1.5 hidden justify-center max-tab:inline-flex"
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
                  l === lang ? 'text-ink' : 'text-line-2'
                }`}
                onClick={() => setLang(l)}
              >
                {l}
              </button>
            ))}
          </div>
          {isAdmin && (
            <Link
              href="/admin"
              title="Painel administrativo"
              className="text-xs font-bold tracking-[0.04em] text-ink-soft transition-colors duration-150 hover:text-orange max-tab:hidden"
            >
              Admin
            </Link>
          )}
          <a href={WHATSAPP_URL} className="btn btn-fill max-mob:hidden">
            Falar agora
          </a>
          <button
            className="hidden cursor-pointer flex-col gap-[5px] p-2 max-tab:flex"
            aria-label="Menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="h-0.5 w-[22px] bg-ink"></span>
            <span className="h-0.5 w-[22px] bg-ink"></span>
            <span className="h-0.5 w-[22px] bg-ink"></span>
          </button>
        </div>
      </div>
    </header>
  )
}
