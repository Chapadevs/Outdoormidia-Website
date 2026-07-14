import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase/admin'

const COLLECTION = 'posts'

function toIso(value) {
  return value instanceof Timestamp ? value.toDate().toISOString() : null
}

function serialize(doc) {
  const data = doc.data()
  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    coverImage: data.coverImage || '',
    coverAlt: data.coverAlt || '',
    content: data.content,
    status: data.status,
    author: data.author || '',
    tags: data.tags || [],
    publishedAt: toIso(data.publishedAt),
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  }
}

export async function listPublishedPosts() {
  const snap = await adminDb
    .collection(COLLECTION)
    .where('status', '==', 'published')
    .orderBy('publishedAt', 'desc')
    .get()
  return snap.docs.map(serialize)
}

export async function getPublishedPostBySlug(slug) {
  const snap = await adminDb
    .collection(COLLECTION)
    .where('status', '==', 'published')
    .where('slug', '==', slug)
    .limit(1)
    .get()
  return snap.empty ? null : serialize(snap.docs[0])
}

export async function listAllPosts() {
  const snap = await adminDb.collection(COLLECTION).orderBy('createdAt', 'desc').get()
  return snap.docs.map(serialize)
}

export async function getPostById(id) {
  const doc = await adminDb.collection(COLLECTION).doc(id).get()
  return doc.exists ? serialize(doc) : null
}

export async function isSlugTaken(slug, ignoreId = null) {
  const snap = await adminDb
    .collection(COLLECTION)
    .where('slug', '==', slug)
    .limit(2)
    .get()
  return snap.docs.some((doc) => doc.id !== ignoreId)
}

export async function createPost({ title, slug, excerpt, content, coverImage, coverAlt, status, author, tags }) {
  const now = FieldValue.serverTimestamp()
  const ref = await adminDb.collection(COLLECTION).add({
    title,
    slug,
    excerpt,
    content,
    coverImage: coverImage || '',
    coverAlt: coverAlt || '',
    status,
    author: author?.trim() || '',
    tags: tags || [],
    publishedAt: status === 'published' ? now : null,
    createdAt: now,
    updatedAt: now,
  })
  return ref.id
}

export async function updatePost(id, { title, slug, excerpt, content, coverImage, coverAlt, status, author, tags }) {
  const ref = adminDb.collection(COLLECTION).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null

  const current = doc.data()
  const update = {
    title,
    slug,
    excerpt,
    content,
    coverImage: coverImage || '',
    coverAlt: coverAlt || '',
    status,
    author: author?.trim() || '',
    tags: tags || [],
    updatedAt: FieldValue.serverTimestamp(),
  }
  if (status === 'published' && !current.publishedAt) {
    update.publishedAt = FieldValue.serverTimestamp()
  }
  await ref.update(update)
  return { previousSlug: current.slug }
}

export async function deletePost(id) {
  const ref = adminDb.collection(COLLECTION).doc(id)
  const doc = await ref.get()
  if (!doc.exists) return null
  await ref.delete()
  return { slug: doc.data().slug }
}
