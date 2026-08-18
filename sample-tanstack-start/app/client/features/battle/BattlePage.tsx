import { useRouter } from '@tanstack/react-router'
import { fetchBattle, attackFn, catchFn, fleeFn } from '~/server/features/battle/battle-controller'
import { Button, Card, HpBar, ActionMenu, MessageBox } from '~/client/ui'
import { useState } from 'react'

interface BattlePageProps {
  initialData: Awaited<ReturnType<typeof fetchBattle>>
}

export function BattlePage({ initialData }: BattlePageProps) {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { battle, starterMode, activePokemon } = data
  const resolved = battle.outcome !== null

  async function handleAttack() {
    setLoading(true)
    setMessage(null)
    try {
      const result = await attackFn({ data: { battleId: battle.id } })
      setMessage(result.outcome === 'fainted' ? 'Your Pokémon fainted!' : 'Attack hit!')
      router.invalidate()
      const refreshed = await fetchBattle({ data: { battleId: String(battle.id) } })
      setData(refreshed)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleCatch() {
    setLoading(true)
    setMessage(null)
    try {
      const result = await catchFn({ data: { battleId: battle.id } })
      if (result.caught) {
        setMessage(`Gotcha! ${battle.species.name.toUpperCase()} was caught!`)
      } else {
        setMessage(`Oh no! ${battle.species.name.toUpperCase()} broke free!`)
      }
      router.invalidate()
      const refreshed = await fetchBattle({ data: { battleId: String(battle.id) } })
      setData(refreshed)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleFlee() {
    setLoading(true)
    setMessage(null)
    try {
      await fleeFn({ data: { battleId: battle.id } })
      setMessage('Got away safely!')
      router.invalidate()
      const refreshed = await fetchBattle({ data: { battleId: String(battle.id) } })
      setData(refreshed)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto font-mono">
      <div className="bg-white border-[6px] border-gray-900 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Battle arena */}
        <div className="bg-gradient-to-b from-gray-100 to-green-100 h-96 flex flex-col justify-between p-8">

          {/* Top row: Enemy HP box | Enemy sprite */}
          <div className="flex justify-between items-start">
            <Card className="p-3 min-w-[200px]">
              <div className="text-sm font-bold uppercase">{battle.species.name}</div>
              <div className="text-[10px] font-bold">:L{Math.floor(battle.wildMaxHp / 10)}</div>
              <div className="mt-1">
                <HpBar current={battle.wildCurrentHp} max={battle.wildMaxHp} />
              </div>
            </Card>
            <div className="mr-12">
              <img
                src={battle.species.spriteUrl}
                alt={battle.species.name}
                className="w-36 h-36 pixelated drop-shadow-2xl"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>

          {/* Bottom row: My sprite | My HP box */}
          <div className="flex justify-between items-end">
            {!starterMode && battle.activeCurrentHp !== null && battle.activeMaxHp !== null ? (
              <>
                <div className="ml-8">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${activePokemon?.species.id || 1}.png`}
                    alt={activePokemon?.species.name || "Your Pokémon"}
                    className="w-40 h-40 pixelated drop-shadow-2xl"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                <Card className="p-3 min-w-[200px]">
                  <div className="text-sm font-bold uppercase">
                    {activePokemon?.nickname || activePokemon?.species.name || 'Your Pokémon'}
                  </div>
                  <div className="text-[10px] font-bold">:L{Math.floor(battle.activeMaxHp / 10)}</div>
                  <div className="mt-1">
                    <HpBar current={battle.activeCurrentHp} max={battle.activeMaxHp} showNumbers />
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-3 border-yellow-700 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] bg-yellow-50">
                <div className="text-xs font-bold uppercase text-yellow-800">Starter Encounter</div>
                <div className="text-[10px] mt-1 text-yellow-700">Catch your first Pokémon!</div>
              </Card>
            )}
          </div>
        </div>

        {/* Action area */}
        {resolved ? (
          <div className="border-t-[4px] border-gray-900 bg-white p-5">
            <MessageBox className="mb-4">
              {battle.outcome === 'caught'
                ? `${battle.species.name.toUpperCase()} was caught!`
                : battle.outcome === 'fainted'
                  ? 'Your Pokémon fainted!'
                  : 'Got away safely!'}
            </MessageBox>
            <a href="/">
              <Button variant="primary">Back to Dashboard</Button>
            </a>
          </div>
        ) : (
          <ActionMenu message={message || 'What will you do?'}>
            {!starterMode && (
              <Button variant="menu" active={!loading} onClick={handleAttack} disabled={loading}>
                Fight
              </Button>
            )}
            <Button variant="menu" active={starterMode && !loading} onClick={handleCatch} disabled={loading}>
              Pokéball
            </Button>
            {!starterMode && (
              <Button variant="menu" onClick={handleFlee} disabled={loading}>
                Run
              </Button>
            )}
          </ActionMenu>
        )}
      </div>
    </div>
  )
}
