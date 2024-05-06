import React from 'react'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames'
import type { StepProps } from './step'
import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = `adm-steps`
const stepClassPrefix = `adm-step`

const defaultIcon = <span className={`${stepClassPrefix}-icon-dot`} />
// eslint-disable-next-line
const progressIcons = {
  finish: <span className={`${stepClassPrefix}-icon-dot`} />, // 绿色对勾
  process: <span className={`${stepClassPrefix}-icon-dot`} />, // 高亮数字
  wait: <span className={`${stepClassPrefix}-icon-dot`} />, // 灰色数字
  error: <span className={`${stepClassPrefix}-icon-dot`} />, // 红色错误
}

type Direction = 'horizontal' | 'vertical'

export type StepsProps = {
  current?: number
  direction?: Direction
  progressDot?: boolean
  children?: ReactNode
} & NativeProps<
  | '--title-font-size'
  | '--description-font-size'
  | '--indicator-margin-right'
  | '--icon-size'
>

const defaultProps = {
  current: 0,
  direction: 'horizontal',
  progressDot: true,
}

export const Steps: FC<StepsProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { direction, current } = props
  const classString = classNames(classPrefix, `${classPrefix}-${direction}`)

  return withNativeProps(
    props,
    <div className={classString}>
      {React.Children.map(props.children, (child, index) => {
        if (!React.isValidElement<StepProps>(child)) {
          return child
        }
        const childProps = child.props
        let status = childProps.status || 'wait'

        if (index < current) {
          status = childProps.status || 'finish'
        } else if (index === current) {
          status = childProps.status || 'process'
        }

        const icon = childProps.icon ?? defaultIcon

        return React.cloneElement(child, {
          status,
          icon,
        })
      })}
    </div>
  )
}
