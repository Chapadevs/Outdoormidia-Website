import Link from 'next/link'
import Image from 'next/image'
import TagBadge from '@/components/blog/TagBadge'
import { readingTimeLabel } from '@/lib/blog/readingTime'

const DATE_FMT = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' })
const CARD_SIZES = '(max-width: 560px) 100vw, (max-width: 980px) 50vw, 400px'

export default function PostCard({ post, tags = [] }) {
  return (
    <article className="ticks flex flex-col overflow-hidden rounded-[16px] border border-line bg-white">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] w-full">
          <Image
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            fill
            sizes={CARD_SIZES}
            className="object-cover"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {post.publishedAt && (
          <span className="eyebrow">
            {DATE_FMT.format(new Date(post.publishedAt))} · {readingTimeLabel(post.content)}
          </span>
        )}
        <h3 className="m-0 text-[21px] font-extrabold leading-[1.15]">
          <Link
            href={`/blog/${post.slug}`}
            className="text-ink transition duration-150 hover:text-orange"
          >
            {post.title}
          </Link>
        </h3>
        {post.author && <p className="m-0 text-sm text-ink-soft">Por {post.author}</p>}
        <p className="m-0 text-[15px] leading-[1.55] text-ink-soft">{post.excerpt}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag.slug} tag={tag} />
            ))}
          </div>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto pt-2 text-sm font-bold uppercase tracking-[0.1em] text-orange hover:text-ink"
        >
          Ler artigo →
        </Link>
      </div>
    </article>
  )
}
