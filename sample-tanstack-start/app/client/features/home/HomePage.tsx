import { useRouter } from '@tanstack/react-router'
import { logoutFn } from '~/server/features/auth/auth-controller'
import { startEncounterFn } from '~/server/features/battle/battle-controller'
import { Button, Card } from '~/client/ui'

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
          <h1 className="text-2xl font-bold uppercase">Welcome, {trainer.username}!</h1>
          {starterMode && (
            <p className="text-sm text-yellow-700 font-bold mt-1">
              No active Pokémon — catch one to start!
            </p>
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
        <h2 className="text-sm font-bold uppercase mb-2">
          {starterMode ? 'Starter Encounter' : 'Go on an Encounter'}
        </h2>
        <p className="text-xs text-gray-600 mb-4">
          {starterMode
            ? 'Encounter a Wild Pokémon and catch it to begin your journey.'
            : 'Encounter a random Wild Pokémon and battle it with your Active Pokémon.'}
        </p>
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
        <h2 className="text-sm font-bold uppercase mb-2">Active Pokémon</h2>
        {trainer.activePokemonId ? (
          <p className="text-xs">Pokémon #{trainer.activePokemonId} is ready to battle.</p>
        ) : (
          <p className="text-xs text-gray-500">None — catch your first Pokémon!</p>
        )}
      </Card>
    </div>
  )
}
