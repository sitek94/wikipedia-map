import wikipedia from 'services/api/wikipedia'
import ArticlesDatabase from 'services/articles-database'
import { useMapStore } from './store'

const defaultMarkerColor = 'orange'
const visitedMarkerColor = 'blue'

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

function mapVisitedArticles(articles) {
  return articles.map((article) => ({
    ...article,
    color: ArticlesDatabase.isArticleVisited(article.pageid)
      ? visitedMarkerColor
      : defaultMarkerColor,
  }))
}

function useMapMediator() {
  const [
    ,
    {
      addMarkers,
      setMarkerColor,
      setIsGoogleApiLoaded,
      setIsModalVisible,
      setCurrentArticle,
    },
  ] = useMapStore()

  async function onMapDragged(event) {
    const response = await wikipedia.getArticles({ coord: event.center })
    const articles = response.query.geosearch
    const markers = mapArticlesToMarkers(articles)
    const markersMappedAsVisited = mapVisitedArticles(markers)

    addMarkers(markersMappedAsVisited)
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

    setMarkerColor({ pageid, color: visitedMarkerColor })
    setIsModalVisible(true)
    setCurrentArticle({
      title: article.title,
      url: article.fullurl,
    })

    ArticlesDatabase.setArticleAsVisited(pageid)
  }

  attachListener('mapDragged', onMapDragged)
  attachListener('googleApiLoaded', onGoogleApiLoaded)
  attachListener('searchBoxPlaceClicked', onSearchBoxPlaceClicked)
  attachListener('markerClicked', onMarkerClicked)
}

function MapMediator() {
  useMapMediator()

  return null
}

export { MapMediator, emit }
