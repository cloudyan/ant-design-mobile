// import { useCountDown } from 'ahooks'
import type { ForwardedRef } from 'react'
import React, { forwardRef, useImperativeHandle } from 'react'
import { NativeProps } from '../../utils/native-props'
import type { CurrentTime } from '../../utils/use-count-down'
import { useCountDown } from '../../utils/use-count-down'
import { Numeric } from '../../utils/validate'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `adm-count-down`

export type CountDownRef = {
  nativeElement: HTMLButtonElement | null
}

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

export interface Ref {
  start: () => void
  pause: () => void
  reset: () => void
}

/**
 * CountDown 倒计时
 * @description
 */
export const CountDown = forwardRef<Ref, CountDownProps>((p, ref) => {
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
    []
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

  while (str.length < targetLength) {
    str = '0' + str
  }

  return str
}

// dayjs format: YYYY/[Q]Q/MM/年第w周/星期d/DDTHH:mm:ss
export function parseFormat(
  currentTime: CurrentTime,
  format: string = 'HH:mm:ss'
): string {
  const { days } = currentTime
  let { hours, minutes, seconds, milliseconds } = currentTime

  if (format.includes('DD')) {
    format = format.replace('DD', padZero(days))
  } else {
    hours += days * 24
  }

  if (format.includes('HH')) {
    format = format.replace('HH', padZero(hours))
  } else {
    minutes += hours * 60
  }

  if (format.includes('mm')) {
    format = format.replace('mm', padZero(minutes))
  } else {
    seconds += minutes * 60
  }

  if (format.includes('ss')) {
    format = format.replace('ss', padZero(seconds))
  } else {
    milliseconds += seconds * 1000
  }

  if (format.includes('S')) {
    const ms = padZero(milliseconds, 3)

    if (format.includes('SSS')) {
      format = format.replace('SSS', ms)
    } else if (format.includes('SS')) {
      format = format.replace('SS', ms.slice(0, 2))
    } else {
      format = format.replace('S', ms.charAt(0))
    }
  }

  return format
}
