import * as React from 'react'

import ThemeDatabase from 'services/theme-database'
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
  const [{ mode }, { toggleThemeMode, setThemeMode }] = useThemeStore()

  React.useEffect(() => {
    initTheme()

    function initTheme() {
      const savedTheme = ThemeDatabase.getTheme()
      setThemeMode(savedTheme.mode)
    }
  }, [setThemeMode])

  function onThemeModeToggled() {
    ThemeDatabase.updateTheme('mode', getNextMode(mode))
    toggleThemeMode()
  }

  attachListener('themeModeToggled', onThemeModeToggled)
}

function ThemeMediator() {
  useThemeMediator()

  return null
}

export { ThemeMediator, emit }
