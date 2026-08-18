import { db } from '~/server/db'
import {
  battles,
  caughtPokemon,
  trainers,
  type Battle,
  type BattleInsert,
  type CaughtPokemon,
  type PokemonSpecies,
  type Trainer,
} from '~/server/db/schema'
import { and, eq } from 'drizzle-orm'

export type BattleWithSpecies = Battle & { species: PokemonSpecies }
export type CaughtPokemonWithSpecies = CaughtPokemon & { species: PokemonSpecies }

export async function findTrainerById(id: number): Promise<Trainer | undefined> {
  return db.query.trainers.findFirst({
    where: eq(trainers.id, id),
  })
}

export async function findBattle(battleId: number, trainerId: number): Promise<Battle | undefined> {
  return db.query.battles.findFirst({
    where: and(eq(battles.id, battleId), eq(battles.trainerId, trainerId)),
  })
}

export async function findBattleWithSpecies(battleId: number, trainerId: number): Promise<BattleWithSpecies | undefined> {
  return db.query.battles.findFirst({
    where: and(eq(battles.id, battleId), eq(battles.trainerId, trainerId)),
    with: { species: true },
  })
}

export async function findCaughtPokemonWithSpecies(pokemonId: number): Promise<CaughtPokemonWithSpecies | undefined> {
  return db.query.caughtPokemon.findFirst({
    where: eq(caughtPokemon.id, pokemonId),
    with: { species: true },
  })
}

export async function insertBattle(values: BattleInsert): Promise<Battle> {
  const [battle] = await db.insert(battles).values(values).returning()
  return battle
}

export async function updateBattle(
  battleId: number,
  values: Partial<Pick<Battle, 'wildCurrentHp' | 'activeCurrentHp' | 'outcome'>>,
) {
  await db.update(battles).set(values).where(eq(battles.id, battleId))
}

export async function insertCaughtPokemon(trainerId: number, speciesId: number): Promise<CaughtPokemon> {
  const [caught] = await db
    .insert(caughtPokemon)
    .values({ trainerId, speciesId })
    .returning()
  return caught
}

export async function setTrainerActivePokemon(trainerId: number, pokemonId: number) {
  await db
    .update(trainers)
    .set({ activePokemonId: pokemonId })
    .where(eq(trainers.id, trainerId))
}
