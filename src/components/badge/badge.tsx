import classNames from 'classnames'
import type { CSSProperties, FC, ReactNode } from 'react'
import React from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { isDef, isNumeric } from '../../utils/validate'

const classPrefix = `adm-badge`

export const dot = <React.Fragment />

export type BadgeProps = {
  content?: ReactNode | typeof dot
  max?: number | string
  color?: string
  bordered?: boolean
  children?: ReactNode
  wrapperClassName?: string
  wrapperStyle?: CSSProperties
} & NativeProps<'--right' | '--top' | '--color'>

export const Badge: FC<BadgeProps> = props => {
  const { max, color, children } = props
  let { content } = props

  const isDot = content === dot

  if (isDef(max) && isNumeric(content) && +content > +max) {
    content = `${max}+`
  }

  const badgeClass = classNames(classPrefix, {
    [`${classPrefix}-fixed`]: !!children,
    [`${classPrefix}-dot`]: isDot,
    [`${classPrefix}-bordered`]: props.bordered,
  })

  let element = null
  // 有内容时，badge element
  if (content || content === 0) {
    element = withNativeProps(
      props,
      <div
        className={badgeClass}
        style={
          {
            '--color': color,
          } as BadgeProps['style']
        }
      >
        {!isDot && <div className={`${classPrefix}-content`}>{content}</div>}
      </div>
    )
  }

  // 无 child 即为独立使用
  return children ? (
    <div
      className={classNames(`${classPrefix}-wrapper`, props.wrapperClassName)}
      style={props.wrapperStyle}
    >
      {children}
      {element}
    </div>
  ) : (
    element
  )
}
