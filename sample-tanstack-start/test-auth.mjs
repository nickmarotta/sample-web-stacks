import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './app/db/schema.ts'
import { eq } from 'drizzle-orm'

const client = new Database('./pokemon.db')
const db = drizzle(client, { schema })

async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Buffer.from(hash).toString('hex')
}

async function testRegister(username, password) {
  console.log(`\n=== Testing register: ${username} ===`)

  const existing = await db.query.trainers.findFirst({
    where: eq(schema.trainers.username, username),
  })

  if (existing) {
    console.log('❌ User already exists:', existing)
    return null
  }

  const passwordHash = await hashPassword(password)
  console.log('Password hash:', passwordHash)

  const [trainer] = await db
    .insert(schema.trainers)
    .values({ username, passwordHash })
    .returning()

  console.log('✅ Registered:', trainer)
  return trainer
}

async function testLogin(username, password) {
  console.log(`\n=== Testing login: ${username} ===`)

  const trainer = await db.query.trainers.findFirst({
    where: eq(schema.trainers.username, username),
  })

  if (!trainer) {
    console.log('❌ User not found')
    return false
  }

  console.log('Found trainer:', { id: trainer.id, username: trainer.username })

  const hash = await hashPassword(password)
  console.log('Computed hash:', hash)
  console.log('Stored hash:  ', trainer.passwordHash)
  console.log('Match:', hash === trainer.passwordHash)

  return hash === trainer.passwordHash
}

// Test with a new user
const testUser = `testuser${Date.now()}`
await testRegister(testUser, 'password123')
await testLogin(testUser, 'password123')
await testLogin(testUser, 'wrongpassword')

// Test with existing user 'nick'
await testLogin('nick', 'password123')

client.close()
