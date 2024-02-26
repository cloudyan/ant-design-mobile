import React from 'react'
import { IconCustom, Space, createIcon, createFromIconfont } from 'antd-mobile'
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

const IconfontSvg = createFromIconfont(
  '//at.alicdn.com/t/c/font_2586256_4dzo7bif4ec.js'
)

const IconAdd = createIcon({
  content: (
    <>
      <path d='M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z'></path>
    </>
  ),
})

const IconEmail = createIcon({
  content: (
    <>
      <path d='M874.666667 181.333333H149.333333c-40.533333 0-74.666667 34.133333-74.666666 74.666667v512c0 40.533333 34.133333 74.666667 74.666666 74.666667h725.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V256c0-40.533333-34.133333-74.666667-74.666666-74.666667z m-725.333334 64h725.333334c6.4 0 10.666667 4.266667 10.666666 10.666667v25.6L512 516.266667l-373.333333-234.666667V256c0-6.4 4.266667-10.666667 10.666666-10.666667z m725.333334 533.333334H149.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667V356.266667l356.266666 224c4.266667 4.266667 10.666667 4.266667 17.066667 4.266666s12.8-2.133333 17.066667-4.266666l356.266666-224V768c0 6.4-4.266667 10.666667-10.666666 10.666667z'></path>
    </>
  ),
})

export default () => {
  return (
    <div style={{ fontSize: 24 }}>
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

      <DemoBlock title='createIcon: 接收 svg 的内容'>
        <Space wrap align='center' style={{ '--gap': '24px', color: 'red' }}>
          <IconAdd />
          <IconEmail color='green' />
        </Space>
      </DemoBlock>

      <DemoBlock title='createFromIconfont'>
        <Space wrap align='center' style={{ '--gap': '24px', color: 'red' }}>
          <IconfontSvg type='cook-attachent' />
          <IconfontSvg type='cook-browse' color='green' />
          <IconfontSvg type='cook-discount' color='orange' />
          <IconfontSvg type='cook-folder' color='blue' />
        </Space>
      </DemoBlock>
    </div>
  )
}
