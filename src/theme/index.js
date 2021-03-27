import themes, { colors } from './themes'
import { toVarNames } from './utils'

const variables = toVarNames(themes.light)

const theme = {
  colors: {
    // All the colors that are available: white, grey, blue, etc.
    ...colors,

    // More specific colors: primary, secondary, hoverButton, etc.
    ...variables.colors,
  },
}

export default theme
export { ThemeProvider, useTheme } from './provider'
