import { SITE_URL } from '@/lib/constants'
import { PAGINAS_INDEXAVEIS, caminhoLocalizado } from '@/lib/seo'
import { LOCALES, IDIOMAS } from '@/i18n/routing'
import { PLATFORMS } from '@/lib/platforms'
import { ICONICOS } from '@/lib/iconicos'
import { DIFERENCIAIS_COM_PAGINA } from '@/lib/diferenciais'
import { listPublishedPosts } from '@/lib/blog/posts'

// Reconstruído a cada hora junto com o ISR das rotas de conteúdo.
export const revalidate = 3600

const url = (path) => `${SITE_URL}${path}`

// Uma entrada por idioma, cada uma declarando as outras três em `alternates`.
// Sem isso o sitemap anuncia só a versão em português e as outras três ficam
// invisíveis para a busca, por mais traduzidas que estejam.
const idiomasDe = (path) =>
  Object.fromEntries(IDIOMAS.map((i) => [i.tag, url(caminhoLocalizado(path, i.code))]))

function porIdioma(path, resto) {
  const languages = idiomasDe(path)
  return LOCALES.map((locale) => ({
    url: url(caminhoLocalizado(path, locale)),
    alternates: { languages },
    ...resto,
  }))
}

export default async function sitemap() {
  const agora = new Date()

  const estaticas = PAGINAS_INDEXAVEIS.flatMap((p) =>
    porIdioma(p.path, {
      lastModified: agora,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })
  )

  // O catálogo, os icônicos e os diferenciais são dados estáticos do repositório:
  // a data de alteração é a do deploy, que é o que `agora` representa aqui.
  const plataformas = PLATFORMS.flatMap((p) =>
    porIdioma(`/plataformas/${p.slug}`, {
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  )

  const iconicos = ICONICOS.flatMap((i) =>
    porIdioma(`/plataformas/projetos-iconicos/${i.slug}`, {
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  )

  const diferenciais = DIFERENCIAIS_COM_PAGINA.flatMap((d) =>
    porIdioma(`/solucoes/diferenciais/${d.slug}`, {
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  )

  // O Firestore é a única fonte que pode falhar aqui. Sitemap quebrado tira do
  // ar a descoberta do site inteiro, então a falha derruba só os posts.
  let artigos = []
  try {
    const posts = await listPublishedPosts()
    artigos = posts.flatMap((post) =>
      porIdioma(`/blog/${post.slug}`, {
        lastModified: new Date(post.updatedAt || post.publishedAt || agora),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    )
  } catch (error) {
    console.error('[sitemap] posts do blog indisponíveis:', error)
  }

  return [...estaticas, ...plataformas, ...iconicos, ...diferenciais, ...artigos]
}
