import CoverageExplorer from '@/components/sections/CoverageExplorer'

export default function Coverage() {
  return (
    <section className="py-[110px] max-mob:py-[72px]" id="cobertura">
      <div className="wrap">
        <CoverageExplorer moldura={false} eyebrow={null} />
      </div>
    </section>
  )
}
