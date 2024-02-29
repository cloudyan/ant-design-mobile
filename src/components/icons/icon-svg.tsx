import React, { forwardRef } from 'react'
import { IconBase, IconBaseProps } from './icon-base'

export type IconSvgProps = {
  type: string
} & IconBaseProps

// 很简单 <use xlinkHref={`#${type}`} />
export const IconSvg = forwardRef<SVGSVGElement, IconBaseProps>(
  (props, ref) => {
    const { type, ...rest } = props

    return (
      <IconBase {...rest} ref={ref}>
        {type ? <use xlinkHref={`#${type}`} /> : null}
      </IconBase>
    )
  }
)
