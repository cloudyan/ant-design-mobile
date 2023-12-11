// 用于倒计时
import { useUpdate } from 'ahooks'
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'
import { canUseDom } from './can-use-dom'
import { cancelRaf, raf } from './raf'
// import { useLatest } from 'ahooks'

export type CurrentTime = {
  days: number
  hours: number
  total: number
  minutes: number
  seconds: number
  milliseconds: number
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
  return {
    total: time,
    days: Math.floor(time / DAY),
    hours: Math.floor(time / HOUR) % 24,
    minutes: Math.floor(time / MINUTE) % 60,
    seconds: Math.floor(time / SECOND) % 60,
    milliseconds: Math.floor(time) % 1000,
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

export function useCountDown(options: UseCountDownOptions = {}) {
  const getCurrentRemain = () =>
    Math.max(cacheRef.current.endTime - Date.now(), 0)

  const cacheRef = useRef({
    remain: options.time || 0,
    counting: false,
    endTime: Date.now() + (options.time || 0),
    rafId: 0,
    current: parseTime(Number(options.time)),
  })

  const update = useUpdate()

  const updateRemain = (value: number) => {
    const { current } = cacheRef.current
    cacheRef.current.remain = value
    cacheRef.current.current = parseTime(value)
    update()
    options.onChange?.(current)

    if (value <= 0) {
      pause()
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

  const reset = (totalTime = options.time || 0) => {
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
