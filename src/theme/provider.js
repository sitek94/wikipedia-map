import * as React from 'react'

const ThemeContext = React.createContext()

function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = React.useState('light')

  React.useEffect(() => {
    document.body.dataset.theme = currentTheme
  }, [currentTheme])

  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'

  const contextValue = React.useMemo(
    () => ({
      currentTheme,
      toggleTheme: () => setCurrentTheme(nextTheme),
      isThemeDark: currentTheme === 'dark',
      isThemeLight: currentTheme === 'light',
    }),
    [currentTheme, nextTheme],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
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
