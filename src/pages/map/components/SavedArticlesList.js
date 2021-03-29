import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import LocationIcon from '@material-ui/icons/LocationSearching'
import HeartIcon from '@material-ui/icons/Favorite'
import { red } from '@material-ui/core/colors'

import { emit } from '../mediator'
import { useMapStore } from '../store'
import CollapsibleListItem from 'components/CollapsibleListItem'
import { Tooltip } from '@material-ui/core'

export default function SavedArticlesList() {
  const [{ savedArticles }] = useMapStore()

  const locationLabel = 'Go to article location'

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
            <ListItemSecondaryAction>
              <Tooltip title={locationLabel} placement="right">
                <IconButton
                  edge="end"
                  aria-label={locationLabel}
                  onClick={() =>
                    emit('savedArticleLocationClicked', { lat, lng })
                  }
                >
                  <LocationIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </CollapsibleListItem>
  )
}
