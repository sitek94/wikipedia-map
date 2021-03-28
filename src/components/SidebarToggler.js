import * as React from 'react'
import { IconButton } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

import { useMapStore } from 'pages/map/store'

export default function SidebarToggler() {
  const [, { setIsSidebarVisible }] = useMapStore()
  const openSidebar = () => setIsSidebarVisible(true)

  return (
    <IconButton
      onClick={openSidebar}
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton>
  )
}
