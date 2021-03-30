import { createStore, createHook, defaults } from 'react-sweet-state'
import { produce } from 'immer'

import palette from './palette'
import { darkMode, getNextMode } from './utils'

defaults.devtools = true
defaults.mutator = (currentState, producer) => produce(currentState, producer)

const Store = createStore({
  initialState: {
    mode: darkMode,
    primary: palette.blue,
    secondary: palette.orange,
  },
  actions: {
    toggleThemeMode: () => ({ setState, getState }) => {
      const { mode } = getState()

      setState(draft => {
        draft.mode = getNextMode(mode)
      })
    },
  },
  name: 'theme',
})

export const useThemeStore = createHook(Store)
