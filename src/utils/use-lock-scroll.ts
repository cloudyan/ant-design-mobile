import { useTouch } from './use-touch'
import { useEffect, RefObject } from 'react'
import { getScrollParent } from './get-scroll-parent'
import { supportsPassive } from './supports-passive'

let totalLockCount = 0

const BODY_LOCK_CLASS = 'adm-overflow-hidden'

// TIP: css 解决滚动穿透
// 不能使用 `pointer - events: none`，这样弹出层也没事件了
// `overscroll-behavior-y: contain` 滚动到边界时，临近的滚动区域不会被滚动链影响
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/overscroll-behavior#contain
// 兼容性有问题：iOS 16+, Android 5+

/**
 * 获取可滚动的元素
 * @param el - 给定的元素或其父元素
 * @returns 可滚动的元素或null
 */
function getScrollableElement(el: HTMLElement | null) {
  let current = el?.parentElement

  // clientHeight 是一个元素可见内容的高度，不包括边框和滚动条
  // scrollHeight 是一个元素总的高度，包括内容、边框、滚动条和内边距。
  while (current) {
    if (current.clientHeight < current.scrollHeight) {
      // 判断有滚动条
      return current
    }

    current = current.parentElement
  }

  return null
}

// 移植自 vant：https://github.com/youzan/vant/blob/HEAD/src/composables/use-lock-scroll.ts
/**
 * 使用 useLockScroll 函数来锁定或解锁滚动
 * @param rootRef 引用 HTMLElement 的 RefObject
 * @param shouldLock 是否锁定滚动，可以是一个布尔值或字符串'strict'
 */
export function useLockScroll(
  rootRef: RefObject<HTMLElement>,
  shouldLock: boolean | 'strict'
) {
  const touch = useTouch()

  const onTouchMove = (event: TouchEvent) => {
    touch.move(event)

    // 移动方向 10：向下滚动，01：向上滚动
    const direction = touch.deltaY.current > 0 ? '10' : '01'
    const el = getScrollParent(
      event.target as Element,
      rootRef.current
    ) as HTMLElement
    if (!el) return

    // This has perf cost but we have to compatible with iOS 12
    // 如果 shouldLock 为 'strict'，则检查事件的滚动父元素是否允许滚动
    if (shouldLock === 'strict') {
      const scrollableParent = getScrollableElement(event.target as HTMLElement)
      if (
        scrollableParent === document.body ||
        scrollableParent === document.documentElement
      ) {
        event.preventDefault()
        return
      }
    }

    // 获取滚动高度、元素高度和滚动位置等信息
    const { scrollHeight, offsetHeight, scrollTop } = el
    const { height } = el.getBoundingClientRect()
    let status = '11'

    // 根据滚动位置和元素高度判断是否需要锁定滚动
    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01'
    } else if (scrollHeight <= Math.round(height + scrollTop)) {
      status = '10'
    }

    // 如果需要解锁并且触摸是垂直的并且移动方向与状态不匹配，则阻止默认行为
    if (
      status !== '11' &&
      touch.isVertical() &&
      !(parseInt(status, 2) & parseInt(direction, 2))
    ) {
      if (event.cancelable && supportsPassive) {
        // https://github.com/ant-design/ant-design-mobile/issues/6282
        event.preventDefault()
      }
    }
  }

  // 锁定滚动
  const lock = () => {
    document.addEventListener('touchstart', touch.start)
    document.addEventListener(
      'touchmove',
      onTouchMove,
      supportsPassive ? { passive: false } : false
    )

    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS)
    }

    totalLockCount++
  }

  // 解锁滚动
  const unlock = () => {
    if (totalLockCount) {
      document.removeEventListener('touchstart', touch.start)
      document.removeEventListener('touchmove', onTouchMove)

      totalLockCount--

      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS)
      }
    }
  }

  // 在 shouldLock 为真时使用 useEffect 钩子函数来锁定和解锁滚动
  useEffect(() => {
    if (shouldLock) {
      lock()
      return () => {
        unlock()
      }
    }
  }, [shouldLock])
}
