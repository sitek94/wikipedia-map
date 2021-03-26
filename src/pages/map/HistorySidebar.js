import styled from 'styled-components'
import { Menu, Modal } from 'antd'
import { HeartOutlined } from '@ant-design/icons'

import { useMapStore } from './store'

const { SubMenu } = Menu

export default function HistorySidebar({ children }) {
  const [{ isSidebarVisible }, { setIsSidebarVisible }] = useMapStore()

  return (
    <Sidebar
      title="History"
      visible={isSidebarVisible}
      onCancel={() => setIsSidebarVisible(false)}
    >
      <Menu theme="light" mode="inline">
        <SubMenu key="1ub1" icon={<HeartOutlined />} title="Saved Places">
          <Menu.Item key="1">Tom</Menu.Item>
          <Menu.Item key="2">Bill</Menu.Item>
          <Menu.Item key="3">Alex</Menu.Item>
          <Menu.Item key="4">Tom</Menu.Item>
          <Menu.Item key="5">Bill</Menu.Item>
          <Menu.Item key="6">Alex</Menu.Item>
          <Menu.Item key="7">Tom</Menu.Item>
          <Menu.Item key="8">Bill</Menu.Item>
          <Menu.Item key="9">Alex</Menu.Item>
          <Menu.Item key="10">Tom</Menu.Item>
          <Menu.Item key="11">Bill</Menu.Item>
          <Menu.Item key="12">Alex</Menu.Item>
          <Menu.Item key="13">Tom</Menu.Item>
          <Menu.Item key="14">Bill</Menu.Item>
          <Menu.Item key="15">Alex</Menu.Item>
          <Menu.Item key="16">Tom</Menu.Item>
          <Menu.Item key="17">Bill</Menu.Item>
          <Menu.Item key="18">Alex</Menu.Item>
          <Menu.Item key="19">Tom</Menu.Item>
          <Menu.Item key="20">Bill</Menu.Item>
          <Menu.Item key="21">Alex</Menu.Item>
        </SubMenu>
      </Menu>
    </Sidebar>
  )
}

const modalHeaderHeight = '55px'

/**
 * Sidebar is based on Ant Design's Modal component becuase I didn't like any
 * of the available Siders
 */
const Sidebar = styled(Modal).attrs({
  width: 200,
  bodyStyle: {
    height: `calc(100vh - ${modalHeaderHeight})`,
    padding: 0,
    overflow: 'auto',
  },
  // # TODO: replace default transition with sliding effect instead of just
  // removing them
  transitionName: '',
  footer: null,
})`
  position: fixed;
  top: 0;
  left: 0;
`
