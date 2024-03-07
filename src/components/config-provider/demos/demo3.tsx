import React, { useState, useLayoutEffect } from 'react'
import {
  Button,
  Dialog,
  Rate,
  setDefaultConfig,
  Slider,
  Space,
  Switch,
  useConfig,
} from 'antd-mobile'
import { DemoBlock } from 'demos'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import enUS from 'antd-mobile/es/locales/en-US'
import { useUpdateLayoutEffect } from 'ahooks'
import './demo3.less'

export default () => {
  const [rateValue, setRateValue] = useState(3)
  const [sliderValue, setSliderValue] = useState(60)
  const [enableDarkMode, setEnableDarkMode] = useState(true)
  const [language, setLanguage] = useState('zh-cn')
  const { locale } = useConfig()

  useLayoutEffect(() => {
    const mode = enableDarkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-prefers-color-scheme', mode)
  }, [enableDarkMode])

  const updateMode = (v: any) => {
    setEnableDarkMode(v)
    const mode = v ? 'dark' : 'light'
    Dialog.alert({
      content: `已切换到 ${mode} mode`,
    })
  }

  useUpdateLayoutEffect(() => {
    const content = language === 'en' ? 'Switch to English' : '已切换到 中文'
    Dialog.alert({
      title: locale.common.confirm,
      content: `${content} ${language}`,
    })
  }, [language])

  const updateLanguage = (v: any) => {
    const lang = language !== 'en' ? 'en' : 'zh-cn'
    setLanguage(lang)
    setDefaultConfig({
      locale: language !== 'en' ? enUS : zhCN,
    })
  }

  return (
    <>
      <DemoBlock title='切换语言'>
        <Switch checked={language === 'en'} onChange={updateLanguage} />{' '}
        {language}
      </DemoBlock>
      <DemoBlock title='切换明暗模式'>
        <Switch checked={enableDarkMode} onChange={updateMode} />{' '}
        {enableDarkMode ? 'dark' : 'light'}
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
