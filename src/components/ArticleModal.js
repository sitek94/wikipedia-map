import * as React from 'react'
import styled from 'styled-components'
import { Modal as AntModal } from 'antd'

import { useMapStore } from 'pages/map/store'

export default function ArticleModal() {
  const [{ isModalVisible }, { setIsModalVisible }] = useMapStore()

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

const Modal = styled(AntModal).attrs({
  footer: null,
  width: '80vw',
  bodyStyle: {
    height: 'calc(80vh - 70px)',
  },
})``
