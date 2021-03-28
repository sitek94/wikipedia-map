import * as React from 'react'
import { IconButton } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

import { useMapStore } from 'pages/map/store'

export default function SidebarToggler() {
  const [{ isSidebarVisible }, { setIsSidebarVisible }] = useMapStore()
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible)

  return (
    <IconButton
      onClick={toggleSidebar}
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  )
}
