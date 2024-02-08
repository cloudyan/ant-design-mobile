import React, { useMemo } from 'react'
import type { FC, ReactNode } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import Checkbox from '../checkbox'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { CheckOutline } from 'antd-mobile-icons'

const classPrefix = 'adm-coupon'

export type CouponProps = {
  name?: ReactNode
  value?: number
  disabled?: boolean
  currency?: string

  valueDesc?: string // 1.5 8.8
  unitDesc?: string // 元 折

  content?: ReactNode
  divider?: ReactNode
  description?: ReactNode
  condition?: ReactNode
  reason?: ReactNode

  startDate?: Date
  endDate?: Date

  children?: ReactNode
  type?: number | string
  status?: number | string
  statusText?: string
  tag?: string
  // select vs choose 参见 https://www.eisland.com.tw/Main.php?stat=a_gyrLoog&mid=54
  chosen?: boolean

  [key: string]: any
} & NativeProps

const defaultProps = {
  currency: '¥',
  disabled: false,
  chosen: false,
}

export interface CouponRef {
  // start: () => void
  // pause: () => void
  // reset: () => void
}

// 规划
// 1. 票据分割线

export const Coupon: FC<CouponProps> = p => {
  const props = mergeProps(defaultProps, p)

  const { chosen, disabled, reason, condition, name } = props
  const description = (disabled && reason) || props.description

  const faceName = useMemo(() => {
    const { name = '', nameDesc = '' } = props
    return (
      <>
        <strong>{name}</strong>
        <em>{nameDesc}</em>
      </>
    )
  }, [props.name, props.nameDesc])

  const faceAmount = useMemo(() => {
    const { preValue = '', valueDesc, unitDesc } = props
    // 根据不同类型的券，返回不同的字段组合
    return (
      <>
        <em>{preValue}</em>
        <strong>{valueDesc}</strong>
        <em>{unitDesc}</em>
      </>
    )
  }, [props.preValue, props.valueDesc, props.unitDesc])

  // const rangeDate = (dayjs(props.startDate).format('YYYY-MM-DD') + ' - ' + dayjs(props.endDate).format('YYYY-MM-DD'))
  const rangeDate = useMemo(() => {
    // 今日到期
    if (props.today) {
      return <span className={`${classPrefix}-tag-taday`}>今日到期</span>
    }
    return `有效期至` + dayjs(props.endDate).format('YYYY/MM/DD')
  }, [props.endDate, props.today])

  const selector = <CheckOutline className={`${classPrefix}-selector-icon`} />

  return withNativeProps(
    props,
    <div
      className={classNames(classPrefix, {
        [`${classPrefix}-disabled`]: disabled,
        [`${classPrefix}-chosen`]: props.chosen,
      })}
    >
      {props.tag && <div className={`${classPrefix}-tag`}>{props.tag}</div>}
      <div className={`${classPrefix}-content`}>
        {props.content || (
          <>
            {/* <div className={`${classPrefix}-head`}>
              <div className={`${classPrefix}-amount`}>{faceAmount}</div>
              <div className={`${classPrefix}-condition`}>{condition}</div>
            </div> */}
            <div className={`${classPrefix}-body`}>
              <div className={`${classPrefix}-name`}>{faceName}</div>
              <div className={`${classPrefix}-amount`}>{faceAmount}</div>
              <div className={`${classPrefix}-valid`}>{rangeDate}</div>
              {/* <div className={`${classPrefix}-corner`}>
                <div className={`${classPrefix}-tag`}></div>
              </div> */}
            </div>
            {/* {!props.disabled && (
              <div className={`${classPrefix}-corner`}>
                <Checkbox checked={chosen} />
              </div>
            )} */}
            {props.statusText && (
              <div className={`${classPrefix}-status`}>
                <span className={`${classPrefix}-status-text`}>
                  {props.statusText}
                </span>
              </div>
            )}
          </>
        )}
      </div>
      <div className={`${classPrefix}-divider`}>
        {props.divider || <div className={`${classPrefix}-divider-line`} />}
      </div>
      <div className={`${classPrefix}-footer`}>
        {description && (
          <div className={`${classPrefix}-description`}>{description}</div>
        )}
      </div>

      <div className={`${classPrefix}-selector`}>{selector}</div>
    </div>
  )
}
