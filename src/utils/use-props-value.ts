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

  // 此处逻辑解析
  // 这里是把外层 props 传进来的状态同步到内部的状态，举两个例子，来解释一下作用：
  // 1. 一个受控组件，值从 1 变成了 2，触发了 props.onChange(2)，但是 onChange 中，外层组件选择不更新值，依旧让值保持为 1，这种情况下，这个受控的组件应该显示 1 而不是 2
  // 2. 组件一开始是受控状态，然后变为了非受控状态（value 变成了 undefined），这种情况下，组件应该保持原来的值
  if (value !== undefined) {
    console.log('实时更新', value)
    stateRef.current = value
  }

  /**
   * 设置状态的函数
   * @param v - 新的 state 值
   * @param forceTrigger - 是否强制触发 onChange 回调函数
   */
  const setState = useMemoizedFn(
    (v: SetStateAction<T>, forceTrigger: boolean = false) => {
      console.log('设置状态', v, forceTrigger)
      // `forceTrigger` means trigger `onChange` even if `v` is the same as `stateRef.current`
      const nextValue =
        typeof v === 'function'
          ? (v as (prevState: T) => T)(stateRef.current)
          : v
      if (!forceTrigger && nextValue === stateRef.current) {
        console.log('值相同，不更新', forceTrigger, nextValue, stateRef.current)
        return
      }
      stateRef.current = nextValue
      update()
      console.log('更新状态', nextValue)
      return onChange?.(nextValue)
    }
  )
  return [stateRef.current, setState] as const
}
