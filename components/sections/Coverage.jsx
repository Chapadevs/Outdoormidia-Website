import SectionHeading from '@/components/ui/SectionHeading'
import CoverageMap from '@/components/ui/CoverageMap'
import { getLocations } from '@/lib/locations'
import { WHATSAPP_URL } from '@/lib/constants'

export default async function Coverage() {
  const locations = await getLocations()

  return (
    <section className="py-[110px] max-mob:py-[72px]" id="cobertura">
      <div className="wrap">
        <div className="grid grid-cols-[1fr_1.2fr] items-start gap-[50px] max-tab:grid-cols-1 max-tab:gap-[34px]">
          <div className="reveal">
            <SectionHeading num="04" title="Cobertura" rule={false} className="mb-[18px]" />
            <p className="mt-[18px] max-w-[38ch] text-lg text-ink-soft">
              Do centro de Curitiba ao litoral, das rodovias a Santa Catarina — uma malha de mídia
              que acompanha o fluxo de pessoas em toda a região Sul.
            </p>
            <a href={WHATSAPP_URL} className="btn mt-7">
              Consultar disponibilidade
            </a>
          </div>
          <div className="reveal">
            <CoverageMap locations={locations} />
            <ul className="m-0 mt-6 flex list-none flex-wrap gap-x-7 gap-y-2 p-0">
              {locations.map((loc) => (
                <li key={loc.id} className="text-[15px] font-extrabold tracking-[-0.01em]">
                  {loc.name}
                  {loc.desc && (
                    <span className="ml-2 font-normal text-ink-soft max-mob:hidden">
                      {loc.desc}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
