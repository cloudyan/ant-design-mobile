import React from 'react'
import type { ReactElement } from 'react'
export type PropagationEvent = 'click' | 'touchstart'

const eventToPropRecord: Record<PropagationEvent, string> = {
  'click': 'onClick',
  'touchstart': 'onTouchStart',
}

/**
 * 生成一个新的 React 元素，其中的事件处理程序调用 stopPropagation() 来阻止事件冒泡。
 *
 * @param {PropagationEvent[]} events - 要处理并阻止冒泡的事件类型的数组。如 ['click']
 * @param {ReactElement} element - 要克隆并添加事件处理程序的 React 元素。
 * @return {ReactElement} 带有调用 stopPropagation() 的事件处理程序的新的 React 元素。
 */
export function withStopPropagation(
  events: PropagationEvent[],
  element: ReactElement
) {
  const props: Record<string, any> = { ...element.props }
  for (const key of events) {
    const prop = eventToPropRecord[key]
    props[prop] = function (e: Event) {
      e.stopPropagation()
      element.props[prop]?.(e)
    }
  }
  return React.cloneElement(element, props)
}
