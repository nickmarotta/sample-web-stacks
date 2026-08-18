import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { getCurrentTrainer } from '../auth/auth-service'
import { findCaughtPokemonWithSpecies } from './battle-repo'
import {
  attackWildPokemon,
  attemptCatch,
  fleeBattle,
  getBattle,
  startBattle,
} from './battle-service'

export const fetchBattle = createServerFn({ method: 'GET' })
  .validator((raw: unknown) => raw as { battleId: string })
  .handler(async ({ data }) => {
    const trainer = await getCurrentTrainer()
    if (!trainer) throw redirect({ to: '/auth/login' })
    const battle = await getBattle(parseInt(data.battleId, 10), trainer.id)
    if (!battle) throw redirect({ to: '/' })
    const starterMode = !trainer.activePokemonId

    let activePokemon = null
    if (trainer.activePokemonId) {
      activePokemon = await findCaughtPokemonWithSpecies(trainer.activePokemonId)
    }

    return { battle, trainer, starterMode, activePokemon }
  })

export const attackFn = createServerFn({ method: 'POST' })
  .validator((raw: unknown) => raw as { battleId: number })
  .handler(async ({ data }) => {
    const trainer = await getCurrentTrainer()
    if (!trainer) throw redirect({ to: '/auth/login' })
    return attackWildPokemon(data.battleId, trainer.id)
  })

export const catchFn = createServerFn({ method: 'POST' })
  .validator((raw: unknown) => raw as { battleId: number })
  .handler(async ({ data }) => {
    const trainer = await getCurrentTrainer()
    if (!trainer) throw redirect({ to: '/auth/login' })
    return attemptCatch(data.battleId, trainer.id)
  })

export const fleeFn = createServerFn({ method: 'POST' })
  .validator((raw: unknown) => raw as { battleId: number })
  .handler(async ({ data }) => {
    const trainer = await getCurrentTrainer()
    if (!trainer) throw redirect({ to: '/auth/login' })
    return fleeBattle(data.battleId, trainer.id)
  })

export const startEncounterFn = createServerFn({ method: 'POST' }).handler(async () => {
  const trainer = await getCurrentTrainer()
  if (!trainer) throw redirect({ to: '/auth/login' })
  const battle = await startBattle(trainer.id)
  return { battleId: String(battle.id) }
})
