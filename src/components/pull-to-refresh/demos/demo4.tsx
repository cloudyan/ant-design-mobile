import React, { ReactNode, useRef, useState } from 'react'
import {
  Tabs,
  Swiper,
  PullToRefresh,
  SpinLoading,
  DotLoading,
  NoticeBar,
} from 'antd-mobile'
import { DemoBlock, sleep } from 'demos'
import './demo4.less'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import { PullStatus } from 'antd-mobile/es/components/pull-to-refresh'
// import loading from './loading.gif'

const tabItems = [
  { key: 'fruits', title: '水果' },
  { key: 'vegetables', title: '蔬菜' },
  { key: 'animals', title: '动物' },
]

// const Loading = (<img className="pull-loading" src={loading} />)
const Loading = (
  <div style={{ padding: '8px 0' }}>
    <DotLoading color='primary' />
  </div>
)
// const Loading = (<div style={{padding: '16px 0'}}><SpinLoading color="primary" style={{ '--size': '24px' }} /></div>)
const statusRecord: Record<PullStatus, ReactNode> = {
  default: '',
  pulling: Loading,
  canRelease: Loading,
  refreshing: Loading,
  complete: Loading,
}

const CustomPullToRefresh = ({
  onRefresh,
  children,
}: {
  onRefresh: () => Promise<any>
  children: React.ReactNode
}) => {
  return (
    <PullToRefresh
      className='custom-pull-to-refresh'
      onRefresh={async () => {
        await onRefresh()
      }}
      renderText={status => {
        return <div>{statusRecord[status]}</div>
      }}
    >
      {children}
    </PullToRefresh>
  )
}

export default () => {
  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [time, setTime] = useState(new Date().toJSON())

  const pageInit = async (index: number) => {
    await sleep(3000)
    console.log(index)
    setTime(new Date().toJSON())
  }

  return (
    <>
      <DemoBlock
        title='配合 Swiper 实现手势滑动 + PullToRefresh'
        padding='0'
        style={{ height: '100vh' }}
        background=''
      >
        <Tabs
          className={`pull-tabs`}
          activeKey={tabItems[activeIndex].key}
          onChange={key => {
            const index = tabItems.findIndex(item => item.key === key)
            setActiveIndex(index)
            swiperRef.current?.swipeTo(index)
          }}
        >
          {tabItems.map(item => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))}
        </Tabs>
        <Swiper
          direction='horizontal'
          loop
          indicator={() => null}
          ref={swiperRef}
          defaultIndex={activeIndex}
          onIndexChange={index => {
            setActiveIndex(index)
          }}
        >
          <Swiper.Item>
            <NoticeBar content='这条通知可以关闭' color='alert' closeable />
            <CustomPullToRefresh
              onRefresh={async () => {
                await pageInit(1)
              }}
            >
              <div className={`pull-content`}>
                菠萝
                <p>{time}</p>
              </div>
            </CustomPullToRefresh>
          </Swiper.Item>
          <Swiper.Item>
            <CustomPullToRefresh
              onRefresh={async () => {
                await pageInit(2)
              }}
            >
              <div className={`pull-content`}>
                西红柿
                <p>{time}</p>
              </div>
            </CustomPullToRefresh>
          </Swiper.Item>
          <Swiper.Item>
            <CustomPullToRefresh
              onRefresh={async () => {
                await pageInit(3)
              }}
            >
              <div className={`pull-content`}>
                蚂蚁
                <p>{time}</p>
              </div>
            </CustomPullToRefresh>
          </Swiper.Item>
        </Swiper>
      </DemoBlock>
    </>
  )
}
