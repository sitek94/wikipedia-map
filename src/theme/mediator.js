import * as React from 'react'

import ThemeDatabase from 'services/db/theme'
import { useThemeStore } from './store'
import { getNextMode } from './utils'

const listeners = {}
function attachListener(eventName, listener) {
  listeners[eventName] = listener
}

function emit(eventName, ...args) {
  const listener = listeners[eventName]

  if (!listener) {
    throw new Error(`There is no listener for "${eventName}" event.`)
  }

  listener(...args)
}

function useThemeMediator() {
  const [
    { mode },
    { setThemeMode, setPrimaryColor, setSecondaryColor },
  ] = useThemeStore()

  React.useEffect(() => {
    setThemeFromDatabase()

    function setThemeFromDatabase() {
      const savedTheme = ThemeDatabase.getTheme()
      setThemeMode(savedTheme.mode)
      setPrimaryColor(savedTheme.primary)
      setSecondaryColor(savedTheme.secondary)
    }
  }, [setThemeMode, setPrimaryColor, setSecondaryColor])

  function onThemeModeToggled() {
    const nextMode = getNextMode(mode)

    ThemeDatabase.updateTheme('mode', nextMode)
    setThemeMode(nextMode)
  }

  function onPrimaryColorSelected(color) {
    ThemeDatabase.updateTheme('primary', color)
    setPrimaryColor(color)
  }

  function onSecondaryColorSelected(color) {
    ThemeDatabase.updateTheme('secondary', color)
    setSecondaryColor(color)
  }

  attachListener('themeModeToggled', onThemeModeToggled)
  attachListener('primaryColorSelected', onPrimaryColorSelected)
  attachListener('secondaryColorSelected', onSecondaryColorSelected)
}

function ThemeMediator() {
  useThemeMediator()

  return null
}

export { ThemeMediator, emit }
