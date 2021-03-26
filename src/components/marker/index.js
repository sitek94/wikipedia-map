import * as React from 'react'
import styled from 'styled-components'
import { Tooltip } from 'antd'

import theme from 'theme'
import getIconFromString from './get-icon-from-string'
import { emit } from 'pages/map/mediator'

export default function Marker({ pageid, title, color = 'orange' }) {
  const icon = getIconFromString(title)

  return (
    <Tooltip title={title}>
      <IconBox color={color} onClick={() => emit('markerClicked', { pageid })}>
        {icon}
      </IconBox>
    </Tooltip>
  )
}

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  cursor: pointer;
  color: ${props => theme.colors[props.color]};
  position: absolute;
  transform: scale(0.95) translate(-50%, -50%);
  transform-origin: 0 0;
  transition: all 0.2s ease-in;
  opacity: 0.7;

  &:hover {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
`
