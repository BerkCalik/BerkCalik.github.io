import { useContext } from 'react'
import { ThemeContext } from '../layout/theme-context'
import type { ThemeContextValue } from '../types/theme'

export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useThemeContext must be used inside ThemeProvider')
  }

  return context
}
