import React from 'react'
import { XComponent } from 'antd-mobile'
import { DemoBlock, lorem } from 'demos'

const shortText = lorem.generateWords(3)
const longText = lorem.generateParagraphs(2)

export default () => {
  return (
    <>
      <DemoBlock title='标题'>
        <XComponent>{shortText}</XComponent>
      </DemoBlock>
    </>
  )
}
