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

const boxStyle: CSSProperties = {
  width: '100%',
  height: 240,
  borderRadius: 6,
  border: '1px solid #40a9ff',
}
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
  const [direction, setDirection] = useState<FlexProps['direction']>()
  const [wrap, setWrap] = useState<FlexProps['wrap']>()
  const [align, setAlign] = useState<FlexProps['align']>()
  const [justify, setJustify] = useState<FlexProps['justify']>()

  const btnStyle = {
    width: 80,
    height: 40,
    margin: 8,
  }

  const btns = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(text => {
    return (
      <Button color='primary' style={btnStyle}>
        {text}
      </Button>
    )
  })

  return (
    <>
      <DemoBlock title='基本布局'>
        <ButtonOption options={directionOptions} onChange={setDirection} />

        <Flex direction={direction}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                ...baseStyle,
                backgroundColor: i % 2 ? '#1677ff' : '#1677ffbf',
              }}
            >
              {i + 1}
            </div>
          ))}
        </Flex>
      </DemoBlock>

      <DemoBlock title='对齐方式'>
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
        <Flex
          style={boxStyle}
          direction={direction}
          wrap={wrap}
          align={align}
          justify={justify}
        >
          {btns}
        </Flex>
      </DemoBlock>
    </>
  )
}
