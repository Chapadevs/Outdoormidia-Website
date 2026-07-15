import Link from 'next/link'

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="wrap pt-6 max-mob:pt-4">
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
