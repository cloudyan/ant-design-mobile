import React, { useRef, useState } from 'react'
import type { CSSProperties, MutableRefObject } from 'react'
import {
  ProgressCircle,
  Slider,
  Space,
  CountDown,
  Grid,
  Toast,
} from 'antd-mobile'
import type { CountDownRef } from 'antd-mobile'
import type { CurrentTime } from 'antd-mobile/es/utils/use-count-down'
import { DemoBlock } from 'demos'
import { LoopOutline, PlayOutline, StopOutline } from 'antd-mobile-icons'

import './demo1.less'

export default () => {
  const seconds = 15
  const [percent, setPercent] = useState(100)
  const countDownRef: MutableRefObject<CountDownRef | null> = useRef(null)
  const [countDownTime, setCountDownTime] = useState(seconds)

  const onFinish = () => {
    // Toast.show('finished')
    console.log('finished')
  }

  const onStart = () => {
    setPercent(100)
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

  const onChange = (current: CurrentTime) => {
    // console.log(current)
    const realPercent = Math.floor((current.leftTime / (seconds * 1000)) * 100)
    setPercent(realPercent)

    // const s = Math.ceil((current.total / (seconds * 1000)) * 15)
    // setCountDownTime(s)
    // setCountDownTime(current.fixSeconds)
  }

  return (
    <>
      <DemoBlock title='倒计时'>
        <Slider
          defaultValue={percent}
          popover
          onAfterChange={val => {
            setPercent(val as number)
          }}
        />
        <Space style={{ '--gap': '24px' }}>
          <ProgressCircle
            percent={percent}
            duration={0.1}
            style={{
              '--size': '160px',
              '--track-width': '8px',
              '--fill-color': 'var(--adm-color-success)',
            }}
          >
            <div>
              {/* <div className='rotater'>rotater</div> */}
              <span style={{ fontSize: 60 }}>
                {Math.ceil((percent / 100) * 15)}
                {/* {countDownTime} */}
              </span>
              <p>默认: 顺时针 🔃</p>
            </div>
          </ProgressCircle>

          <ProgressCircle
            reverse
            duration={0.1}
            percent={percent}
            style={{
              '--size': '160px',
              '--track-width': '8px',
              '--fill-color': 'var(--adm-color-success)',
            }}
          >
            <div>
              {/* <div className='rotater'>rotater</div> */}
              <span style={{ fontSize: 60 }}>
                {Math.ceil((percent / 100) * 15)}
              </span>
              <p>取反: 逆时针 🔄</p>
            </div>
          </ProgressCircle>
        </Space>

        <CountDown
          ref={countDownRef}
          leftTime={seconds * 1000}
          millisecond
          autoStart={false}
          format='ss:SSS'
          onFinish={onFinish}
          onChange={onChange}
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

      {/* conic-gradient 锥形渐变 存在兼容性问题 */}
      <DemoBlock title='扇形 渐变 旋转 启停'>
        <div className='circle'>
          <div className='rotater'></div>
        </div>
      </DemoBlock>
    </>
  )
}
