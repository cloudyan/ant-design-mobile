import React from 'react'
import { Button, Space, SpinLoading } from 'antd-mobile'
import { DemoBlock, sleep } from 'demos'
import { SearchOutline } from 'antd-mobile-icons'

export default () => {
  return (
    <>
      <DemoBlock title='自定义图标'>
        <Button>
          <Space>
            <SearchOutline />
            <span>搜索</span>
          </Space>
        </Button>
      </DemoBlock>

      <DemoBlock title='形状'>
        <Space wrap>
          <Button shape='default' color='primary'>
            Default Button
          </Button>
          <Button block shape='rounded' color='primary'>
            Rounded Button
          </Button>
          <Button block shape='rectangular' color='primary'>
            Rectangular Button
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title='加载状态'>
        <Space direction='vertical' block>
          <Button loading color='primary' loadingText='正在加载'>
            Loading
          </Button>
          <Button loading>Loading</Button>

          {/* 还差个动画 */}
          <Button
            block
            color='primary'
            shape='rounded'
            loading='auto'
            loadingText='加载中'
            loadingIcon={
              <SpinLoading color='currentColor' style={{ '--size': '16px' }} />
            }
            style={{
              height: 50,
              fontSize: 16,
              fontWeight: 500,
            }}
            onClick={async () => {
              await sleep(2000)
            }}
          >
            Auto Loading
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title='禁用状态'>
        <Space wrap>
          <Button disabled>Disabled</Button>
          <Button disabled color='primary'>
            Disabled
          </Button>
        </Space>
      </DemoBlock>
    </>
  )
}
