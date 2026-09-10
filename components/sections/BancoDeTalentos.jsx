import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
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
// Os selos são montados dentro do componente: o rótulo vem das mensagens e o
// número continua derivado da listagem.

export default async function BancoDeTalentos() {
  const t = await getTranslations('BancoDeTalentos')

  const SELOS = [
    t('seloDesde', { ano: EMPRESA.fundacao }),
    t('seloPlataformas', { n: PLATFORMS_LISTAGEM.length }),
    t('seloTelas'),
  ]

  return (
    <section className="py-[110px] pt-0 max-mob:py-[72px] max-mob:pt-0" id="candidatura">
      <div className="wrap">
        <SectionHeading title={t('label')} className="reveal mb-[34px]" />

        <div className="reveal overflow-hidden rounded-[16px] border-t-4 border-orange bg-ink">
          <div className="grid grid-cols-2 max-tab:grid-cols-1">
            <div className="flex flex-col gap-6 p-10 max-mob:p-7">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]">
                <span className="text-white/55">{t('cadastroAberto')}</span>
                <span className="text-white/30">·</span>
                <span className="text-orange">PR + SC</span>
              </div>

              <h3 className="display m-0 text-[clamp(32px,4vw,46px)]">
                {t('tituloA')}
                <br />
                {t('tituloB')}
              </h3>

              <p className="m-0 max-w-[48ch] text-[16px] leading-relaxed text-white/75">
                {t('lead')}
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
                  {t('ctaFormulario')}
                </a>
                <a href={MAILTO_RH} className="btn">
                  {t('cta')}
                </a>
              </div>

              <p className="m-0 text-[15px] text-white/65">
                {t('prefereAntes')}{' '}
                <a href={MAILTO_RH} className="font-semibold text-orange hover:underline">
                  {EMPRESA.emailRh}
                </a>
              </p>
            </div>

            <div className="relative min-h-[320px] border-l border-white/10 max-tab:min-h-[200px] max-tab:border-l-0 max-tab:border-t">
              <Image
                src="/media/trabalhe-conosco/time-outdoormidia.webp"
                alt={t('fotoAlt')}
                fill
                sizes="(max-width: 980px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
