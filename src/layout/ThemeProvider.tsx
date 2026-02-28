import { type PropsWithChildren } from 'react'
import { useTheme } from '../hooks/useTheme'
import { ThemeContext } from './theme-context'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const value = useTheme()

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
