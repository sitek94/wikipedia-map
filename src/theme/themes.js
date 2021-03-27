export const colors = {
  white: '#fff',
  whiteRgb: '255, 255, 255',
  black: '#000',
  blackRgb: '0, 0, 0',

  gray0: '#fafafa',
  gray1: '#f5f6f7',
  gray2: '#eee',
  gray3: '#ddd',

  gray7: '#3e3f40',
  gray8: '#242526',
  gray9: '#18191a',

  orange: '#fa8c16',
  blue: '#237bffe0',
}

const themes = {
  light: {
    colors: {
      primary: colors.gray8,
      secondary: colors.white,
      buttonHover: colors.gray2,

      text: {
        default: colors.gray8,
      },
      background: {
        default: colors.white,
        level1: colors.gray2,
        level2: colors.gray3,
      },
    },
  },
  dark: {
    colors: {
      primary: colors.white,
      secondary: colors.gray8,
      buttonHover: colors.gray8,

      text: {
        default: colors.white,
      },
      background: {
        default: colors.gray9,
        level1: colors.gray8,
        level2: colors.gray7,
      },
    },
  },
}

export default themes
