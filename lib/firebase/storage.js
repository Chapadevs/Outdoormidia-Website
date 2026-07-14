// URL pública de um objeto do Storage no formato do Firebase (com token de
// download). No emulador a URL aponta para localhost; em produção, para
// firebasestorage.googleapis.com.
export function publicStorageUrl(bucketName, path, token) {
  const emulatorHost = process.env.FIREBASE_STORAGE_EMULATOR_HOST
  const base = emulatorHost
    ? `http://${emulatorHost}`
    : 'https://firebasestorage.googleapis.com'
  return `${base}/v0/b/${bucketName}/o/${encodeURIComponent(path)}?alt=media&token=${token}`
}
