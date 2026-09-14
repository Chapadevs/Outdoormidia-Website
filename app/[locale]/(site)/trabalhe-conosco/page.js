import Breadcrumb from '@/components/ui/Breadcrumb'
import CoverMedia from '@/components/ui/CoverMedia'
import { metaDe } from '@/lib/seo'
import Culture from '@/components/sections/Culture'
import BancoDeTalentos from '@/components/sections/BancoDeTalentos'
import { getTranslations, setRequestLocale } from 'next-intl/server'

const SEDE = '/media/trabalhe-conosco/foto-da-sede.webp'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/trabalhe-conosco',
    locale,
    titulo: t('trabalheConosco.titulo'),
    descricao: t('trabalheConosco.descricao'),
  })
}

export default async function TrabalheConoscoPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'TrabalheConoscoPage' })

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: t('breadcrumb') }]} />
        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            {/* Mesmo hero de duas colunas das páginas de plataforma: texto à
                esquerda e, ao lado, a foto aérea da sede que também abre /sobre.
                O time na frente do prédio continua sendo a foto do Banco de
                Talentos, mais abaixo nesta mesma página. */}
            <div className="grid grid-cols-[1fr_1fr] items-center gap-[50px] max-tab:grid-cols-1 max-tab:gap-[34px]">
              <div>
                <div className="eyebrow reveal">
                  {t('eyebrow')} · <b>PR + SC</b>
                </div>
                <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
                  {t('h1')}
                </h1>
                <p className="reveal mt-6 max-w-[52ch] text-lg text-ink-soft">
                  {t('lead')}
                </p>
              </div>
              <CoverMedia
                alt={t('capaAlt')}
                className="reveal"
                priority
                ratio="16/9"
                sizes="(max-width: 980px) 100vw, 50vw"
                src={SEDE}
              />
            </div>
          </div>
        </section>
        <Culture />
        <BancoDeTalentos />
      </main>
    </>
  )
}
