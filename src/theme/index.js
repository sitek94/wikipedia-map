import * as React from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  darkScrollbar,
  GlobalStyles,
} from '@material-ui/core'

const primaryColor = '#fa8c16'
const secondaryColor = '#237bffe0'

function createTheme(mode) {
  return createMuiTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
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
  const nextMode = mode === 'dark' ? 'light' : 'dark'

  const theme = React.useMemo(
    () => ({
      // Material ui theme object
      ...createTheme(mode),

      // Extend default object with extra stuff
      isThemeDark: mode === 'dark',
      isThemeLight: mode === 'light',
      toggleTheme: () => setMode(nextMode),
    }),
    [mode, nextMode],
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
