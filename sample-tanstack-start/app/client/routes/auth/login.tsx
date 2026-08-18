import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from '~/client/features/auth/LoginPage'

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
})
