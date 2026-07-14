import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

function initAdminApp() {
  if (getApps().length) return getApp()

  const projectId =
    process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const storageBucket =
    process.env.FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`

  // Em dev, FIREBASE_*_EMULATOR_HOST faz o Admin SDK falar com os emuladores —
  // sem necessidade de service-account. Em produção (GCP), usa Application
  // Default Credentials; se um service-account JSON for fornecido via env, usa-o.
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  if (serviceAccount) {
    return initializeApp({
      credential: cert(JSON.parse(serviceAccount)),
      projectId,
      storageBucket,
    })
  }

  return initializeApp({ projectId, storageBucket })
}

const adminApp = initAdminApp()

export const adminAuth = getAuth(adminApp)
export const adminDb = getFirestore(adminApp)
export const adminBucket = getStorage(adminApp).bucket()
