import { Sticky, Button } from 'antd-mobile'
import { DemoBlock } from 'demos'
import React, { useRef } from 'react'

export default () => {
  return (
    <div style={{ height: '200vh' }}>
      <DemoBlock height={200} title='基础用法'>
        <Sticky>
          <Button>基础用法</Button>
        </Sticky>
      </DemoBlock>
      <DemoBlock height={200} title='吸顶距离'>
        <Sticky offsetTop={50}>
          <Button>吸顶距离</Button>
        </Sticky>
      </DemoBlock>
      <DemoBlock height={200} title='指定容器'>
        <div style={{ height: 300 }}>
          <Sticky>
            <Button>指定容器</Button>
          </Sticky>
        </div>
      </DemoBlock>
      <DemoBlock height={200} title='吸底距离'>
        <Sticky offsetBottom={50} position='bottom'>
          <Button>吸底距离</Button>
        </Sticky>
      </DemoBlock>

      <div style={{ height: 1000 }}></div>
    </div>
  )
}
