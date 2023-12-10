import { Badge, Space } from 'antd-mobile'
import { DemoBlock } from 'demos'
import React from 'react'

import styles from './demo1.less'

export default () => {
  return (
    <>
      <DemoBlock title='基础用法'>
        <Space style={{ '--gap': '24px' }}>
          <Badge content='5'>
            <div className={styles.box} />
          </Badge>
          <Badge content='New'>
            <div className={styles.box} />
          </Badge>
          <Badge content='Hot'>
            <div className={styles.box} />
          </Badge>
          <Badge content={Badge.dot}>
            <div className={styles.box} />
          </Badge>
          <Badge content={0}>
            <div className={styles.box} />
          </Badge>
        </Space>
      </DemoBlock>

      <DemoBlock title='最大值'>
        <Space style={{ '--gap': '24px' }}>
          <Badge content='120' max='9'>
            <div className={styles.box} />
          </Badge>
          <Badge content='120' max={20}>
            <div className={styles.box} />
          </Badge>
          <Badge content='120' max={99}>
            <div className={styles.box} />
          </Badge>
        </Space>
      </DemoBlock>

      <DemoBlock title='带边框'>
        <Badge content='更新啦' bordered>
          <div className={`${styles.box} ${styles.dark}`} />
        </Badge>
      </DemoBlock>

      <DemoBlock title='独立使用'>
        <Space>
          <Badge content='99+' />
          <Badge content='新消息!' />
        </Space>
      </DemoBlock>

      <DemoBlock title='自定义颜色和偏移量'>
        <Space style={{ '--gap': '24px' }}>
          <Badge
            color='#108ee9'
            content={Badge.dot}
            style={{ '--right': '100%', '--top': '100%' }}
          >
            <div className={styles.box} />
          </Badge>
          <Badge
            color='#87d068'
            content={Badge.dot}
            style={{ '--right': '100%' }}
          >
            <div className={styles.box} />
          </Badge>
          <Badge content={Badge.dot}>
            <div className={styles.box} />
          </Badge>
          <Badge color='orange' content={Badge.dot} style={{ '--top': '100%' }}>
            <div className={styles.box} />
          </Badge>
        </Space>
      </DemoBlock>
    </>
  )
}
