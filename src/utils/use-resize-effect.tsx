import { RefObject } from 'react'
import { useIsomorphicLayoutEffect, useMemoizedFn } from 'ahooks'

/**
 * 为目标元素添加一个调整大小效果的 Hook。
 *
 * @param {Function} effect - 当目标元素调整大小时要执行的效果函数。
 * @param {RefObject<T>} targetRef - 目标元素的引用。
 * @return {void}
 */

export function useResizeEffect<T extends HTMLElement>(
  effect: (target: T) => void,
  targetRef: RefObject<T>
) {
  const fn = useMemoizedFn(effect)

  useIsomorphicLayoutEffect(() => {
    const target = targetRef.current
    if (!target) return
    if (window.ResizeObserver) {
      let animationFrame: number

      // 观察目标元素的大小调整事件
      const observer = new ResizeObserver(() => {
        animationFrame = window.requestAnimationFrame(() => fn(target))
      })
      observer.observe(target)

      // 组件卸载则清除回调，避免内存泄露
      return () => {
        window.cancelAnimationFrame(animationFrame)
        observer.disconnect()
      }
    } else {
      fn(target)
    }
  }, [targetRef])
}
