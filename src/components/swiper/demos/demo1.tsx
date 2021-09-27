import React, { FC, useRef, useState } from 'react'
import { Button, Popup, Space, Swiper, Toast } from 'antd-mobile'
import { DemoBlock, DemoDescription } from 'demos'
import styles from './demo1.less'
import { SwiperRef } from 'antd-mobile/es/components/swiper'

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className={styles.content}
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
))

export default () => {
  const ref = useRef<SwiperRef>(null)
  return (
    <>
      <DemoBlock title='基础用法'>
        <Swiper>{items}</Swiper>
      </DemoBlock>
      <DemoBlock title='自动播放'>
        <Swiper autoplay>{items}</Swiper>
      </DemoBlock>
      <DemoBlock title='禁用循环'>
        <Swiper loop={false}>{items}</Swiper>
      </DemoBlock>
      <DemoBlock title='手动控制'>
        <Space direction='vertical' block>
          <Swiper allowTouchMove={false} ref={ref} loop={false}>
            {items}
          </Swiper>
          <Space>
            <Button
              onClick={() => {
                ref.current?.swipePrev()
              }}
            >
              上一张
            </Button>
            <Button
              onClick={() => {
                ref.current?.swipeNext()
              }}
            >
              下一张
            </Button>
          </Space>
          <DemoDescription content='在禁用手势拖拽后，可以通过 Ref 进行手动翻页' />
        </Space>
      </DemoBlock>
      <DemoBlock title='自定义样式'>
        <Space direction='vertical' block>
          <Swiper
            style={{
              '--slide-width': '80%',
              '--border-radius': '8px',
            }}
            defaultIndex={2}
          >
            {items}
          </Swiper>
          <DemoDescription content='通过 CSS 变量可以控制滑块的大小、整体的圆角等样式' />
        </Space>
      </DemoBlock>
      <DemoBlock title='居中展示'>
        <Space direction='vertical' block>
          <Swiper centered loop={false} style={{ '--slide-width': '70%' }}>
            {items}
          </Swiper>
          <DemoDescription content='需要通过 CSS 变量改变控制滑块的大小' />
        </Space>
      </DemoBlock>
      <DemoBlock title='循环居中展示'>
        <Swiper centered style={{ '--slide-width': '70%' }}>
          {items}
        </Swiper>
      </DemoBlock>
      <DemoBlock title='指示器颜色'>
        <Space direction='vertical' block>
          <Swiper
            indicatorProps={{
              color: 'white',
            }}
            defaultIndex={1}
          >
            {items}
          </Swiper>
          <DemoDescription content='通过 indicatorProps 可以控制指示器的外观' />
        </Space>
      </DemoBlock>
      <DemoBlock title='指示器在滑块外面'>
        <Space direction='vertical' block>
          <Swiper
            style={{
              '--track-padding': ' 0 0 16px',
            }}
          >
            {items}
          </Swiper>
          <DemoDescription content='通过 --track-padding 可以控制滑动轨道区域的 padding，从而实现指示器和滑块"分离"的效果' />
        </Space>
      </DemoBlock>
      <DemoBlock title='自定义指示器'>
        <Space direction='vertical' block>
          <Swiper
            indicator={(total, current) => (
              <div className={styles.customIndicator}>
                {`${current + 1} / ${total}`}
              </div>
            )}
          >
            {items}
          </Swiper>
          <DemoDescription content='你可以完全自定义指示器的渲染，甚至改变指示器的位置' />
        </Space>
      </DemoBlock>
      <DemoBlock title='无指示器'>
        <Swiper indicator={() => null}>{items}</Swiper>
      </DemoBlock>
      <DemoBlock title='全屏引导'>
        <Space direction='vertical' block>
          <WithPopup />
          <DemoDescription content='配合 Popup 组件可以实现全屏引导' />
        </Space>
      </DemoBlock>
    </>
  )
}

const WithPopup: FC = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
        }}
      >
        显示弹出层
      </Button>
      <Popup position='bottom' visible={visible} destroyOnClose>
        <Swiper loop={false}>
          <Swiper.Item>
            <div
              className={styles.contentFull}
              style={{ background: '#ace0ff' }}
            >
              1
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div
              className={styles.contentFull}
              style={{ background: '#bcffbd' }}
            >
              1
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div
              className={styles.contentFull}
              style={{ background: '#ffffff' }}
            >
              <Button
                onClick={() => {
                  setVisible(false)
                }}
              >
                开始使用
              </Button>
            </div>
          </Swiper.Item>
        </Swiper>
      </Popup>
    </>
  )
}
