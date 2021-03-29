import * as React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import {
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
} from '@material-ui/icons'

import { useTheme } from '@material-ui/core'

export default function SidebarToggler() {
  const { toggleTheme, isThemeDark } = useTheme()

  const label = 'Toggle light/dark theme'

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={toggleTheme}
        edge="end"
        color="inherit"
        aria-label={label}
      >
        {isThemeDark ? <SunIcon /> : <MoonIcon />}
      </IconButton>
    </Tooltip>
  )
}
