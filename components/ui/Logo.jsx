import Link from 'next/link'

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 text-[21px] font-black tracking-[-0.03em] text-orange max-mob:text-lg"
    >
      outdoormídia
    </Link>
  )
}
