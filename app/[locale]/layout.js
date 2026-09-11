import { Poppins } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import '../globals.css'
import WhatsAppButton from '@/components/widgets/WhatsAppButton'
import RevealObserver from '@/components/widgets/RevealObserver'
import RadialReveal from '@/components/widgets/RadialReveal'
import JsonLd from '@/components/widgets/JsonLd'
import CookieNotice from '@/components/widgets/CookieNotice'
import { SITE_URL } from '@/lib/constants'
import { routing, TAG_HTML, TAG_OG } from '@/i18n/routing'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

// Este é o root layout do site público: com o segmento [locale] acima dele, é
// o único ponto onde `lang` pode refletir o idioma no HTML servido. O admin
// tem o seu próprio, em app/(admin)/layout.js.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Site' })

  return {
    metadataBase: new URL(SITE_URL),
    title: t('titulo'),
    description: t('descricao'),
    // Canonical da home. As demais rotas declaram a sua em `alternates` —
    // caminho relativo, resolvido contra o metadataBase.
    alternates: { canonical: locale === routing.defaultLocale ? '/' : `/${locale}` },
    openGraph: {
      title: t('titulo'),
      description: t('descricaoCurta'),
      siteName: 'Outdoormídia',
      url: SITE_URL,
      locale: TAG_OG[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => TAG_OG[l]),
      type: 'website',
    },
  }
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  // Sem esta chamada a rota cai para renderização dinâmica em silêncio, o que
  // anula os `export const revalidate` das páginas. Vale para todo layout e
  // toda page que deve continuar estática.
  setRequestLocale(locale)

  // Só o que componente de cliente lê vai para o cliente. Mandar o objeto
  // inteiro colocaria todas as mensagens do site no payload RSC de cada página.
  //
  // Ao marcar um componente novo com 'use client' e usar useTranslations nele,
  // o namespace dele precisa entrar nesta lista: sem isso o texto some em
  // runtime, porque a mensagem nunca chega ao browser.
  const mensagens = await getMessages()
  const chrome = {
    Header: mensagens.Header,
    Footer: mensagens.Footer,
    Nav: mensagens.Nav,
    Hero: mensagens.Hero,
    QualifierForm: mensagens.QualifierForm,
    PlatformsCarousel: mensagens.PlatformsCarousel,
    Process: mensagens.Process,
    Reviews: mensagens.Reviews,
    LinhaDoTempo: mensagens.LinhaDoTempo,
    MapaCobertura: mensagens.MapaCobertura,
    MapaRodovias: mensagens.MapaRodovias,
    SuaMarcaNoOoh: mensagens.SuaMarcaNoOoh,
    Iconicos: mensagens.Iconicos,
  }

  return (
    <html lang={TAG_HTML[locale]} className={poppins.variable}>
      <head>
        <JsonLd locale={locale} />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={chrome}>
          {children}
          <WhatsAppButton />
          <RevealObserver />
          <RadialReveal />
          <CookieNotice />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
