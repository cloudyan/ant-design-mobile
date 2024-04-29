import { CountDown } from 'antd-mobile'
import { DemoBlock } from 'demos'
import React from 'react'

import styles from './index.less'

export default () => {
  return (
    <>
      <DemoBlock title='基础用法'>
        <CountDown leftTime={60 * 1000 + 3000} />
      </DemoBlock>
      <DemoBlock title='自定义格式'>
        <CountDown
          leftTime={86400 * 5 * 1000 + 5000}
          format='D 天 HH 时 mm 分 ss 秒'
        />
        <CountDown
          leftTime={86400 * 5 * 1000 + 5000}
          format='HH 时 mm 分 ss 秒'
        />
      </DemoBlock>
      <DemoBlock title='毫秒级渲染'>
        <CountDown
          leftTime={3600 * 1000 + 3000}
          millisecond
          format='HH:mm:ss:SS'
        />
        <CountDown
          leftTime={3600 * 1000 + 8000}
          millisecond
          format='HH:mm:ss:SSS'
        />
      </DemoBlock>
      <DemoBlock title='自定义样式'>
        <CountDown leftTime={100000}>
          {currentTime => (
            <>
              <span className={styles.block}>{currentTime.hours}</span>
              <span className={styles.colon}>:</span>
              <span className={styles.block}>{currentTime.minutes}</span>
              <span className={styles.colon}>:</span>
              <span className={styles.block}>{currentTime.seconds}</span>
            </>
          )}
        </CountDown>
      </DemoBlock>
    </>
  )
}
