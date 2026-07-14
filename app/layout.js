import { Anton, Archivo } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/widgets/WhatsAppButton'
import RevealObserver from '@/components/widgets/RevealObserver'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata = {
  title: 'Outdoormídia — Out of Home no Sul do Brasil',
  description:
    'Líder em mídia exterior no Paraná e Santa Catarina há 66 anos. Outdoor digital, frontlight, rodovias, aeroporto, shoppings e muito mais.',
  openGraph: {
    title: 'Outdoormídia — Out of Home no Sul do Brasil',
    description: 'Líder em mídia exterior no Paraná e Santa Catarina.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${archivo.variable}`}>
      <body>
        {children}
        <WhatsAppButton />
        <RevealObserver />
      </body>
    </html>
  )
}
