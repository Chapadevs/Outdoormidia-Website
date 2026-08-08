// Faixa de números da marca. O wrapper com overflow-hidden + `-mb-px` recorta a
// borda da última linha, então o grid mantém as divisórias entre linhas quando
// quebra em 2 ou 1 coluna, sem sobrar um traço solto embaixo.
const SIZES = {
  lg: {
    cell: 'px-7 py-[54px] max-mob:px-[22px] max-mob:py-[34px]',
    num: 'text-[clamp(54px,8vw,104px)]',
  },
  md: {
    cell: 'px-7 py-[38px] max-mob:px-[22px] max-mob:py-[26px]',
    num: 'text-[clamp(38px,5vw,64px)]',
  },
}

export default function StatGrid({ stats, size = 'lg', cellClassName = '', className = '' }) {
  const { cell, num } = SIZES[size]

  return (
    <div className={`overflow-hidden border-l border-ink/15 ${className}`}>
      <div className="-mb-px grid grid-cols-4 max-tab:grid-cols-2 max-xs:grid-cols-1">
        {stats.map((stat) => (
          <div className={`border-b border-r border-ink/15 ${cell} ${cellClassName}`} key={stat.label}>
            <div className={`display leading-[0.9] text-orange ${num}`}>{stat.n}</div>
            <div className="mt-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
