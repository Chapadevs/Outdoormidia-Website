import { SITE_URL } from '@/lib/constants'
import { PAGINAS_INDEXAVEIS } from '@/lib/seo'
import { PLATFORMS } from '@/lib/platforms'
import { ICONICOS } from '@/lib/iconicos'
import { DIFERENCIAIS } from '@/lib/diferenciais'
import { listPublishedPosts } from '@/lib/blog/posts'

// Reconstruído a cada hora junto com o ISR das rotas de conteúdo.
export const revalidate = 3600

const url = (path) => `${SITE_URL}${path}`

export default async function sitemap() {
  const agora = new Date()

  const estaticas = PAGINAS_INDEXAVEIS.map((p) => ({
    url: url(p.path),
    lastModified: agora,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))

  // O catálogo, os icônicos e os diferenciais são dados estáticos do repositório:
  // a data de alteração é a do deploy, que é o que `agora` representa aqui.
  const plataformas = PLATFORMS.map((p) => ({
    url: url(`/plataformas/${p.slug}`),
    lastModified: agora,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const iconicos = ICONICOS.map((i) => ({
    url: url(`/plataformas/projetos-iconicos/${i.slug}`),
    lastModified: agora,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const diferenciais = DIFERENCIAIS.map((d) => ({
    url: url(`/solucoes/diferenciais/${d.slug}`),
    lastModified: agora,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // O Firestore é a única fonte que pode falhar aqui. Sitemap quebrado tira do
  // ar a descoberta do site inteiro, então a falha derruba só os posts.
  let artigos = []
  try {
    const posts = await listPublishedPosts()
    artigos = posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt || post.publishedAt || agora),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  } catch (error) {
    console.error('[sitemap] posts do blog indisponíveis:', error)
  }

  return [...estaticas, ...plataformas, ...iconicos, ...diferenciais, ...artigos]
}
