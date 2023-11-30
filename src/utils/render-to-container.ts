import { createPortal } from 'react-dom'
import type { ReactElement, ReactPortal } from 'react'
import { resolveContainer } from './get-container'
import { canUseDom } from './can-use-dom'

export type GetContainer = HTMLElement | (() => HTMLElement) | null

/**
 * 将 React元素渲染到指定的容器中
 *
 * @param getContainer - 获取容器的函数
 * @param node - 要渲染的React元素
 * @returns 有 getContainer，则返回渲染到容器中的React Portal对象；否则返回原始的React元素
 */
export function renderToContainer(
  getContainer: GetContainer,
  node: ReactElement
) {
  // getContainer 可不配置
  // 想渲染到 body 上怎么配置？ 就需要配置为 () => document.body
  if (canUseDom && getContainer) {
    const container = resolveContainer(getContainer)
    return createPortal(node, container) as ReactPortal
  }
  return node
}
