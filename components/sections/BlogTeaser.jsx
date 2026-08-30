import Link from 'next/link'
import { ChevronRight, Newspaper } from 'lucide-react'
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

  // A grade é sempre de três colunas. Com um artigo só, ele deita e ocupa duas
  // delas; a porta para a listagem fecha a linha. É o que impede a seção de abrir
  // com dois terços de vazio enquanto o blog não tem volume.
  const destaque = latest.length === 1
  const porta = latest.length > 0 && latest.length < 3

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
          <div className="reveal grid grid-cols-3 gap-[18px] max-tab:grid-cols-2 max-mob:grid-cols-1">
            {latest.map((post, i) => (
              <div
                key={post.id}
                className={destaque && i === 0 ? 'col-span-2 max-tab:col-span-1' : ''}
              >
                <PostCard
                  post={post}
                  tags={post.tags.map((slug) => tagMap.get(slug)).filter(Boolean)}
                  destaque={destaque && i === 0}
                />
              </div>
            ))}

            {porta && (
              <Link
                href="/blog/artigos"
                className="group flex flex-col justify-between gap-8 rounded-[16px] border border-line bg-bone p-8 transition duration-200 hover:-translate-y-1 hover:border-orange/45 max-mob:p-6"
              >
                <span className="grid size-12 place-items-center rounded-[10px] border border-line bg-paper text-orange">
                  <Newspaper size={24} />
                </span>
                <span>
                  <span className="eyebrow block">Blog</span>
                  <span className="mt-2 block text-[21px] font-extrabold leading-[1.15] text-ink transition-colors duration-150 group-hover:text-orange">
                    Todos os artigos
                  </span>
                  <span className="mt-2 block text-[15px] leading-[1.55] text-ink-soft">
                    Audiência, formatos e praças, explicados por quem opera a rede há 67 anos.
                  </span>
                </span>
                <span className="flex items-center justify-between gap-4">
                  <span className="eyebrow">
                    {posts.length} {posts.length === 1 ? 'artigo publicado' : 'artigos publicados'}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-2 text-ink transition-colors duration-200 group-hover:border-orange group-hover:text-orange">
                    <ChevronRight size={18} />
                  </span>
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
