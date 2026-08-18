import { createFileRoute } from '@tanstack/react-router'
import { RegisterPage } from '~/client/features/auth/RegisterPage'

export const Route = createFileRoute('/auth/register')({
  component: RegisterPage,
})
