import React from 'react'
import { Button } from 'antd-mobile'
import { DemoBlock, lorem } from 'demos'

const shortText = lorem.generateWords(3)
const longText = lorem.generateParagraphs(2)

export default () => {
  return (
    <>
      <DemoBlock title='标题'>
        <Button>{shortText}</Button>
      </DemoBlock>
    </>
  )
}
