import { UserTheme } from 'types'

const themeKey = 'theme'

function ThemeDatabase() {
  let theme: UserTheme = {}

  return {
    getTheme,
    updateTheme,
  }

  function getTheme() {
    try {
      const savedTheme = localStorage.getItem(themeKey)

      if (savedTheme) {
        return JSON.parse(savedTheme) as UserTheme
      }
    } catch (error) {
      console.error('Something went wrong when getting the theme', error)
    }

    return {}
  }

  function updateTheme<K extends keyof UserTheme>(
    prop: K,
    value: UserTheme[K],
  ) {
    try {
      theme[prop] = value

      localStorage.setItem(themeKey, JSON.stringify(theme))
    } catch (error) {
      console.error('Something went wrong when updating the theme', error)
    }
  }
}

export default ThemeDatabase()
