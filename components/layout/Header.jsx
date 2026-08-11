'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/ui/Logo'
import { NAV } from '@/lib/nav'
import { WA_HEADER, waLink } from '@/lib/whatsapp'

const LANGS = ['PT', 'EN', 'ES', '中文']

const MENU_ID = 'menu-principal'

const EASE = 'ease-[cubic-bezier(.2,.7,.2,1)]'

// O painel fica montado o tempo todo para poder animar altura e opacidade; o
// `inert` tira os links do fluxo de foco enquanto está fechado.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('PT')
  const pathname = usePathname()
  const headerRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return

    function onKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    function onPointerDown(e) {
      if (!headerRef.current?.contains(e.target)) setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function isActive(href) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  // Cada coluna entra um pouco depois da anterior; ao fechar, todas saem juntas.
  function atraso(i) {
    return menuOpen ? `${90 + i * 55}ms` : '0ms'
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[60] border-b border-ink/15 bg-orange/95 backdrop-blur-[10px]"
    >
      <div className="wrap flex h-[74px] items-center gap-[30px] max-lap:gap-4 max-mob:h-16">
        <Logo />
        <div className="ml-auto flex items-center gap-[18px] max-lap:gap-3 max-mob:gap-2">
          <a href={waLink(WA_HEADER)} className="btn btn-on-orange">
            Falar agora
          </a>
          <button
            className="flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-[5px]"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className={`h-0.5 w-[22px] bg-white transition-transform duration-300 ${EASE} motion-reduce:transition-none ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            ></span>
            <span
              className={`h-0.5 w-[22px] bg-white transition-all duration-200 motion-reduce:transition-none ${
                menuOpen ? 'scale-x-0 opacity-0' : ''
              }`}
            ></span>
            <span
              className={`h-0.5 w-[22px] bg-white transition-transform duration-300 ${EASE} motion-reduce:transition-none ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 bottom-0 top-[74px] bg-ink/30 backdrop-blur-[2px] transition-opacity duration-300 ${EASE} motion-reduce:transition-none max-mob:top-16 ${
          menuOpen ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>

      <nav
        id={MENU_ID}
        inert={!menuOpen}
        className={`absolute inset-x-0 top-full transition-[opacity,translate] duration-[420ms] ${EASE} motion-reduce:transition-none ${
          menuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <div>
          <div className="max-h-[calc(100dvh-74px)] overflow-y-auto border-b border-ink/15 bg-orange shadow-[0_24px_32px_-24px_rgba(22,17,13,.3)] max-mob:max-h-[calc(100dvh-64px)]">
            <div className="wrap py-[38px] max-mob:py-7">
              <div className="grid grid-cols-5 gap-x-10 gap-y-9 max-lap:grid-cols-3 max-tab:grid-cols-2 max-mob:grid-cols-1 max-mob:gap-y-7">
                {NAV.map((item, i) => (
                  <div
                    key={item.href}
                    style={{ transitionDelay: atraso(i) }}
                    className={`transition-[opacity,translate] duration-[420ms] ${EASE} motion-reduce:transition-none ${
                      menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                    }`}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`group flex items-center gap-2 text-[19px] font-extrabold leading-tight transition-colors duration-150 hover:text-white ${
                        isActive(item.href) ? 'text-white' : 'text-white/85'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className="translate-x-[-6px] text-[15px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
                      >
                        →
                      </span>
                    </Link>
                    {item.children && (
                      <div className="mt-3.5 flex flex-col gap-2.5 border-l border-white/25 pl-3.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMenuOpen(false)}
                            className={`text-[14.5px] font-semibold transition-[color,translate] duration-150 hover:translate-x-1 hover:text-white motion-reduce:transition-none ${
                              isActive(child.href) ? 'text-white' : 'text-white/70'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div
                style={{ transitionDelay: atraso(NAV.length) }}
                className={`mt-[38px] flex flex-wrap items-center justify-between gap-x-5 gap-y-4 border-t border-white/25 pt-6 transition-[opacity,translate] duration-[420ms] ${EASE} motion-reduce:transition-none max-mob:mt-7 ${
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
              >
                <div className="flex gap-2.5 text-xs font-bold tracking-[0.04em]">
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
                <a href={waLink(WA_HEADER)} className="eyebrow text-white hover:underline">
                  Falar com o comercial →
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
