import React from 'react'
import { Switch } from 'antd-mobile'
import { DemoBlock } from '../../demo-block'
import { useToggle } from 'ahooks'
import './index.less'

export default () => {
  const [loading, { toggle }] = useToggle(true)
  const [checked, { toggle: toggleChecked }] = useToggle(false)
  return (
    <>
      <DemoBlock title='基础用法(非受控)'>
        <Switch
          onChange={checked => {
            alert(`当前选中状态：${checked}`)
          }}
        />
      </DemoBlock>
      <DemoBlock title='受控组件'>
        <Switch
          checked={checked}
          onChange={checked => {
            toggleChecked(checked)
          }}
        />
      </DemoBlock>
      <DemoBlock title='有默认值'>
        <Switch defaultChecked />
      </DemoBlock>
      <DemoBlock title='禁用状态'>
        <Switch disabled />
        <Switch disabled defaultChecked />
      </DemoBlock>
      <DemoBlock title='加载状态'>
        <button
          onClick={() => {
            toggle()
          }}
        >
          切换加载状态
        </button>
        <Switch loading={loading} />
      </DemoBlock>
      <DemoBlock title='loading状态和禁用状态共存时不显示loading'>
        <Switch disabled loading={loading} />
      </DemoBlock>
      <DemoBlock title='自定义样式'>
        <Switch className='my-switch' />
      </DemoBlock>
    </>
  )
}
