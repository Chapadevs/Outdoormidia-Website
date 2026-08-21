import { Poppins } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/widgets/WhatsAppButton'
import RevealObserver from '@/components/widgets/RevealObserver'
import JsonLd from '@/components/widgets/JsonLd'
import CookieNotice from '@/components/widgets/CookieNotice'
import { SITE_URL } from '@/lib/constants'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Outdoormídia — Out of Home no Sul do Brasil',
  description:
    'Líder em mídia exterior no Paraná e Santa Catarina há 67 anos. Outdoor digital, frontlight, rodovias, aeroporto, shoppings e muito mais.',
  // Canonical da home. As demais rotas declaram a sua em `alternates` —
  // caminho relativo, resolvido contra o metadataBase.
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Outdoormídia — Out of Home no Sul do Brasil',
    description: 'Líder em mídia exterior no Paraná e Santa Catarina.',
    siteName: 'Outdoormídia',
    url: SITE_URL,
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <head>
        <JsonLd />
      </head>
      <body>
        {children}
        <WhatsAppButton />
        <RevealObserver />
        <CookieNotice />
      </body>
    </html>
  )
}
