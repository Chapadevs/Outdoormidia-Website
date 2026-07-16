import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase/admin'
import { slugify } from '@/lib/slugify'
import { scopedDocId } from '@/lib/tags/scopes'

const COLLECTION = 'tagGroups'
const TAGS_COLLECTION = 'tags'

function toIso(value) {
  return value instanceof Timestamp ? value.toDate().toISOString() : null
}

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

export async function listTagGroups(scope) {
  const snap = await adminDb.collection(COLLECTION).where('scope', '==', scope).get()
  return snap.docs.map(serialize).sort((a, b) => a.order - b.order)
}

export async function createTagGroup(scope, { label }) {
  const slug = slugify(label)
  if (!slug) return null

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
  const ref = adminDb.collection(COLLECTION).doc(scopedDocId(scope, slug))
  const doc = await ref.get()
  if (!doc.exists) return null

  await ref.update({ label: label.trim(), updatedAt: FieldValue.serverTimestamp() })
  return { slug }
}

export async function deleteTagGroup(scope, slug) {
  const ref = adminDb.collection(COLLECTION).doc(scopedDocId(scope, slug))
  const doc = await ref.get()
  if (!doc.exists) return null

  const snap = await adminDb.collection(TAGS_COLLECTION).where('scope', '==', scope).get()
  const count = snap.docs.filter((tagDoc) => tagDoc.data().group === slug).length
  if (count > 0) return { error: 'has-tags', count }

  await ref.delete()
  return { slug }
}
