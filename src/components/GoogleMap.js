import * as React from 'react'
import GoogleMapReact from 'google-map-react'

import wikipedia from 'services/api/wikipedia'

const warsawCoord = {
  lat: 52.247744131869645,
  lng: 21.015043804607192,
}
const defaultZoom = 11

export default function GoogleMap() {
  React.useEffect(() => {
    async function fetchArticles() {
      try {
        const articles = await wikipedia.getArticles({ coord: warsawCoord })
        console.log('Articles: ', articles)
      } catch (error) {
        console.log(error)
      }
    }

    fetchArticles()
  }, [])

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
      defaultCenter={warsawCoord}
      defaultZoom={defaultZoom}
    />
  )
}
