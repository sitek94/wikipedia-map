import * as React from 'react'
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core'

import { ThemeMediator } from './mediator'
import { useThemeStore } from './store'
import { createTheme } from './utils'

export default function ThemeProvider({ children }) {
  const [{ mode, primary, secondary }] = useThemeStore()
  const theme = React.useMemo(
    () => ({
      // Material ui theme object
      ...createTheme({ mode, primary, secondary }),

      // Extend default object with extra stuff
      isThemeDark: mode === 'dark',
      isThemeLight: mode === 'light',
    }),
    [mode, primary, secondary],
  )

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeMediator />
      <GlobalStyles
        // Make search-box results appear above the drawer
        styles={{ '.pac-container': { zIndex: theme.zIndex.drawer + 1 } }}
      />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
