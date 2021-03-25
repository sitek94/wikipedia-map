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
      <Iframe
        title={title}
        src={url.replace('wikipedia.org', 'm.wikipedia.org')}
      />
    </Modal>
  )
}

const Modal = styled(AntModal).attrs({
  footer: null,
  width: '80vw',
  bodyStyle: {
    height: 'calc(80vh)',
  },
})`
  max-width: 1200px;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`
