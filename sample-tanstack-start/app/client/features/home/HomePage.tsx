import { useRouter } from '@tanstack/react-router'
import { logoutFn } from '~/server/features/auth/auth-controller'
import { startEncounterFn } from '~/server/features/battle/battle-controller'
import { Button, Card, Text } from '~/client/ui'

interface HomePageProps {
  trainer: {
    id: number
    username: string
    activePokemonId: number | null
  }
}

export function HomePage({ trainer }: HomePageProps) {
  const router = useRouter()
  const starterMode = !trainer.activePokemonId

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between">
        <div>
          <Text variant="pageTitle">Welcome, {trainer.username}!</Text>
          {starterMode && (
            <Text variant="warning" className="mt-1">
              No active Pokémon — catch one to start!
            </Text>
          )}
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await logoutFn()
            await router.navigate({ to: '/auth/login' })
          }}
        >
          <Button>Logout</Button>
        </form>
      </div>

      <Card>
        <Text variant="subheader" className="mb-2">
          {starterMode ? 'Starter Encounter' : 'Go on an Encounter'}
        </Text>
        <Text variant="bodySmall" className="text-gray-600 mb-4">
          {starterMode
            ? 'Encounter a Wild Pokémon and catch it to begin your journey.'
            : 'Encounter a random Wild Pokémon and battle it with your Active Pokémon.'}
        </Text>
        <form
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
