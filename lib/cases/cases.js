import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase/admin'

const COLLECTION = 'cases'

function toIso(value) {
  return value instanceof Timestamp ? value.toDate().toISOString() : null
}

function serialize(doc) {
  const data = doc.data()
  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    desc: data.desc,
    meta: data.meta || '',
    coverImage: data.coverImage || '',
    coverAlt: data.coverAlt || '',
    status: data.status,
    tags: data.tags || [],
    platforms: data.platforms || [],
    results: data.results || [],
    publishedAt: toIso(data.publishedAt),
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  }
}

function byPublishedAt(a, b) {
  return (b.publishedAt || '').localeCompare(a.publishedAt || '')
}

export async function listPublishedCases() {
  const snap = await adminDb.collection(COLLECTION).where('status', '==', 'published').get()
  return snap.docs.map(serialize).sort(byPublishedAt)
}

export async function getPublishedCasesByPlatform(platformSlug) {
  const cases = await listPublishedCases()
  return cases.filter((c) => c.platforms.includes(platformSlug))
}

export async function listAllCases() {
  const snap = await adminDb.collection(COLLECTION).orderBy('createdAt', 'desc').get()
  return snap.docs.map(serialize)
}

export async function getCaseById(id) {
  const doc = await adminDb.collection(COLLECTION).doc(id).get()
  return doc.exists ? serialize(doc) : null
}

export async function isCaseSlugTaken(slug, ignoreId = null) {
  const snap = await adminDb.collection(COLLECTION).where('slug', '==', slug).limit(2).get()
  return snap.docs.some((doc) => doc.id !== ignoreId)
}

function toDoc({ title, slug, desc, meta, coverImage, coverAlt, status, tags, platforms, results }) {
  return {
    title,
    slug,
    desc,
    meta: meta?.trim() || '',
    coverImage: coverImage || '',
    coverAlt: coverAlt || '',
    status,
    tags: tags || [],
    platforms: platforms || [],
    results: results || [],
  }
}

export async function createCase(body) {
  const now = FieldValue.serverTimestamp()
  const ref = await adminDb.collection(COLLECTION).add({
    ...toDoc(body),
    publishedAt: body.status === 'published' ? now : null,
    createdAt: now,
    updatedAt: now,
  })
  return ref.id
}

export async function updateCase(id, body) {
  const ref = adminDb.collection(COLLECTION).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null

  const current = doc.data()
  const update = { ...toDoc(body), updatedAt: FieldValue.serverTimestamp() }
  if (body.status === 'published' && !current.publishedAt) {
    update.publishedAt = FieldValue.serverTimestamp()
  }
  await ref.update(update)
  return { previousSlug: current.slug }
}

export async function deleteCase(id) {
  const ref = adminDb.collection(COLLECTION).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null
  await ref.delete()
  return { slug: doc.data().slug }
}
