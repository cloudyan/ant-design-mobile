import React, { forwardRef } from 'react'
import type { FC, ReactNode, CSSProperties } from 'react'
import classNames from 'classnames'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { dir } from 'console'
import { wrap } from 'module'

const classPrefix = 'adm-flex'

type AnyObject = Record<PropertyKey, any>
type CustomComponent<P = AnyObject> = React.ComponentType<P> | string
type SizeType = 'small' | 'middle' | 'large' | undefined

export type FlexProps<P = AnyObject> = {
  // vertical?: boolean
  direction?: CSSProperties['flexDirection']
  wrap?: CSSProperties['flexWrap']
  justify?: CSSProperties['justifyContent']
  // alignItems（行内成员） vs alignContent（所有行，仅多行生效）
  align?: CSSProperties['alignItems']
  flex?: CSSProperties['flex']
  gap?: CSSProperties['gap'] | SizeType
  role?: string
  component?: CustomComponent<P>
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: ReactNode
} & NativeProps

// TODO: 以下默认值是否更友好
// alignContent 默认值改为 flex-start（而不是 stretch）
// flexShrink 默认值改为0 （而不是1）
const defaultProps = {
  direction: 'row',
  wrap: 'nowrap',
  align: 'normal',
  justify: 'normal',
  // flex: 'normal',
  // gap: '0',
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
    [`${classPrefix}-direction-${props.direction}`]: props.direction,
    [`${classPrefix}-align-${props.align}`]: props.align,
    [`${classPrefix}-justify-${props.justify}`]: props.justify,
    [`${classPrefix}-${props.wrap}`]: props.wrap,
  })

  // 通过样式控制，优先级太高，不便于重写
  const mergedStyle: CSSProperties = {
    ...style,
    flex,
    gap,
  }

  return withNativeProps(
    props,
    <Component
      ref={ref}
      style={mergedStyle}
      className={mergedCls}
      onClick={props.onClick}
      role={props.role}
    >
      {children}
    </Component>
  )
})
