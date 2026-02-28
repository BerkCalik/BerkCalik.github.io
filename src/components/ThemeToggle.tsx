import { Moon, Sun } from 'lucide-react'
import { useThemeContext } from '../hooks/useThemeContext'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-8 items-center gap-2 rounded-md border border-border-default bg-canvas-subtle px-2.5 text-xs text-fg-muted transition hover:border-border-muted hover:text-fg-default"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
      <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  )
}
