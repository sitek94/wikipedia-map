import {
  createMuiTheme,
  darkScrollbar,
  PaletteOptions,
  PaletteMode,
} from '@material-ui/core'
import { UserTheme } from 'types'

export const lightMode: PaletteMode = 'light'
export const darkMode: PaletteMode = 'dark'

export function getNextMode(mode: PaletteMode): PaletteMode {
  return mode === 'dark' ? 'light' : 'dark'
}

export function createTheme({ mode, primary, secondary }: UserTheme) {
  const palette: PaletteOptions = {
    mode,
    primary: primary ? { main: primary } : undefined,
    secondary: secondary ? { main: secondary } : undefined,
  }

  return createMuiTheme({
    palette,
    components: {
      MuiCssBaseline: {
        styleOverrides: mode === 'dark' ? { body: darkScrollbar() } : undefined,
      },
    },
  })
}
