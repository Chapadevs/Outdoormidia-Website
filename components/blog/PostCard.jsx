import Link from 'next/link'
import Image from 'next/image'
import TagBadge from '@/components/blog/TagBadge'
import { readingTimeLabel } from '@/lib/blog/readingTime'
import { DATA_LONGA } from '@/lib/format'

const CARD_SIZES = '(max-width: 560px) 100vw, (max-width: 980px) 50vw, 400px'
const DESTAQUE_SIZES = '(max-width: 980px) 100vw, 620px'

// `destaque` deita o card: capa à esquerda, texto à direita, título maior. É o
// formato de quem abre a listagem quando não há três artigos para encher a grade.
export default function PostCard({ post, tags = [], destaque = false }) {
  const href = `/blog/${post.slug}`
  const leitura = readingTimeLabel(post.content)

  return (
    <article
      className={`ticks group relative overflow-hidden rounded-[16px] border border-line bg-white transition duration-200 hover:-translate-y-1 hover:border-orange/45 ${
        destaque ? 'grid grid-cols-2 max-tab:grid-cols-1' : 'flex flex-col'
      }`}
    >
      <div
        className={`relative overflow-hidden bg-bone ${
          destaque ? 'h-full min-h-[260px] max-tab:aspect-[16/9] max-tab:h-auto' : 'aspect-[16/9]'
        }`}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            fill
            sizes={destaque ? DESTAQUE_SIZES : CARD_SIZES}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-[11px] font-bold uppercase tracking-[0.16em] text-line-2">
            Outdoormídia
          </span>
        )}
        {leitura && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-[2px]">
            {leitura}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col gap-3 ${destaque ? 'p-8 max-mob:p-6' : 'p-6'}`}>
        {post.publishedAt && (
          <span className="eyebrow">{DATA_LONGA.format(new Date(post.publishedAt))}</span>
        )}
        <h3
          className={`m-0 font-extrabold leading-[1.15] ${
            destaque ? 'text-[clamp(24px,2.6vw,32px)]' : 'text-[21px]'
          }`}
        >
          {/* Link esticado: a área clicável é o card inteiro, e quem usa leitor de
              tela recebe um alvo só, com o título como rótulo. */}
          <Link
            href={href}
            className="text-ink transition-colors duration-150 before:absolute before:inset-0 before:content-[''] group-hover:text-orange"
          >
            {post.title}
          </Link>
        </h3>
        {post.author && <p className="m-0 text-sm text-ink-soft">Por {post.author}</p>}
        <p
          className={`m-0 leading-[1.55] text-ink-soft ${destaque ? 'text-[17px]' : 'text-[15px]'}`}
        >
          {post.excerpt}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag.slug} tag={tag} />
            ))}
          </div>
        )}
        <span className="mt-auto flex items-center gap-2 pt-2 text-sm font-bold uppercase tracking-[0.1em] text-orange">
          Ler artigo
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </article>
  )
}
