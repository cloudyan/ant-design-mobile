import { Button, Overflow, Space } from 'antd-mobile'
import { DownOutline, UpOutline } from 'antd-mobile-icons'
import { DemoBlock } from 'demos'
import React, { useState } from 'react'

const content =
  '蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。'

const contractList = [
  {
    title: '《用户协议》',
    link: 'https://baidu.com',
  },
  {
    title: '《用户隐私政策》',
    link: 'https://baidu.com',
  },
]

// 富文本 String
const richText =
  '蚂蚁的企业级产品是一个复杂体系。为享受更好的服务质量和用户体验，请阅读并同意以下协议：' +
  contractList
    .map((item, index) => {
      return `<a key="${index}" href="${item.link}" target="_blank" rel="noreferrer">
      ${item.title}
    </a>`
    })
    .join('')

const RichContent = () => {
  return <div dangerouslySetInnerHTML={{ __html: richText }} />
}

const modes = ['css', 'float', 'viewport']

type modeType = 'css' | 'float' | 'viewport'

export default () => {
  const [rows, setRows] = useState<number>(2)
  const [mode, setMode] = useState<modeType>('viewport')

  const inc = () => {
    setRows(v => v + 1)
  }
  const dec = () => {
    setRows(v => v - 1)
  }

  const modeChange = () => {
    setMode((v: modeType): modeType => {
      const index = modes.indexOf(v)
      return modes[(index + 1) % modes.length] as modeType
    })
  }

  return (
    <>
      <div
        title='操作按钮'
        style={{
          position: 'fixed',
          top: '0',
          left: '30%',
          opacity: 0.5,
        }}
      >
        <Space>
          <Button onClick={inc}>+1</Button>
          <Button onClick={dec}>-1</Button>
          <Button onClick={modeChange}>mode: {mode}</Button>
        </Space>
      </div>

      {/* css 模式，不支持交互 */}
      <DemoBlock title='单/多行省略'>
        <Overflow mode={mode} rows={rows} content={content} />
      </DemoBlock>

      <DemoBlock title='默认展开'>
        <Overflow
          mode={mode}
          rows={rows}
          content={content}
          defaultExpanded={true}
          expandText='展开'
          collapseText='收起'
        />
        <Overflow
          mode={mode}
          rows={rows}
          content={content}
          defaultExpanded={true}
          expandText=''
          collapseText=''
        />
      </DemoBlock>

      <DemoBlock title='内容为中英混合内容'>
        <Overflow
          mode={mode}
          content='为享受更好的服务体验，请阅读并同意《用户协议》，《用户隐私政策》To enjoy a better service experience, please read and agree to the User Agreement, User Privacy Policy.'
          rows={rows}
          expandText={
            <>
              展开
              <DownOutline />
            </>
          }
          collapseText={
            <>
              收起
              <UpOutline />
            </>
          }
        />
      </DemoBlock>

      {/* 目前不支持富文本或 React 组件 */}
      <DemoBlock title='内容支持富文本或 React 组件'>
        <Overflow
          mode={mode}
          content={<RichContent />}
          rows={rows}
          expandText={
            <>
              ...展开
              <DownOutline />
            </>
          }
          collapseText={
            <>
              收起
              <UpOutline />
            </>
          }
        />
      </DemoBlock>
    </>
  )
}
