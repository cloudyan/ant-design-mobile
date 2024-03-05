import React, { useState, useLayoutEffect } from 'react'
import {
  Button,
  Dialog,
  Rate,
  setDefaultConfig,
  Slider,
  Space,
  Switch,
} from 'antd-mobile'
import { DemoBlock } from 'demos'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import enUS from 'antd-mobile/es/locales/en-US'
import './demo3.less'

export default () => {
  const [rateValue, setRateValue] = useState(3)
  const [sliderValue, setSliderValue] = useState(60)
  const [enableDarkMode, setEnableDarkMode] = useState(true)

  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      'data-prefers-color-scheme',
      enableDarkMode ? 'dark' : 'light'
    )
  }, [enableDarkMode])

  function toLight() {
    setDefaultConfig({
      locale: zhCN,
      theme: 'light',
    })
    Dialog.alert({
      content: '已切换到 Light theme',
    })
  }
  function toDark() {
    setDefaultConfig({
      locale: enUS,
      theme: 'dark',
    })
    Dialog.alert({
      content: 'Switched to Dark theme',
    })
  }
  return (
    <>
      <DemoBlock title='Switch'>
        <Space align='center'>
          <div>Dark Mode</div>
          <Switch
            checked={enableDarkMode}
            onChange={v => {
              setEnableDarkMode(v)
            }}
          />
        </Space>
      </DemoBlock>

      <DemoBlock title='默认主题'>
        <Rate value={rateValue} onChange={value => setRateValue(value)} />
        <Slider
          value={sliderValue}
          icon=' '
          onChange={value => setSliderValue(value as number)}
        />
      </DemoBlock>

      <DemoBlock className='custom-theme' title='定制主题'>
        <Rate value={rateValue} onChange={value => setRateValue(value)} />
        <Slider
          value={sliderValue}
          icon=' '
          onChange={value => setSliderValue(value as number)}
        />
      </DemoBlock>
    </>
  )
}
