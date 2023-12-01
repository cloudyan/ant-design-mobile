import classNames from 'classnames'
import type { CSSProperties, FC, ReactNode } from 'react'
import React from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = `adm-badge`

export const dot = <React.Fragment />

export type BadgeProps = {
  content?: ReactNode | typeof dot
  color?: string
  bordered?: boolean
  children?: ReactNode
  wrapperClassName?: string
  wrapperStyle?: CSSProperties
} & NativeProps<'--right' | '--top' | '--color'>

export const Badge: FC<BadgeProps> = props => {
  const { content, color, children } = props

  const isDot = content === dot

  const badgeClass = classNames(classPrefix, {
    [`${classPrefix}-fixed`]: !!children,
    [`${classPrefix}-dot`]: isDot,
    [`${classPrefix}-bordered`]: props.bordered,
  })

  let element = null
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
