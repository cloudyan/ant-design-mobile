import { ProgressCircle, Slider, Space } from 'antd-mobile'
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
      <DemoBlock title='渐变色'>
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
                    strokeDashoffset='-0.2'
                    strokeDasharray={strokeDasharray()}
                    strokeLinecap='round'
                    stroke='#fff'
                    strokeWidth='0.05'
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
