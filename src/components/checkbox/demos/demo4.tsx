import { Checkbox, Collapse, Space } from 'antd-mobile'
import { DemoBlock } from 'demos'
import type { FC, PropsWithChildren } from 'react'
import React, { useRef, useState } from 'react'
import type { CheckboxValue } from '../checkbox'
import { CheckboxRef } from '../checkbox'

type Item = {
  id: CheckboxValue
  name: string
}

// 常见的多选列表: 复杂的业务场景
// 如果多组选择，要控互斥逻辑呢？从外部统一控制选中态逻辑
const ListItemWithCheckbox: FC<
  PropsWithChildren<{
    item: Item
  }>
> = props => {
  const checkboxRef = useRef<CheckboxRef>(null)
  const { item } = props
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
          <Checkbox value={item.id} ref={checkboxRef} />
        </div>
        {item.id}: {item.name}
      </Space>
    </div>
  )
}
const ListDemo2 = () => {
  const items: Item[] = [
    {
      id: 1,
      name: 'Apple',
    },
    {
      id: 2,
      name: 'Orange',
    },
    {
      id: 3,
      name: 'Banana',
    },
  ]
  const [value, setValue] = useState<CheckboxValue[]>([])

  const title = (
    <div>
      <Space>
        <div onClick={e => e.stopPropagation()}>
          <Checkbox
            indeterminate={value.length > 0 && value.length < items.length}
            checked={value.length === items.length}
            onChange={checked => {
              if (checked) {
                setValue(items.map(item => item.id))
              } else {
                setValue([])
              }
            }}
          />
        </div>
        <div>{JSON.stringify(value)} </div>
        <div>展开、收起</div>
      </Space>
    </div>
  )

  return (
    <Collapse>
      <Collapse.Panel key='1' title={title}>
        <Checkbox.Group
          value={value}
          onChange={v => {
            // 定制选择逻辑
            console.log(v)
            setValue(v)
          }}
        >
          <Space direction='vertical'>
            {items.map(item => (
              <ListItemWithCheckbox key={item.id} item={item} />
            ))}
          </Space>
        </Checkbox.Group>
      </Collapse.Panel>
    </Collapse>
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
