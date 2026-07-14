import crypto from 'node:crypto'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/api/adminGuard'
import { adminBucket } from '@/lib/firebase/admin'
import { publicStorageUrl } from '@/lib/firebase/storage'
import { slugify } from '@/lib/blog/slugify'

export const runtime = 'nodejs'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024

export async function POST(request) {
  const { claims, response } = await requireAdmin()
  if (!claims) return response

  const formData = await request.formData().catch(() => null)
  const file = formData?.get('file')
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Formato não suportado. Use JPG, PNG, WebP ou GIF.' },
      { status: 400 }
    )
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'Imagem muito grande (máx. 5 MB).' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const ext = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : 'jpg'
  const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'imagem'
  const path = `blog/${Date.now()}-${base}.${ext}`
  const token = crypto.randomUUID()

  await adminBucket.file(path).save(buffer, {
    metadata: {
      contentType: file.type,
      metadata: { firebaseStorageDownloadTokens: token },
    },
  })

  return NextResponse.json({ url: publicStorageUrl(adminBucket.name, path, token) })
}
