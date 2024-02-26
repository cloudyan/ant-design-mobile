import React from 'react'
import { IconSvg, IconSvgProps } from './icon-svg'

const loaded = new Set<string>()

export function createFromIconfont(scriptUrl: string) {
  if (
    typeof scriptUrl === 'string' &&
    scriptUrl.length &&
    !loaded.has(scriptUrl)
  ) {
    const script = document.createElement('script')
    script.setAttribute('src', scriptUrl)
    script.setAttribute('data-namespace', scriptUrl)
    document.body.appendChild(script)

    loaded.add(scriptUrl)
  }

  const IconfontSvg = React.forwardRef<SVGSVGElement, IconSvgProps>(
    (props, ref) => {
      const { type, ...rest } = props

      return (
        <IconSvg {...rest} ref={ref}>
          {type ? <use xlinkHref={`#${type}`} /> : null}
        </IconSvg>
      )
    }
  )

  return IconfontSvg
}
