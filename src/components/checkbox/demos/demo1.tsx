import React, { useState } from 'react'
import { Checkbox, Space } from 'antd-mobile'
import type { CheckboxValue } from 'antd-mobile/es/components/checkbox'
import { DemoBlock } from 'demos'
import { CheckCircleFill, CheckCircleOutline } from 'antd-mobile-icons'

// Checkbox 的 onChange 参数为 boolean（单独使用）
// Checkbox.Group 的 onChange 参数为 CheckboxValue[]
export default () => {
  const [agreement, setAgreement] = useState(false)
  console.log('agreement', agreement)

  const onChange = (value: boolean) => {
    console.log('onChange', value)
  }
  return (
    <>
      <DemoBlock title='基础用法'>
        <Space direction='vertical'>
          <div
            onClick={() => {
              console.log('点击了')
            }}
          >
            <Checkbox onChange={onChange} />
          </div>
          <Checkbox>有描述的复选框</Checkbox>
        </Space>
      </DemoBlock>

      <DemoBlock title='默认选中'>
        <Checkbox defaultChecked onChange={onChange}>
          默认选中
        </Checkbox>
      </DemoBlock>

      <DemoBlock title='单独使用'>
        <Checkbox
          // 这里无需配置 value
          checked={agreement}
          onChange={checked => setAgreement(checked)}
          icon={checked =>
            checked ? (
              <CheckCircleFill style={{ color: 'var(--adm-color-primary)' }} />
            ) : (
              <CheckCircleOutline style={{ color: 'var(--adm-color-weak)' }} />
            )
          }
        >
          阅读并同意《协议》
        </Checkbox>
        <p>类似 Switch</p>
      </DemoBlock>

      <DemoBlock title='占满整行宽度'>
        <Space direction='vertical' block>
          <Checkbox block>块级元素</Checkbox>
          <Checkbox>非块级元素</Checkbox>
        </Space>
      </DemoBlock>

      <DemoBlock title='全选和半选'>
        <DemoIndeterminate />
      </DemoBlock>
    </>
  )
}

const DemoIndeterminate = () => {
  const items = ['Apple', 'Orange', 'Banana']
  const [value, setValue] = useState(['Apple'])

  return (
    <Space direction='vertical'>
      <Checkbox
        indeterminate={value.length > 0 && value.length < items.length}
        checked={value.length === items.length}
        onChange={checked => {
          if (checked) {
            setValue(items)
          } else {
            setValue([])
          }
        }}
      >
        半选
      </Checkbox>
      <Checkbox.Group
        value={value}
        onChange={v => {
          console.log(v)
          setValue(v as string[])
        }}
      >
        <Space direction='vertical'>
          {items.map(item => (
            <Checkbox key={item} value={item}>
              {item}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </Space>
  )
}
