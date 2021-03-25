import { createStore, createHook, defaults } from 'react-sweet-state'
import { produce } from 'immer'

defaults.devtools = true
defaults.mutator = (currentState, producer) => produce(currentState, producer)

const Store = createStore({
  initialState: {
    markers: [],
    isGoogleApiLoaded: false,
  },
  actions: {
    addMarkers: (markers) => ({ setState, getState }) => {
      const state = getState()
      const existingMarkersIds = state.markers.map((marker) => marker.pageid)
      const newMarkers = markers.filter(
        (marker) => !existingMarkersIds.includes(marker.pageid),
      )

      setState((draft) => {
        draft.markers.push(...newMarkers)
      })
    },
    setIsGoogleApiLoaded: (isLoaded) => ({ setState, getState }) => {
      setState((draft) => {
        draft.isGoogleApiLoaded = isLoaded
      })
    },
  },
})

export const useMapStore = createHook(Store)
