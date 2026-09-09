import { Poppins } from 'next/font/google'
import '../globals.css'
import RevealObserver from '@/components/widgets/RevealObserver'
import RadialReveal from '@/components/widgets/RadialReveal'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

// Root layout do painel. Ele existe porque o app/layout.js que servia o site
// inteiro saiu: com o público agora sob [locale], quem renderiza <html> é o
// layout de locale, e o admin ficaria sem nenhum.
//
// O painel é interno e fica em português nos quatro idiomas, então `lang` é
// fixo. Ficaram de fora os widgets de marketing que o layout antigo instalava
// aqui sem uso (WhatsAppButton, CookieNotice e o JSON-LD de LocalBusiness):
// nenhum deles faz sentido atrás do login, e /admin já é noindex.
export const metadata = {
  title: 'Painel Outdoormídia',
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>
        {children}
        <RevealObserver />
        <RadialReveal />
      </body>
    </html>
  )
}
