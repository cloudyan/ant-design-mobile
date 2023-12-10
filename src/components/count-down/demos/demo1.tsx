import { CountDown } from 'antd-mobile'
import { DemoBlock } from 'demos'
import React from 'react'

export default () => {
  return (
    <>
      <DemoBlock title='基础用法'>
        <CountDown time={100000} />
      </DemoBlock>
      <DemoBlock title='自定义格式'></DemoBlock>
      <DemoBlock title='毫秒级渲染'>
        <CountDown time={100000} millisecond />
      </DemoBlock>
      <DemoBlock title='自定义样式'></DemoBlock>
      <DemoBlock title='手动控制'></DemoBlock>
    </>
  )
}
