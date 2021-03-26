import { createStore, createHook, defaults } from 'react-sweet-state'
import { produce } from 'immer'

defaults.devtools = true
defaults.mutator = (currentState, producer) => produce(currentState, producer)

const Store = createStore({
  initialState: {
    markers: [],
    isGoogleApiLoaded: false,
    isModalVisible: false,
    currentArticle: {
      title: '',
      url: '',
    },
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
    setMarkerColor: ({ pageid, color }) => ({ setState, getState }) => {
      const { markers } = getState()
      const markerIndex = markers.findIndex(
        (marker) => marker.pageid === pageid,
      )

      setState((draft) => {
        draft.markers[markerIndex].color = color
      })
    },
    setIsGoogleApiLoaded: (isLoaded) => ({ setState, getState }) => {
      setState((draft) => {
        draft.isGoogleApiLoaded = isLoaded
      })
    },
    setIsModalVisible: (isVisible) => ({ setState, getState }) => {
      setState((draft) => {
        draft.isModalVisible = isVisible
      })
    },
    setCurrentArticle: ({ title, url }) => ({ setState, getState }) => {
      setState((draft) => {
        draft.currentArticle = {
          title,
          url,
        }
      })
    },
  },
})

export const useMapStore = createHook(Store)
