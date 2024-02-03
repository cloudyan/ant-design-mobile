import React, { useRef, useState } from 'react'
import { Tabs, Swiper } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import GetPullToRefreshlData from './getPullToRefreshlData'
// import './styles.css';

const tabItems = [
  { key: 'fruits', title: '水果' },
  { key: 'vegetables', title: '蔬菜' },
  { key: 'animals', title: '动物' },
]

export default () => {
  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState(1)
  return (
    <div>
      <div
        style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff' }}
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
      </div>
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
          <div className='ontent'>
            <GetPullToRefreshlData itemKey='1' />
            菠萝
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className='ontent'>
            <GetPullToRefreshlData itemKey='2' />
            西红柿
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className='ontent'>
            <GetPullToRefreshlData itemKey='3' />
            蚂蚁
          </div>
        </Swiper.Item>
      </Swiper>
    </div>
  )
}
