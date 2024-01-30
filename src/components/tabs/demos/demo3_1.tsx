import React, { useRef, useState } from 'react'
import { Tabs, Swiper, PullToRefresh } from 'antd-mobile'
import { DemoBlock, sleep } from 'demos'
import styles from './demo3.less'
import { SwiperRef } from 'antd-mobile/es/components/swiper'

const tabItems = [
  { key: 'fruits', title: '水果' },
  { key: 'vegetables', title: '蔬菜' },
  { key: 'animals', title: '动物' },
]

export default () => {
  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [time, setTime] = useState(new Date().toJSON())

  const pageInit = (index: number) => {
    console.log(index)
    setTime(new Date().toJSON())
  }

  return (
    <>
      <DemoBlock
        title='配合 Swiper 实现手势滑动 + PullToRefresh'
        padding='0'
        style={{ height: '100vh' }}
      >
        <Tabs
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
            <PullToRefresh
              onRefresh={async () => {
                await sleep(1500)
                pageInit(1)
              }}
            >
              <div className={styles.content}>
                菠萝
                <p>{time}</p>
              </div>
            </PullToRefresh>
          </Swiper.Item>
          <Swiper.Item>
            <PullToRefresh
              onRefresh={async () => {
                await sleep(3000)
                pageInit(2)
              }}
            >
              <div className={styles.content}>
                西红柿
                <p>{time}</p>
              </div>
            </PullToRefresh>
          </Swiper.Item>
          <Swiper.Item>
            <PullToRefresh
              onRefresh={async () => {
                await sleep(2000)
                pageInit(3)
              }}
            >
              <div className={styles.content}>
                蚂蚁
                <p>{time}</p>
              </div>
            </PullToRefresh>
          </Swiper.Item>
        </Swiper>
      </DemoBlock>
    </>
  )
}
