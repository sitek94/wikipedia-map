import { PaletteMode, PaletteColor } from '@material-ui/core'

export interface UserTheme {
  mode?: PaletteMode
  primary?: PaletteColor['main']
  secondary?: PaletteColor['main']
}
