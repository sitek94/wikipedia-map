import * as React from 'react'

import { toVars } from './utils'
import themes from './themes'

const ThemeContext = React.createContext()

function ThemeProvider({ children }) {
  const root = React.useRef()
  const [theme, setTheme] = React.useState('light')

  React.useLayoutEffect(() => {
    const vars = toVars(themes[theme])

    // Set CSS Variables
    for (const [key, value] of Object.entries(vars)) {
      root.current.style.setProperty(key, value)
    }
  }, [theme])

  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  // Context exposes only a way to toggle a theme and booleans to determine
  // what mode is currently on.
  const contextValue = React.useMemo(
    () => ({
      toggleTheme: () => setTheme(nextTheme),
      isThemeDark: theme === 'dark',
      isThemeLight: theme === 'light',
    }),
    [theme, nextTheme],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <div ref={root}>{children}</div>
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { ThemeProvider, useTheme }
