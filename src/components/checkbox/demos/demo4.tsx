import React, { useRef, useState } from 'react'
import type { FC, PropsWithChildren } from 'react'
import { Checkbox, List, Space } from 'antd-mobile'
import { DemoBlock } from 'demos'
import { CheckboxRef } from '../checkbox'

// 常见的多选列表
const ListItemWithCheckbox: FC<
  PropsWithChildren<{
    item: string
  }>
> = props => {
  const checkboxRef = useRef<CheckboxRef>(null)
  return (
    <div
      className='flex'
      onClick={() => {
        console.log('click item', props.item)
        // checkboxRef.current?.toggle()
      }}
    >
      <Space>
        <div onClick={e => e.stopPropagation()}>
          <Checkbox value={props.item} ref={checkboxRef} />
        </div>
        {props.item}
      </Space>
    </div>
  )
}
const ListDemo2 = () => {
  const items = ['Apple', 'Orange', 'Banana']
  const [value, setValue] = useState(['Apple'])

  return (
    <List>
      <Space>
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
        <div>内容</div>
        <div>展开、收起</div>
      </Space>
      <Checkbox.Group
        value={value}
        onChange={v => {
          // 定制选择逻辑
          console.log(v)
          setValue(v as string[])
        }}
      >
        <div>
          {items.map(item => (
            <ListItemWithCheckbox key={item} item={item} />
          ))}
        </div>
      </Checkbox.Group>
    </List>
  )
}

export default () => {
  return (
    <>
      <DemoBlock title='配合 List 使用半选' padding='0'>
        <ListDemo2 />
      </DemoBlock>
    </>
  )
}
