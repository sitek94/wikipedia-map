import { createMuiTheme, darkScrollbar } from '@material-ui/core'

export const lightMode = 'light'
export const darkMode = 'dark'

export function getNextMode(mode) {
  return mode === lightMode ? darkMode : lightMode
}

export function createTheme({ mode, primary, secondary }) {
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
