import * as React from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
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

  console.log(theme)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
