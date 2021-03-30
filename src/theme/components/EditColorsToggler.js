import * as React from 'react'
import IconButton from '@material-ui/core/IconButton'
import InvertColorsIcon from '@material-ui/icons/InvertColors'

import EditColorsModal from './EditColorsModal'
import { Tooltip } from '@material-ui/core'

export default function EditColorsToggler() {
  const [isOpen, setIsOpen] = React.useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <Tooltip title="Edit app's colors">
        <IconButton id="test" onClick={openModal} edge="end" color="inherit">
          <InvertColorsIcon />
        </IconButton>
      </Tooltip>
      <EditColorsModal onClose={closeModal} open={isOpen} />
    </>
  )
}
