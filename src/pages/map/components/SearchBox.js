import * as React from 'react'
import { InputBase } from '@material-ui/core'
import { experimentalStyled as styled, alpha } from '@material-ui/core/styles'
import { Search as SearchIcon } from '@material-ui/icons'

import { useMapStore } from '../store'
import { emit } from '../mediator'

export default function SearchBox(props) {
  const [{ isGoogleApiLoaded }] = useMapStore()

  React.useEffect(() => {
    let searchBoxListener

    if (isGoogleApiLoaded) {
      const input = document.getElementById('search-box')
      const searchBox = new window.google.maps.places.SearchBox(input)

      searchBoxListener = searchBox.addListener('places_changed', () => {
        const place = searchBox.getPlaces()[0]
        const { lat, lng } = place.geometry.location.toJSON()

        emit('searchBoxPlaceClicked', { lat, lng })
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
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        id="search-box"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  )
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
  maxWidth: 300,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))
