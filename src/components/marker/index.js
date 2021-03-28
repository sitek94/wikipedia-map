import * as React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import getIconFromString from './get-icon-from-string'
import { emit } from 'pages/map/mediator'

export default function Marker({ pageid, title, color = 'primary' }) {
  const icon = getIconFromString(title)

  return (
    <Tooltip title={title} placement="top" enterDelay={0}>
      <IconButton
        color={color}
        onClick={() => emit('markerClicked', { pageid })}
        sx={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          transformOrigin: '0 0',
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  )
}
