import type { ReactNode } from 'react'

type Regulated<T> = T extends null | undefined | false ? never : T

/**
 * Check if the `node` is visible Node (not null, undefined, or false)
 * 判断给定的节点是否为带有内容的 ReactNode。
 *
 * @param {ReactNode} node - 要检查的节点。
 * @return {boolean} 如果节点是带有内容的 ReactNode，则返回 true，否则返回 false。
 */
export function isNodeWithContent(
  node: ReactNode
): node is Regulated<ReactNode> {
  return ![undefined, null, false].includes(node as any)
  // return node !== undefined && node !== null && node !== false
}
