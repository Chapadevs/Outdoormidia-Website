'use client'
import { useState } from 'react'
import Logo from '@/components/ui/Logo'
import { WHATSAPP_URL } from '@/lib/constants'

const LINKS = [
  { label: 'Formatos', href: '/#formatos' },
  { label: 'Plataformas', href: '/#plataformas' },
  { label: 'Cases', href: '/#cases' },
  { label: 'Cobertura', href: '/#cobertura' },
  { label: 'Blog', href: '#' },
  { label: 'Trabalhe Conosco', href: '#' },
]

const LANGS = ['PT', 'EN', 'ES', '中文']

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('PT')

  return (
    <header>
      <div className="wrap nav">
        <Logo />
        <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            className="btn btn-fill nav-cta-mobile"
            onClick={() => setMenuOpen(false)}
          >
            Falar agora
          </a>
        </nav>
        <div className="nav-right">
          <div className="lang">
            {LANGS.map((l) => (
              <button key={l} className={l === lang ? 'on' : ''} onClick={() => setLang(l)}>
                {l}
              </button>
            ))}
          </div>
          <a href={WHATSAPP_URL} className="btn btn-fill">Falar agora</a>
          <button className="menu-btn" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
