import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const ensureTrailingSlash = (value: string): string => {
  if (!value) {
    return '/'
  }

  return value.endsWith('/') ? value : `${value}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const configuredBase = env.VITE_BASE_PATH ?? '/'

  return {
    base: ensureTrailingSlash(configuredBase),
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            markdown: ['react-markdown', 'remark-gfm', 'rehype-highlight', 'highlight.js'],
          },
        },
      },
    },
  }
})
