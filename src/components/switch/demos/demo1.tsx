import { Space, Switch } from 'antd-mobile'
import { CheckOutline, CloseOutline } from 'antd-mobile-icons'
import { DemoBlock } from 'demos'
import React from 'react'

export default () => {
  return (
    <>
      <DemoBlock title='基础用法'>
        <Switch />
      </DemoBlock>

      <DemoBlock title='有默认值'>
        <Switch defaultChecked />
      </DemoBlock>

      <DemoBlock title='文字和图标'>
        <Space wrap>
          <Switch uncheckedText='关' checkedText='开' />
          <Switch
            checkedText={<CheckOutline fontSize={18} />}
            uncheckedText={<CloseOutline fontSize={18} />}
          />
          <Switch uncheckedText='0' checkedText='1' />
        </Space>
      </DemoBlock>

      <DemoBlock title='自定义样式'>
        <Space wrap>
          <Switch
            defaultChecked
            style={{
              '--checked-color': '#00b578',
              '--height': '36px',
              '--width': '60px',
            }}
          />
          <Switch
            uncheckedText='☀️'
            checkedText='🌛'
            style={{
              '--checked-color': '#242526',
            }}
          />
        </Space>
      </DemoBlock>
    </>
  )
}
