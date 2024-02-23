import React from 'react'
import { IconCustom, Space } from 'antd-mobile'
import { DemoBlock } from 'demos'
// 已支持 svgr
import spinUrl, { ReactComponent as SpinSvg } from './spin.svg'
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
    <>
      <DemoBlock title='IconCustom'>
        <IconCustom />
      </DemoBlock>
      <DemoBlock title='通过 svgr 加载'>
        <Space wrap align='center' style={{ '--gap': '24px', color: 'red' }}>
          <img src={spinUrl} alt='spin' width={24} height={24} />
          <SpinSvg width={24} height={24} fill='red' />
          <Spin width={24} height={24} color='red' />
        </Space>
      </DemoBlock>
      <DemoBlock title='svg 转的 React 组件'>
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
    </>
  )
}
