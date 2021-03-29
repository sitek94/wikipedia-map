import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import HeartIcon from '@material-ui/icons/Favorite'
import { red } from '@material-ui/core/colors'

import { emit } from '../mediator'
import { useMapStore } from '../store'
import CollapsibleListItem from 'components/CollapsibleListItem'

export default function SavedArticlesList() {
  const [{ savedArticles }] = useMapStore()

  return (
    <CollapsibleListItem
      primary="Saved articles"
      icon={<HeartIcon style={{ color: red[500] }} />}
      onExpand={() => emit('savedArticlesExpanded')}
    >
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
    </CollapsibleListItem>
  )
}
