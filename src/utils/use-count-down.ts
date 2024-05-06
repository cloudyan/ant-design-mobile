// 用于倒计时
import { useUpdate } from 'ahooks'
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'
import { canUseDom } from './can-use-dom'
import { cancelRaf, raf } from './raf'

export type CurrentTime = {
  leftTime: number // 剩余时间总毫秒数
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  fixSeconds: number
}

export type TDate = dayjs.ConfigType
// type Numeric = number | string

export type UseCountDownOptions = {
  leftTime?: number
  targetDate?: TDate
  millisecond?: boolean
  interval?: number
  autoStart?: boolean
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}

const TIME_UNITS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
}

function parseTime(leftTime: number): CurrentTime {
  const { DAY, HOUR, MINUTE, SECOND } = TIME_UNITS
  // fixSeconds 让秒数展示在视觉上更符合逻辑
  // 如 倒计时 15 秒
  // 1. 开始时，显示为 15 秒，而不是 14 秒
  // 2. 倒计时结束，刚好显示为 0 秒（不要显示 1 秒或已经显示 0 秒但倒计时还没终止）
  let fixSeconds =
    (Math.floor((leftTime - 1) / SECOND) % 60) + (leftTime >= 0 ? 1 : 0)
  if (fixSeconds <= 0) {
    fixSeconds = 0
  }
  return {
    leftTime,
    days: Math.floor(leftTime / DAY),
    hours: Math.floor(leftTime / HOUR) % 24,
    minutes: Math.floor(leftTime / MINUTE) % 60,
    seconds: Math.floor(leftTime / SECOND) % 60,
    milliseconds: Math.floor(leftTime) % 1000,
    fixSeconds,
  }
}

// const calcLeft = (target?: TDate) => {
//   if (!target) return 0

//   // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
//   const left = dayjs(target).valueOf() - Date.now()
//   return left < 0 ? 0 : left
// }

function isSameSecond(time1: number, time2: number, interval = 1000): boolean {
  return Math.floor(time1 / interval) === Math.floor(time2 / interval)
}

// TODO: 当秒数变为 0 时，毫秒数还没走完
// Fixed: 当秒数视觉展示为 0 刚好表现为倒计时终止
export function useCountDown(options: UseCountDownOptions = {}) {
  const getCurrentRemain = () =>
    Math.max(cacheRef.current.endTime - Date.now(), 0)
  const { leftTime = 0, interval = 1000 } = options
  const cacheRef = useRef({
    remain: leftTime,
    counting: false,
    endTime: Date.now() + leftTime,
    rafId: 0,
    current: parseTime(Number(leftTime)),
  })

  const update = useUpdate()

  const updateRemain = (value: number) => {
    cacheRef.current.remain = value
    // 当前时间
    cacheRef.current.current = parseTime(value)
    const { current } = cacheRef.current
    update()
    options.onChange?.(current)

    if (value <= 0) {
      pause()
      options.onFinish?.()
    }
  }

  // 毫秒级更新
  const microTick = () => {
    cacheRef.current.rafId = raf(() => {
      const { counting } = cacheRef.current
      // in case of call reset immediately after finish
      if (counting) {
        updateRemain(getCurrentRemain())

        if (cacheRef.current.remain > 0) {
          microTick()
        }
      }
    })
  }

  // 秒级以上更新
  const macroTick = () => {
    cacheRef.current.rafId = raf(() => {
      const { current, remain } = cacheRef.current
      // in case of call reset immediately after finish
      if (current) {
        const remainRemain = getCurrentRemain()

        if (
          !isSameSecond(remainRemain, remain, interval) ||
          remainRemain === 0
        ) {
          updateRemain(remainRemain)
        }

        if (cacheRef.current.remain > 0) {
          macroTick()
        }
      }
    })
  }

  const tick = () => {
    // should not start counting in server
    if (!canUseDom) return

    if (options.millisecond) {
      microTick()
    } else {
      macroTick()
    }
  }

  const start = () => {
    const { counting, remain } = cacheRef.current
    if (!counting) {
      cacheRef.current.counting = true
      cacheRef.current.endTime = Date.now() + remain
      tick()
    }
  }

  const pause = () => {
    cacheRef.current.counting = false
    cancelRaf(cacheRef.current.rafId)
  }

  const reset = (totalTime = leftTime) => {
    updateRemain(totalTime)
    pause()
    update()
  }

  useEffect(() => {
    if (options.autoStart) {
      start()
    }
    return () => {
      pause()
    }
  }, [])

  return {
    start,
    pause,
    reset,
    cancel: pause,
    current: cacheRef.current.current,
  }
}
