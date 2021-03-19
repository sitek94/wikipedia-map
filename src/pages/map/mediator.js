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
  function onMapLoaded(args) {
    console.log('onMapLoaded', args)
  }

  function onMapDragged(args) {
    console.log('onMapDragged', args)
  }

  attachListener('mapLoaded', onMapLoaded)
  attachListener('mapDragged', onMapDragged)
}

function MapMediator() {
  useMapMediator()

  return null
}

export { MapMediator, emit }
