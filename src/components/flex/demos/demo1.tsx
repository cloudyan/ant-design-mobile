import React, { useRef, useState } from 'react'
import { Flex, Button } from 'antd-mobile'
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
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
}
const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
]

const alignOptions = ['flex-start', 'center', 'flex-end']

const directionOptions = ['row', 'row-reverse', 'column', 'column-reverse']

const ButtonOption = (props: any) => {
  const [num, setNum] = useState(0)
  const optionRef = useRef(0)

  const options = props.options
  const onClick = () => {
    optionRef.current = (optionRef.current + 1) % options.length
    setNum(num + 1)
    props.onChange(options[optionRef.current])
  }

  return <Button onClick={onClick}>{options[optionRef.current]}</Button>
}

export default () => {
  const [direction, setDirection] = useState<FlexProps['direction']>('row')
  const [justify, setJustify] = useState<FlexProps['justify']>(
    justifyOptions[0]
  )
  const [alignItems, setAlignItems] = useState<FlexProps['align']>(
    alignOptions[0]
  )

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
          Select justify :
          <ButtonOption options={justifyOptions} onChange={setJustify} />
        </div>
        <div>
          Select align :
          <ButtonOption options={alignOptions} onChange={setAlignItems} />
        </div>
        <Flex style={boxStyle} justify={justify} align={alignItems}>
          <Button color='primary'>a</Button>
          <Button color='primary'>b</Button>
          <Button color='primary'>c</Button>
          <Button color='primary'>d</Button>
        </Flex>
      </DemoBlock>
    </>
  )
}
