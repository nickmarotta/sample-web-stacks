import { fetchAndCacheSpecies, getRandomSpeciesId } from '../pokemon/pokemon-service'
import {
  findBattle,
  findBattleWithSpecies,
  findCaughtPokemonWithSpecies,
  findTrainerById,
  insertBattle,
  insertCaughtPokemon,
  setTrainerActivePokemon,
  updateBattle,
} from './battle-repo'

export async function startBattle(trainerId: number) {
  const trainer = await findTrainerById(trainerId)
  if (!trainer) throw new Error('Trainer not found')

  const speciesId = getRandomSpeciesId()
  const species = await fetchAndCacheSpecies(speciesId)

  const wildMaxHp = species.baseHp
  const starterMode = !trainer.activePokemonId

  let activeMaxHp: number | null = null
  let activeCurrentHp: number | null = null

  if (!starterMode && trainer.activePokemonId) {
    const activePokemon = await findCaughtPokemonWithSpecies(trainer.activePokemonId)
    if (activePokemon) {
      activeMaxHp = activePokemon.species.baseHp
      activeCurrentHp = activePokemon.species.baseHp
    }
  }

  return insertBattle({
    trainerId,
    speciesId: species.id,
    wildCurrentHp: wildMaxHp,
    wildMaxHp,
    activeCurrentHp,
    activeMaxHp,
    outcome: null,
  })
}

export async function getBattle(battleId: number, trainerId: number) {
  return findBattleWithSpecies(battleId, trainerId)
}

export async function attackWildPokemon(battleId: number, trainerId: number) {
  const battle = await findBattle(battleId, trainerId)
  if (!battle || battle.outcome) throw new Error('Battle not active')
  if (battle.activeCurrentHp === null)
    throw new Error('No active Pokémon in this battle')

  const wildDamage = Math.floor(Math.random() * 15) + 5
  const activeDamage = Math.floor(Math.random() * 20) + 10

  const newWildHp = Math.max(0, battle.wildCurrentHp - activeDamage)
  const newActiveHp = Math.max(0, battle.activeCurrentHp - wildDamage)

  const outcome = newActiveHp === 0 ? ('fainted' as const) : null

  await updateBattle(battleId, {
    wildCurrentHp: newWildHp,
    activeCurrentHp: newActiveHp,
    ...(outcome && { outcome }),
  })

  return { wildCurrentHp: newWildHp, activeCurrentHp: newActiveHp, outcome }
}

export async function attemptCatch(battleId: number, trainerId: number) {
  const battle = await findBattle(battleId, trainerId)
  if (!battle || battle.outcome) throw new Error('Battle not active')

  const hpRatio = battle.wildCurrentHp / battle.wildMaxHp
  const catchProb = 1 - hpRatio * 0.75
  const success = Math.random() < catchProb

  if (!success) return { caught: false as const }

  const caught = await insertCaughtPokemon(trainerId, battle.speciesId)

  await updateBattle(battleId, { outcome: 'caught' })

  const trainer = await findTrainerById(trainerId)
  if (!trainer?.activePokemonId) {
    await setTrainerActivePokemon(trainerId, caught.id)
  }

  return { caught: true as const, caughtPokemon: caught }
}

export async function fleeBattle(battleId: number, trainerId: number) {
  const battle = await findBattle(battleId, trainerId)
  if (!battle || battle.outcome) throw new Error('Battle not active')

  await updateBattle(battleId, { outcome: 'fled' })

  return { outcome: 'fled' as const }
}
