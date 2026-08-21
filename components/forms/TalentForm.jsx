// NÃO-FUNCIONAL: o formulário não envia nada — os dados ficam no browser e são
// descartados. Quem confirma isso é /obrigado?origem=talentos, que aponta o
// e-mail do RH como caminho real em vez de prometer que guardamos o perfil.
// Para tornar real: POST /api/carreiras gravando em `candidaturas` via adminDb,
// no padrão de app/api/admin/posts/route.js.
'use client'
import { useRouter } from 'next/navigation'
import SectionHeading from '@/components/ui/SectionHeading'
import { MAILTO_RH } from '@/lib/constants'

const CIDADES = [
  'Curitiba — PR',
  'Região Metropolitana de Curitiba — PR',
  'Litoral do Paraná — PR',
  'Joinville — SC',
  'Itajaí — SC',
  'Balneário Camboriú — SC',
  'Outra praça',
]

const AREAS = [
  'Comercial / Vendas',
  'Marketing',
  'Criação / Design',
  'Operações / Instalação',
  'Administrativo / Financeiro',
  'Tecnologia',
  'Estágio',
  'Outra área',
]

export default function TalentForm() {
  const router = useRouter()

  function handleSubmit(e) {
    e.preventDefault()
    router.push('/obrigado?origem=talentos')
  }

  return (
    <section className="py-[110px] pt-0 max-mob:py-[72px] max-mob:pt-0" id="candidatura">
      <div className="wrap">
        <SectionHeading num="02" title="Banco de talentos" className="reveal mb-[34px]" />

        <div className="grid grid-cols-[0.85fr_1.15fr] items-start gap-[60px] max-tab:grid-cols-1 max-tab:gap-[34px]">
          <div className="reveal">
            <p className="text-lg text-ink-soft">
              Não temos uma vaga aberta para todo perfil o tempo todo. Deixe seus dados: quando
              abrir uma na sua área, você é o primeiro a saber.
            </p>
            <p className="mt-5 text-[15.5px] text-ink-soft">
              Prefere mandar o currículo direto?{' '}
              <a href={MAILTO_RH} className="font-semibold text-orange hover:underline">
                contato@outdoormidia.com.br
              </a>
            </p>
          </div>

          <form
            className="ticks reveal flex flex-col gap-5 rounded-[16px] border border-line bg-white p-[38px] max-tab:p-7"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label className="field-label" htmlFor="nome">
                Nome
              </label>
              <input
                className="field-input"
                id="nome"
                name="nome"
                type="text"
                required
                placeholder="Seu nome"
              />
            </div>

            <div className="grid grid-cols-2 gap-5 max-mob:grid-cols-1">
              <div className="flex flex-col gap-2">
                <label className="field-label" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="field-input"
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="voce@email.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="field-label" htmlFor="whatsapp">
                  WhatsApp
                </label>
                <input
                  className="field-input"
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  placeholder="(41) 99999-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 max-mob:grid-cols-1">
              <div className="flex flex-col gap-2">
                <label className="field-label" htmlFor="cidade">
                  Onde você mora?
                </label>
                <select className="field-input field-select select-caret" id="cidade" name="cidade" required defaultValue="">
                  <option value="" disabled>
                    Selecione a cidade
                  </option>
                  {CIDADES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="field-label" htmlFor="area">
                  Área de interesse
                </label>
                <select className="field-input field-select select-caret" id="area" name="area" required defaultValue="">
                  <option value="" disabled>
                    Selecione a área
                  </option>
                  {AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="field-label" htmlFor="linkedin">
                LinkedIn ou portfólio
              </label>
              <input
                className="field-input"
                id="linkedin"
                name="linkedin"
                type="url"
                required
                placeholder="https://linkedin.com/in/seu-perfil"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="field-label" htmlFor="mensagem">
                Por que a Outdoormídia? <span className="font-semibold text-line-2">(opcional)</span>
              </label>
              <textarea
                className="field-input min-h-24 resize-y"
                id="mensagem"
                name="mensagem"
                rows={4}
                placeholder="Conte em duas linhas o que você faz e o que procura."
              />
            </div>

            <button type="submit" className="btn btn-fill mt-1.5 justify-center py-[17px] text-[15px]">
              Enviar candidatura
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
