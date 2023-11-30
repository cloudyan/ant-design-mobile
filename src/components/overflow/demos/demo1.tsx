import React from 'react'
import { Ellipsis, Space } from 'antd-mobile'
import { DemoBlock } from 'demos'
import { DownOutline, UpOutline } from 'antd-mobile-icons'

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

// 协议
const contractStr = `蚂蚁的企业级产品是一个庞大且复杂的体系。为享受更好的服务质量和用户体验，请阅读并同意以下协议：《用户协议》《用户隐私政策》`

// 富文本 String
const contractListStr =
  '蚂蚁的企业级产品是一个庞大且复杂的体系。为享受更好的服务质量和用户体验，请阅读并同意以下协议：' +
  contractList
    .map((item, index) => {
      return `<a key="${index}" href="${item.link}" target="_blank" rel="noreferrer">
      ${item.title}
    </a>`
    })
    .join('')

const RichContent = () => {
  return <div dangerouslySetInnerHTML={{ __html: contractListStr }} />
}

export default () => {
  return (
    <>
      <DemoBlock title='尾部省略'>
        <Ellipsis direction='end' content={content} />
      </DemoBlock>

      <DemoBlock title='头部省略'>
        <Ellipsis direction='start' content={content} />
      </DemoBlock>

      <DemoBlock title='中间省略'>
        <Ellipsis direction='middle' content={content} />
      </DemoBlock>

      <DemoBlock title='多行省略'>
        <Ellipsis direction='end' rows={3} content={content} />
      </DemoBlock>

      <DemoBlock title='展开收起'>
        <Ellipsis
          direction='end'
          content={content}
          expandText='展开'
          collapseText='收起'
        />
      </DemoBlock>

      <DemoBlock title='仅展开'>
        <Space block direction='vertical'>
          <Ellipsis direction='end' content={content} expandText='展开' />
          <Ellipsis direction='start' content={content} expandText='展开' />
          <Ellipsis direction='middle' content={content} expandText='展开' />
        </Space>
      </DemoBlock>

      <DemoBlock title='默认展开'>
        <Ellipsis
          content={content}
          defaultExpanded={true}
          expandText='展开'
          collapseText='收起'
        />
      </DemoBlock>

      <DemoBlock title='emoji'>
        <Ellipsis
          direction='end'
          content={
            '🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉'
          }
          expandText='展开'
          collapseText='收起'
        />
      </DemoBlock>
      <DemoBlock title='这是一个使用icon的例子'>
        <Ellipsis
          direction='end'
          content={content}
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

      <DemoBlock title='内容为中英混合内容'>
        <Ellipsis
          direction='end'
          content='为享受更好的服务体验，请阅读并同意《用户协议》，《用户隐私政策》。To enjoy a better service experience, please read and agree to the User Agreement, User Privacy Policy.'
          rows={2}
          expandText={
            <>
              展开
              <DownOutline />
            </>
          }
        />
      </DemoBlock>

      {/* 目前不支持富文本或 React 组件 */}
      {/* <DemoBlock title='内容为富文本或 React 组件'>
        <Ellipsis
          direction='end'
          content={<RichContent />}
          rows={2}
          expandText={
            <>
              展开
              <DownOutline />
            </>
          }
        />
      </DemoBlock> */}
    </>
  )
}
