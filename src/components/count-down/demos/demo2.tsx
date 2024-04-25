import { CountDown, Grid, Toast } from 'antd-mobile'
import type { CountDownRef } from 'antd-mobile'
import { LoopOutline, PlayOutline, StopOutline } from 'antd-mobile-icons'
import { DemoBlock } from 'demos'
import type { CSSProperties, MutableRefObject } from 'react'
import React, { useRef } from 'react'

export default () => {
  const countDownRef: MutableRefObject<CountDownRef | null> = useRef(null)

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
      <DemoBlock title='手动控制'>
        <CountDown
          ref={countDownRef}
          millisecond
          time={3000}
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
