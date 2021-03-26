import './css-variables.css'

const colors = {
  white: 'var(--white)',
  black: 'var(--black)',
  whiteRgb: 'var(--white-rgb)',
  blackRgb: 'var(--black-rgb)',
  gray_1: 'var(--gray-1)',
  gray_2: 'var(--gray-2)',
  gray_3: 'var(--gray-3)',
  orange: 'var(--orange)',
  blue: 'var(--blue)',

  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
}

const theme = {
  colors,
}

export default theme
export { ThemeProvider, useTheme } from './provider'
