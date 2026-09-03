import { Image as ImageIcon } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { EMPRESA } from '@/lib/empresa'
import { MAILTO_RH, TALENTOS_FORM_URL } from '@/lib/constants'
import { PLATFORMS_LISTAGEM } from '@/lib/platforms'

// O cadastro deixou de ser formulário no site em 25/08/2026: as respostas caem
// direto no Drive do cliente e o RH gerencia sem depender de terceiro. As áreas
// de atuação vivem dentro do formulário, não aqui.
//
// Nenhuma promessa de prazo de resposta, de retorno ou de validade do cadastro:
// não há processo definido para isso. Não acrescentar.
const SELOS = [
  `Desde ${EMPRESA.fundacao}`,
  `${PLATFORMS_LISTAGEM.length} plataformas`,
  '175 telas digitais',
]

export default function BancoDeTalentos({ num = '02' }) {
  return (
    <section className="py-[110px] pt-0 max-mob:py-[72px] max-mob:pt-0" id="candidatura">
      <div className="wrap">
        <SectionHeading num={num} title="Banco de talentos" className="reveal mb-[34px]" />

        <div className="reveal overflow-hidden rounded-[16px] border-t-4 border-orange bg-ink">
          <div className="grid grid-cols-2 max-tab:grid-cols-1">
            <div className="flex flex-col gap-6 p-10 max-mob:p-7">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]">
                <span className="text-white/55">Cadastro aberto</span>
                <span className="text-white/30">·</span>
                <span className="text-orange">PR + SC</span>
              </div>

              <h3 className="display m-0 text-[clamp(32px,4vw,46px)]">
                Entre no
                <br />
                banco de talentos.
              </h3>

              <p className="m-0 max-w-[48ch] text-[16px] leading-relaxed text-white/75">
                Não temos uma vaga aberta para todo perfil o tempo todo. Deixe seus dados no
                nosso banco de talentos: quando abrir uma na sua área, o seu cadastro é dos
                primeiros a ser consultado.
              </p>

              <ul className="m-0 flex flex-wrap gap-2 p-0">
                {SELOS.map((selo) => (
                  <li
                    className="rounded-full border border-white/25 px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.04em] text-white/80"
                    key={selo}
                  >
                    {selo}
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a href={TALENTOS_FORM_URL} rel="noreferrer" target="_blank" className="btn btn-fill">
                  Preencher cadastro →
                </a>
                <a href={MAILTO_RH} className="btn">
                  Enviar currículo
                </a>
              </div>

              <p className="m-0 text-[15px] text-white/65">
                Prefere mandar o currículo direto?{' '}
                <a href={MAILTO_RH} className="font-semibold text-orange hover:underline">
                  {EMPRESA.emailRh}
                </a>
              </p>
            </div>

            {/* TODO(Imagine): foto do time OM na rua (instalação, produção ou
                escritório). Enquanto faltar, o painel fica no estado vazio. */}
            <div className="relative min-h-[320px] border-l border-white/10 bg-white/[.03] max-tab:min-h-[200px] max-tab:border-l-0 max-tab:border-t">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-10 text-center">
                <ImageIcon size={24} className="text-white/25" />
                <span className="max-w-[28ch] text-[12.5px] font-medium leading-relaxed text-white/35">
                  Foto do time OM na rua: instalação, produção ou escritório
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
