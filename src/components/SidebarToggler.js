import { Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

import { useMapStore } from 'pages/map/store'

export default function SidebarToggler() {
  const [, { setIsSidebarVisible }] = useMapStore()
  const openSidebar = () => setIsSidebarVisible(true)

  return <Button type="primary" onClick={openSidebar} icon={<MenuOutlined />} />
}
