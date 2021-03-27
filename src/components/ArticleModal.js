import * as React from 'react'
import styled from 'styled-components'
import { Modal as AntModal } from 'antd'

import { useMapStore } from 'pages/map/store'
import HeartButton from './HeartButton'

export default function ArticleModal() {
  const [
    { isModalVisible, currentArticle },
    { setIsModalVisible },
  ] = useMapStore()

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const { title, url } = currentArticle

  const [filled, setFilled] = React.useState(false)
  const toggle = () => setFilled(!filled)

  return (
    <Modal
      centered
      visible={isModalVisible}
      onCancel={handleCancel}
      title={
        <>
          <HeartButton isFilled={filled} onClick={toggle} />
          <TitleText>{title}</TitleText>
        </>
      }
    >
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

const TitleText = styled.span`
  font-size: 18px;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`
