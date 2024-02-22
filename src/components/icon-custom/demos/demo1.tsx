import React from 'react'
import { IconCustom, Space } from 'antd-mobile'
import { DemoBlock } from 'demos'
import spinUrl, { ReactComponent as Spin } from './spin.svg'

export default () => {
  return (
    <>
      <DemoBlock title='标题'>
        <Space wrap align='center' style={{ '--gap': '24px', color: 'red' }}>
          <IconCustom />
          <img src={spinUrl} alt='spin' width={24} height={24} />
          <Spin width={24} height={24} />
        </Space>
      </DemoBlock>
    </>
  )
}
