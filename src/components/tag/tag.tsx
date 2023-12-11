import React, { useState } from 'react'
import type { FC, CSSProperties, ReactNode } from 'react'
import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import classNames from 'classnames'
import { CloseOutline } from 'antd-mobile-icons'

const classPrefix = `adm-tag`

const colorRecord: Record<string, string> = {
  default: 'var(--adm-color-text-secondary, #666666)',
  primary: 'var(--adm-color-primary, #1677ff)',
  success: 'var(--adm-color-success, #00b578)',
  warning: 'var(--adm-color-warning, #ff8f1f)',
  danger: 'var(--adm-color-danger, #ff3141)',
}

export type TagProps = {
  color?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | (string & {})
  fill?: 'solid' | 'outline'
  round?: boolean
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
  children?: ReactNode
  closeable?: boolean
} & NativeProps<
  '--border-color' | '--background-color' | '--text-color' | '--border-radius'
>

const defaultProps = {
  color: 'default',
  fill: 'solid',
  round: false,
  closeable: false,
}

export const Tag: FC<TagProps> = p => {
  const props = mergeProps(defaultProps, p)
  const color = colorRecord[props.color] ?? props.color
  const [close, setClose] = useState(false)

  const style: CSSProperties & {
    '--border-color': string
    '--text-color': string
    '--background-color': string
  } = {
    '--border-color': color,
    '--text-color': props.fill === 'outline' ? color : '#ffffff',
    '--background-color': props.fill === 'outline' ? 'transparent' : color,
  }

  const onClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setClose(true)
  }

  // TODO: 缺少关闭渐隐动画
  const closeIcon = props.closeable && (
    <CloseOutline
      name='cross'
      className={`${classPrefix}-close`}
      onClick={onClose}
    />
  )

  return close
    ? null
    : withNativeProps(
        props,
        <span
          style={style}
          onClick={props.onClick}
          className={classNames(classPrefix, {
            [`${classPrefix}-round`]: props.round,
          })}
        >
          {props.children}
          {closeIcon}
        </span>
      )
}
