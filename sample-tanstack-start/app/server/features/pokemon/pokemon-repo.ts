import { db } from '~/server/db'
import { pokemonSpecies, type PokemonSpecies } from '~/server/db/schema'
import { eq } from 'drizzle-orm'

export async function findSpeciesById(id: number): Promise<PokemonSpecies | undefined> {
  return db.query.pokemonSpecies.findFirst({
    where: eq(pokemonSpecies.id, id),
  })
}

export async function upsertSpecies(species: PokemonSpecies): Promise<PokemonSpecies> {
  await db.insert(pokemonSpecies).values(species).onConflictDoNothing()
  return species
}
