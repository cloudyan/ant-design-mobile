import React from 'react'
import { NoticeBar, Space } from 'antd-mobile'
import { CompassOutline, CloseCircleOutline } from 'antd-mobile-icons'
import { DemoBlock, lorem } from 'demos'

const demoLongText = lorem.generateWords(20)

export default () => {
  return (
    <>
      <DemoBlock
        title='四种配色'
        padding='0'
        border='none'
        background='transparent'
      >
        <Space block direction='vertical'>
          <NoticeBar content='默认' color='default' />
          <NoticeBar content='警告' color='alert' />
          <NoticeBar content='错误' color='error' />
          <NoticeBar content='信息' color='info' />
        </Space>
      </DemoBlock>
      <DemoBlock title='超长滚动' padding='0' border='none'>
        <NoticeBar content={demoLongText} color='alert' />
      </DemoBlock>
      <DemoBlock title='可关闭' padding='0' border='none'>
        <NoticeBar content='这条通知可以关闭' color='alert' closeable />
      </DemoBlock>
      <DemoBlock
        title='自定义'
        padding='0'
        border='none'
        background='transparent'
      >
        <Space block direction='vertical'>
          <NoticeBar
            extra={<CloseCircleOutline />}
            icon={<CompassOutline />}
            content={'自定义图标'}
          />
          <NoticeBar
            extra={
              <Space>
                <span>查看详情</span>
                <span>关闭</span>
              </Space>
            }
            content={'自定义右侧功能区'}
            color='alert'
          />
        </Space>
      </DemoBlock>
    </>
  )
}
