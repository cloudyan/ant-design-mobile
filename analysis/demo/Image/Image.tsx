import {
  useIsomorphicLayoutEffect,
  useMemoizedFn,
  useUnmount,
  useUpdateEffect,
} from 'ahooks'
import 'intersection-observer'
import React, {
  ForwardedRef,
  ImgHTMLAttributes,
  Ref,
  forwardRef,
  useRef,
  useState,
} from 'react'
import { canUseDom } from '../../../src/utils/can-use-dom'

// 判断是否支持原生懒加载
const supportNativeLazyLoading = 'loading' in HTMLImageElement.prototype

// 为了支持服务端渲染，根据执行环境不同而赋值的别名
// 浏览器环境中使用 `useLayoutEffect`，服务端环境中使用 `useEffect`
// const useIsomorphicLayoutEffect = canUseDom ? useLayoutEffect : useEffect

// 更新，忽略首次运行
// function useUpdate(effect: EffectCallback, deps?: DependencyList) {
//   const mountedRef = useRef(false)

//   useEffect(() => {
//     if (mountedRef.current) {
//       return effect()
//     } else {
//       mountedRef.current = true
//     }
//   }, deps)
// }

// 卸载
// function useUnmount(effect: () => void) {
//   const effectRef = useRef(effect)
//   effectRef.current = effect

//   useEffect(() => {
//     return () => {
//       effectRef.current()
//     }
//   }, [])
// }

// 持久化回调函数。通过 `useMemoizedFn` 包装后返回的回调函数，其地址不会变，但执行的函数还是最新的
// ahooks 中 usePersistFn 后改为 useMemoizedFn
// function usePersist<T extends (...args: any[]) => any>(callback: T): T {
//   const persistRef = useRef<T>()
//   const callbackRef = useRef(callback)
//   callbackRef.current = callback

//   if (persistRef.current === undefined) {
//     persistRef.current = function (this: any, ...args) {
//       return callbackRef.current.apply(this, args)
//     } as T
//   }

//   return persistRef.current
// }

// 合并 Ref
function useMergedRef<T>(...refs: (ForwardedRef<T> | undefined)[]): Ref<T> {
  return (instance: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(instance)
      } else if (ref && 'current' in ref) {
        ref.current = instance
      }
    })
  }
}

// 组件属性
export interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'children'> {
  fallback?: string
  placeholder?: string
}

// 组件状态
interface ImageState {
  alt?: string
  src?: string
  srcSet?: string
  visibility?: 'hidden'
}

