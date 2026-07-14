import Link from 'next/link'
import TagBadge from '@/components/blog/TagBadge'
import { readingTimeLabel } from '@/lib/blog/readingTime'

const DATE_FMT = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' })

export default function PostCard({ post, tags = [] }) {
  return (
    <article className="reveal ticks flex flex-col overflow-hidden border border-line bg-white">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover"
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
