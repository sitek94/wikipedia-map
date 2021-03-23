import wikipedia from 'services/api/wikipedia'
import { useMapStore } from './store'

const listeners = {}

function attachListener(eventName, listener) {
  listeners[eventName] = listener
}

function emit(eventName, args) {
  const listener = listeners[eventName]

  if (!listener) {
    throw new Error(`There is no listener for "${eventName}" event.`)
  }

  listener(args)
}

function mapArticlesToMarkers(articles) {
  return articles.map(({ pageid, lat, lon }) => ({
    pageid,
    lat,
    lng: lon,
  }))
}

function useMapMediator() {
  const [, { addMarkers }] = useMapStore()

  async function onMapLoaded(event) {
    const response = await wikipedia.getArticles({ coord: event.center })
    const articles = response.query.geosearch
    const markers = mapArticlesToMarkers(articles)

    addMarkers(markers)
  }

  async function onMapDragged(event) {
    const response = await wikipedia.getArticles({ coord: event.center })
    const articles = response.query.geosearch
    const markers = mapArticlesToMarkers(articles)

    addMarkers(markers)
  }

  attachListener('mapLoaded', onMapLoaded)
  attachListener('mapDragged', onMapDragged)
}

function MapMediator() {
  useMapMediator()

  return null
}

export { MapMediator, emit }
