import * as React from 'react'
import { IconButton } from '@material-ui/core'
import {
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
} from '@material-ui/icons'

import { useTheme } from 'theme'

export default function SidebarToggler() {
  const { toggleTheme, isThemeDark } = useTheme()

  return (
    <IconButton
      onClick={toggleTheme}
      edge="end"
      color="inherit"
      aria-label="toggle light/dark mode"
    >
      {isThemeDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  )
}
