import type { ReactElement } from 'react'
import { render, unmount as reactUnmount } from './render'

/**
 * 将 React 元素渲染到 body 中
 * @param element 要渲染的 React 元素
 * @returns 一个函数，用于卸载 React 元素
 */
export function renderToBody(element: ReactElement) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  function unmount() {
    const unmountResult = reactUnmount(container)
    if (unmountResult && container.parentNode) {
      container.parentNode.removeChild(container)
    }
  }
  render(element, container)
  return unmount
}
