// import { useCountDown } from 'ahooks'
import type { FC } from 'react'
import React from 'react'
import { NativeProps } from '../../utils/native-props'
import { useCountDown } from '../../utils/use-count-down'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `adm-count-down`

export type CountDownProps = {
  time: number | string
  format?: string
  millisecond?: boolean
  autoStart?: boolean
  onTick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onChange?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onFinish?: () => void
} & NativeProps<
  '--overflow-background' | '--more-background' | '--less-background'
>

const defaultProps = {
  time: 0,
  format: 'HH:mm:ss',
}

/**
 * CountDown 倒计时
 * @description
 */
export const CountDown: FC<CountDownProps> = p => {
  const props = mergeProps(defaultProps, p)

  const { current, start, pause, reset } = useCountDown({
    time: props.time,
    millisecond: props.millisecond,
    // targetDate: `${new Date().getFullYear()}-12-31 23:59:59`,
  })

  const { days, hours, minutes, seconds, milliseconds } = current

  return (
    <>
      <div>
        {days} 天 {hours} 时 {minutes} 分 {seconds} 秒 {milliseconds}
      </div>
    </>
  )
}
