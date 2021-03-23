import * as React from 'react'
import styled from 'styled-components'
import { Tooltip } from 'antd'

import theme from 'theme'
import getIconFromString from './get-icon-from-string'

const Circle = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border-radius: 50%;
  color: ${theme.colors.sunset_orange};
  opacity: 0.7;
`

export default function Marker({ title }) {
  const icon = getIconFromString(title)

  return (
    <Tooltip title={title}>
      <Circle>{icon}</Circle>
    </Tooltip>
  )
}
