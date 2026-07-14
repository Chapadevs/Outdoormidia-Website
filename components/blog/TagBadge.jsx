export default function TagBadge({ tag }) {
  return (
    <span className="rounded-[2px] border border-orange/50 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-orange">
      {tag.name}
    </span>
  )
}
