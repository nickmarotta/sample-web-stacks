import { clearSession, getSession, setSession } from '~/server/lib/session'
import { findTrainerById, findTrainerByUsername, insertTrainer } from './auth-repo'

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Buffer.from(hash).toString('hex')
}

export async function registerTrainer(username: string, password: string) {
  const existing = await findTrainerByUsername(username)
  if (existing) throw new Error('Username already taken')

  const passwordHash = await hashPassword(password)
  const trainer = await insertTrainer(username, passwordHash)

  await setSession({ trainerId: trainer.id, username: trainer.username })
  return trainer
}

export async function loginTrainer(username: string, password: string) {
  const trainer = await findTrainerByUsername(username)
  if (!trainer) throw new Error('Invalid credentials')
  const hash = await hashPassword(password)
  if (hash !== trainer.passwordHash) throw new Error('Invalid credentials')

  await setSession({ trainerId: trainer.id, username: trainer.username })
  return trainer
}

export async function logoutTrainer() {
  await clearSession()
}

export async function getCurrentTrainer() {
  const session = await getSession()
  if (!session?.trainerId) return null
  return findTrainerById(session.trainerId)
}
