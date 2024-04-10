import React from 'react'
import { DemoBlock } from 'demos'
import { Space } from 'antd-mobile'

// 参考 IconFont 作为业务组件
import { IconFont } from './icon-font'

export default () => {
  return (
    <div style={{ fontSize: 24 }}>
      <DemoBlock title='项目入口引入svg symbol 集合，此处直接使用 type'>
        <Space wrap align='center' style={{ '--gap': '24px', color: 'red' }}>
          <IconFont type='testfont-packaging' color='blue' />
        </Space>
      </DemoBlock>
    </div>
  )
}
