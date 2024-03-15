import React from 'react'
import { Grid } from 'antd-mobile'
import { DemoBlock } from 'demos'

import styles from './demo1.less'

export default () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  return (
    <>
      <DemoBlock title='基础用法'>
        <Grid columns={3} gap={8}>
          <Grid.Item>
            <div className={styles['grid-demo-item-block']}>A</div>
          </Grid.Item>
          <Grid.Item>
            <div className={styles['grid-demo-item-block']}>B</div>
          </Grid.Item>
          <Grid.Item>
            <div className={styles['grid-demo-item-block']}>C</div>
          </Grid.Item>
          <Grid.Item>
            <div className={styles['grid-demo-item-block']}>D</div>
          </Grid.Item>
          <Grid.Item>
            <div className={styles['grid-demo-item-block']}>E</div>
          </Grid.Item>
        </Grid>
      </DemoBlock>

      <DemoBlock title='控制格子的跨度'>
        <Grid columns={3} gap={8}>
          <Grid.Item>
            <div className={styles['grid-demo-item-block']}>A</div>
          </Grid.Item>
          <Grid.Item span={2}>
            <div className={styles['grid-demo-item-block']}>B</div>
          </Grid.Item>
          <Grid.Item span={2}>
            <div className={styles['grid-demo-item-block']}>C</div>
          </Grid.Item>
          <Grid.Item>
            <div className={styles['grid-demo-item-block']}>D</div>
          </Grid.Item>
          <Grid.Item span={3}>
            <div className={styles['grid-demo-item-block']}>E</div>
          </Grid.Item>
        </Grid>
      </DemoBlock>

      {/* 支持横向滚动? */}
      <DemoBlock title='宫格布局-金刚位'>
        <Grid columns={5} gap={8}>
          {arr.map((item, index) => (
            <Grid.Item key={index}>
              <div
                className={styles['grid-demo-item-block']}
                style={{
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item}
              </div>
            </Grid.Item>
          ))}
        </Grid>
      </DemoBlock>
    </>
  )
}
