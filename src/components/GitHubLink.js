import * as React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'

export default function GitHubLink() {
  const label = 'GitHub repository'

  return (
    <Tooltip title={label}>
      <IconButton
        edge="end"
        color="inherit"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/sitek94/wikipedia-map"
        aria-label={label}
      >
        <GitHubIcon />
      </IconButton>
    </Tooltip>
  )
}
