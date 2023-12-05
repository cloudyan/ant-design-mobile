import { createUpdateEffect, useIsomorphicLayoutEffect } from 'ahooks'

/**
 * 依赖有更新时才触发（初始化时不触发）
 */
export const useIsomorphicUpdateLayoutEffect = createUpdateEffect(
  useIsomorphicLayoutEffect
)
