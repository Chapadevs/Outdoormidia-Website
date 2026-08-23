import Link from 'next/link'

export default function Logo({ className = 'bg-white' }) {
  return (
    <Link href="/" aria-label="Outdoormídia, ir para a home" className="flex items-center">
      <span aria-hidden="true" className={`logo-mark h-[23px] max-mob:h-[19px] ${className}`} />
    </Link>
  )
}
