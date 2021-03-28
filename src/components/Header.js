import * as React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'

import ThemeToggler from 'components/ThemeToggler'
import SidebarToggler from 'components/SidebarToggler'
import SearchBox from 'components/SearchBox'

export default function Header({ children }) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <SidebarToggler />
        <Logo />
        <Box sx={{ mr: 'auto' }}>
          <SearchBox />
        </Box>

        <ThemeToggler />
      </Toolbar>
    </AppBar>
  )
}

function Logo() {
  return (
    <Typography variant="h6" component="h1">
      Wikipedia Map
    </Typography>
  )
}
