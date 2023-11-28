import { useInitialized } from './use-initialized'
import type { FC, ReactElement } from 'react'

interface Props {
  active: boolean
  forceRender?: boolean
  destroyOnClose?: boolean
  children: ReactElement
}

/**
 * 根据提供的条件渲染子组件。（使用 useShouldRender 钩子）
 *
 * @component
 * @param {Object} props - 组件的属性。
 * @param {boolean} props.active - 表示组件是否处于活动状态。
 * @param {boolean} props.forceRender - 表示是否强制渲染组件。
 * @param {boolean} props.destroyOnClose - 表示是否在关闭时销毁组件。
 * @returns {React.ReactNode} - 渲染的子组件或 null。
 */
export const ShouldRender: FC<Props> = props => {
  const shouldRender = useShouldRender(
    props.active,
    props.forceRender,
    props.destroyOnClose
  )
  return shouldRender ? props.children : null
}

/**
 * 根据给定条件确定组件是否应该渲染。
 *
 * @param {boolean} active - 表示组件是否处于激活状态。
 * @param {boolean} forceRender - 强制组件渲染。
 * @param {boolean} destroyOnClose - 表示组件在关闭时是否应该被销毁，默认 false
 * @return {boolean} 如果组件应该渲染，则返回true，否则返回false。
 */
export function useShouldRender(
  active: boolean,
  forceRender?: boolean,
  destroyOnClose?: boolean
) {
  const initialized = useInitialized(active)
  if (forceRender) return true
  if (active) return true
  if (!initialized) return false
  return !destroyOnClose
}
