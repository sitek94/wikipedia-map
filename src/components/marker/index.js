import * as React from 'react'
import styled from 'styled-components'
import { Tooltip } from 'antd'

import theme from 'theme'
import getIconFromString from './get-icon-from-string'

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  cursor: pointer;
  color: ${theme.colors.sunset_orange};
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

export default function Marker({ title }) {
  const icon = getIconFromString(title)

  return (
    <Tooltip title={title}>
      <Circle>{icon}</Circle>
    </Tooltip>
  )
}
