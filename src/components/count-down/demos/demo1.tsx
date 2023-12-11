import { CountDown, Grid, Toast } from 'antd-mobile'
import { LoopOutline, PlayOutline, StopOutline } from 'antd-mobile-icons'
import { DemoBlock } from 'demos'
import type { CSSProperties } from 'react'
import React, { useRef } from 'react'

export default () => {
  const countDownRef = useRef()

  const onFinish = () => {
    Toast.show('finished')
  }

  const onStart = () => {
    countDownRef.current?.start()
  }
  const onPause = () => {
    countDownRef.current?.pause()
  }
  const onReset = () => {
    countDownRef.current?.reset()
  }

  const gridItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 20,
    paddingTop: 20,
  }

  return (
    <>
      <DemoBlock title='基础用法'>
        <CountDown time={100000} />
      </DemoBlock>
      <DemoBlock title='自定义格式'>
        <CountDown time={86400 * 20 * 1000} format='DD 天 HH 时 mm 分 ss 秒' />
      </DemoBlock>
      <DemoBlock title='毫秒级渲染'>
        <CountDown time={100000} millisecond format='HH:mm:ss:SS' />
        <CountDown time={100000} millisecond format='HH:mm:ss:SSS' />
      </DemoBlock>
      <DemoBlock title='自定义样式'>
        {/* <CountDown time={100000}>
          <span className="block">{{ currentTime.hours }}</span>
          <span className="colon">:</span>
          <span className="block">{{ currentTime.minutes }}</span>
          <span className="colon">:</span>
          <span className="block">{{ currentTime.seconds }}</span>
        </CountDown> */}
      </DemoBlock>
      <DemoBlock title='手动控制'>
        <CountDown
          ref={countDownRef}
          millisecond
          time={10000}
          autoStart={false}
          format='ss:SSS'
          onFinish={onFinish}
        ></CountDown>

        <Grid columns={3} gap={8}>
          <Grid.Item>
            <div style={gridItemStyle} onClick={onStart}>
              <PlayOutline fontSize={24} />
              <p>开始</p>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div style={gridItemStyle} onClick={onPause}>
              <StopOutline fontSize={24} />
              <p>暂停</p>
            </div>
          </Grid.Item>
          <Grid.Item>
            <div style={gridItemStyle} onClick={onReset}>
              <LoopOutline fontSize={24} />
              <p>重置</p>
            </div>
          </Grid.Item>
        </Grid>
      </DemoBlock>
    </>
  )
}
