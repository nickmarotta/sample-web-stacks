import { createFileRoute } from '@tanstack/react-router'
import { fetchHomeFn } from '~/server/features/trainer/trainer-controller'
import { HomePage } from '~/client/features/home/HomePage'

export const Route = createFileRoute('/')({
  loader: () => fetchHomeFn(),
  component: () => {
    const { trainer, collectionCount } = Route.useLoaderData()
    return <HomePage trainer={trainer} collectionCount={collectionCount} />
  },
})
