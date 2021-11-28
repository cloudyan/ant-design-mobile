import React, { useState, useCallback } from 'react'
import { Button, DatePicker, Space, Toast } from 'antd-mobile'
import { DemoBlock } from 'demos'
import { weekdayToZh } from './weekdayToZh'

const now = new Date()

function BasicDemo() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
        }}
      >
        选择
      </Button>
      <DatePicker
        title='时间选择'
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        defaultValue={now}
        max={now}
        onConfirm={val => {
          Toast.show(val.toDateString())
        }}
      />
    </>
  )
}

function RenderChildrenDemo() {
  const [visible, setVisible] = useState(false)
  return (
    <Space align='center'>
      <Button
        onClick={() => {
          setVisible(true)
        }}
      >
        选择
      </Button>
      <DatePicker
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        defaultValue={now}
        max={now}
      >
        {value => value?.toDateString()}
      </DatePicker>
    </Space>
  )
}

function Precision() {
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  return (
    <Space wrap>
      <>
        <Button
          onClick={() => {
            setVisible1(true)
          }}
        >
          年-月
        </Button>
        <DatePicker
          visible={visible1}
          onClose={() => {
            setVisible1(false)
          }}
          precision='month'
          onConfirm={val => {
            Toast.show(val.toString())
          }}
        />
      </>
      <>
        <Button
          onClick={() => {
            setVisible2(true)
          }}
        >
          年-月-日-时-分
        </Button>
        <DatePicker
          visible={visible2}
          onClose={() => {
            setVisible2(false)
          }}
          precision='minute'
          onConfirm={val => {
            Toast.show(val.toString())
          }}
        />
      </>
    </Space>
  )
}

function CustomRender() {
  const [visible, setVisible] = useState(false)

  const labelRenderer = useCallback((type: string, data: number) => {
    switch (type) {
      case 'year':
        return data + '年'
      case 'month':
        return data + '月'
      case 'day':
        return data + '日'
      case 'hour':
        return data + '时'
      case 'minute':
        return data + '分'
      case 'second':
        return data + '秒'
      default:
        return data
    }
  }, [])

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
        }}
      >
        选择
      </Button>
      <DatePicker
        title='时间选择'
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        defaultValue={now}
        max={now}
        onConfirm={val => {
          Toast.show(val.toDateString())
        }}
        renderLabel={labelRenderer}
      />
    </>
  )
}

function DayOfWeekDemo() {
  const [visible, setVisible] = useState(false)

  const labelRenderer = useCallback((type: string, data: number) => {
    switch (type) {
      case 'year':
        return data + '年'
      case 'week':
        return data + '周'
      case 'day-of-week':
        return weekdayToZh(data)
      default:
        return data
    }
  }, [])

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
        }}
      >
        选择
      </Button>
      <DatePicker
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        defaultValue={now}
        onConfirm={val => {
          Toast.show(val.toDateString())
        }}
        onSelect={val => console.log(val)}
        renderLabel={labelRenderer}
        precision='day-of-week'
      />
    </>
  )
}

export default () => {
  return (
    <>
      <DemoBlock title='基础用法'>
        <BasicDemo />
      </DemoBlock>
      <DemoBlock title='渲染所选值'>
        <RenderChildrenDemo />
      </DemoBlock>
      <DemoBlock title='控制选择精度'>
        <Precision />
      </DemoBlock>
      <DemoBlock title='自定义每列的渲染内容'>
        <CustomRender />
      </DemoBlock>
      <DemoBlock title='周选择器'>
        <DayOfWeekDemo />
      </DemoBlock>
    </>
  )
}
