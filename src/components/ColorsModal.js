import * as React from 'react'
import { useTheme } from '@material-ui/core'
import { ColorPalette } from 'material-ui-color'
import { FaCircle, FaLandmark, FaMonument } from 'react-icons/fa'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import Divider from '@material-ui/core/Divider'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

import palette from 'theme/palette'
import { emit } from 'theme/mediator'

export default function ColorsModal({ onClose, open }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Edit app colors</DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ColorSelectPane
            color="primary"
            title="Primary color"
            onSelect={color => emit('primaryColorSelected', palette[color])}
          />

          <Divider flexItem orientation="vertical" />

          <ColorSelectPane
            color="secondary"
            title="Secondary color"
            onSelect={color => emit('secondaryColorSelected', palette[color])}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}

function ColorSelectPane({ title, color, onSelect }) {
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
