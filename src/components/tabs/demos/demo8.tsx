import React, { useRef, useState } from 'react'
import { Tabs, Swiper } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import GetPullToRefreshlData from './getPullToRefreshlData'
// import './styles.css';

// Tabs 实现页面切换效果，支持缓存

const tabItems = [
  { key: 'bill_unpaid', title: '待支付' },
  { key: 'bill_all', title: '全部订单' },
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
      <div className='tabs-content'>
        <div
          style={{ display: activeIndex === 0 ? 'block' : 'none' }}
          className='ontent'
        >
          <GetPullToRefreshlData itemKey='1' />
          待支付
        </div>
        <div
          style={{ display: activeIndex === 1 ? 'block' : 'none' }}
          className='ontent'
        >
          <GetPullToRefreshlData itemKey='2' />
          全部订单
        </div>
      </div>
    </div>
  )
}
