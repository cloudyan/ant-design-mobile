import React, { useRef, useState } from 'react'
import { Flex, Button, Card, CapsuleTabs } from 'antd-mobile'
import { DemoBlock } from 'demos'
import type { CSSProperties } from 'react'
import type { FlexProps } from 'antd-mobile'

const cardStyle: CSSProperties = {
  // width: 300,
  margin: '10px 0',
  border: '1px solid #ccc;',
  background: '#eee',
}

const imgStyle: CSSProperties = {
  display: 'block',
  marginRight: 10,
  width: 130,
  height: 130,
}

// 常见布局模块
export default () => {
  const button = (
    <Button
      color='primary'
      size='small'
      // type='link'
      // href='https://ant.design'
      // target='_blank'
    >
      Get Started
    </Button>
  )

  return (
    <>
      <DemoBlock title='两列弹性布局'>
        <Card style={cardStyle}>
          <Flex justify='space-between'>
            <img
              alt='avatar'
              src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              style={imgStyle}
            />
            <Flex
              direction='column'
              justify='space-between'
              flex={1}
              style={{ overflow: 'hidden' }}
            >
              <Flex direction='column' align='flex-start'>
                <div>Ant Design Mobile</div>
                <p className='max-line-2'>
                  这个是描述，有可能很长，有可能有一行或两行的样子
                </p>
              </Flex>
              <Flex justify='flex-end'>{button}</Flex>
            </Flex>
          </Flex>
        </Card>
        <Card style={cardStyle}>
          <Flex justify='space-between'>
            <img
              alt='avatar'
              src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              style={imgStyle}
            />
            <Flex
              direction='column'
              align='flex-start'
              justify='space-between'
              flex={1}
              style={{ overflow: 'hidden' }}
            >
              <Flex direction='column' align='flex-start'>
                <div>Ant Design Mobile</div>
                <p>tag</p>
              </Flex>
              {button}
            </Flex>
          </Flex>
        </Card>
        <Card style={cardStyle}>
          <Flex justify='space-between'>
            <img
              alt='avatar'
              src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              style={imgStyle}
            />
            <Flex
              direction='column'
              align='flex-end'
              justify='space-between'
              style={{ overflow: 'hidden' }}
            >
              <Flex direction='column' align='flex-end'>
                <div>Ant Design Mobile</div>
                <p>tag</p>
              </Flex>
              {button}
            </Flex>
          </Flex>
        </Card>
      </DemoBlock>

      <DemoBlock title='三列弹性布局'>
        <Card style={cardStyle}>
          <Flex justify='space-between'>
            <img
              alt='avatar'
              src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              style={imgStyle}
            />
            <Flex
              direction='column'
              justify='space-between'
              flex={1}
              style={{ overflow: 'hidden' }}
            >
              <Flex direction='column' align='flex-start'>
                <div>Ant Design Mobile</div>
                <p className='max-line-2'>
                  这个是描述，有可能很长，有可能有一行或两行的样子
                </p>
              </Flex>
            </Flex>
            <Flex>xxx</Flex>
          </Flex>
        </Card>
      </DemoBlock>
    </>
  )
}
