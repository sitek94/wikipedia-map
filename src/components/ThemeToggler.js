import * as React from 'react'
import styled from 'styled-components'
import theme from 'theme'
import { Switch as AntSwitch } from 'antd'

export default function ThemeToggler() {
  const [theme, setTheme] = React.useState('light')
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  React.useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  return (
    <Switch
      onClick={() => setTheme(nextTheme)}
      checkedChildren="☀️"
      unCheckedChildren="🌙"
    />
  )
}

const Switch = styled(AntSwitch)`
  &.ant-switch-checked {
    background-color: rgba(${theme.colors.whiteRgb}, 0.5);
  }
`
