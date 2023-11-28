import { useRef } from 'react'

const MIN_DISTANCE = 10

type Direction = '' | 'vertical' | 'horizontal'

// 给定两个移动距离，获取移动方向
function getDirection(x: number, y: number) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal'
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical'
  }
  return ''
}

/**
 * 处理触摸事件
 * @description 获取和记录触摸事件的起始位置和移动距离，以及移动方向
 * @returns 返回触摸事件的处理函数对象
 */
export function useTouch() {
  const startX = useRef(0) // 触摸事件的起始位置的坐标
  const startY = useRef(0)
  const deltaX = useRef(0) // 触摸事件的滑动距离的坐标
  const deltaY = useRef(0)
  const offsetX = useRef(0) // 触摸事件的移动距离的绝对值的坐标
  const offsetY = useRef(0)
  const direction = useRef<Direction>('') // 触摸事件的方向

  const isVertical = () => direction.current === 'vertical' // 垂直方向
  const isHorizontal = () => direction.current === 'horizontal' // 水平方向

  const reset = () => {
    deltaX.current = 0
    deltaY.current = 0
    offsetX.current = 0
    offsetY.current = 0
    direction.current = ''
  }

  const start = ((event: TouchEvent) => {
    reset()
    startX.current = event.touches[0].clientX
    startY.current = event.touches[0].clientY
  }) as EventListener

  const move = ((event: TouchEvent) => {
    const touch = event.touches[0]
    // Fix: Safari back will set clientX to negative number
    deltaX.current = touch.clientX < 0 ? 0 : touch.clientX - startX.current
    deltaY.current = touch.clientY - startY.current
    offsetX.current = Math.abs(deltaX.current)
    offsetY.current = Math.abs(deltaY.current)

    if (!direction.current) {
      direction.current = getDirection(offsetX.current, offsetY.current)
    }
  }) as EventListener

  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
  }
}
