import React, { forwardRef } from 'react'
import { IconSvg, IconSvgProps } from './icon-svg'

interface CreateIconOptions {
  content: React.ReactNode
  iconProps?: IconSvgProps
  viewBox?: string
}

export function createIcon(options: CreateIconOptions) {
  const { content, iconProps = {}, viewBox = '0 0 1024 1024' } = options

  return forwardRef<SVGSVGElement, IconSvgProps>((props, ref) => {
    return (
      <IconSvg ref={ref} viewBox={viewBox} {...iconProps} {...props}>
        {content}
      </IconSvg>
    )
  })
}
