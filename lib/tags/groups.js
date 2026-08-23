import { cache } from 'react'
import { FieldValue } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase/admin'
import { toIso } from '@/lib/firebase/serialize'
import { slugify } from '@/lib/slugify'
import { scopedDocId } from '@/lib/tags/scopes'
import { gruposObrigatorios, isGrupoObrigatorio } from '@/lib/tags/obrigatorios'

const COLLECTION = 'tagGroups'
const TAGS_COLLECTION = 'tags'

function serialize(doc) {
  const data = doc.data()
  return {
    slug: data.slug,
    label: data.label,
    scope: data.scope,
    order: data.order ?? 0,
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  }
}

// cache() memoiza por request: listTags() já chama esta função internamente, e
// as páginas de blog e cases também a chamam direto — sem isso, duas queries.
export const listTagGroups = cache(async (scope) => {
  const snap = await adminDb.collection(COLLECTION).where('scope', '==', scope).get()
  const salvos = snap.docs
    .map(serialize)
    .filter((group) => !isGrupoObrigatorio(scope, group.slug))
    .sort((a, b) => a.order - b.order)

  // Os obrigatórios vêm antes e com `order` negativo — não têm doc no Firestore,
  // mas precisam ordenar junto com os demais em sortTags().
  const fixos = gruposObrigatorios(scope)
  const obrigatorios = fixos.map((group, i) => ({
    ...group,
    scope,
    order: i - fixos.length,
    obrigatorio: true,
    createdAt: null,
    updatedAt: null,
  }))

  return [...obrigatorios, ...salvos]
})

export async function createTagGroup(scope, { label }) {
  const slug = slugify(label)
  if (!slug) return null
  if (isGrupoObrigatorio(scope, slug)) return null

  const ref = adminDb.collection(COLLECTION).doc(scopedDocId(scope, slug))
  const doc = await ref.get()
  if (doc.exists) return null

  const groups = await listTagGroups(scope)
  const order = groups.reduce((max, group) => Math.max(max, group.order), -1) + 1

  const now = FieldValue.serverTimestamp()
  await ref.set({ scope, slug, label: label.trim(), order, createdAt: now, updatedAt: now })
  return slug
}

export async function updateTagGroup(scope, slug, { label }) {
  if (isGrupoObrigatorio(scope, slug)) return { error: 'obrigatorio' }

  const ref = adminDb.collection(COLLECTION).doc(scopedDocId(scope, slug))
  const doc = await ref.get()
  if (!doc.exists) return null

  await ref.update({ label: label.trim(), updatedAt: FieldValue.serverTimestamp() })
  return { slug }
}

export async function deleteTagGroup(scope, slug) {
  if (isGrupoObrigatorio(scope, slug)) return { error: 'obrigatorio' }

  const ref = adminDb.collection(COLLECTION).doc(scopedDocId(scope, slug))
  const doc = await ref.get()
  if (!doc.exists) return null

  const snap = await adminDb.collection(TAGS_COLLECTION).where('scope', '==', scope).get()
  const count = snap.docs.filter((tagDoc) => tagDoc.data().group === slug).length
  if (count > 0) return { error: 'has-tags', count }

  await ref.delete()
  return { slug }
}
