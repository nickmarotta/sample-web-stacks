import { useRouter } from '@tanstack/react-router'
import { registerFn } from '~/server/features/auth/auth-controller'
import { Button, Input, Card } from '~/client/ui'
import { useState } from 'react'

export function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const form = e.currentTarget
    const username = (form.elements.namedItem('username') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    try {
      await registerFn({ data: { username, password } })
      await router.navigate({ to: '/' })
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto space-y-6 font-mono">
      <h1 className="text-2xl font-bold uppercase">Create Account</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="username"
            name="username"
            label="Trainer Name"
            required
            minLength={3}
            maxLength={32}
            placeholder="RED"
          />
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            required
            minLength={6}
            placeholder="••••••"
          />
          {error && <p className="text-sm text-red-700 font-bold">{error}</p>}
          <Button variant="primary" type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating…' : 'Register'}
          </Button>
        </form>
      </Card>
      <p className="text-sm font-mono">
        Already have an account?{' '}
        <a href="/auth/login" className="underline hover:text-gray-600">
          Login
        </a>
      </p>
    </div>
  )
}
