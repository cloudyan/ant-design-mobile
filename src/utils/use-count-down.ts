// 用于倒计时
import { useUpdate } from 'ahooks'
import dayjs from 'dayjs'
import { useEffect, useRef, useLayoutEffect } from 'react'
import { canUseDom } from './can-use-dom'
import { cancelRaf, raf } from './raf'
// import { useLatest } from 'ahooks'

export type CurrentTime = {
  total: number // 剩余时间总毫秒数
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  fixSeconds: number
}

export type TDate = dayjs.ConfigType
type Numeric = number | string

export type UseCountDownOptions = {
  time?: number
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

function parseTime(time: number): CurrentTime {
  const { DAY, HOUR, MINUTE, SECOND } = TIME_UNITS
  // fixSeconds 让秒数展示在视觉上更符合逻辑
  // 如 倒计时 15 秒
  // 1. 开始时，显示为 15 秒，而不是 14 秒
  // 2. 倒计时结束，刚好显示为 0 秒（不要显示 1 秒或已经显示 0 秒但倒计时还没终止）
  let fixSeconds = (Math.floor((time - 1) / SECOND) % 60) + (time >= 0 ? 1 : 0)
  if (fixSeconds <= 0) {
    fixSeconds = 0
  }
  return {
    total: time,
    days: Math.floor(time / DAY),
    hours: Math.floor(time / HOUR) % 24,
    minutes: Math.floor(time / MINUTE) % 60,
    seconds: Math.floor(time / SECOND) % 60,
    milliseconds: Math.floor(time) % 1000,
    fixSeconds,
  }
}

const calcLeft = (target?: TDate) => {
  if (!target) return 0

  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left = dayjs(target).valueOf() - Date.now()
  return left < 0 ? 0 : left
}

function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}

// 当秒数变为 0 时，毫秒数还没走完
// 期望，当秒数展示为 0 即立即停止
export function useCountDown(options: UseCountDownOptions = {}) {
  const getCurrentRemain = () =>
    Math.max(cacheRef.current.endTime - Date.now(), 0)

  const time = options.time || 0
  const cacheRef = useRef({
    remain: time,
    counting: false,
    endTime: Date.now() + time,
    rafId: 0,
    current: parseTime(Number(time)),
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
      // 将倒计时置为 0
      // cacheRef.current.current = parseTime(0)
      // const { current } = cacheRef.current
      // update()
      // options.onChange?.(current)
      // console.log('current', current)
      options.onFinish?.()
    }
  }
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

  const macroTick = () => {
    cacheRef.current.rafId = raf(() => {
      const { current, remain } = cacheRef.current
      // in case of call reset immediately after finish
      if (current) {
        const remainRemain = getCurrentRemain()

        if (!isSameSecond(remainRemain, remain) || remainRemain === 0) {
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

  const reset = (totalTime = time) => {
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
    current: cacheRef.current.current,
  }
}
