import * as React from 'react'
import { Button } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

export default function HeartButton({ onClick, isFilled = false }) {
  return (
    <Button
      type="text"
      size="large"
      onClick={onClick}
      icon={
        isFilled ? (
          <HeartFilled style={{ color: '#eb2f96' }} />
        ) : (
          <HeartOutlined />
        )
      }
    />
  )
}
