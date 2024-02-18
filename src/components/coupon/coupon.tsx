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
  // name
  // name nameBefor nameAfter => faceName
  // value valueBefor valueAfter => faceValue
  // condition || valid startDate endDate => faceCondition
  // reson || description => faceDescription
  // divider
  // 辅助 props
  // tag
  // chosen disabled used

  nameAfter?: string
  valueBefore?: string
  value?: string | number
  valueAfter?: string

  condition?: string
  startDate?: Date | string
  endDate?: Date | string

  reason?: string | ReactNode
  description?: string | ReactNode

  tag?: string
  type?: number | string
  typeText?: string
  status?: number | string
  statusText?: string

  // select vs choose 参见 https://www.eisland.com.tw/Main.php?stat=a_gyrLoog&mid=54
  chosen?: boolean
  disabled?: boolean
  used?: boolean
  divider?: ReactNode | boolean

  [key: string]: any
} & NativeProps

const defaultProps = {
  // currency: '¥',
  // disabled: false,
  // chosen: false,
}

export interface CouponRef {
  // start: () => void
  // pause: () => void
  // reset: () => void
}

export const Coupon: FC<CouponProps> = p => {
  const props = mergeProps(defaultProps, p)

  const { disabled, reason } = props
  const faceDescription = (disabled && reason) || props.description

  const faceName = useMemo(() => {
    const { name = '', nameBefore = '', nameAfter = '' } = props
    // 根据不同类型的券，返回不同的字段组合
    return (
      <>
        <em>{nameBefore}</em>
        <strong>{name}</strong>
        <em>{nameAfter}</em>
      </>
    )
  }, [props.name, props.nameBefore, props.nameAfter])

  const faceValue = useMemo(() => {
    const { value = '', valueBefore = '', valueAfter = '' } = props
    // 根据不同类型的券，返回不同的字段组合
    return (
      <>
        <em>{valueBefore}</em>
        <strong>{value}</strong>
        <em>{valueAfter}</em>
      </>
    )
  }, [props.value, props.valueBefore, props.valueAfter])

  // condition || valid
  const faceCondition = useMemo(() => {
    // 今日到期
    if (props.today) {
      return <span className={`${classPrefix}-tag-taday`}>今日到期</span>
    }
    // (dayjs(props.startDate).format('YYYY-MM-DD') + ' - ' + dayjs(props.endDate).format('YYYY-MM-DD'))
    return `有效期至` + dayjs(props.endDate).format('YYYY/MM/DD')
  }, [props.endDate, props.today])

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
