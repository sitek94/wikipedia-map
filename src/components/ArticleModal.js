import * as React from 'react'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from '@material-ui/core'
import {
  Close as CloseIcon,
  FavoriteBorder as HeartEmptyIcon,
  Favorite as HeartFilledIcon,
} from '@material-ui/icons'
import { red } from '@material-ui/core/colors'

import { useMapStore } from 'pages/map/store'
import { emit } from 'pages/map/mediator'

export default function ArticleModal() {
  const [
    { isModalVisible, currentArticle, savedArticlesIds },
    { setIsModalVisible },
  ] = useMapStore()

  const handleClose = () => {
    setIsModalVisible(false)
  }

  const { title, url, pageid } = currentArticle
  const isSaved = savedArticlesIds.includes(pageid)

  const heartButtonLabel = isSaved
    ? 'add article to saved'
    : 'remove article from saved'

  return (
    <Dialog
      onClose={handleClose}
      open={isModalVisible}
      PaperProps={{
        sx: {
          height: '80vh',
          width: '80vw',
          maxWidth: '1200px',
        },
      }}
    >
      <DialogTitle
        onClose={handleClose}
        disableTypography
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Heart button */}
        <IconButton
          onClick={() => emit('modalHeartClicked')}
          aria-label={heartButtonLabel}
        >
          {isSaved ? (
            <HeartFilledIcon style={{ color: red['A400'] }} />
          ) : (
            <HeartEmptyIcon />
          )}
        </IconButton>

        {/* Modal title */}
        <Typography variant="h6" component="h2">
          {title}
        </Typography>

        {/* Close modal button */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 1,
            top: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2, height: '100%', overflow: 'hidden' }}>
        {/* Iframe with Wikipedia article */}
        <Box clone sx={{ height: '100%', width: '100%', border: 'none' }}>
          <iframe
            title={title}
            src={url.replace('wikipedia.org', 'm.wikipedia.org')}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}
