import { Link } from '@/i18n/navigation'

export default function SectionHeading({ title, href, rule = true, className = '' }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* `text-balance` só age em título que quebra em mais de uma linha: nos de
          uma palavra ele é inerte, e nos longos evita a linha cheia seguida de
          uma palavra órfã. */}
      <h2 className="m-0 text-balance text-[clamp(28px,4.4vw,54px)] font-extrabold leading-none tracking-[-0.02em]">
        {href ? (
          <Link href={href} className="transition-colors duration-150 hover:text-orange">
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      {rule && <span className="h-px min-w-[52px] flex-1 bg-line max-mob:min-w-[28px]"></span>}
    </div>
  )
}
