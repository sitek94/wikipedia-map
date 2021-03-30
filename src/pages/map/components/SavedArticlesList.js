import * as React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import LocationIcon from '@material-ui/icons/LocationSearching'
import HeartIcon from '@material-ui/icons/Favorite'
import Tooltip from '@material-ui/core/Tooltip'
import { red } from '@material-ui/core/colors'

import { emit } from '../mediator'
import { useMapStore } from '../store'
import CollapsibleListItem from 'components/CollapsibleListItem'

export default function SavedArticlesList() {
  const [{ savedArticles }] = useMapStore()

  const locationLabel = 'Go to article location'

  const articlesList = (
    <List component="div" disablePadding dense>
      {savedArticles.map(({ pageid, title, lat, lng }) => (
        <ListItem
          key={pageid}
          onClick={() => emit('savedArticleItemClicked', { pageid })}
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
  )

  const emptyListMessage = (
    <ListItem>
      <ListItemText primary="There are no saved articles" />
    </ListItem>
  )

  return (
    <CollapsibleListItem
      primary="Saved articles"
      icon={<HeartIcon color="secondary" />}
      onExpand={() => emit('savedArticlesExpanded')}
    >
      {savedArticles.length ? articlesList : emptyListMessage}
    </CollapsibleListItem>
  )
}