const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const {
    // children,
    style,
    alt: altProp,
    src: srcProp,
    srcSet: srcSetProp,
    loading,

    // 下面四个属性会影响图片的加载和解析，预加载图片时会用到
    sizes,
    decoding,
    crossOrigin,
    referrerPolicy,

    fallback,
    placeholder,
    onError,
    ...rest
  } = props

  // 判断是否使用懒加载
  const lazy = loading === 'lazy'
  // 判断是否使用原生懒加载。有占位图片时，需要触发预加载动作，所以不能使用原生懒加载
  const useNativeLazyLoading = lazy && supportNativeLazyLoading && !placeholder
  // 判断是否使用自定义懒加载
  const useCustomLazyLoading = lazy && canUseDom && !useNativeLazyLoading
  // 判断是否有图片源，即是否有 `src` 和 `srcSet` 属性
  const hasSource = !!srcProp || !!srcSetProp

  const [state, setState] = useState<ImageState>(() => {
    let alt: string | undefined
    let src: string | undefined
    let srcSet: string | undefined
    let visibility: 'hidden' | undefined

    // 使用自定义懒加载，隐藏图片的边框
    if (useCustomLazyLoading) {
      visibility = 'hidden'
    } else {
      alt = altProp

      // 优先使用占位图片
      if (placeholder) {
        src = placeholder

        // 次而使用真实图片源
      } else if (hasSource) {
        src = srcProp
        srcSet = srcSetProp

        // 最后使用回退图片
      } else if (fallback) {
        src = fallback
      }
    }

    return { alt, src, srcSet, visibility }
  })
  const { alt, src, srcSet, visibility } = state

  // 监听 `<img>` 元素的错误，使用回退图片
  function handleError(event: any) {
    if (fallback && src !== fallback) {
      setState({ alt: altProp, src: fallback })
    }
    if (typeof onError === 'function') {
      onError(event)
    }
  }

  // `<img>` 元素的 ref，在相交监听时作为 target
  const imageRef = useRef<HTMLImageElement>(null)
  // 合并 `imageRef` 和转发的 ref
  const mergedRef = useMergedRef(imageRef, ref)
  // 预加载图片实例的 ref
  const preloadRef = useRef<HTMLImageElement>()
  // 相交监听器 ref
  const observerRef = useRef<IntersectionObserver>()

  // 清理图片预加载
  const clearPreload = useMemoizedFn(() => {
    if (preloadRef.current) {
      // 将 `src` 和 `srcset` 设置为空字符串，可以告知浏览器停止加载图片
      preloadRef.current.src = ''
      preloadRef.current.srcset = ''
      // 防止意外更新组件的状态
      preloadRef.current.onload = null
      // 删除实例
      preloadRef.current = undefined
    }
  })

  // 清理监听器
  const clearObserver = useMemoizedFn(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = undefined
    }
  })

  // 图片预加载。如果图片已经缓存则立即更新组件状态并返回 true，否则监听 `load` 事件返回 false
  // 如果此函数返回了 true，就没有必要设置占位图片了
  const preloadSource = useMemoizedFn(() => {
    // 清理上一次图片预加载
    clearPreload()

    if (canUseDom && hasSource) {
      preloadRef.current = new window.Image()

      // 下面四个属性会影响图片的加载和解析
      if (sizes !== undefined) {
        preloadRef.current.sizes = sizes
      }
      if (decoding !== undefined) {
        preloadRef.current.decoding = decoding
      }
      if (crossOrigin !== undefined) {
        preloadRef.current.crossOrigin = crossOrigin
      }
      if (referrerPolicy !== undefined) {
        preloadRef.current.referrerPolicy = referrerPolicy
      }

      // 设置图片源
      if (srcProp) {
        preloadRef.current.src = srcProp
      }
      if (srcSetProp) {
        preloadRef.current.srcset = srcSetProp
      }

      // 如果图片已经缓存，则直接更新状态
      if (preloadRef.current.complete) {
        setState({ alt: altProp, src: srcProp, srcSet: srcSetProp })
        return true

        // 否则监听 `load` 事件
      } else {
        preloadRef.current.onload = () => {
          clearPreload()
          setState({ alt: altProp, src: srcProp, srcSet: srcSetProp })
        }
      }
    } else {
      setState({ alt: altProp, src: srcProp, srcSet: srcSetProp })
      return true
    }
    return false
  })

  const updateSource = useMemoizedFn(() => {
    // 清理之前的图片预加载
    clearPreload()

    if (placeholder) {
      // 如果图片未缓存，才设置占位图片
      if (!hasSource || !preloadSource()) {
        setState({ alt: altProp, src: placeholder })
      }
    } else if (hasSource) {
      setState({ alt: altProp, src: srcProp, srcSet: srcSetProp })
    } else if (fallback) {
      setState({ alt: altProp, src: fallback })
    }
  })

  // 监听回调
  const handleIntersect = useMemoizedFn(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries && entries[0]
      if (entry && entry.isIntersecting) {
        if (observerRef.current) {
          observerRef.current.disconnect() // 相交事件触发后停止监听
        }
        updateSource()
      }
    }
  )

  // 只有在自定义懒加载时才开启相交监听
  if (!observerRef.current && useCustomLazyLoading) {
    observerRef.current = new IntersectionObserver(handleIntersect)
  }

  // 挂载
  useIsomorphicLayoutEffect(() => {
    // 如果使用懒加载，则监听相交事件
    if (useCustomLazyLoading && imageRef.current && observerRef.current) {
      observerRef.current.observe(imageRef.current)

      // 如果当前使用占位图片，立即执行图片预加载
    } else if (src === placeholder && hasSource) {
      preloadSource()
    }
  }, [])

  // 自定义懒加载的标志变化后，重新实例化相交监听器
  useUpdateEffect(() => {
    clearObserver()
    if (useCustomLazyLoading) {
      observerRef.current = new IntersectionObserver(handleIntersect)
    }
  }, [useCustomLazyLoading])

  // 图片资源更新后，根据条件判断是执行相交监听，还是直接执行更新逻辑
  useUpdateEffect(() => {
    if (useCustomLazyLoading && imageRef.current && observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current.observe(imageRef.current)
    } else {
      updateSource()
    }
  }, [srcProp, srcSetProp, fallback, placeholder, useCustomLazyLoading])

  // 卸载
  useUnmount(() => {
    clearPreload()
    clearObserver()
  })

  return (
    <img
      {...rest}
      key={fallback}
      ref={mergedRef}
      style={{ visibility, ...style }}
      alt={alt}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      decoding={decoding}
      crossOrigin={crossOrigin}
      referrerPolicy={referrerPolicy}
      loading={lazy ? (useNativeLazyLoading ? 'lazy' : undefined) : loading}
      onError={handleError}
    />
  )
})

export default Image
