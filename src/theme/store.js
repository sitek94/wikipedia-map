import { createStore, createHook, defaults } from 'react-sweet-state'

import palette from './palette'
import { produce } from 'immer'

defaults.devtools = true
defaults.mutator = (currentState, producer) => produce(currentState, producer)

const defaultMode = 'dark'
const defaultPrimaryColor = palette.blue
const defaultSecondaryColor = palette.orange

const Store = createStore({
  initialState: {
    mode: defaultMode,
    primary: defaultPrimaryColor,
    secondary: defaultSecondaryColor,
  },
  actions: {
    toggleThemeMode: () => ({ setState, getState }) => {
      const { mode } = getState()
      setState(draft => {
        draft.mode = !mode
      })
    },
  },
  name: 'theme',
})

export const useThemeStore = createHook(Store)
