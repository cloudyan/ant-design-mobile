import React, { useRef, useState } from 'react'
import { Flex, Button, Card, CapsuleTabs } from 'antd-mobile'
import { DemoBlock } from 'demos'
import type { CSSProperties } from 'react'
import type { FlexProps } from 'antd-mobile'

import './demo.less'

// 常见布局
// #4096ff #1677ff #0958d9 #4096ff
// Header Sider Content Footer
const styles = {
  header: { backgroundColor: '#4096ff' },
  sider: { backgroundColor: '#1677ff' },
  content: { backgroundColor: '#0958d9' },
  footer: { backgroundColor: '#4096ff' },
  left: { backgroundColor: '#1677ff' },
  center: { backgroundColor: '#0958d9' },
  right: { backgroundColor: '#1b73f0' },
}
const Header = () => (
  <Flex role='header' style={styles.header}>
    Header
  </Flex>
)
const Sider = () => (
  <Flex role='sider' style={styles.sider}>
    Sider
  </Flex>
)
const Content = () => (
  <Flex role='content' flex={1} style={styles.content}>
    Content
  </Flex>
)
const Footer = () => (
  <Flex role='footer' style={styles.footer}>
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

      {/* 网格布局 */}
      {/* 最简单的网格布局，就是平均分布。 */}
      <DemoBlock title='百分比布局'>
        <Flex gap={10} direction='column'>
          <Flex gap={10}>
            <Flex className='grid-flex-cell'>1/2</Flex>
            <Flex className='grid-flex-cell'>1/2</Flex>
          </Flex>
          <Flex gap={10}>
            <Flex className='grid-flex-cell'>1/3</Flex>
            <Flex className='grid-flex-cell'>1/3</Flex>
            <Flex className='grid-flex-cell'>1/3</Flex>
          </Flex>
          <Flex gap={10}>
            <Flex className='grid-flex-cell'>1/4</Flex>
            <Flex className='grid-flex-cell'>1/4</Flex>
            <Flex className='grid-flex-cell'>1/4</Flex>
            <Flex className='grid-flex-cell'>1/4</Flex>
          </Flex>
        </Flex>
      </DemoBlock>

      {/* 百分比布局 */}
      {/* 某个网格的宽度为固定的百分比，其余网格平均分配剩余的空间。 */}
      <DemoBlock title='百分比布局'>
        <Flex gap={10} direction='column'>
          <Flex gap={10}>
            <Flex className='grid-flex-cell u-1of2'>1/2</Flex>
            <Flex className='grid-flex-cell'>auto</Flex>
            <Flex className='grid-flex-cell'>auto</Flex>
          </Flex>
          <Flex gap={10}>
            <Flex className='grid-flex-cell'>auto</Flex>
            <Flex className='grid-flex-cell u-1of3'>1/3</Flex>
          </Flex>
          <Flex gap={10}>
            <Flex className='grid-flex-cell u-1of4'>1/4</Flex>
            <Flex className='grid-flex-cell'>auto</Flex>
            <Flex className='grid-flex-cell u-1of3'>1/3</Flex>
          </Flex>
        </Flex>
      </DemoBlock>

      {/* Holy Grail Layout */}
      {/* 页面分上中下三部分，中间部分又分左中右三部分 */}
      <DemoBlock title='圣杯布局'>
        <Flex direction='column' style={{ color: '#fff', height: 120 }}>
          <Header />
          <Flex flex={1}>
            <Flex style={styles.left}>Left</Flex>
            <Flex flex={1} style={styles.center}>
              Center
            </Flex>
            <Flex style={styles.right}>Right</Flex>
          </Flex>
          <Footer />
        </Flex>
      </DemoBlock>

      {/* 输入框的布局 */}
      {/* 在输入框的前方添加提示，后方添加按钮 */}

      {/* 表单布局 */}
      {/* 表单项分描述，输入框，可选左右布局或上下布局 */}

      {/* 侧栏式布局 */}
      {/* 侧栏在页面的左侧或右侧，需要添加一个侧栏。 */}

      {/* 悬挂式布局 */}
      {/* 主栏的左侧或右侧，需要添加一个图片栏。 */}

      {/* 流式布局 */}
      {/* 每行的项目数固定，会自动分行。 */}

      {/* 固定的底栏 */}
      {/* 页面内容太少，无法占满一屏的高度，但又想固定到页面底部 */}
    </>
  )
}
