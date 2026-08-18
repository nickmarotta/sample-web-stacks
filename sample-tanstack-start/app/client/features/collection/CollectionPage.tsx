import { useRouter } from '@tanstack/react-router'
import { setActiveFn } from '~/server/features/trainer/trainer-controller'
import { Button, Card, TypeBadge, Text } from '~/client/ui'

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
        <Text variant="pageTitle">Your Collection</Text>
        <Card>
          <Text variant="body">
            You haven't caught any Pokémon yet.{' '}
            <Text variant="link" as="a" href="/">
              Go on an Encounter!
            </Text>
          </Text>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 font-mono">
      <Text variant="pageTitle">Your Collection</Text>
      <Text variant="bodySmall" className="font-bold">{collection.length} Pokémon caught</Text>
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
              <Text variant="label" className="text-center mt-2">
                {pokemon.nickname ?? pokemon.species.name}
              </Text>
              <div className="flex gap-1 justify-center flex-wrap mt-2">
                {types.map((t) => (
                  <TypeBadge key={t} type={t} />
                ))}
              </div>
              {isActive ? (
                <Text variant="label" className="text-[10px] text-center text-red-700 mt-2">
                  ACTIVE
                </Text>
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
