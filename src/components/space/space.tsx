import React from 'react'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `adm-space`

export type SpaceProps = {
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'end' | 'center' | 'baseline'
  itemStyle?: NativeProps['style']
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch'
  wrap?: boolean
  block?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: ReactNode
} & NativeProps<'--gap' | '--gap-vertical' | '--gap-horizontal'>

const defaultProps = {
  direction: 'horizontal',
}

export const Space: FC<SpaceProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { itemStyle, direction, onClick } = props
  return withNativeProps(
    props,
    <div
      className={classNames(classPrefix, {
        [`${classPrefix}-wrap`]: props.wrap,
        [`${classPrefix}-block`]: props.block,
        [`${classPrefix}-${direction}`]: true,
        [`${classPrefix}-align-${props.align}`]: !!props.align,
        [`${classPrefix}-justify-${props.justify}`]: !!props.justify,
      })}
      onClick={onClick}
    >
      {React.Children.map(props.children, (child, index) => {
        return (
          child !== null &&
          child !== undefined && (
            <div
              key={index}
              className={`${classPrefix}-item`}
              style={itemStyle}
            >
              {child}
            </div>
          )
        )
      })}
    </div>
  )
}
