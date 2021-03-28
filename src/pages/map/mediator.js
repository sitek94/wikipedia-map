import wikipedia from 'services/api/wikipedia'
import ArticlesDatabase from 'services/articles-database'
import { useMapStore } from './store'

const defaultMarkerColor = 'primary'
const savedMarkerColor = 'secondary'

const listeners = {}
let map

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

function mapArticlesToMarkers(articles) {
  return articles.map(({ pageid, lat, lon, title }) => ({
    pageid,
    lat,
    lng: lon,
    title,
  }))
}

function mapSavedArticles(articles) {
  return articles.map(article => ({
    ...article,
    color: ArticlesDatabase.isArticleSaved(article.pageid)
      ? savedMarkerColor
      : defaultMarkerColor,
  }))
}

function useMapMediator() {
  const [
    { currentArticle },
    {
      addMarkers,
      setMarkerColor,
      setIsGoogleApiLoaded,
      setIsModalVisible,
      setCurrentArticle,
      toggleCurrentArticleSavedState,
    },
  ] = useMapStore()

  async function onMapDragged(event) {
    const response = await wikipedia.getArticles({ coord: event.center })
    const articles = response.query.geosearch
    const markers = mapArticlesToMarkers(articles)
    const markersMappedAsSaved = mapSavedArticles(markers)

    addMarkers(markersMappedAsSaved)
  }

  function onGoogleApiLoaded({ map: mapInstance }) {
    map = mapInstance

    setIsGoogleApiLoaded(true)
  }

  function onSearchBoxPlaceClicked({ coords }) {
    if (map) {
      map.setCenter(coords)
    }
  }

  async function onMarkerClicked({ pageid }) {
    const response = await wikipedia.getArticleInfo({ pageid })
    const article = Object.values(response.query.pages)[0]

    setIsModalVisible(true)
    setCurrentArticle({
      title: article.title,
      url: article.fullurl,
      pageid,
      isSaved: ArticlesDatabase.isArticleSaved(pageid),
    })
  }

  async function onModalHeartClicked() {
    const { pageid, isSaved } = currentArticle
    const isSavedAfterClick = !isSaved

    toggleCurrentArticleSavedState()
    setMarkerColor({
      pageid,
      color: isSavedAfterClick ? savedMarkerColor : defaultMarkerColor,
    })

    ArticlesDatabase.toggleIsArticleSaved(pageid)
  }

  attachListener('mapDragged', onMapDragged)
  attachListener('googleApiLoaded', onGoogleApiLoaded)
  attachListener('searchBoxPlaceClicked', onSearchBoxPlaceClicked)
  attachListener('markerClicked', onMarkerClicked)
  attachListener('modalHeartClicked', onModalHeartClicked)
}

function MapMediator() {
  useMapMediator()

  return null
}

export { MapMediator, emit }
