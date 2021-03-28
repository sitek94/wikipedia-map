import * as React from 'react'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import Collapse from '@material-ui/core/Collapse'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { useMapStore } from './store'

export default function Sidebar2() {
  const [{ isSidebarVisible }, { setIsSidebarVisible }] = useMapStore()
  const closeSidebar = () => setIsSidebarVisible(false)

  return (
    <Drawer anchor="left" open={isSidebarVisible} onClose={closeSidebar}>
      {list}
    </Drawer>
  )
}

const list = (
  <List sx={{ width: 250 }}>
    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
      <ListItem button key={text}>
        <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    ))}
    <NestedList />
  </List>
)

function NestedList() {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Array(20)
            .fill(null)
            .map((_, i) => (
              <ListItem key={i} sx={{ pl: 4 }} button>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItem>
            ))}
        </List>
      </Collapse>
    </>
  )
}
