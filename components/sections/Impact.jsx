const STATS = [
  { n: '66', label: 'Anos de história' },
  { n: '8', label: 'Plataformas de mídia' },
  { n: '100+', label: 'Pontos em rodovias' },
  { n: '2', label: 'Estados · PR + SC' },
]

export default function Impact() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid grid-cols-4 border-l border-ink/15 max-tab:grid-cols-2 max-xs:grid-cols-1">
          {STATS.map((s) => (
            <div
              className="reveal border-r border-ink/15 px-7 py-[54px] max-mob:px-[22px] max-mob:py-[34px] max-xs:border-b max-xs:border-r-0"
              key={s.label}
            >
              <div className="display text-[clamp(54px,8vw,104px)] leading-[0.9] text-orange">
                {s.n}
              </div>
              <div className="mt-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-soft">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
