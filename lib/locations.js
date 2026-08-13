import { FieldValue } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase/admin'
import { toIso } from '@/lib/firebase/serialize'

const COLLECTION = 'locations'

const BOUNDS = { latMin: -29.6, latMax: -22.3, lngMin: -54.8, lngMax: -48.0 }

const MAX_FORMATS = 8

export const DEFAULT_LOCATIONS = [
  {
    id: 'curitiba',
    name: 'Curitiba',
    desc: 'Capital e principais corredores',
    lat: -25.43,
    lng: -49.27,
    formats: ['Outdoors Digitais', 'Front Lights', 'Projetos Icônicos', 'Mídia Indoor', 'MUB'],
  },
  {
    id: 'regiao-metropolitana',
    name: 'Região Metropolitana',
    desc: 'Campo Largo, São José dos Pinhais, Pinhais, Fazenda Rio Grande',
    lat: -25.53,
    lng: -49.2,
    formats: ['Front Lights', 'Outdoors Digitais', 'Aeroporto'],
  },
  {
    id: 'litoral-pr',
    name: 'Litoral do PR',
    desc: 'Praias e acessos de alta temporada',
    lat: -25.82,
    lng: -48.55,
    formats: ['Front Lights', 'Mídia Móvel'],
  },
  {
    id: 'rodovias',
    name: 'Rodovias',
    desc: 'Principais vias do estado',
    lat: -24.95,
    lng: -50.1,
    formats: ['Rodovias', 'Front Lights', 'Outdoors Digitais'],
  },
  {
    id: 'santa-catarina',
    name: 'Santa Catarina',
    desc: 'Itajaí, Joinville, Balneário Camboriú',
    lat: -26.91,
    lng: -48.66,
    formats: ['Outdoors Digitais', 'Front Lights', 'Rodovias'],
  },
]

function normalizeFormats(value) {
  if (!Array.isArray(value)) return []
  return value
    .map((format) => String(format).trim())
    .filter(Boolean)
    .slice(0, MAX_FORMATS)
}

function serialize(doc) {
  const data = doc.data()
  return {
    id: doc.id,
    name: data.name,
    desc: data.desc || '',
    lat: data.lat,
    lng: data.lng,
    formats: normalizeFormats(data.formats),
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  }
}

export async function getLocations() {
  try {
    const snap = await adminDb.collection(COLLECTION).orderBy('createdAt').get()
    if (snap.empty) return DEFAULT_LOCATIONS
    return snap.docs.map(serialize)
  } catch {
    return DEFAULT_LOCATIONS
  }
}

export async function listLocations() {
  const snap = await adminDb.collection(COLLECTION).orderBy('createdAt').get()
  return snap.docs.map(serialize)
}

export async function createLocation({ name, desc, lat, lng, formats }) {
  const now = FieldValue.serverTimestamp()
  const ref = await adminDb.collection(COLLECTION).add({
    name: name.trim(),
    desc: desc?.trim() || '',
    lat,
    lng,
    formats: normalizeFormats(formats),
    createdAt: now,
    updatedAt: now,
  })
  return ref.id
}

export async function updateLocation(id, { name, desc, lat, lng, formats }) {
  const ref = adminDb.collection(COLLECTION).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null
  await ref.update({
    name: name.trim(),
    desc: desc?.trim() || '',
    lat,
    lng,
    ...(formats === undefined ? {} : { formats: normalizeFormats(formats) }),
    updatedAt: FieldValue.serverTimestamp(),
  })
  return { id }
}

export async function deleteLocation(id) {
  const ref = adminDb.collection(COLLECTION).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null
  await ref.delete()
  return { id }
}

export function validateLocationBody(body) {
  if (!body || typeof body !== 'object') return 'Dados inválidos.'
  if (typeof body.name !== 'string' || !body.name.trim()) return 'Informe o nome da localidade.'
  if (body.name.trim().length > 80) return 'O nome deve ter no máximo 80 caracteres.'
  if (body.desc != null && typeof body.desc !== 'string') return 'Descrição inválida.'
  if (body.desc && body.desc.trim().length > 200) return 'A descrição deve ter no máximo 200 caracteres.'
  if (body.formats != null) {
    if (!Array.isArray(body.formats)) return 'Plataformas inválidas.'
    if (body.formats.length > MAX_FORMATS) return `Informe no máximo ${MAX_FORMATS} plataformas.`
    if (body.formats.some((format) => typeof format !== 'string')) return 'Plataformas inválidas.'
    if (body.formats.some((format) => format.trim().length > 40)) {
      return 'Cada plataforma deve ter no máximo 40 caracteres.'
    }
  }
  if (!Number.isFinite(body.lat) || !Number.isFinite(body.lng)) return 'Posição inválida. Clique no mapa para posicionar.'
  if (
    body.lat < BOUNDS.latMin ||
    body.lat > BOUNDS.latMax ||
    body.lng < BOUNDS.lngMin ||
    body.lng > BOUNDS.lngMax
  ) {
    return 'A posição precisa estar dentro do Paraná ou de Santa Catarina.'
  }
  return null
}
