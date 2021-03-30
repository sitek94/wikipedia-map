import * as React from 'react'
import { Box, useTheme, Typography } from '@material-ui/core'
import { ColorPalette } from 'material-ui-color'
import { FaCircle, FaLandmark, FaMonument } from 'react-icons/fa'

import palette from '../palette'

export default function SelectColorPane({ title, color, onSelect }) {
  const theme = useTheme()

  const iconStyle = {
    color: theme.palette[color].main,
    fontSize: 60,
  }

  return (
    <Box sx={{ maxWidth: 200 }}>
      <Typography align="center" fontWeight="bold" sx={{ mb: 1 }}>
        {title}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <ColorPalette palette={palette} onSelect={onSelect} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <FaLandmark style={iconStyle} />
        <FaMonument style={iconStyle} />
        <FaCircle style={iconStyle} />
      </Box>
    </Box>
  )
}
