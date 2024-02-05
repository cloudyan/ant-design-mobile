import React, { useRef, useState } from 'react'
import { Tabs, Swiper } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import GetPullToRefreshlData from './getPullToRefreshlData'
// import './styles.css';

// Tabs 配合 Swiper、PullToRefresh、InfiniteScroll 实现一个复杂的信息流界面

// - Tabs 扩展支持 sticky 吸顶效果
// - Tabs 定制高度 48px
// - Tabs.Tab 拉伸效果，扩大点击区域
// - tab 切换列表内容，支持缓存，提高交互体验
// - tab 切换时，刷新列表内容（因刷新，会重新滚动到页面顶部）
// - 列表进入详情返回时，不刷新列表（保持滚动位置，有需要可以刷具体某列表项）

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
          height={60}
          style={{ '--active-line-height': '3px' }}
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
