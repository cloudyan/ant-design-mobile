import React from 'react'
import { FloatingBubble, Toast } from 'antd-mobile'
import { QuestionCircleFill } from 'antd-mobile-icons'
import { DemoDescription } from '../../../demos'

export default () => {
  const onClick = () => {
    Toast.show('你点击了气泡')
  }
  return (
    <div
      style={{
        textAlign: 'center',
        paddingTop: '50vh',
      }}
    >
      <DemoDescription>尝试拖拽和点击一下气泡吧</DemoDescription>
      <FloatingBubble
        style={{
          '--initial-position-bottom': '24px',
          '--initial-position-right': '24px',
        }}
        onClick={onClick}
      >
        <div className='children'>
          <QuestionCircleFill color='#2477ff' fontSize={36} />
        </div>
      </FloatingBubble>
    </div>
  )
}
