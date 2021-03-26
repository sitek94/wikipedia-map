import * as React from 'react'
import styled from 'styled-components'
import { Switch as AntSwitch } from 'antd'

import theme, { useTheme } from 'theme'

export default function ThemeToggler() {
  const { toggleTheme, isThemeDark } = useTheme()

  return (
    <Switch
      onClick={toggleTheme}
      checkedChildren="☀️"
      unCheckedChildren="🌙"
      defaultChecked={isThemeDark}
    />
  )
}

const Switch = styled(AntSwitch)`
  &.ant-switch-checked {
    background-color: rgba(${theme.colors.whiteRgb}, 0.5);
  }
`
