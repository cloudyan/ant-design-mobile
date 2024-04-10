import React from 'react'
import { Space, IconSvg } from 'antd-mobile'
import { DemoBlock } from 'demos'

// 生成方式 npx tsx generate-svg-sprite.ts
// 引入 SvgSprite 插入页面内容最前面
// 避免被 tree shaking, 需要在 package.json 中设置 sideEffects: ['./svg-sprite.js']
import './svg-sprite'

// debugger

export default () => {
  return (
    <div style={{ fontSize: 24 }}>
      <DemoBlock title='项目入口引入 svg symbol 集合，此处直接使用 type'>
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
