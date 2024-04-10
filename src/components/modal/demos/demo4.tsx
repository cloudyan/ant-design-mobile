import React from 'react'
import { Button, Modal, Space, Toast, Divider } from 'antd-mobile'
import { DemoBlock, DemoDescription, sleep } from 'demos'
import { fnAlert } from './fn-alert'

export default () => {
  return (
    <>
      <DemoBlock title='封装函数式复用'>
        <Space direction='vertical' block>
          <Button block onClick={() => fnAlert({ type: '01' })}>
            弹窗 1
          </Button>
          <Button block onClick={() => fnAlert({ type: '02' })}>
            弹窗 2
          </Button>
        </Space>
      </DemoBlock>
    </>
  )
}
