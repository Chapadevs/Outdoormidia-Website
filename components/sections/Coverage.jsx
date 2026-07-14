import { WHATSAPP_URL } from '@/lib/constants'

const PRACAS = [
  { title: 'Curitiba', desc: 'Capital e principais corredores' },
  {
    title: 'Região Metropolitana',
    desc: 'Campo Largo, São José dos Pinhais, Pinhais, Fazenda Rio Grande',
  },
  { title: 'Litoral do PR', desc: 'Praias e acessos de alta temporada' },
  { title: 'Rodovias', desc: 'Principais vias do estado' },
  { title: 'Santa Catarina', desc: 'Itajaí, Joinville, Balneário Camboriú' },
]

export default function Coverage() {
  return (
    <section className="block" id="cobertura">
      <div className="wrap">
        <div className="cover-grid">
          <div className="reveal">
            <div className="lab" style={{ marginBottom: 18 }}>
              <span className="num">04</span>
              <h2>Cobertura</h2>
            </div>
            <p>
              Do centro de Curitiba ao litoral, das rodovias a Santa Catarina — uma malha de mídia
              que acompanha o fluxo de pessoas em toda a região Sul.
            </p>
            <a href={WHATSAPP_URL} className="btn" style={{ marginTop: 28 }}>
              Consultar disponibilidade
            </a>
          </div>
          <div className="pracas reveal">
            {PRACAS.map((p) => (
              <div className="pl" key={p.title}>
                <span className="pt">{p.title}</span>
                <span className="pd">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
