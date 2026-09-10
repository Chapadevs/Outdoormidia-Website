import Breadcrumb from '@/components/ui/Breadcrumb'
import { LOCALES, TAG_OG } from '@/i18n/routing'
import { alternatesDe } from '@/lib/seo'
import LegalDoc from '@/components/ui/LegalDoc'
import { ATUALIZADO_EM, getContatoPrivacidade, getPrivacidade } from '@/lib/legal'
import { getTranslations, setRequestLocale } from 'next-intl/server'


export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Meta' })
  const titulo = t('privacidade.titulo')
  const descricao = t('privacidade.descricao')

  return {
    title: titulo,
    description: descricao,
    alternates: alternatesDe('/privacidade', locale),
    openGraph: {
      title: titulo,
      description: descricao,
      locale: TAG_OG[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function PrivacidadePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <main>
        <Breadcrumb items={[{ label: 'Política de privacidade' }]} />

        <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
          <div className="wrap">
            <div className="eyebrow reveal">
              Jurídico · <b>LGPD</b>
            </div>
            <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
              Política de privacidade.
            </h1>
            <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
              Que dados pedimos, por que pedimos, com quem compartilhamos e por quanto tempo
              guardamos. Em português, sem letra miúda.
            </p>
            {/* Atalho para a seção que o visitante veio procurar: quem abre esta
                página quer saber o que pode exigir, não ler as onze cláusulas até
                chegar lá. */}
            <a className="btn btn-ghost reveal mt-8" href="#direitos">
              Conferir os seus direitos na LGPD
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
