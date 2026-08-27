import SectionHeading from '@/components/ui/SectionHeading'
import { EMPRESA } from '@/lib/empresa'
import { MAILTO_RH, TALENTOS_FORM_URL } from '@/lib/constants'

// O cadastro deixou de ser formulário no site em 25/08/2026: as respostas caem
// direto no Drive do cliente e o RH gerencia sem depender de terceiro. As áreas
// de atuação vivem dentro do formulário, não aqui.
//
// Nenhuma promessa de prazo de resposta, de retorno ou de validade do cadastro:
// não há processo definido para isso. Não acrescentar.
export default function BancoDeTalentos({ num = '02' }) {
  return (
    <section className="py-[110px] pt-0 max-mob:py-[72px] max-mob:pt-0" id="candidatura">
      <div className="wrap">
        <SectionHeading num={num} title="Banco de talentos" className="reveal mb-[34px]" />

        <div className="reveal max-w-[62ch]">
          <p className="m-0 text-lg text-ink-soft">
            Não temos uma vaga aberta para todo perfil o tempo todo. Deixe seus dados no nosso
            banco de talentos: quando abrir uma na sua área, o seu cadastro é dos primeiros a
            ser consultado.
          </p>

          <a
            className="btn btn-fill mt-[30px]"
            href={TALENTOS_FORM_URL}
            rel="noreferrer"
            target="_blank"
          >
            Preencher cadastro
          </a>

          <p className="mt-6 text-[15.5px] text-ink-soft">
            Prefere mandar o currículo direto?{' '}
            <a href={MAILTO_RH} className="font-semibold text-orange hover:underline">
              {EMPRESA.emailRh}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
