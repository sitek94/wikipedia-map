import wikipedia from 'services/api/wikipedia'
import ArticlesDatabase from 'services/articles-database'
import { useMapStore } from './store'

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

function getSavedArtclesIds(articles) {
  return articles
    .filter(({ pageid }) => ArticlesDatabase.isArticleSaved(pageid))
    .map(({ pageid }) => pageid)
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
      setSavedArticlesIds,
      toggleSavedArticleId,
      toggleCurrentArticleSavedState,
    },
  ] = useMapStore()

  async function onMapDragged(event) {
    const response = await wikipedia.getArticles({ coord: event.center })
    const articles = response.query.geosearch
    const markers = mapArticlesToMarkers(articles)
    const savedArticlesIds = getSavedArtclesIds(articles)

    addMarkers(markers)
    setSavedArticlesIds(savedArticlesIds)
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
    const { pageid } = currentArticle

    toggleCurrentArticleSavedState()
    toggleSavedArticleId(pageid)

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
