import React from 'react'
import { IconBase, IconBaseProps } from './icon-base'

const loaded = new Set<string>()

// TODO 支持数组，引用多个 iconfont.js 文件
// 禁止生产环境使用 iconfont 资源地址，这里我们推荐将资源直接在项目中引入。
export function createFromIconfont(scriptUrl: string) {
  if (
    typeof scriptUrl === 'string' &&
    scriptUrl.length &&
    !loaded.has(scriptUrl)
  ) {
    const script = document.createElement('script')
    script.setAttribute('src', scriptUrl)
    script.setAttribute('data-namespace', scriptUrl)
    loaded.add(scriptUrl)
    document.body.appendChild(script)
  }

  const IconfontSvg = React.forwardRef<SVGSVGElement, IconBaseProps>(
    (props, ref) => {
      const { type, ...rest } = props

      return (
        <IconBase {...rest} ref={ref}>
          {type ? <use xlinkHref={`#${type}`} /> : null}
        </IconBase>
      )
    }
  )

  return IconfontSvg
}
