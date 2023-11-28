import React from 'react'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `adm-divider`

export type DividerProps = {
  contentPosition?: 'left' | 'right' | 'center'
  direction?: 'horizontal' | 'vertical'
  children?: ReactNode
} & NativeProps

const defaultProps = {
  contentPosition: 'center',
  direction: 'horizontal',
}

// 设计非常精简
// 通过样式控制位置 方向
// 无法精细控制位置以及分割线高度
// 是否支持 0.5px 细线？使用高清适配方案，页面整体缩放一倍？
export const Divider: FC<DividerProps> = p => {
  const props = mergeProps(defaultProps, p)
  return withNativeProps(
    props,
    <div
      className={classNames(
        classPrefix,
        `${classPrefix}-${props.direction}`,
        `${classPrefix}-${props.contentPosition}`
      )}
    >
      {props.children && (
        <div className={`${classPrefix}-content`}>{props.children}</div>
      )}
    </div>
  )
}
