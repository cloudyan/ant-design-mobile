// 禁止生产环境使用 iconfont 资源地址，这里我们推荐将资源直接在项目中引入。

import React from 'react'
import { IconBase, IconBaseProps } from 'antd-mobile'

// 项目中引入 iconfont 对应的 symbol 文件
// iconfont 图标库(设置)
// 统一规范
// 1. 设置 FontClass 前缀为 `${FontFamily}-` 格式，如 cookfont-
// 2. 设置 FontFamily 命名为 `xxfont` 格式，如 cookfont
import './iconfont-test'

const loaded = new Set<string>()

export const IconFont = React.forwardRef<SVGSVGElement, IconBaseProps>(
  (props, ref) => {
    const { type, ...rest } = props

    return (
      <IconBase {...rest} ref={ref}>
        {type ? <use xlinkHref={`#${type}`} /> : null}
      </IconBase>
    )
  }
)
