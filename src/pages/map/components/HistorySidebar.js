import * as React from 'react'
import HeartIcon from '@material-ui/icons/Favorite'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'

import { useMapStore } from '../store'
import { Box } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { emit } from '../mediator'

export default function Sidebar() {
  const [{ isSidebarVisible }, { setIsSidebarVisible }] = useMapStore()
  const closeSidebar = () => setIsSidebarVisible(false)

  return (
    <Drawer
      anchor="left"
      open={isSidebarVisible}
      onClose={closeSidebar}
      variant="persistent"
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List sx={{ width: 250 }}>
          <NestedList
            primary="Saved articles"
            collapsedElement={<SavedArticlesList />}
          />
        </List>
      </Box>
    </Drawer>
  )
}

function NestedList({ primary, collapsedElement }) {
  const [open, setOpen] = React.useState(true)
  const handleClick = () => setOpen(!open)

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
          <HeartIcon style={{ color: red['A400'] }} />
        </ListItemIcon>

        <ListItemText primary={primary} />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {collapsedElement}
      </Collapse>
    </>
  )
}

function SavedArticlesList() {
  const [{ savedArticles }] = useMapStore()

  return (
    <List component="div" disablePadding dense>
      {savedArticles.map(({ pageid, title, lat, lng }) => (
        <ListItem
          key={pageid}
          onClick={() => emit('sidebarSavedArticleClick', { lat, lng })}
          button
        >
          <ListItemText primary={title} />
        </ListItem>
      ))}
    </List>
  )
}
