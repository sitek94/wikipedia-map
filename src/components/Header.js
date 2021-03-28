import * as React from 'react'
import { AppBar, Box, Toolbar, Typography, useTheme } from '@material-ui/core'

import ThemeToggler from 'components/ThemeToggler'
import SidebarToggler from 'components/SidebarToggler'
import SearchBox from 'components/SearchBox'

export default function Header({ children }) {
  const { zIndex } = useTheme()

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        zIndex: zIndex.drawer + 1,
      }}
    >
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
