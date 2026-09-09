import { setRequestLocale } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// O Header e o Footer eram importados uma vez em cada uma das 28 páginas deste
// grupo. Aqui eles existem uma vez só, e ganham de brinde a persistência de
// layout do App Router: o Header não remonta a cada navegação, então o estado
// do menu, o listener de Escape e o matchMedia sobrevivem à troca de rota.
//
// /proposta fica fora deste grupo de propósito: é o briefing em tela cheia e
// nunca teve Header nem Footer.
export default async function SiteLayout({ children, params }) {
  const { locale } = await params
  // O Footer chama getTranslations; sem esta linha ele leria os headers da
  // requisição e tiraria do render estático toda página deste grupo.
  setRequestLocale(locale)

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
