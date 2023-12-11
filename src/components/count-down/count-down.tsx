// import { useCountDown } from 'ahooks'
import type { ForwardedRef } from 'react'
import React, { forwardRef, useImperativeHandle } from 'react'
import { NativeProps } from '../../utils/native-props'
import type { CurrentTime } from '../../utils/use-count-down'
import { useCountDown } from '../../utils/use-count-down'
import { Numeric } from '../../utils/validate'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `adm-count-down`

export type CountDownProps = {
  ref: ForwardedRef<any>
  time: number | string
  format?: string
  millisecond?: boolean
  autoStart?: boolean
  // onTick?: () => void // onChange
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
} & NativeProps<
  '--overflow-background' | '--more-background' | '--less-background'
>

const defaultProps = {
  time: 0,
  format: 'HH:mm:ss',
  autoStart: true,
}

export interface CountDownRef {
  start: () => void
  pause: () => void
  reset: () => void
}

/**
 * CountDown 倒计时
 * @description
 */
export const CountDown = forwardRef<CountDownRef, CountDownProps>((p, ref) => {
  const props = mergeProps(defaultProps, p)

  const { current, start, pause, reset } = useCountDown({
    time: props.time,
    millisecond: props.millisecond,
    autoStart: props.autoStart,
    onChange: props.onChange,
    onFinish: props.onFinish,
    // targetDate: `${new Date().getFullYear()}-12-31 23:59:59`,
  })

  let timeText = ''
  if (typeof props.format === 'string') {
    timeText = parseFormat(current, props.format)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        start,
        pause,
        reset,
      }
    },
    [start, pause, reset]
  )

  const { days, hours, minutes, seconds, milliseconds } = current

  return (
    <>
      <div>{timeText}</div>
    </>
  )
})

export function padZero(num: Numeric, targetLength = 2): string {
  let str = num + ''
  // while (str.length < targetLength) {
  //   str = '0' + str
  // }
  return str.padStart(targetLength, '0')
}

// dayjs format: YYYY/[Q]Q/MM/年第w周/星期d/DDTHH:mm:ss SSS
// const REGEX_FORMAT_DAYJS = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|S{1,3}/g
const REGEX_FORMAT = /\[([^\]]+)]|D{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}/g
// 这里不能使用全局，否则再次调用时，需要先设置 reg.lastIndex = 0;
// 负向先行断言
// /(?<!\[)D{1,2}/ [兼容性 iOS 16.4+ Android 5+](https://caniuse.com/js-regexp-lookbehind)
const REGEX_HAS = {
  D: /D{1,2}/,
  H: /H{1,2}/,
  m: /m{1,2}/,
}
export function parseFormat(
  currentTime: CurrentTime,
  format: string = 'HH:mm:ss'
) {
  const { days } = currentTime
  let { hours, minutes, seconds, milliseconds } = currentTime

  const ms = padZero(milliseconds, 3)

  // 增强格式处理
  const hasFormat = {
    D: REGEX_HAS.D.test(format),
    H: REGEX_HAS.H.test(format),
    m: REGEX_HAS.m.test(format),
  }
  if (!hasFormat.D) {
    hours += days * 24
  }
  if (!hasFormat.H) {
    minutes += hours * 60
  }
  if (!hasFormat.m) {
    seconds += minutes * 60
  }

  const matches = (match: string) => {
    switch (match) {
      // case 'YY':
      //   return years.slice(-2)
      // case 'YYYY':
      //   return padZero(years, 4)
      // case 'M':
      //   return months
      // case 'MM':
      //   return padZero(months)
      case 'D':
        return days
      case 'DD':
        return padZero(days)
      case 'H':
        return hours
      case 'HH':
        return padZero(hours)
      case 'm':
        return minutes
      case 'mm':
        return padZero(minutes)
      case 's':
        return seconds
      case 'ss':
        return padZero(seconds)
      case 'S':
        return ms.charAt(0)
      case 'SS':
        return ms.slice(0, 2)
      case 'SSS':
        return ms
      default:
        break
    }
    return null
  }

  const formated = format.replace(
    REGEX_FORMAT,
    (match, $1) => $1 || matches(match)
  ) // 'ZZ'
  return formated
}
