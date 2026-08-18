import { createRootRoute, HeadContent, Link, Outlet, Scripts } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'PokéStart' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 font-mono">
        <nav className="bg-white border-b-[3px] border-gray-900 px-4 py-3 flex gap-4 items-center">
          <Link to="/" className="font-bold text-lg text-red-600 uppercase">
            PokéStart
          </Link>
          <Link
            to="/collection"
            className="text-sm font-bold uppercase text-gray-600 hover:text-gray-900"
          >
            Collection
          </Link>
          <div className="ml-auto flex gap-3">
            <Link
              to="/auth/login"
              className="text-sm font-bold uppercase text-gray-600 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="text-sm font-bold uppercase text-gray-600 hover:text-gray-900"
            >
              Register
            </Link>
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
