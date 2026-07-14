import { WHATSAPP_URL } from '@/lib/constants'

export default function LeadCta() {
  return (
    <section className="lead">
      <div className="wrap">
        <div className="lead-grid">
          <div className="reveal">
            <h2>Conte sua<br />campanha.</h2>
            <p>
              Responda 3 perguntas rápidas e nosso time comercial volta com uma sugestão de ativos
              sob medida.
            </p>
            <a href={WHATSAPP_URL} className="btn btn-on-orange" style={{ marginTop: 30 }}>
              Iniciar pelo WhatsApp
            </a>
          </div>
          <div className="lead-card ticks reveal">
            <ol>
              <li>Primeira campanha ou já anunciou antes?</li>
              <li>Em qual cidade você quer aparecer?</li>
              <li>CNPJ, e-mail e WhatsApp para contato.</li>
            </ol>
            <a
              href="/proposta"
              className="btn btn-on-orange"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Quero uma proposta
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
