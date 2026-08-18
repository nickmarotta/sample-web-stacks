import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { getCurrentTrainer } from '../auth/auth-service'
import { getTrainerCollection, setActivePokemon } from './trainer-service'

export const fetchCollectionFn = createServerFn({ method: 'GET' }).handler(async () => {
  const trainer = await getCurrentTrainer()
  if (!trainer) throw redirect({ to: '/auth/login' })
  const collection = await getTrainerCollection(trainer.id)
  return { collection, trainer }
})

export const setActiveFn = createServerFn({ method: 'POST' })
  .validator((raw: unknown) => raw as { pokemonId: number })
  .handler(async ({ data }) => {
    const trainer = await getCurrentTrainer()
    if (!trainer) throw redirect({ to: '/auth/login' })
    await setActivePokemon(trainer.id, data.pokemonId)
    return { success: true }
  })
