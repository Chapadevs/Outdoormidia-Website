import { Link } from '@/i18n/navigation'
import { metaDe } from '@/lib/seo'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionHeading from '@/components/ui/SectionHeading'
import NovaCampanha from '@/components/sections/NovaCampanha'
import PraticasGrid from '@/components/sections/PraticasGrid'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PRATICAS, getSaidas } from '@/lib/melhoresPraticas'


// O título comercial e o título de busca não são o mesmo texto. "Melhores
// práticas" é o nome da ferramenta dentro do site, e ninguém busca por ele:
// quem está neste momento de decisão busca "como escolher outdoor" e "como
// fazer campanha de outdoor".
// Fora do índice até o escopo do Face Única ser confirmado com a Alexandra
// (ponto de validação 01 do checklist). A prática 06 diz que a face é
// dedicada a uma marca só em toda a nossa operação, e essa é a
// afirmação de maior exposição da página: ela já está escrita como garantia
// no FAQ, e a base de plataformas registra o Face Única documentado apenas
// no Mosaico Square. Ao liberar, apagar este `robots` e o `noindex` de
// lib/seo.js na mesma alteração.
export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/area-do-anunciante/melhores-praticas',
    locale,
    titulo: t('melhoresPraticas.titulo'),
    descricao: t('melhoresPraticas.descricao'),
    noindex: true,
  })
}

export default async function MelhoresPraticasPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'MelhoresPraticasPage' })

  return (
    <>
      <main>
        <Breadcrumb
          items={[
            { label: t('breadcrumbPai'), href: '/area-do-anunciante' },
            { label: t('breadcrumb') },
          ]}
        />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">{t('eyebrow', { n: PRATICAS.length })}</div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('tituloA')}
              <br />
              {t('tituloB')}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              {t('lead')}
            </p>
          </div>
        </section>

        <section className="py-[110px] max-tab:py-[92px] max-mob:py-[72px]">
          <div className="wrap">
            <SectionHeading title={t('asPraticas')} className="reveal mb-[34px]" />
            <PraticasGrid />
          </div>
        </section>

        <section className="bg-bone py-[110px] max-tab:py-[92px] max-mob:py-[72px]">
          <div className="wrap">
            <SectionHeading title={t('paraOndeIr')} className="reveal mb-[34px]" />
            <div className="grid grid-cols-3 gap-[18px] max-tab:grid-cols-1">
              {getSaidas(locale).map((s) => (
                <Link
                  className="ticks reveal group flex flex-col gap-3 rounded-[16px] border border-line bg-white p-7 transition-colors duration-200 hover:border-orange max-mob:p-6"
                  href={s.href}
                  key={s.href}
                >
                  <h3 className="m-0 text-[21px] font-extrabold leading-tight text-ink transition-colors duration-200 group-hover:text-orange">
                    {s.titulo}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-ink-soft">{s.texto}</p>
                  <span
                    aria-hidden
                    className="mt-auto pt-5 text-base text-ink-soft transition-transform duration-200 group-hover:translate-x-1 group-hover:text-orange"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <NovaCampanha />
      </main>
    </>
  )
}
