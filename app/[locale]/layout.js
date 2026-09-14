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
import Analytics from '@/components/widgets/Analytics'
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

// Só o que vale para o site inteiro. Canonical e hreflang ficam em cada
// page.js (a home inclusive, via metaDe): declarados aqui eles vazariam para
// a 404, que herdaria um canonical apontando para a home.
export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Site' })

  return {
    metadataBase: new URL(SITE_URL),
    title: t('titulo'),
    description: t('descricao'),
    openGraph: {
      siteName: 'Outdoormídia',
      locale: TAG_OG[locale],
      type: 'website',
    },
    // Sem isto o Google limita o preview de imagem e o tamanho do snippet
    // que pode mostrar (Discover e AI Overviews usam os dois). Página com
    // `robots` próprio (noindex) substitui este bloco inteiro, e é o que
    // deve acontecer.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
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
    Faq: mensagens.Faq,
    Explorers: mensagens.Explorers,
    Share: mensagens.Share,
    DiagnosticoQuiz: mensagens.DiagnosticoQuiz,
    ProposalForm: mensagens.ProposalForm,
    FormatosGallery: mensagens.FormatosGallery,
    PlatformsCatalog: mensagens.PlatformsCatalog,
    PraticasGrid: mensagens.PraticasGrid,
    HomeTimeline: mensagens.HomeTimeline,
    Widgets: mensagens.Widgets,
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
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
