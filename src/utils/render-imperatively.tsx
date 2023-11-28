import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import { renderToBody } from './render-to-body'

type ImperativeProps = {
  visible?: boolean
  onClose?: () => void
  afterClose?: () => void
}

type TargetElement = ReactElement<ImperativeProps>

export type ImperativeHandler = {
  close: () => void
  replace: (element: TargetElement) => void
}

/**
 * 以命令式的方式渲染给定的元素。
 *
 * @param {TargetElement} element - 要渲染的元素。
 * @return {ImperativeHandler} 包含关闭和替换功能的对象。
 */
export function renderImperatively(element: TargetElement) {
  const Wrapper = React.forwardRef<ImperativeHandler>((_, ref) => {
    const [visible, setVisible] = useState(false)
    const closedRef = useRef(false)
    const [elementToRender, setElementToRender] = useState(element)
    const keyRef = useRef(0)

    useEffect(() => {
      if (!closedRef.current) {
        setVisible(true)
      } else {
        afterClose()
      }
    }, [])

    function onClose() {
      closedRef.current = true
      setVisible(false)
      elementToRender.props.onClose?.()
    }
    function afterClose() {
      unmount()
      elementToRender.props.afterClose?.()
    }

    // 选择性地暴露子组件中的一些功能
    useImperativeHandle(ref, () => ({
      close: onClose,
      replace: element => {
        keyRef.current++
        elementToRender.props.afterClose?.()
        setElementToRender(element)
      },
    }))

    // 返回 clone 子元素，并添加了 props: key、visible、onClose、afterClose
    // 关闭当前元素，即 onClose
    return React.cloneElement(elementToRender, {
      ...elementToRender.props,
      key: keyRef.current,
      visible,
      onClose,
      afterClose,
    })
  })

  const wrapperRef = React.createRef<ImperativeHandler>()
  const unmount = renderToBody(<Wrapper ref={wrapperRef} />)

  return {
    // 关闭、卸载组件
    close: async () => {
      if (!wrapperRef.current) {
        // it means the wrapper is not mounted yet, call `unmount` directly
        unmount()
      } else {
        wrapperRef.current?.close()
      }
    },
    replace: element => {
      wrapperRef.current?.replace(element)
    },
  } as ImperativeHandler
}
