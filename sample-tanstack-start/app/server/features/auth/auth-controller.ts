import { createServerFn } from '@tanstack/react-start'
import { registerTrainer, loginTrainer, logoutTrainer, getCurrentTrainer } from './auth-service'

export const registerFn = createServerFn({ method: 'POST' })
  .validator((raw: unknown) => raw as { username: string; password: string })
  .handler(async ({ data }) => {
    await registerTrainer(data.username, data.password)
    return { ok: true }
  })

export const loginFn = createServerFn({ method: 'POST' })
  .validator((raw: unknown) => raw as { username: string; password: string })
  .handler(async ({ data }) => {
    await loginTrainer(data.username, data.password)
    return { ok: true }
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  await logoutTrainer()
  return { ok: true }
})

export const fetchSessionFn = createServerFn({ method: 'GET' }).handler(async () => {
  const trainer = await getCurrentTrainer()
  return { trainer: trainer ? { username: trainer.username } : null }
})
