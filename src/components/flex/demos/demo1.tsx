import React, { useRef, useState } from 'react'
import { Flex, Button, CapsuleTabs } from 'antd-mobile'
import { DemoBlock } from 'demos'
import type { CSSProperties } from 'react'
import type { FlexProps } from 'antd-mobile'

const baseStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '25%',
  height: 54,
  color: 'white',
}

const flexStyle: CSSProperties = {
  width: 300,
  height: 200,
  borderRadius: 6,
  border: '1px solid #40a9ff',
}
const boxStyle: CSSProperties = {}

const justifyOptions = [
  'normal',
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
]
// 默认值放第一个
const alignOptions = ['normal', 'flex-start', 'center', 'flex-end', 'stretch']
const directionOptions = ['row', 'row-reverse', 'column', 'column-reverse']
const wrapOptions = ['nowrap', 'wrap', 'wrap-reverse']

const ButtonOption = (props: any) => {
  const { options, onChange } = props
  const content = options.map((option: any) => {
    return <CapsuleTabs.Tab title={option} key={option} />
  })

  return (
    <>
      <CapsuleTabs wrap onChange={onChange}>
        {content}
      </CapsuleTabs>
    </>
  )
}

export default () => {
  const [count, setCount] = useState(3)
  const [direction, setDirection] = useState<FlexProps['direction']>()
  const [wrap, setWrap] = useState<FlexProps['wrap']>()
  const [align, setAlign] = useState<FlexProps['align']>()
  const [justify, setJustify] = useState<FlexProps['justify']>()

  const btnStyle = {
    width: 80,
    height: 40,
    margin: 8,
  }

  const colors = [
    'powderblue',
    'skyblue',
    'steelblue',
    'orangered',
    'orange',
    'mediumseagreen',
    'deepskyblue',
    'mediumturquoise',
    'mediumslateblue',
    'purple',
  ]
  const box1 = colors.slice(0, count).map((item, index) => {
    return (
      <div
        key={index}
        style={{
          width: 50,
          height: 50,
          backgroundColor: item,
          flexShrink: 0,
        }}
      ></div>
    )
  })

  return (
    <div className='demo-flex'>
      <DemoBlock title='基本布局'>
        {/* <Segmented options={justifyOptions} onChange={setJustify as SegmentedProps['onChange']} /> */}
        <div>
          Select direction :
          <ButtonOption options={directionOptions} onChange={setDirection} />
        </div>
        <div>
          Select justify :
          <ButtonOption options={justifyOptions} onChange={setJustify} />
        </div>
        <div>
          Select align :
          <ButtonOption options={alignOptions} onChange={setAlign} />
        </div>
        <div>
          Select wrap :
          <ButtonOption options={wrapOptions} onChange={setWrap} />
        </div>
        <div>
          Select count :<button onClick={() => setCount(c => c - 1)}>-1</button>
          <button onClick={() => setCount(c => c + 1)}>+1</button>
        </div>
        <Flex
          style={flexStyle}
          direction={direction}
          align={align}
          justify={justify}
          wrap={wrap}
        >
          {box1}
        </Flex>
      </DemoBlock>
    </div>
  )
}
