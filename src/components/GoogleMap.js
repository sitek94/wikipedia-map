import * as React from 'react'
import GoogleMapReact from 'google-map-react'

import { emit } from 'pages/map/mediator'

const warsawCoord = {
  lat: 52.247744131869645,
  lng: 21.015043804607192,
}
const defaultZoom = 11

export default function GoogleMap() {
  React.useEffect(() => {
    emit('mapLoaded', { center: warsawCoord })
  }, [])

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
      defaultCenter={warsawCoord}
      defaultZoom={defaultZoom}
      onChange={(event) => emit('mapDragged', event)}
    />
  )
}
