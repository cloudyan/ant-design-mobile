import React from 'react'
import { IconBase, IconBaseProps } from './icon-base'

const loaded = new Set<string>()

// 本地引入 svgSprite
export function createLocalIconfont(svgSprite: string) {
  if (
    typeof svgSprite === 'string' &&
    svgSprite.length &&
    !loaded.has(svgSprite)
  ) {
    loaded.add(svgSprite)
    const arrts = `aria-hidden='true' style='position:absolute;width:0;height:0;overflow:hidden'`
    const SVG = `${svgSprite}`
    document.body.insertAdjacentHTML('afterBegin', '' + SVG + '')
  }
  const Iconfont = React.forwardRef<SVGSVGElement, IconBaseProps>(
    (props, ref) => {
      const { type, ...rest } = props

      return (
        <IconBase {...rest} ref={ref}>
          {type ? <use xlinkHref={`#${type}`} /> : null}
        </IconBase>
      )
    }
  )

  return Iconfont
}
