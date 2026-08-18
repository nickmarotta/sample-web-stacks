import { useRouter } from '@tanstack/react-router'
import { startEncounterFn } from '~/server/features/battle/battle-controller'
import { Button, Card, Text } from '~/client/ui'

interface HomePageProps {
  trainer: {
    id: number
    username: string
    activePokemonId: number | null
  }
  collectionCount: number
}

export function HomePage({ trainer, collectionCount }: HomePageProps) {
  const router = useRouter()
  const starterMode = !trainer.activePokemonId

  return (
    <div className="space-y-6 font-mono">
      <div>
        <Text variant="pageTitle">Welcome, {trainer.username}!</Text>
        {starterMode && (
          <Text variant="warning" className="mt-1">
            No active Pokémon — catch one to start!
          </Text>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <Text variant="subheader" className="mb-2">
            {starterMode ? 'Starter Encounter' : 'Go on an Encounter'}
          </Text>
          <Text variant="bodySmall" className="text-gray-600 mb-4">
            {starterMode
              ? 'Encounter a Wild Pokémon and catch it to begin your journey.'
              : 'Encounter a random Wild Pokémon and battle it with your Active Pokémon.'}
          </Text>
          <form
            className="mt-auto"
            onSubmit={async (e) => {
              e.preventDefault()
              const { battleId } = await startEncounterFn()
              await router.navigate({
                to: '/battles/$battleId',
                params: { battleId },
              })
            }}
          >
            <Button variant="primary">
              {starterMode ? 'Find Starter' : 'Start Encounter'}
            </Button>
          </form>
        </Card>

        <Card className="flex flex-col">
          <Text variant="subheader" className="mb-2">Your Collection</Text>
          <Text variant="bodySmall" className="text-gray-600 mb-4">
            {collectionCount === 0
              ? 'No Pokémon caught yet — your catches will appear here.'
              : `${collectionCount} Pokémon caught. Set your active Pokémon here.`}
          </Text>
          <div className="mt-auto">
            <Button onClick={() => router.navigate({ to: '/collection' })}>
              View Collection
            </Button>
          </div>
        </Card>
      </div>

      <Card>
        <Text variant="subheader" className="mb-2">Active Pokémon</Text>
        {trainer.activePokemonId ? (
          <Text variant="bodySmall">Pokémon #{trainer.activePokemonId} is ready to battle.</Text>
        ) : (
          <Text variant="caption">None — catch your first Pokémon!</Text>
        )}
      </Card>
    </div>
  )
}
