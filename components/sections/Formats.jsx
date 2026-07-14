const FORMATS = [
  {
    aspect: '3/1',
    top: '12 m',
    side: '4 m',
    label: 'Front Light',
    title: 'Front Light',
    text: 'Grande formato iluminado nos principais corredores das cidades.',
  },
  {
    aspect: '10/3',
    top: '10 m',
    side: '3 m',
    label: 'Passarela',
    title: 'Rodovias',
    text: '100 ativos em vias estratégicas, com flexibilidade de rodízio.',
  },
  {
    aspect: '16/9',
    top: 'LED',
    side: 'HD',
    label: 'Digital',
    title: 'Outdoor Digital',
    text: 'Telas de LED com troca dinâmica de criativos em alta circulação.',
  },
  {
    aspect: '1/1.4',
    top: 'vert.',
    side: 'full',
    label: 'Icônico',
    title: 'Projetos Icônicos',
    text: 'Mídias monumentais que viram referência na paisagem urbana.',
  },
]

export default function Formats() {
  return (
    <section className="block" id="formatos">
      <div className="wrap">
        <div className="lab reveal">
          <span className="num">01</span>
          <h2>Formatos padronizados</h2>
          <span className="rule"></span>
        </div>
        <p
          className="reveal"
          style={{ maxWidth: '54ch', color: 'var(--ink-soft)', margin: '0 0 40px', fontSize: 18 }}
        >
          Padrões pensados para simplificar a produção, permitir o rodízio entre pontos e otimizar
          o aproveitamento da sua mídia.
        </p>
        <div className="formats">
          {FORMATS.map((f) => (
            <div className="fmt reveal" key={f.title}>
              <div className="face" style={{ aspectRatio: f.aspect }}>
                <span className="dtop"><em>{f.top}</em></span>
                <span className="dside"><em>{f.side}</em></span>
                <span className="lbl">{f.label}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
