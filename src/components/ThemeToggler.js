import * as React from 'react'
import { IconButton, Tooltip, useTheme } from '@material-ui/core'
import MoonIcon from '@material-ui/icons/Brightness4'
import SunIcon from '@material-ui/icons/Brightness7'

import { emit } from 'theme/mediator'

export default function SidebarToggler() {
  const { isThemeDark } = useTheme()

  const label = 'Toggle light/dark theme'

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={() => emit('themeModeToggled')}
        edge="end"
        color="inherit"
        aria-label={label}
      >
        {isThemeDark ? <SunIcon /> : <MoonIcon />}
      </IconButton>
    </Tooltip>
  )
}
