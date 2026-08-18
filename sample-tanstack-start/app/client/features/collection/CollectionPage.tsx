import { useRouter } from '@tanstack/react-router'
import { setActiveFn } from '~/server/features/trainer/trainer-controller'
import { Button, Card, TypeBadge } from '~/client/ui'

interface Pokemon {
  id: number
  nickname: string | null
  species: {
    name: string
    spriteUrl: string
    types: string
  }
}

interface CollectionPageProps {
  collection: Pokemon[]
  trainer: { activePokemonId: number | null }
}

export function CollectionPage({ collection, trainer }: CollectionPageProps) {
  const router = useRouter()

  async function handleSetActive(pokemonId: number) {
    await setActiveFn({ data: { pokemonId } })
    router.invalidate()
  }

  if (collection.length === 0) {
    return (
      <div className="space-y-4 font-mono">
        <h1 className="text-2xl font-bold uppercase">Your Collection</h1>
        <Card>
          <p className="text-sm">
            You haven't caught any Pokémon yet.{' '}
            <a href="/" className="underline hover:text-gray-600">
              Go on an Encounter!
            </a>
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 font-mono">
      <h1 className="text-2xl font-bold uppercase">Your Collection</h1>
      <p className="text-xs font-bold">{collection.length} Pokémon caught</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {collection.map((pokemon) => {
          const isActive = trainer.activePokemonId === pokemon.id
          const types: string[] = JSON.parse(pokemon.species.types)
          return (
            <Card key={pokemon.id} variant={isActive ? 'active' : 'default'} className="p-4">
              <img
                src={pokemon.species.spriteUrl}
                alt={pokemon.species.name}
                className="w-16 h-16 mx-auto"
                style={{ imageRendering: 'pixelated' }}
              />
              <p className="text-center font-bold uppercase text-xs mt-2">
                {pokemon.nickname ?? pokemon.species.name}
              </p>
              <div className="flex gap-1 justify-center flex-wrap mt-2">
                {types.map((t) => (
                  <TypeBadge key={t} type={t} />
                ))}
              </div>
              {isActive ? (
                <p className="text-[10px] text-center text-red-700 font-bold mt-2">
                  ACTIVE
                </p>
              ) : (
                <Button
                  variant="menu"
                  onClick={() => handleSetActive(pokemon.id)}
                  className="w-full justify-center mt-2 text-[10px]"
                >
                  Set Active
                </Button>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
