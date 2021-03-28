import * as React from 'react'
import GoogleMapReact from 'google-map-react'

import { emit } from 'pages/map/mediator'
import { useMapStore } from 'pages/map/store'
import { useTheme } from '@material-ui/core'
import Marker from 'components/marker'
import styles from './styles'

const warsawCoord = {
  lat: 52.247744131869645,
  lng: 21.015043804607192,
}
const defaultZoom = 15.5

export default function GoogleMap() {
  const [{ markers }] = useMapStore()
  const { isThemeDark } = useTheme()

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
      }}
      defaultCenter={warsawCoord}
      defaultZoom={defaultZoom}
      onChange={event => emit('mapDragged', event)}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map }) => emit('googleApiLoaded', { map })}
      options={{
        styles: isThemeDark ? styles.dark : styles.light,
      }}
    >
      {markers.map(({ pageid, lat, lng, title, color }) => (
        <Marker
          key={pageid}
          lat={lat}
          lng={lng}
          title={title}
          pageid={pageid}
          color={color}
        />
      ))}
    </GoogleMapReact>
  )
}
