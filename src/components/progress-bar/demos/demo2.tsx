import { ProgressBar, Slider, Space } from 'antd-mobile'
import { DemoBlock } from 'demos'
import React, { useState } from 'react'

export default () => {
  const [percent, setPercent] = useState(80)

  const fillColor = (percent: number) => {
    if (percent < 20) {
      return 'var(--adm-color-danger)'
    } else if (percent < 80) {
      return 'var(--adm-color-warning)'
    } else {
      return 'var(--adm-color-success)'
    }
  }

  // 颜色插值空间，处理渐变 “灰色死亡地带”（gray dead zone）
  // https://mp.weixin.qq.com/s/_z5kTlAG_OlAISdJnOkwpQ
  // https://developer.mozilla.org/zh-CN/docs/Web/CSS/color-interpolation-method
  // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
  // 处理兼容性 in hsl
  // https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-gradients-interpolation-method
  const linearGradient = `linear-gradient(in oklch to right, var(--adm-color-danger), var(--adm-color-warning), var(--adm-color-success))`

  return (
    <>
      <DemoBlock title='直角的进度条'>
        <ProgressBar percent={50} rounded={false} />
      </DemoBlock>

      <DemoBlock title='指定线条颜色'>
        <Space block direction='vertical'>
          <ProgressBar
            percent={90}
            style={{
              '--fill-color': 'var(--adm-color-success)',
            }}
          />
          <ProgressBar
            percent={30}
            style={{
              '--fill-color': 'var(--adm-color-warning)',
            }}
          />
          <ProgressBar
            percent={60}
            style={{
              '--fill-color': 'var(--adm-color-danger)',
            }}
          />
          <ProgressBar
            percent={70}
            style={{
              '--fill-color':
                'linear-gradient(to right, var(--adm-color-primary), var(--adm-color-danger))',
            }}
          />
        </Space>
      </DemoBlock>

      <DemoBlock title='指定轨道颜色'>
        <ProgressBar
          percent={50}
          style={{
            '--track-color': '#CDE2FF',
          }}
        />
      </DemoBlock>

      <DemoBlock title='渐变填充与轨道渐变'>
        <Space block direction='vertical'>
          <ProgressBar
            percent={percent}
            style={{
              '--fill-color': linearGradient,
            }}
          />
          <ProgressBar
            percent={percent}
            style={{
              '--track-color': linearGradient,
              '--track-color-mask': 'var(--adm-color-border)', // '#eee',
              '--fill-color': 'transparent',
            }}
          />
          <Slider
            defaultValue={percent}
            popover
            onChange={val => {
              setPercent(val as number)
            }}
          />
        </Space>
      </DemoBlock>

      <DemoBlock title='阶段色'>
        <p>1. 20 以下红色 20~80 黄色 80~100 绿色</p>
        <Space block direction='vertical'>
          <ProgressBar
            percent={percent}
            style={{
              '--fill-color': fillColor(percent),
            }}
          />
        </Space>
      </DemoBlock>
    </>
  )
}
