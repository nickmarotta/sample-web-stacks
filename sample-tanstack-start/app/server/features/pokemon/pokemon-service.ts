import { findSpeciesById, upsertSpecies } from './pokemon-repo'

type PokeAPIResponse = {
  id: number
  name: string
  stats: Array<{ base_stat: number; stat: { name: string } }>
  sprites: { front_default: string }
  types: Array<{ type: { name: string } }>
}

export async function fetchAndCacheSpecies(speciesId: number) {
  const cached = await findSpeciesById(speciesId)
  if (cached) return cached

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesId}`)
  if (!res.ok) throw new Error(`PokeAPI error: ${res.status}`)
  const data: PokeAPIResponse = await res.json()

  const hpStat = data.stats.find((s) => s.stat.name === 'hp')
  const species = {
    id: data.id,
    name: data.name,
    baseHp: hpStat?.base_stat ?? 45,
    spriteUrl: data.sprites.front_default,
    types: JSON.stringify(data.types.map((t) => t.type.name)),
  }

  return upsertSpecies(species)
}

export function getRandomSpeciesId(): number {
  return Math.floor(Math.random() * 151) + 1
}
