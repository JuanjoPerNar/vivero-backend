import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from './secrets/serviceAccountKey.json' assert { type: "json" }

const app = initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore(app)

export { db }
