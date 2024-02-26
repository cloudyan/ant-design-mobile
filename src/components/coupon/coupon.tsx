import React, { useMemo } from 'react'
import type { FC, ReactNode } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
// import Checkbox from '../checkbox'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { CheckOutline } from 'antd-mobile-icons'

const classPrefix = 'adm-coupon'

type stringNode = ReactNode | string | number

export type CouponProps = {
  // faceName: nameBefore + name + nameAfter
  nameBefore?: string
  name?: string | number
  nameAfter?: string
  // faceValue: valueBefore + value + valueAfter
  valueBefore?: string
  value?: string | number
  valueAfter?: string

  // faceCondition: condition || valid startDate endDate
  condition?: string // 券使用条件
  startDate?: Date | string // 券开始时间
  endDate?: Date | string // 券结束时间
  validDate?: string // 券有效期
  validRangeDate?: string // 券有效期范围
  today?: boolean

  // faceDescription: disabled && reason || description
  description?: string // 券描述
  reason?: string // 券不可用原因

  // 辅助
  tag?: string // 券标签
  status?: number | string // 券状态
  statusText?: string // 券状态文案
  type?: number | string // 券类型
  typeText?: string // 券类型文案
  subType?: number | string // 券子类型
  subTypeText?: number | string // 券子类型文案

  // 分割线
  divider?: ReactNode | boolean

  // select vs choose 参见 https://www.eisland.com.tw/Main.php?stat=a_gyrLoog&mid=54
  disabled?: boolean // 不可用状态
  chosen?: boolean
  used?: boolean
  onClick?: (chosen: boolean) => void
} & NativeProps

const defaultProps = {}

export interface CouponRef {
  // start: () => void
  // pause: () => void
  // reset: () => void
}

export const Coupon: FC<CouponProps> = p => {
  const props = mergeProps(defaultProps, p)

  const { disabled } = props
  let faceDescription: any =
    (props.disabled && props.reason) || props.description || ''
  faceDescription = faceDescription.split(/\n/).map((it: any) => <p>{it}</p>)

  const faceName = (
    <>
      <em>{props.nameBefore}</em>
      <strong>{props.name}</strong>
      <em>{props.nameAfter}</em>
    </>
  )

  const faceValue = (
    <>
      <em>{props.valueBefore}</em>
      <strong>{props.value}</strong>
      <em>{props.valueAfter}</em>
    </>
  )

  // condition || valid
  const faceValidDate = props.validDate || props.validRangeDate || ''

  const faceCondition = (() => {
    // 今日到期
    if (props.today) {
      return <span className={`${classPrefix}-tag-taday`}>今日到期</span>
    }
    // (dayjs(props.startDate).format('YYYY-MM-DD') + ' - ' + dayjs(props.endDate).format('YYYY-MM-DD'))
    return `有效期至` + dayjs(props.endDate).format('YYYY/MM/DD')
  })()

  const selector = <CheckOutline className={`${classPrefix}-selector-icon`} />

  return withNativeProps(
    props,
    <div
      className={classNames(classPrefix, {
        [`${classPrefix}-disabled`]: disabled,
        [`${classPrefix}-chosen`]: props.chosen,
        [`${classPrefix}-used`]: props.used,
      })}
    >
      {props.tag && <div className={`${classPrefix}-tag`}>{props.tag}</div>}
      <div className={`${classPrefix}-content`}>
        {
          <>
            <div className={`${classPrefix}-body`}>
              <div className={`${classPrefix}-name`}>{faceName}</div>
              <div className={`${classPrefix}-value`}>{faceValue}</div>
              <div className={`${classPrefix}-condition`}>{faceCondition}</div>
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
        }
      </div>
      <div className={`${classPrefix}-divider`}>
        {props.divider || <div className={`${classPrefix}-divider-line`} />}
      </div>
      <div className={`${classPrefix}-footer`}>
        {faceDescription && (
          <div className={`${classPrefix}-description`}>{faceDescription}</div>
        )}
      </div>

      <div className={`${classPrefix}-selector`}>{selector}</div>
    </div>
  )
}
