const PLATFORMS = [
  { num: '01', name: 'Outdoor Digital', desc: 'LED · Dinâmico' },
  { num: '02', name: 'Front Light', desc: '12 × 4 m' },
  { num: '03', name: 'Rodovias', desc: '100 ativos' },
  { num: '04', name: 'Aeroporto', desc: 'Público premium' },
  { num: '05', name: 'Projetos Icônicos', desc: 'Monumental' },
  { num: '06', name: 'Malls', desc: 'Ponto de compra' },
  { num: '07', name: 'MUB', desc: 'Mobiliário urbano' },
  { num: '08', name: 'Mídia Móvel', desc: 'Em movimento' },
]

export default function Platforms() {
  return (
    <section className="block" id="plataformas" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="lab reveal">
          <span className="num">02</span>
          <h2>Plataformas</h2>
          <span className="rule"></span>
        </div>
        <div className="index reveal">
          {PLATFORMS.map((p) => (
            <a className="row" href="#" key={p.num}>
              <span className="ri">{p.num}</span>
              <span className="rn">{p.name}</span>
              <span className="rd">{p.desc}</span>
              <span className="ra">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
