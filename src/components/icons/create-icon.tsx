import React, { forwardRef } from 'react'
import { IconBase, IconBaseProps } from './icon-base'

interface CreateIconOptions {
  content: React.ReactNode
  iconProps?: IconBaseProps
  viewBox?: string
}

export function createIcon(options: CreateIconOptions) {
  const { content, iconProps = {}, viewBox = '0 0 1024 1024' } = options

  return forwardRef<SVGSVGElement, IconBaseProps>((props, ref) => {
    return (
      <IconBase ref={ref} viewBox={viewBox} {...iconProps} {...props}>
        {content}
      </IconBase>
    )
  })
}
