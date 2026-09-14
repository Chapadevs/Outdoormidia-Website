import Breadcrumb from '@/components/ui/Breadcrumb'
import { metaDe } from '@/lib/seo'
import LegalDoc from '@/components/ui/LegalDoc'
import { ATUALIZADO_EM, getContatoPrivacidade, getPrivacidade } from '@/lib/legal'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })

  return metaDe({
    path: '/privacidade',
    locale,
    titulo: t('privacidade.titulo'),
    descricao: t('privacidade.descricao'),
  })
}

export default async function PrivacidadePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'PrivacidadePage' })

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: t('breadcrumb') }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              {t('eyebrow')} · <b>{t('eyebrowForte')}</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              {t('h1')}
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              {t('lead')}
            </p>
            {/* Atalho para a seção que o visitante veio procurar: quem abre esta
                página quer saber o que pode exigir, não ler as onze cláusulas até
                chegar lá. */}
            <a className="btn btn-ghost reveal mt-8" href="#direitos">
              {t('direitos')}
            </a>
          </div>
        </section>

        <section className="pb-[110px] max-mob:pb-[72px]">
          <LegalDoc
            atualizadoEm={ATUALIZADO_EM}
            contato={getContatoPrivacidade(locale)}
            secoes={getPrivacidade(locale)}
          />
        </section>
      </main>
    </>
  )
}
