import * as React from 'react'
import styled from 'styled-components'
import { Modal as AntModal } from 'antd'

import { useMapStore } from 'pages/map/store'

export default function ArticleModal() {
  const [
    { isModalVisible, currentArticle },
    { setIsModalVisible },
  ] = useMapStore()

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const { title, url } = currentArticle

  return (
    <Modal title={title} visible={isModalVisible} onCancel={handleCancel}>
      <p>{url}</p>
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
