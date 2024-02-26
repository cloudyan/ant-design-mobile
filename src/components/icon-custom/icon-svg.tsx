import React, { PropsWithChildren, forwardRef } from 'react'
import classNames from 'classnames'

type BaseIconProps = {
  className?: string
  style?: React.CSSProperties
  size?: string | string[]
  spin?: boolean
}

export type IconSvgProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>

export const getSize = (size: IconSvgProps['size']) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[]
  }

  const width = (size as string) || '1em'
  const height = (size as string) || '1em'

  return [width, height]
}

export const IconSvg = forwardRef<
  SVGSVGElement,
  PropsWithChildren<IconSvgProps>
>((props, ref) => {
  const { style, className, spin, size = '1em', children, ...rest } = props

  const [width, height] = getSize(size)

  const classes = classNames(
    'icon',
    {
      'icon-spin': spin,
    },
    className
  )

  return (
    <svg
      ref={ref}
      className={classes}
      style={style}
      width={width}
      height={height}
      fill='currentColor'
      {...rest}
    >
      {children}
    </svg>
  )
})
