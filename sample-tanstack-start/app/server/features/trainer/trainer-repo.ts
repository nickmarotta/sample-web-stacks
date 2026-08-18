import { db } from '~/server/db'
import { trainers, caughtPokemon, type CaughtPokemon, type PokemonSpecies } from '~/server/db/schema'
import { count, eq } from 'drizzle-orm'

export type CaughtPokemonWithSpecies = CaughtPokemon & { species: PokemonSpecies }

export async function findTrainerCollection(trainerId: number): Promise<CaughtPokemonWithSpecies[]> {
  return db.query.caughtPokemon.findMany({
    where: eq(caughtPokemon.trainerId, trainerId),
    with: { species: true },
    orderBy: (cp, { desc }) => [desc(cp.caughtAt)],
  })
}

export async function countTrainerCollection(trainerId: number): Promise<number> {
  const [row] = await db
    .select({ value: count() })
    .from(caughtPokemon)
    .where(eq(caughtPokemon.trainerId, trainerId))
  return row.value
}

export async function findCaughtPokemonById(pokemonId: number): Promise<CaughtPokemon | undefined> {
  return db.query.caughtPokemon.findFirst({
    where: eq(caughtPokemon.id, pokemonId),
  })
}

export async function updateActivePokemon(trainerId: number, pokemonId: number) {
  await db
    .update(trainers)
    .set({ activePokemonId: pokemonId })
    .where(eq(trainers.id, trainerId))
}
