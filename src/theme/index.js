import * as React from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  darkScrollbar,
  GlobalStyles,
} from '@material-ui/core'

import palette from './palette'

const defaultPrimaryColor = palette.blue
const defaultSecondaryColor = palette.orange

function createTheme({ mode, primary, secondary }) {
  return createMuiTheme({
    palette: {
      mode,
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: mode === 'dark' ? { body: darkScrollbar() } : null,
      },
    },
  })
}

export default function ThemeProvider({ children }) {
  const [mode, setMode] = React.useState('light')
  const [primary, setPrimary] = React.useState(defaultPrimaryColor)
  const [secondary, setSecondary] = React.useState(defaultSecondaryColor)

  const nextMode = mode === 'dark' ? 'light' : 'dark'

  const theme = React.useMemo(
    () => ({
      // Material ui theme object
      ...createTheme({ mode, primary, secondary }),

      // Extend default object with extra stuff
      isThemeDark: mode === 'dark',
      isThemeLight: mode === 'light',
      toggleTheme: () => setMode(nextMode),
      setPrimaryColor: setPrimary,
      setSecondaryColor: setSecondary,
    }),
    [mode, nextMode, primary, secondary],
  )

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles
        // Make search-box results appear above the drawer
        styles={{ '.pac-container': { zIndex: theme.zIndex.drawer + 1 } }}
      />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
