import { useDebouncedCallback } from 'use-debounce'

import wikipedia from 'services/api/wikipedia'
import ArticlesDatabase from 'services/db/articles'
import { useMapStore } from './store'

const defaultMarkerColor = 'primary'
const savedMarkerColor = 'secondary'
export const defaultZoom = 18

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

  // Listeners

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

  function onSearchBoxPlaceClicked({ lat, lng }) {
    setMapCenter({ lat, lng })
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
    setMapCenter({ lat, lng })
  }

  attachListener('mapDragged', debouncedOnMapDragged)
  attachListener('googleApiLoaded', onGoogleApiLoaded)
  attachListener('searchBoxPlaceClicked', onSearchBoxPlaceClicked)
  attachListener('markerClicked', onMarkerClicked)
  attachListener('modalHeartClicked', onModalHeartClicked)
  attachListener('savedArticlesExpanded', onSavedArticlesExpanded)
  attachListener('savedArticleItemClicked', onSavedArticleItemClicked)
  attachListener('savedArticleLocationClicked', onSavedArticleLocationClicked)

  // Helpers

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

  function setMapCenter({ lat, lng }) {
    if (map) {
      map.setCenter({ lat, lng })
      map.setZoom(defaultZoom)
    }
  }
}

function MapMediator() {
  useMapMediator()

  return null
}

export { MapMediator, emit }
