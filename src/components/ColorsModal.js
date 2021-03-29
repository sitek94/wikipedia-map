import * as React from 'react'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core'
import { ColorPalette } from 'material-ui-color'

import palette from 'theme/palette'

export default function ColorsModal({ onClose, open }) {
  const { setPrimaryColor, setSecondaryColor } = useTheme()

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Edit app colors</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>Primary color</Typography>
          <ColorPalette
            palette={palette}
            onSelect={color => setPrimaryColor(palette[color])}
          />
        </Box>
        <Box>
          <Typography gutterBottom>Secondary color</Typography>
          <ColorPalette
            palette={palette}
            onSelect={color => setSecondaryColor(palette[color])}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
