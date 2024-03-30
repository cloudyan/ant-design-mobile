import React from 'react'
import { Grid, Button, Statistic } from 'antd-mobile'
import { DemoBlock, lorem } from 'demos'

export default () => {
  return (
    <>
      <DemoBlock title='标题'>
        <Grid columns={3} gap={8}>
          <Grid.Item>
            <Statistic title='活跃用户' value={112893} />
          </Grid.Item>
          <Grid.Item>
            <Statistic title='注册用户' value={112893} loading />
          </Grid.Item>
          <Grid.Item>
            <div>
              <Statistic title='账户余额 (CNY)' value={112893} precision={2} />
              <Button style={{ marginTop: 16 }} color='primary'>
                Recharge
              </Button>
            </div>
          </Grid.Item>
        </Grid>
      </DemoBlock>
    </>
  )
}
