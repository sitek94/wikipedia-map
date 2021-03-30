import { useThemeStore } from './store'

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
  const [, { toggleThemeMode }] = useThemeStore()

  function onThemeModeToggled() {
    toggleThemeMode()
  }

  attachListener('themeModeToggled', onThemeModeToggled)
}

function ThemeMediator() {
  useThemeMediator()

  return null
}

export { ThemeMediator, emit }
