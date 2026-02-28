import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        canvas: {
          default: 'rgb(var(--color-canvas-default) / <alpha-value>)',
          subtle: 'rgb(var(--color-canvas-subtle) / <alpha-value>)',
          inset: 'rgb(var(--color-canvas-inset) / <alpha-value>)',
        },
        fg: {
          default: 'rgb(var(--color-fg-default) / <alpha-value>)',
          muted: 'rgb(var(--color-fg-muted) / <alpha-value>)',
          accent: 'rgb(var(--color-fg-accent) / <alpha-value>)',
        },
        border: {
          default: 'rgb(var(--color-border-default) / <alpha-value>)',
          muted: 'rgb(var(--color-border-muted) / <alpha-value>)',
        },
        accent: {
          muted: 'rgb(var(--color-accent-muted) / <alpha-value>)',
          emphasis: 'rgb(var(--color-accent-emphasis) / <alpha-value>)',
        },
        success: {
          subtle: 'rgb(var(--color-success-subtle) / <alpha-value>)',
          emphasis: 'rgb(var(--color-success-emphasis) / <alpha-value>)',
        },
      },
      boxShadow: {
        panel: '0 0 0 1px rgb(var(--color-border-default) / 1)',
      },
    },
  },
  plugins: [typography],
} satisfies Config
