import GoogleMapReact from 'google-map-react'

const warsawCoords = {
  lat: 52.247744131869645,
  lng: 21.015043804607192,
}
const defaultZoom = 11

export default function GoogleMap() {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
      defaultCenter={warsawCoords}
      defaultZoom={defaultZoom}
    />
  )
}
