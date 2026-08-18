import { createFileRoute } from '@tanstack/react-router'
import { fetchBattle } from '~/server/features/battle/battle-controller'
import { BattlePage } from '~/client/features/battle/BattlePage'

export const Route = createFileRoute('/battles/$battleId')({
  loader: ({ params }) => fetchBattle({ data: { battleId: params.battleId } }),
  component: () => {
    const data = Route.useLoaderData()
    return <BattlePage initialData={data} />
  },
})
