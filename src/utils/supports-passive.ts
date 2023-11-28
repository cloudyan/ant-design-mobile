import { canUseDom } from './can-use-dom'

export let supportsPassive = false

// 浏览器是否支持使用 passive 属性的事件监听器
// 在移动设备上，使用 passive 属性可以提高触摸事件的性能，
// 因为它们可以防止浏览器在处理这些事件时触发默认的触摸事件 .preventDefault()。
if (canUseDom) {
  try {
    const opts = {}
    Object.defineProperty(opts, 'passive', {
      get() {
        supportsPassive = true
      },
    })
    window.addEventListener('test-passive', null as any, opts)
  } catch (e) {}
}
