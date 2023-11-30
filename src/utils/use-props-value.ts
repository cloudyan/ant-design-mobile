import { SetStateAction, useRef } from 'react'
import { useMemoizedFn, useUpdate } from 'ahooks'

type Options<T> = {
  value?: T
  defaultValue: T
  onChange?: (v: T) => void
}

/**
 * 生成一个值和一个设置函数来管理状态。
 * @description 支持能够切换受控和非受控模式。
 * 提炼过程，参见 [React 组件的受控与非受控](https://www.yuque.com/awmleer/rocket/xmx2gb)
 * @template T - 状态值的类型
 * @param {Options<T>} options - 选项对象
 * @param {T} options.value - 当前状态值
 * @param {T} options.defaultValue - 默认状态值
 * @param {(value: T) => void} options.onChange - 状态值变化时调用的回调函数
 * @returns {[T, (v: SetStateAction<T>, forceTrigger?: boolean) => ReturnType<(value: T) => void> | undefined]} - 包含当前状态值和用于更新状态值的设置函数的元组
 */
export function usePropsValue<T>(options: Options<T>) {
  const { value, defaultValue, onChange } = options

  const update = useUpdate()

  const stateRef = useRef<T>(value !== undefined ? value : defaultValue)
  if (value !== undefined) {
    stateRef.current = value
  }

  /**
   * 设置状态的函数
   * @param v - 新的 state 值
   * @param forceTrigger - 是否强制触发 onChange 回调函数
   */
  const setState = useMemoizedFn(
    (v: SetStateAction<T>, forceTrigger: boolean = false) => {
      // `forceTrigger` means trigger `onChange` even if `v` is the same as `stateRef.current`
      const nextValue =
        typeof v === 'function'
          ? (v as (prevState: T) => T)(stateRef.current)
          : v
      if (!forceTrigger && nextValue === stateRef.current) return
      stateRef.current = nextValue
      update()
      return onChange?.(nextValue)
    }
  )
  return [stateRef.current, setState] as const
}
