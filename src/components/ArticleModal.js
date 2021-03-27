import * as React from 'react'
import styled from 'styled-components'
import { Modal as AntModal } from 'antd'

import { useMapStore } from 'pages/map/store'
import { emit } from 'pages/map/mediator'
import HeartButton from './HeartButton'

export default function ArticleModal() {
  const [
    { isModalVisible, currentArticle },
    { setIsModalVisible },
  ] = useMapStore()

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const modalTitle = (
    <>
      <HeartButton
        isFilled={currentArticle.isSaved}
        onClick={() => emit('modalHeartClicked')}
      />
      <TitleText>{currentArticle.title}</TitleText>
    </>
  )

  return (
    <Modal
      centered
      visible={isModalVisible}
      onCancel={handleCancel}
      title={modalTitle}
    >
      <Iframe
        title={currentArticle.title}
        src={currentArticle.url.replace('wikipedia.org', 'm.wikipedia.org')}
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

const TitleText = styled.span`
  font-size: 18px;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`
