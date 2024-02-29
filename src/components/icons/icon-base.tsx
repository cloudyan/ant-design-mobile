import React, { PropsWithChildren, forwardRef } from 'react'
import classNames from 'classnames'
import { mergeProps } from '../../utils/with-default-props'

const defaultClassPrefix = 'adm-icon'

type BaseIconProps = {
  classPrefix?: string
  className?: string
  style?: React.CSSProperties
  size?: string | string[]
  spin?: boolean
}

export type IconBaseProps = BaseIconProps &
  Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>

export const getSize = (size: IconBaseProps['size']) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[]
  }

  const width = (size as string) || '1em'
  const height = (size as string) || '1em'

  return [width, height]
}

const defaultProps = {
  classPrefix: '',
}

export const IconBase = forwardRef<
  SVGSVGElement,
  PropsWithChildren<IconBaseProps>
>((p, ref) => {
  const props = mergeProps(defaultProps, p)

  const {
    classPrefix,
    style,
    className,
    spin,
    size = '1em',
    children,
    ...rest
  } = props

  const [width, height] = getSize(size)

  const classes = classNames(
    defaultClassPrefix,
    classPrefix,
    {
      [`${defaultClassPrefix}}-spin`]: spin,
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
