import React from 'react'
import type { FC, ReactNode } from 'react'
import classnames from 'classnames'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { StatisticNumber } from './number'
import Skeleton from '../skeleton'
import type { FormatConfig, valueType } from './utils'

const classPrefix = 'adm-statistic'

export type StatisticProps = {
  title?: ReactNode
  value?: valueType
  valueRender?: (node: ReactNode) => ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
  loading?: boolean
  children?: ReactNode
} & NativeProps &
  FormatConfig

const defaultProps = {}

export interface StatisticRef {
  // start: () => void
  // pause: () => void
  // reset: () => void
}

export const Statistic: FC<StatisticProps> = p => {
  const props = mergeProps(defaultProps, p)

  const {
    // prefixCls,
    className,
    style,
    // valueStyle,
    value = 0,
    title,
    valueRender,
    prefix,
    suffix,
    loading = false,
    /* --- FormatConfig starts --- */
    formatter,
    precision,
    decimalSeparator = '.',
    groupSeparator = ',',
    /* --- FormatConfig starts --- */
    // onMouseEnter,
    // onMouseLeave,
    // ...rest
  } = props

  const valueNode: React.ReactNode = (
    <StatisticNumber
      decimalSeparator={decimalSeparator}
      groupSeparator={groupSeparator}
      formatter={formatter}
      precision={precision}
      value={value}
    />
  )

  const cls = classnames(classPrefix, className)

  return withNativeProps(
    props,
    <div className={cls}>
      {title && <div className={`${classPrefix}-title`}>{title}</div>}
      <Skeleton loading={loading} className={`${classPrefix}-skeleton`}>
        {prefix && (
          <span className={`${classPrefix}-content-prefix`}>{prefix}</span>
        )}
        {valueRender ? valueRender(valueNode) : valueNode}
        {suffix && (
          <span className={`${classPrefix}-content-suffix`}>{suffix}</span>
        )}
      </Skeleton>
    </div>
  )
}
