import * as React from 'react'
import Collapse from '@material-ui/core/Collapse'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

export default function CollapsibleItem({ icon, primary, onExpand, children }) {
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)

    if (!open) {
      onExpand()
    }
  }

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{icon}</ListItemIcon>

        <ListItemText primary={primary} />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  )
}
