import { useRef } from 'react'

/**
 * 判断是否初始化完成
 * @param check - 初始化状态
 * @returns 初始化完成返回true，否则返回false
 */
export function useInitialized(check?: boolean) {
  const initializedRef = useRef(check)
  if (check) {
    initializedRef.current = true
  }
  return !!initializedRef.current
}
