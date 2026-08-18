import { createFileRoute } from '@tanstack/react-router'
import { DesignPage } from '~/client/features/design/DesignPage'

export const Route = createFileRoute('/design')({
  component: DesignPage,
})
