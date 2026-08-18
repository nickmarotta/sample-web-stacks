import { db } from '~/server/db'
import { trainers, type Trainer } from '~/server/db/schema'
import { eq } from 'drizzle-orm'

export async function findTrainerByUsername(username: string): Promise<Trainer | undefined> {
  return db.query.trainers.findFirst({
    where: eq(trainers.username, username),
  })
}

export async function findTrainerById(id: number): Promise<Trainer | undefined> {
  return db.query.trainers.findFirst({
    where: eq(trainers.id, id),
  })
}

export async function insertTrainer(username: string, passwordHash: string): Promise<Trainer> {
  const [trainer] = await db
    .insert(trainers)
    .values({ username, passwordHash })
    .returning()
  return trainer
}
