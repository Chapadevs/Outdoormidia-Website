import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

function initAdminApp() {
  if (getApps().length) return getApp()

  const projectId =
    process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

  // Em dev, FIREBASE_AUTH_EMULATOR_HOST faz o Admin SDK falar com o emulador —
  // sem necessidade de service-account. Em produção (GCP), usa Application
  // Default Credentials; se um service-account JSON for fornecido via env, usa-o.
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  if (serviceAccount) {
    return initializeApp({ credential: cert(JSON.parse(serviceAccount)), projectId })
  }

  return initializeApp({ projectId })
}

export const adminAuth = getAuth(initAdminApp())
