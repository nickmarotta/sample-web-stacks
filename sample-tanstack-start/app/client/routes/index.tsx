import { createFileRoute } from '@tanstack/react-router'
import { fetchCurrentTrainer } from '~/server/features/auth/auth-controller'
import { HomePage } from '~/client/features/home/HomePage'

export const Route = createFileRoute('/')({
  loader: () => fetchCurrentTrainer(),
  component: () => {
    const { trainer } = Route.useLoaderData()
    return <HomePage trainer={trainer} />
  },
})
