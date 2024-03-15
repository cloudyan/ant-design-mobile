import React, { forwardRef } from 'react'
import type { FC, ReactNode, CSSProperties } from 'react'
import classNames from 'classnames'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = 'adm-flex'

type AnyObject = Record<PropertyKey, any>
type CustomComponent<P = AnyObject> = React.ComponentType<P> | string
type SizeType = 'small' | 'middle' | 'large' | undefined

export type FlexProps<P = AnyObject> = {
  // vertical?: boolean
  direction?: CSSProperties['flexDirection']
  wrap?: CSSProperties['flexWrap']
  justify?: CSSProperties['justifyContent']
  align?: CSSProperties['alignItems']
  flex?: CSSProperties['flex']
  gap?: CSSProperties['gap'] | SizeType
  component?: CustomComponent<P>
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: ReactNode
} & NativeProps

const defaultProps = {
  direction: 'row',
  wrap: 'nowrap',
  justify: 'normal',
  align: 'normal',
  flex: 'normal',
  gap: '0',
  component: 'div',
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>((p, ref) => {
  const props = mergeProps(defaultProps, p)

  const {
    children,
    className,
    style,
    flex,
    direction,
    wrap,
    justify,
    align,
    gap,
    component: Component = 'div',
    ...othersProps
  } = props

  const mergedCls = classNames(className, classPrefix, {
    // [`${classPrefix}-vertical`]: mergedVertical,
  })
  const mergedStyle: CSSProperties = {
    ...style,
    flex,

    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justify,
    alignItems: align,
    gap: gap,
  }

  return withNativeProps(
    props,
    <Component
      ref={ref}
      style={mergedStyle}
      className={mergedCls}
      onClick={props.onClick}
    >
      {children}
    </Component>
  )
})
