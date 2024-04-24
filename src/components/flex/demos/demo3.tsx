import React, { useRef, useState } from 'react'
import { Flex, Button, Card, CapsuleTabs } from 'antd-mobile'
import { DemoBlock } from 'demos'
import type { CSSProperties } from 'react'
import type { FlexProps } from 'antd-mobile'

// #4096ff #1677ff #0958d9 #4096ff
// Header Sider Content Footer
const Header = () => (
  <Flex role='header' style={{ backgroundColor: '#4096ff' }}>
    Header
  </Flex>
)
const Sider = () => (
  <Flex role='sider' style={{ backgroundColor: '#1677ff' }}>
    Sider
  </Flex>
)
const Content = () => (
  <Flex role='content' flex={1} style={{ backgroundColor: '#0958d9' }}>
    Content
  </Flex>
)
const Footer = () => (
  <Flex role='footer' style={{ backgroundColor: '#4096ff' }}>
    Footer
  </Flex>
)

export default () => {
  const layoutStyle = {
    width: '50%',
    height: 100,
  }

  return (
    <>
      <DemoBlock title='Layout 布局'>
        <Flex wrap='wrap' gap={10} style={{ color: '#fff' }}>
          <Flex direction='column' style={layoutStyle}>
            <Header />
            <Content />
            <Footer />
          </Flex>

          <Flex direction='column' style={layoutStyle}>
            <Header />
            <Flex flex={1}>
              <Content />
              <Sider />
            </Flex>
            <Footer />
          </Flex>

          <Flex direction='column' style={layoutStyle}>
            <Header />
            <Flex flex={1}>
              <Content />
              <Sider />
            </Flex>
            <Footer />
          </Flex>

          <Flex style={layoutStyle}>
            <Sider />
            <Flex direction='column' flex={1}>
              <Header />
              <Content />
              <Footer />
            </Flex>
          </Flex>
        </Flex>
      </DemoBlock>
    </>
  )
}
