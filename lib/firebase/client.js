import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)

if (
  process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true' &&
  typeof window !== 'undefined' &&
  !globalThis.__FIREBASE_AUTH_EMULATOR_CONNECTED__
) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  globalThis.__FIREBASE_AUTH_EMULATOR_CONNECTED__ = true
}
