import * as React from 'react'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import Divider from '@material-ui/core/Divider'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import SelectColorPane from './SelectColorPane'
import palette from 'theme/palette'
import { emit } from 'theme/mediator'

export default function ColorsModal({ onClose, open }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Edit app colors</DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <SelectColorPane
            color="primary"
            title="Primary color"
            onSelect={color => emit('primaryColorSelected', palette[color])}
          />

          <Divider flexItem orientation="vertical" />

          <SelectColorPane
            color="secondary"
            title="Secondary color"
            onSelect={color => emit('secondaryColorSelected', palette[color])}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
