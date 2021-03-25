import * as React from 'react'
import styled from 'styled-components'
import { Input as AntInput, Layout } from 'antd'

import theme from 'theme'
import ThemeToggler from 'components/ThemeToggler'
import { useMapStore } from 'pages/map/store'
import { emit } from 'pages/map/mediator'

const { Header: AntHeader } = Layout

export default function Header({ children }) {
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

  return (
    <Wrapper>
      <Logo>Wikipedia Map</Logo>
      <SearchBox />
      <ThemeToggler />
    </Wrapper>
  )
}

const Wrapper = styled(AntHeader)`
  display: flex;
  align-items: center;
  background: ${theme.colors.secondary};
`

const Logo = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: 0;
`

const SearchBox = styled(AntInput).attrs({
  id: 'search-box',
  placeholder: 'Search',
})`
  width: 300px;
  margin: 5px 20px;

  /* Push items after the input to the right */
  margin-right: auto;
`
