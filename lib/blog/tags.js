import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase/admin'
import { slugify } from '@/lib/blog/slugify'
import { TAG_GROUPS } from '@/lib/blog/tagGroups'

const COLLECTION = 'tags'
const POSTS_COLLECTION = 'posts'

const GROUP_ORDER = new Map(TAG_GROUPS.map((group, index) => [group.id, index]))

function toIso(value) {
  return value instanceof Timestamp ? value.toDate().toISOString() : null
}

function serialize(doc) {
  const data = doc.data()
  return {
    slug: doc.id,
    name: data.name,
    group: data.group,
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  }
}

function sortTags(tags) {
  return tags.sort((a, b) => {
    const groupDiff = (GROUP_ORDER.get(a.group) ?? 99) - (GROUP_ORDER.get(b.group) ?? 99)
    return groupDiff !== 0 ? groupDiff : a.name.localeCompare(b.name, 'pt-BR')
  })
}

export async function listTags() {
  const snap = await adminDb.collection(COLLECTION).get()
  return sortTags(snap.docs.map(serialize))
}

export async function getTagsBySlugs(slugs) {
  if (!slugs?.length) return []
  const refs = slugs.map((slug) => adminDb.collection(COLLECTION).doc(slug))
  const docs = await adminDb.getAll(...refs)
  return sortTags(docs.filter((doc) => doc.exists).map(serialize))
}

export async function createTag({ name, group }) {
  const slug = slugify(name)
  if (!slug) return null

  const ref = adminDb.collection(COLLECTION).doc(slug)
  const doc = await ref.get()
  if (doc.exists) return null

  const now = FieldValue.serverTimestamp()
  await ref.set({ name: name.trim(), group, createdAt: now, updatedAt: now })
  return slug
}

export async function updateTag(slug, { name, group }) {
  const ref = adminDb.collection(COLLECTION).doc(slug)
  const doc = await ref.get()
  if (!doc.exists) return null

  await ref.update({ name: name.trim(), group, updatedAt: FieldValue.serverTimestamp() })
  return { slug }
}

export async function deleteTag(slug) {
  const ref = adminDb.collection(COLLECTION).doc(slug)
  const doc = await ref.get()
  if (!doc.exists) return null

  await ref.delete()

  const posts = await adminDb
    .collection(POSTS_COLLECTION)
    .where('tags', 'array-contains', slug)
    .get()
  if (!posts.empty) {
    const batch = adminDb.batch()
    posts.docs.forEach((postDoc) => {
      batch.update(postDoc.ref, {
        tags: FieldValue.arrayRemove(slug),
        updatedAt: FieldValue.serverTimestamp(),
      })
    })
    await batch.commit()
  }

  return { slug }
}
