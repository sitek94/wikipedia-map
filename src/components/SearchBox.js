import * as React from 'react'
import { Input } from 'antd'

import { useMapStore } from 'pages/map/store'
import { emit } from 'pages/map/mediator'

export default function SearchBox(props) {
  const [{ isGoogleApiLoaded }] = useMapStore()

  React.useEffect(() => {
    let searchBoxListener

    if (isGoogleApiLoaded) {
      const input = document.getElementById('search-box')
      const searchBox = new window.google.maps.places.SearchBox(input)

      searchBoxListener = searchBox.addListener('places_changed', () => {
        const place = searchBox.getPlaces()[0]
        const coords = place.geometry.location.toJSON()

        emit('searchBoxPlaceClicked', { coords })
      })
    }

    // Cleanup - remove searchbox listener
    return () => {
      if (searchBoxListener) {
        window.google.maps.event.removeListener(searchBoxListener)
      }
    }
  }, [isGoogleApiLoaded])

  return <Input id="search-box" placeholder="Search..." {...props} />
}
