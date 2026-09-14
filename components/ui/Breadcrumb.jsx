import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Schema from '@/components/widgets/Schema'
import { breadcrumbList } from '@/lib/schema'

// A trilha visível e o BreadcrumbList saem da mesma lista: é o que faz o
// Google mostrar o caminho no resultado em vez da URL crua. `useLocale`
// funciona em componente de servidor e é o que resolve o prefixo das URLs.
export default function Breadcrumb({ items }) {
  const locale = useLocale()
  const trilha = [{ label: 'Home', href: '/' }, ...items]

  return (
    <nav aria-label="Breadcrumb" className="wrap pt-6 max-mob:pt-4">
      <Schema data={breadcrumbList(trilha, locale)} />
      <ol className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-ink-soft">
        <li>
          <Link href="/" className="transition-colors duration-150 hover:text-orange">
            Home
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              <span className="text-line-2">/</span>
              {isLast || !item.href ? (
                <span aria-current={isLast ? 'page' : undefined} className="text-orange">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors duration-150 hover:text-orange">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
