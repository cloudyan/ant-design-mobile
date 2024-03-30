import React from 'react'
import type { FC, ReactNode } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import type { FormatConfig, valueType } from './utils'

const classPrefix = 'adm-statistic-number'

export type StatisticNumberProps = {
  value: valueType
  // ..FormatConfig
} & FormatConfig &
  NativeProps

const defaultProps = {}

export interface StatisticNumberRef {
  // start: () => void
  // pause: () => void
  // reset: () => void
}

export const StatisticNumber: FC<StatisticNumberProps> = p => {
  const props = mergeProps(defaultProps, p)

  const {
    value,
    formatter,
    precision,
    decimalSeparator,
    groupSeparator = '',
  } = props

  let valueNode: ReactNode

  if (typeof formatter === 'function') {
    // Customize formatter
    valueNode = formatter(value)
  } else {
    // Internal formatter
    const val: string = String(value)
    const cells = val.match(/^(-?)(\d*)(\.(\d+))?$/)

    // Process if illegal number
    if (!cells || val === '-') {
      valueNode = val
    } else {
      const negative = cells[1]
      let int = cells[2] || '0'
      let decimal = cells[4] || ''

      int = int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)

      if (typeof precision === 'number') {
        decimal = decimal
          .padEnd(precision, '0')
          .slice(0, precision > 0 ? precision : 0)
      }

      if (decimal) {
        decimal = `${decimalSeparator}${decimal}`
      }

      valueNode = [
        <span key='int' className={`${classPrefix}-content-value-int`}>
          {negative}
          {int}
        </span>,
        decimal && (
          <span
            key='decimal'
            className={`${classPrefix}-content-value-decimal`}
          >
            {decimal}
          </span>
        ),
      ]
    }
  }

  return withNativeProps(
    props,
    <span className={`${classPrefix}-content-value`}>{valueNode}</span>
  )
}
