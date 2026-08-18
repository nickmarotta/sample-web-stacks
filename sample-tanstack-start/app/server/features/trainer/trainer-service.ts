import { findCaughtPokemonById, findTrainerCollection, updateActivePokemon } from './trainer-repo'

export async function getTrainerCollection(trainerId: number) {
  return findTrainerCollection(trainerId)
}

export async function setActivePokemon(trainerId: number, pokemonId: number) {
  const pokemon = await findCaughtPokemonById(pokemonId)
  if (!pokemon || pokemon.trainerId !== trainerId)
    throw new Error('Not your Pokémon')

  await updateActivePokemon(trainerId, pokemonId)
}
