import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import PostCard from '@/components/blog/PostCard'
import { listPublishedPosts } from '@/lib/blog/posts'
import { listTags } from '@/lib/tags/tags'

// Sem credenciais do Firestore (ex.: build no CI), a seção cai no estado vazio — a
// regeneração (ISR) preenche em runtime, onde as credenciais existem.
async function fetchLatest() {
  try {
    return await Promise.all([listPublishedPosts(), listTags('blog')])
  } catch {
    return [[], []]
  }
}

export default async function BlogTeaser() {
  const [posts, tags] = await fetchLatest()
  const latest = posts.slice(0, 3)
  const tagMap = new Map(tags.map((tag) => [tag.slug, tag]))

  // A grade é sempre de três colunas. Com um artigo só, ele deita e ocupa a linha
  // inteira, em vez de abrir a seção com dois terços de vazio. O acesso ao acervo
  // completo fica no rodapé da seção, com a contagem de publicados.
  const destaque = latest.length === 1

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="blog">
      <div className="wrap">
        <div className="reveal mb-[18px] flex items-end justify-between gap-5">
          <SectionHeading title="Blog" className="flex-1" />
          <Link
            className="eyebrow self-end whitespace-nowrap transition-colors duration-150 hover:text-orange"
            href="/blog/artigos"
          >
            Ver todos →
          </Link>
        </div>
        <p className="reveal mb-[34px] max-w-[62ch] text-lg text-ink-soft">
          Ideias, dados e estratégias de mídia exterior para colocar a sua marca nas ruas do
          Paraná e de Santa Catarina.
        </p>

        {latest.length === 0 ? (
          <p className="reveal text-lg text-ink-soft">
            Ainda não há artigos publicados. Volte em breve.
          </p>
        ) : (
          <>
            <div className="reveal grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
              {latest.map((post, i) => (
                <div
                  key={post.id}
                  className={destaque && i === 0 ? 'col-span-3 max-tab:col-span-2 max-mob:col-span-1' : ''}
                >
                  <PostCard
                    post={post}
                    tags={post.tags.map((slug) => tagMap.get(slug)).filter(Boolean)}
                    destaque={destaque && i === 0}
                  />
                </div>
              ))}
            </div>

            <div className="reveal mt-[34px] flex items-center justify-between gap-5 max-mob:flex-col max-mob:items-start">
              <span className="eyebrow text-ink-soft">
                {posts.length} {posts.length === 1 ? 'artigo publicado' : 'artigos publicados'}
              </span>
              <Link className="btn btn-ghost" href="/blog/artigos">
                Ver todos os artigos →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
