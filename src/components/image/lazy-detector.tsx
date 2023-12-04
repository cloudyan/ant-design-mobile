import { useInViewport } from 'ahooks'
import type { FC } from 'react'
import React, { useEffect, useRef } from 'react'

type Props = {
  onActive: () => void
}

/**
 * lazy 探测
 *
 * @param {Props} props - 组件的 props 参数
 * @returns {JSX.Element} 渲染的组件
 */
export const LazyDetector: FC<Props> = props => {
  // 对 div 元素的引用
  const ref = useRef<HTMLDivElement>(null)

  /**
   * 指示 div 是否在可视区域内的标志
   *
   * @type {boolean}
   */
  const [inViewport] = useInViewport(ref)

  // useEffect 钩子函数来处理可视区域变化
  // 仅处理 inViewport 变为 true 的情况
  useEffect(() => {
    if (inViewport) {
      props.onActive()
    }
  }, [inViewport])

  return <div ref={ref} />
}
