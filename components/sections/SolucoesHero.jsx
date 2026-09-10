import { getTranslations } from 'next-intl/server'

export default async function SolucoesHero() {
  const t = await getTranslations('SolucoesHero')

  return (
    <section className="pb-[70px] pt-[54px] max-mob:pb-12 max-mob:pt-9">
      <div className="wrap">
        <div className="eyebrow reveal">{t('eyebrow')}</div>
        <h1 className="display reveal mt-[18px] text-[clamp(44px,7vw,92px)] text-ink">
          {t('h1')}
        </h1>
        <p className="reveal mt-6 max-w-[62ch] text-lg text-ink-soft">
          {t('lead')}
        </p>
      </div>
    </section>
  )
}
