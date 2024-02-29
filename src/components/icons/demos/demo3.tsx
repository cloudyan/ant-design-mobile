import React from 'react'
import { Space, IconSvg } from 'antd-mobile'
import { DemoBlock } from 'demos'

// import svgSprite
// import './sprite'

export default () => {
  return (
    <div style={{ fontSize: 24 }}>
      <DemoBlock title='项目入口引入svg symbol 集合，此处直接使用 type'>
        <Space wrap align='center' style={{ '--gap': '24px', color: 'red' }}>
          <IconSvg type='calendar-outline' />
          <IconSvg type='discount-fill' />
          <IconSvg type='discount-outline' />
          <IconSvg type='folder-outline' />
          <IconSvg type='map-fill' />
          <IconSvg type='map-outline' />
          <IconSvg type='product-fill' />
          <IconSvg type='product-outline' />
          <IconSvg type='save-outline' />
          <IconSvg type='spin' />
        </Space>
      </DemoBlock>
    </div>
  )
}
