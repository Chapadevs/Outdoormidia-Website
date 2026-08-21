import { DATA_LONGA } from '@/lib/format'
import { EMPRESA } from '@/lib/empresa'

// Renderizador dos dois documentos legais (/privacidade e /termos): sumário com
// âncoras + blocos numerados, a partir das seções de lib/legal.js.
//
// O título de seção aqui é menor que o do SectionHeading de propósito: uma
// dúzia de cláusulas em escala de display vira parede. O motivo visual (número
// laranja + título em ink) é o mesmo.
//
// O bloco de contato final é montado de lib/empresa.js e entra como a última
// seção numerada. Razão social, CNPJ e endereço estão sob TODO(cliente) lá —
// cada linha vazia é omitida em vez de virar espaço em branco.

function numero(i) {
  return String(i + 1).padStart(2, '0')
}

function Paragrafo({ children }) {
  return <p className="max-w-[72ch] text-[16.5px] leading-relaxed text-ink-soft">{children}</p>
}

export default function LegalDoc({ secoes, atualizadoEm, contato }) {
  // Data em ISO curto vira meia-noite UTC; ao meio-dia o fuso de Brasília não
  // puxa o dia para trás na formatação.
  const atualizado = DATA_LONGA.format(new Date(`${atualizadoEm}T12:00:00`))

  const identificacao = [
    EMPRESA.razaoSocial || EMPRESA.nome,
    EMPRESA.cnpj && `CNPJ ${EMPRESA.cnpj}`,
    [EMPRESA.endereco.logradouro, EMPRESA.endereco.cep].filter(Boolean).join(' — '),
    `${EMPRESA.endereco.cidade} — ${EMPRESA.endereco.estado}`,
  ].filter(Boolean)

  const emailContato = EMPRESA.encarregado || EMPRESA.email
  const numeroContato = numero(secoes.length)

  return (
    <div className="wrap">
      <p className="eyebrow reveal text-ink-soft">Atualizado em {atualizado}</p>

      <nav
        aria-label="Sumário"
        className="ticks reveal mt-6 rounded-[16px] border border-line bg-bone p-7 max-mob:p-6"
      >
        <h2 className="m-0 text-xs font-bold uppercase tracking-[0.14em] text-ink">Nesta página</h2>
        <ol className="mt-[18px] grid grid-cols-2 gap-x-10 gap-y-[11px] max-mob:grid-cols-1">
          {[...secoes, { id: 'contato', titulo: contato.titulo }].map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex gap-3 text-[14.5px] leading-snug text-ink-soft transition-colors duration-150 hover:text-orange"
              >
                <span className="font-display text-orange">{numero(i)}</span>
                {s.titulo}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-[70px] flex flex-col gap-[54px] max-mob:mt-12 max-mob:gap-10">
        {secoes.map((s, i) => (
          <section className="reveal scroll-mt-[110px]" id={s.id} key={s.id}>
            <h2 className="m-0 flex items-baseline gap-3.5 text-[22px] font-extrabold leading-tight text-ink">
              <span className="font-display text-[15px] text-orange">{numero(i)}</span>
              {s.titulo}
            </h2>

            <div className="mt-[18px] flex flex-col gap-4">
              {s.paragrafos?.map((p) => (
                <Paragrafo key={p}>{p}</Paragrafo>
              ))}

              {s.lista && (
                <ul className="flex max-w-[72ch] flex-col gap-2.5">
                  {s.lista.map((item) => (
                    <li
                      className="flex gap-3 text-[16.5px] leading-relaxed text-ink-soft"
                      key={item}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-orange"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {s.fecho?.map((p) => (
                <Paragrafo key={p}>{p}</Paragrafo>
              ))}
            </div>
          </section>
        ))}

        <section className="reveal scroll-mt-[110px]" id="contato">
          <h2 className="m-0 flex items-baseline gap-3.5 text-[22px] font-extrabold leading-tight text-ink">
            <span className="font-display text-[15px] text-orange">{numeroContato}</span>
            {contato.titulo}
          </h2>

          <div className="mt-[18px] flex flex-col gap-4">
            <Paragrafo>{contato.texto}</Paragrafo>

            <div className="ticks max-w-[46ch] rounded-[16px] border border-line bg-white p-7 max-mob:p-6">
              <div className="flex flex-col gap-1 text-[16.5px] leading-relaxed text-ink-soft">
                {identificacao.map((linha) => (
                  <span key={linha}>{linha}</span>
                ))}
              </div>
              <a
                className="mt-5 block font-bold text-orange hover:underline"
                href={`mailto:${emailContato}`}
              >
                {emailContato}
              </a>
              <a
                className="mt-1 block text-[15.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
                href={`tel:${EMPRESA.telefone}`}
              >
                {EMPRESA.telefoneExibicao}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
