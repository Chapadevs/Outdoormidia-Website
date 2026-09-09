'use client'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { IDIOMAS } from '@/i18n/routing'

// Link de verdade, não botão: funciona sem JavaScript, o rastreador enxerga as
// outras versões da página e o prefixo de idioma é resolvido pelo Link de
// @/i18n/navigation. O usePathname de lá devolve a rota sem locale, então
// trocar de idioma mantém o visitante na página em que ele estava.
//
// A querystring não é preservada de propósito: ler useSearchParams aqui tiraria
// do render estático toda página que monta o Header, e o Header vive no layout.
export default function LanguageSwitcher({ className = '', ativo, inativo }) {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations('Header')

  return (
    <nav aria-label={t('idioma')} className={`flex gap-2.5 ${className}`}>
      {IDIOMAS.map((idioma) => (
        <Link
          key={idioma.code}
          href={pathname}
          locale={idioma.code}
          hrefLang={idioma.tag}
          lang={idioma.tag}
          aria-current={idioma.code === locale ? 'true' : undefined}
          className={`cursor-pointer transition-colors duration-150 ${
            idioma.code === locale ? ativo : inativo
          }`}
        >
          {idioma.label}
        </Link>
      ))}
    </nav>
  )
}
