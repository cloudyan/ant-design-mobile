import React from 'react'
import { IconCustom, Space, createIcon, createFromIconfont } from 'antd-mobile'
import { DemoBlock } from 'demos'
// 使用 @svgr/webpack 支持直接引入 svg 文件
import spinUrl, { ReactComponent as SpinSvg } from './spin.svg'
// 使用 @svgr/cli 将 svg 转为 React 组件
import {
  Spin,
  FolderOutline,
  CalendarOutline,
  SaveOutline,
  DiscountOutline,
  MapOutline,
  ProductOutline,
  DiscountFill,
  MapFill,
  ProductFill,
} from './icons'

export default () => {
  return (
    <div style={{ fontSize: 24 }}>
      <DemoBlock title='通过 svgr 加载 svg 文件'>
        <Space wrap align='center' style={{ '--gap': '24px', color: 'red' }}>
          <img src={spinUrl} alt='spin' width={24} height={24} />
          <SpinSvg width={24} height={24} fill='red' />
          <Spin width={24} height={24} color='red' />
        </Space>
      </DemoBlock>

      <DemoBlock title='svg 转为 React 组件'>
        <Space wrap align='center' style={{ '--gap': '24px', color: 'red' }}>
          <FolderOutline width={24} height={24} />
          <CalendarOutline width={24} height={24} />
          <SaveOutline width={24} height={24} />
          <DiscountOutline width={24} height={24} />
          <MapOutline width={24} height={24} />
          <ProductOutline width={24} height={24} />
          <DiscountFill width={24} height={24} />
          <MapFill width={24} height={24} />
          <ProductFill width={24} height={24} />
        </Space>
      </DemoBlock>
    </div>
  )
}
