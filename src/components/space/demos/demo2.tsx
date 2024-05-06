import React from 'react'
import { Space, Button, Image } from 'antd-mobile'
import { DemoBlock } from 'demos'

const demoSrc =
  'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'
const demoSrc2 =
  'https://images.unsplash.com/photo-1620476214170-1d8080f65cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3150&q=80'

export default () => {
  const imgStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
  }

  return (
    <>
      <DemoBlock title='嵌套布局-图片橱窗-1'>
        <Space block direction='vertical'>
          <Space>
            <Image fit='contain' src={demoSrc}></Image>
          </Space>
          <Space itemStyle={{ flex: 1 }}>
            <Image fit='fill' src={demoSrc2}></Image>
            <Image fit='contain' src={demoSrc2}></Image>
          </Space>
        </Space>
      </DemoBlock>
    </>
  )
}
