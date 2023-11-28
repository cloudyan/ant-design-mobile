export type GetContainer = () => HTMLElement

/**
 * 解析容器元素
 * @param getContainer 容器元素或者获取容器元素的函数
 * @returns 解析得到的容器元素，默认为 document.body
 */
export function resolveContainer(
  getContainer: HTMLElement | GetContainer | undefined | null
) {
  const container =
    typeof getContainer === 'function'
      ? (getContainer as GetContainer)()
      : getContainer
  return container || document.body
}
