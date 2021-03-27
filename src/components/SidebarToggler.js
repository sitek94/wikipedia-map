import styled from 'styled-components'
import { Button as AntButton } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

import { useMapStore } from 'pages/map/store'
import theme from 'theme'

export default function SidebarToggler() {
  const [, { setIsSidebarVisible }] = useMapStore()
  const openSidebar = () => setIsSidebarVisible(true)

  return (
    <Button
      size="large"
      shape="circle"
      type="text"
      onClick={openSidebar}
      icon={<MenuOutlined style={{ fontSize: 22 }} />}
    />
  )
}

const Button = styled(AntButton)`
  color: ${theme.colors.text.default};

  &.ant-btn-text:hover,
  &.ant-btn-text:focus {
    color: ${theme.colors.text.default};
    background-color: ${theme.colors.background.level2};
  }
`
