const STATS = [
  { n: '66', label: 'Anos de história' },
  { n: '8', label: 'Plataformas de mídia' },
  { n: '100+', label: 'Pontos em rodovias' },
  { n: '2', label: 'Estados · PR + SC' },
]

export default function Impact() {
  return (
    <section className="impact">
      <div className="wrap" style={{ padding: 0 }}>
        <div className="impact-grid">
          {STATS.map((s) => (
            <div className="stat reveal" key={s.label}>
              <div className="n display">{s.n}</div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
