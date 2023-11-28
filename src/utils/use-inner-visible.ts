import { useState } from 'react'
import { useIsomorphicLayoutEffect } from 'ahooks'

/**
 * 管理内部元素的可见性状态的 Hook，基于外部可见性状态。
 *
 * @param {boolean} outerVisible - 外部元素的可见性状态。
 * @return {boolean} 内部元素的可见性状态。
 */
export function useInnerVisible(outerVisible: boolean) {
  const [innerVisible, setInnerVisible] = useState(outerVisible)

  // 在 SSR 模式下使用 useLayoutEffect 会有警告，可使用 useIsomorphicLayoutEffect 避免
  // 本质：在非浏览器环境返回 useEffect，在浏览器环境返回 useLayoutEffect
  useIsomorphicLayoutEffect(() => {
    setInnerVisible(outerVisible)
  }, [outerVisible])

  return innerVisible
}
