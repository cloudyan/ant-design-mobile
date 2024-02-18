import { ProgressCircle, Slider, Space, Sticky } from 'antd-mobile'
import { DemoBlock } from 'demos'
import React, { useRef, useState } from 'react'

import styles from './demo1.less'

export default () => {
  const [percent, setPercent] = useState(50)

  // 增长过渡动效 https://juejin.cn/post/7329310941106356275
  const linearGradient = `linear-gradient(in hsl to right, var(--adm-color-danger), var(--adm-color-warning), var(--adm-color-success))`
  // 径向渐变
  const conicGradient = `conic-gradient(#179067, #62e317, #d7f10f, #ffc403, #fcc202, #ff7327, #ff7327, #FF5800, #ff5900, #f64302, #ff0000, #ff0000)`
  // const conicGradient = `conic-gradient(from 90deg, rgba(111, 232, 191, 1), rgba(255, 175, 19, 1), rgba(222, 19, 80, 1), rgba(133, 14, 205, 1))`;

  const circleRef = useRef(null)
  const strokeDasharray = () => {
    // const circle = document.getElementById('circle')
    // const circle = circleRef.current
    // if (!circle) return `0.01, 1.884`
    const length = Math.PI * Number(0.3) * 2
    const dash = [((length * percent) / 100) * 0.8, length].join(' ')
    return dash
  }

  return (
    <>
      <Sticky style={{ background: 'white', top: 200 }}>
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
        DemoBlock
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

      <DemoBlock title='渐变色'>
        <Space style={{ '--gap': '24px' }}>
          <ProgressCircle
            percent={percent}
            style={{
              '--size': '100px',
              '--fill-color': linearGradient,
            }}
          >
            {percent}%
          </ProgressCircle>
          <div>
            <svg style={{ height: 0, width: 0 }}>
              <defs>
                <mask id='ring' maskContentUnits='objectBoundingBox'>
                  <circle
                    ref={circleRef}
                    id='circle'
                    cx='0.5'
                    cy='0.5'
                    r='0.3'
                    fill='none'
                    stroke-dashoffset='-0.2'
                    stroke-dasharray={strokeDasharray()}
                    stroke-linecap='round'
                    stroke='#fff'
                    stroke-width='0.05'
                  ></circle>
                </mask>
              </defs>
            </svg>

            <div className={styles['box-circle']}></div>
          </div>
        </Space>
      </DemoBlock>
    </>
  )
}
