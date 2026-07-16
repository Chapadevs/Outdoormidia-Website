import Breadcrumb from '@/components/ui/Breadcrumb'
import LocationsManager from '@/components/forms/LocationsManager'
import { listLocations } from '@/lib/locations'

export const metadata = {
  title: 'Cobertura — Painel Admin — Outdoormídia',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminLocationsPage() {
  const locations = await listLocations()

  return (
    <section className="pb-[72px] pt-6 max-mob:pb-12">
      <Breadcrumb items={[{ label: 'Painel Admin', href: '/admin' }, { label: 'Cobertura' }]} />
      <div className="wrap mt-9">
        <div className="eyebrow">
          Painel <b>Cobertura</b>
        </div>
        <h1 className="display mt-3 text-[clamp(36px,5vw,64px)] text-ink">Mapa de praças</h1>
        <p className="mt-4 max-w-[56ch] text-lg text-ink-soft">
          Marque no mapa as localidades onde a Outdoormídia atua. Elas aparecem na seção de
          cobertura da página inicial.
        </p>
        <div className="mt-10">
          <LocationsManager locations={locations} />
        </div>
      </div>
    </section>
  )
}
