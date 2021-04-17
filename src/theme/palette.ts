import { PaletteColor } from '@material-ui/core'

export type Palette = Record<string, PaletteColor['main']>

const palette: Palette = {
  red: '#f44336',
  pink: '#e91e63',
  purple: '#9c27b0',
  deepPurple: '#673ab7',
  indigo: '#3f51b5',
  blue: '#2196f3',
  teal: '#009688',
  green: '#4caf50',
  yellow: '#ffeb3b',
  amber: '#ffc107',
  orange: '#ff9800',
  deepOrange: '#ff5722',
}

export default palette
