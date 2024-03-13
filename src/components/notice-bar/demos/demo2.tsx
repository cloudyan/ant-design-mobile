import React from 'react'
import { Swiper, NoticeBar, Toast } from 'antd-mobile'
import { DemoBlock, lorem } from 'demos'
import { CompassOutline, CloseCircleOutline } from 'antd-mobile-icons'

// const demoLongText = lorem.generateWords(20)

export default () => {
  const notices = [
    {
      content: '',
      background: '#ace0ff',
    },
    {
      content: '',
      background: '#bcffbd',
    },
    {
      content: '',
      background: '#e4fabd',
    },
    {
      content: '',
      background: '#ffcfac',
    },
  ]
  const items = notices.map((item, index) => (
    <Swiper.Item key={index}>
      <div
        // className={styles.content}
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`)
        }}
      >
        <NoticeBar
          style={{
            '--background-color': item.background,
            '--text-color': '#333',
            '--border-color': 'transparent',
          }}
          extra={<CloseCircleOutline style={{ fontSize: 18 }} />}
          icon={<CompassOutline />}
          content={'自定义图标' + index + 1}
        />
      </div>
    </Swiper.Item>
  ))

  return (
    <>
      <DemoBlock title='轮播切换展示多条公告'>
        <Swiper
          loop
          autoplay
          autoplayInterval={5000}
          direction='vertical'
          style={{ height: 40 }}
          indicator={false}
          allowTouchMove={false}
          onIndexChange={i => {
            console.log(i, 'onIndexChange1')
          }}
        >
          {items}
        </Swiper>
      </DemoBlock>

      <DemoBlock title='渐变切换展示多条公告'></DemoBlock>
    </>
  )
}
