import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tanstackStart({
      srcDirectory: 'app',
      router: {
        routesDirectory: 'client/routes',
        generatedRouteTree: 'client/routeTree.gen.ts',
      },
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app'),
    },
  },
})
