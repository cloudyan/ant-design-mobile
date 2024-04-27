import { ProgressCircle, Slider, Space, Sticky } from 'antd-mobile'
import { DemoBlock } from 'demos'
import React, { useRef, useState } from 'react'

import styles from './demo1.less'

export default () => {
  const [percent, setPercent] = useState(60)
  return (
    <>
      <Sticky
        style={{ background: 'white', top: 200, zIndex: 10, padding: 16 }}
      >
        <Slider
          defaultValue={percent}
          popover
          onAfterChange={val => {
            setPercent(val as number)
          }}
        />
      </Sticky>

      <DemoBlock title='基础用法'>
        <Space style={{ '--gap': '24px' }}>
          <ProgressCircle percent={percent} />
          <ProgressCircle percent={percent}>{percent}%</ProgressCircle>
        </Space>
      </DemoBlock>

      <DemoBlock title='指定线条宽度'>
        <Space style={{ '--gap': '24px' }}>
          <ProgressCircle
            percent={percent}
            style={{ '--track-width': '2px' }}
          />
          <ProgressCircle
            percent={percent}
            style={{ '--track-width': '4px' }}
          />
          <ProgressCircle
            percent={percent}
            style={{ '--track-width': '6px' }}
          />
        </Space>
      </DemoBlock>

      <DemoBlock title='指定画布宽高'>
        <Space style={{ '--gap': '24px' }} align='center'>
          <ProgressCircle percent={percent} style={{ '--size': '40px' }}>
            <span className={styles.small}>{percent}%</span>
          </ProgressCircle>
          <ProgressCircle percent={percent} style={{ '--size': '60px' }}>
            <span className={styles.middle}>{percent}%</span>
          </ProgressCircle>
          <ProgressCircle percent={percent} style={{ '--size': '90px' }}>
            <span className={styles.large}>{percent}%</span>
          </ProgressCircle>
        </Space>
      </DemoBlock>

      <DemoBlock title='反向'>
        <Space>
          <ProgressCircle
            reverse
            percent={percent}
            style={{
              '--size': '100px',
              '--fill-color': 'var(--adm-color-light)',
              '--track-color': 'var(--adm-color-success)',
            }}
          >
            <span className={styles.large}>{percent}%</span>
          </ProgressCircle>
        </Space>
        <p>表示剩余进度</p>
      </DemoBlock>

      <DemoBlock title='自定义内部文字'>
        <Space style={{ '--gap': '24px' }}>
          <ProgressCircle
            percent={percent}
            style={{
              '--size': '100px',
              '--track-width': '4px',
            }}
          >
            <div className={styles.secondaryText}>本月剩余流量</div>
            <div className={styles.mainText}>60</div>
            <div className={styles.secondaryText}>GB</div>
          </ProgressCircle>
          <ProgressCircle
            percent={percent}
            style={{
              '--size': '100px',
              '--track-width': '4px',
            }}
          >
            <div className={styles.mainText}>3241</div>
            <div className={styles.secondaryText}>步</div>
          </ProgressCircle>
        </Space>
      </DemoBlock>

      <DemoBlock title='自定义颜色'>
        <Space style={{ '--gap': '24px' }}>
          <ProgressCircle
            percent={percent}
            style={{
              '--fill-color': 'var(--adm-color-success)',
            }}
          >
            {percent}%
          </ProgressCircle>
          <ProgressCircle
            percent={percent}
            style={{
              '--fill-color': 'var(--adm-color-warning)',
            }}
          >
            {percent}%
          </ProgressCircle>
          <ProgressCircle
            percent={percent}
            style={{
              '--fill-color': 'var(--adm-color-danger)',
            }}
          >
            {percent}%
          </ProgressCircle>
        </Space>
      </DemoBlock>
    </>
  )
}
