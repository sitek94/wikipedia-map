const themeKey = 'theme'

function ThemeDatabase() {
  let theme = getTheme()

  return {
    getTheme,
    updateTheme,
  }

  function getTheme() {
    try {
      const savedTheme = localStorage.getItem(themeKey)

      if (savedTheme) {
        return JSON.parse(savedTheme)
      } else {
        return {}
      }
    } catch (error) {
      console.error('Something went wrong when getting the theme', error)
    }
  }

  function updateTheme(prop, value) {
    try {
      theme[prop] = value

      localStorage.setItem(themeKey, JSON.stringify(theme))
    } catch (error) {
      console.error('Something went wrong when updating the theme', error)
    }
  }
}

export default ThemeDatabase()
