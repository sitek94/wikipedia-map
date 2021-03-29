import { useDebouncedCallback } from 'use-debounce'

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

/**
 * Maps Wikipedia articles to markers
 */
function mapArticlesToMarkers(articles) {
  return articles.map(({ pageid, lat, lon, title }) => ({
    pageid,
    lat,
    lng: lon,
    title,
  }))
}

/**
 * Adds `color` prop to a marker. The color depends on whether the article that
 * marker points at is saved or not.
 */
function addColorToMarkers(markers) {
  return markers.map(marker => ({
    ...marker,
    color: ArticlesDatabase.isArticleSaved(marker.pageid)
      ? savedMarkerColor
      : defaultMarkerColor,
  }))
}

const mapDraggedDelayMs = 250

function useMapMediator() {
  const [
    { markers, currentArticle },
    {
      addMarkers,
      setMarkerColor,
      setIsGoogleApiLoaded,
      setIsModalVisible,
      setCurrentArticle,
      toggleCurrentArticle,
      setSavedArticles,
    },
  ] = useMapStore()

  async function openArticleInModal(pageid) {
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

  async function onMapDragged(event) {
    const response = await wikipedia.getArticles({ coord: event.center })
    const articles = response.query.geosearch
    const markers = mapArticlesToMarkers(articles)
    const markersWithColor = addColorToMarkers(markers)

    addMarkers(markersWithColor)
  }

  const debouncedOnMapDragged = useDebouncedCallback(
    onMapDragged,
    mapDraggedDelayMs,
  )

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
    openArticleInModal(pageid)
  }

  async function onModalHeartClicked() {
    const { pageid, title, isSaved } = currentArticle
    const { lat, lng } = markers.find(m => m.pageid === pageid)

    const isSavedAfterClick = !isSaved
    const newMarkerColor = isSavedAfterClick
      ? savedMarkerColor
      : defaultMarkerColor

    setMarkerColor({ pageid, color: newMarkerColor })

    ArticlesDatabase.toggleArticle({ pageid, title, lat, lng })
    toggleCurrentArticle()

    setSavedArticles(ArticlesDatabase.getArticles())
  }

  function onSavedArticlesExpanded() {
    setSavedArticles(ArticlesDatabase.getArticles())
  }

  function onSavedArticleItemClicked({ pageid }) {
    openArticleInModal(pageid)
  }

  function onSavedArticleLocationClicked({ lat, lng }) {
    if (map) {
      map.setCenter({ lat, lng })
    }
  }

  attachListener('mapDragged', debouncedOnMapDragged)
  attachListener('googleApiLoaded', onGoogleApiLoaded)
  attachListener('searchBoxPlaceClicked', onSearchBoxPlaceClicked)
  attachListener('markerClicked', onMarkerClicked)
  attachListener('modalHeartClicked', onModalHeartClicked)
  attachListener('savedArticlesExpanded', onSavedArticlesExpanded)
  attachListener('savedArticleItemClicked', onSavedArticleItemClicked)
  attachListener('savedArticleLocationClicked', onSavedArticleLocationClicked)
}

function MapMediator() {
  useMapMediator()

  return null
}

export { MapMediator, emit }
