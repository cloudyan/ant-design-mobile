import type { CSSProperties, FC, ReactNode } from 'react'
import React from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import classNames from 'classnames'

const classPrefix = `adm-progress-circle`

export type ProgressCircleProps = {
  percent?: number
  reverse?: boolean // fill 默认顺时针 取反为逆时针
  duration?: number
  children?: ReactNode
} & NativeProps<
  | '--size'
  | '--track-width'
  | '--track-color'
  | '--fill-color'
  | '--fill-color-start'
  | '--fill-color-end'
>

const defaultProps = {
  reverse: false,
  percent: 0,
  duration: 0.3,
}

// 支持动画
export const ProgressCircle: FC<ProgressCircleProps> = p => {
  const props = mergeProps(defaultProps, p)
  const style: CSSProperties & Record<'--percent', string> = {
    '--percent': props.percent.toString(),
  }

  const fillCls = classNames(`${classPrefix}-fill`, {
    [`${classPrefix}-fill-reverse`]: props.reverse,
  })

  return withNativeProps(
    props,
    <div className={`${classPrefix}`} style={style}>
      <div className={`${classPrefix}-content`}>
        <svg className={`${classPrefix}-svg`}>
          <circle className={`${classPrefix}-track`} fill='transparent' />
          <circle
            className={fillCls}
            fill='transparent'
            style={{
              transitionDuration: `${props.duration}s`,
            }}
          />
        </svg>
        <div className={`${classPrefix}-info`}>{props.children}</div>
      </div>
    </div>
  )
}
