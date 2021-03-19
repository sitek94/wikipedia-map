import wikipedia from 'services/api/wikipedia'

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

function useMapMediator() {
  async function onMapLoaded(event) {
    const articles = await wikipedia.getArticles({ coord: event.center })

    console.log('Map was loaded, articles: ', articles.query.geosearch)
  }

  async function onMapDragged(event) {
    const articles = await wikipedia.getArticles({ coord: event.center })

    console.log('Map was dragged, articles: ', articles.query.geosearch)
  }

  attachListener('mapLoaded', onMapLoaded)
  attachListener('mapDragged', onMapDragged)
}

function MapMediator() {
  useMapMediator()

  return null
}

export { MapMediator, emit }
