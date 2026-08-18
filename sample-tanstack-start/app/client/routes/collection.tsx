import { createFileRoute } from '@tanstack/react-router'
import { fetchCollectionFn } from '~/server/features/trainer/trainer-controller'
import { CollectionPage } from '~/client/features/collection/CollectionPage'

export const Route = createFileRoute('/collection')({
  loader: () => fetchCollectionFn(),
  component: () => {
    const { collection, trainer } = Route.useLoaderData()
    return <CollectionPage collection={collection} trainer={trainer} />
  },
})
