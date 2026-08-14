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

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="blog">
      <div className="wrap">
        <div className="reveal mb-[34px] flex items-end justify-between gap-5">
          <SectionHeading num="07" title="Blog" className="flex-1" />
          <Link
            className="eyebrow self-end whitespace-nowrap transition-colors duration-150 hover:text-orange"
            href="/blog/artigos"
          >
            Ver todos →
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="reveal text-lg text-ink-soft">
            Ainda não há artigos publicados. Volte em breve.
          </p>
        ) : (
          <div className="reveal grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
            {latest.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                tags={post.tags.map((slug) => tagMap.get(slug)).filter(Boolean)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
