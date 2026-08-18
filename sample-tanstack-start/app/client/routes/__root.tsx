import { createRootRoute, HeadContent, Link, Outlet, Scripts, useRouter } from '@tanstack/react-router'
import { fetchSessionFn, logoutFn } from '~/server/features/auth/auth-controller'
import { Text } from '~/client/ui'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'PokéStart' },
    ],
  }),
  loader: () => fetchSessionFn(),
  component: RootComponent,
})

function RootComponent() {
  const { trainer } = Route.useLoaderData()
  const router = useRouter()

  async function handleLogout() {
    await logoutFn()
    await router.invalidate()
    await router.navigate({ to: '/auth/login' })
  }

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 font-mono">
        <nav className="bg-white border-b-[3px] border-gray-900 px-4 py-3 flex gap-4 items-center">
          <Text variant="navLink" as={Link} to="/" className="text-lg text-red-600 hover:text-red-600">
            PokéStart
          </Text>
          <div className="ml-auto flex gap-3 items-center">
            {trainer ? (
              <>
                <Text variant="subheader" as="span">{trainer.username}</Text>
                <Text variant="navLink" as="button" type="button" onClick={handleLogout}>
                  Logout
                </Text>
              </>
            ) : (
              <>
                <Text variant="navLink" as={Link} to="/auth/login">
                  Login
                </Text>
                <Text variant="navLink" as={Link} to="/auth/register">
                  Register
                </Text>
              </>
            )}
          </div>
        </nav>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <Outlet />
        </main>
        <Scripts />
      </body>
    </html>
  )
}
