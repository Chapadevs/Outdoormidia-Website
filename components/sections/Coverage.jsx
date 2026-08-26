import CoverageExplorer from '@/components/sections/CoverageExplorer'
import { getLocations } from '@/lib/locations'

export default async function Coverage() {
  const locations = await getLocations()

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="cobertura">
      <div className="wrap">
        <CoverageExplorer locations={locations} num="04" />
      </div>
    </section>
  )
}
