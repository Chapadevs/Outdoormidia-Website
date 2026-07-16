import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase/admin'
import { slugify } from '@/lib/slugify'
import { scopedDocId } from '@/lib/tags/scopes'
import { listTagGroups } from '@/lib/tags/groups'

const COLLECTION = 'tags'

// Coleções que referenciam tags por escopo em um campo `tags` — na exclusão
// de uma tag, a referência é removida dos documentos correspondentes.
const TAGGED_COLLECTIONS = {
  blog: 'posts',
  cases: 'cases',
}

function toIso(value) {
  return value instanceof Timestamp ? value.toDate().toISOString() : null
}

function serialize(doc) {
  const data = doc.data()
  return {
    slug: data.slug,
    name: data.name,
    group: data.group,
    scope: data.scope,
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  }
}

function sortTags(tags, groups) {
  const order = new Map(groups.map((group) => [group.slug, group.order]))
  return tags.sort((a, b) => {
    const groupDiff = (order.get(a.group) ?? 99) - (order.get(b.group) ?? 99)
    return groupDiff !== 0 ? groupDiff : a.name.localeCompare(b.name, 'pt-BR')
  })
}

export async function listTags(scope) {
  const [snap, groups] = await Promise.all([
    adminDb.collection(COLLECTION).where('scope', '==', scope).get(),
    listTagGroups(scope),
  ])
  return sortTags(snap.docs.map(serialize), groups)
}

export async function getTagsBySlugs(scope, slugs) {
  if (!slugs?.length) return []
  const refs = slugs.map((slug) => adminDb.collection(COLLECTION).doc(scopedDocId(scope, slug)))
  const [docs, groups] = await Promise.all([adminDb.getAll(...refs), listTagGroups(scope)])
  return sortTags(
    docs.filter((doc) => doc.exists).map(serialize),
    groups
  )
}

export async function createTag(scope, { name, group }) {
  const slug = slugify(name)
  if (!slug) return null

  const ref = adminDb.collection(COLLECTION).doc(scopedDocId(scope, slug))
  const doc = await ref.get()
  if (doc.exists) return null

  const now = FieldValue.serverTimestamp()
  await ref.set({ scope, slug, name: name.trim(), group, createdAt: now, updatedAt: now })
  return slug
}

export async function updateTag(scope, slug, { name, group }) {
  const ref = adminDb.collection(COLLECTION).doc(scopedDocId(scope, slug))
  const doc = await ref.get()
  if (!doc.exists) return null

  await ref.update({ name: name.trim(), group, updatedAt: FieldValue.serverTimestamp() })
  return { slug }
}

export async function deleteTag(scope, slug) {
  const ref = adminDb.collection(COLLECTION).doc(scopedDocId(scope, slug))
  const doc = await ref.get()
  if (!doc.exists) return null

  await ref.delete()

  const collection = TAGGED_COLLECTIONS[scope]
  if (!collection) return { slug }

  const tagged = await adminDb
    .collection(collection)
    .where('tags', 'array-contains', slug)
    .get()
  if (!tagged.empty) {
    const batch = adminDb.batch()
    tagged.docs.forEach((taggedDoc) => {
      batch.update(taggedDoc.ref, {
        tags: FieldValue.arrayRemove(slug),
        updatedAt: FieldValue.serverTimestamp(),
      })
    })
    await batch.commit()
  }

  return { slug }
}
