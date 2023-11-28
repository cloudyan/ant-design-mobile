import React from 'react'
import { InternalToast, ToastProps } from './toast'
import { mergeProps } from '../../utils/with-default-props'
import {
  ImperativeHandler,
  renderImperatively,
} from '../../utils/render-imperatively'

let currentHandler: ImperativeHandler | null = null
let currentTimeout: number | null = null

export type ToastShowProps = Omit<ToastProps, 'visible'>

const defaultProps = {
  duration: 2000,
  position: 'center',
  maskClickable: true,
}

export type ToastHandler = {
  close: () => void
}

const ToastInner = (
  props: ToastShowProps & {
    onClose?: () => void
  }
) => <InternalToast {...props} />

export function show(p: ToastShowProps | string) {
  const props = mergeProps(
    defaultProps,
    typeof p === 'string' ? { content: p } : p
  )

  const element = (
    <ToastInner
      {...props}
      onClose={() => {
        currentHandler = null
      }}
    />
  )
  if (currentHandler) {
    currentHandler.replace(element)
  } else {
    currentHandler = renderImperatively(element)
  }

  if (currentTimeout) {
    window.clearTimeout(currentTimeout)
  }
  if (props.duration !== 0) {
    currentTimeout = window.setTimeout(() => {
      clear()
    }, props.duration)
  }

  return currentHandler as ToastHandler
}

/**
 * 清除当前的处理程序。
 *
 * @param {void} - 此函数不接受任何参数。
 * @return {void} - 此函数不返回任何值。
 */
export function clear() {
  currentHandler?.close()
  currentHandler = null
}

export function config(
  val: Pick<ToastProps, 'duration' | 'position' | 'maskClickable'>
) {
  if (val.duration !== undefined) {
    defaultProps.duration = val.duration
  }
  if (val.position !== undefined) {
    defaultProps.position = val.position
  }
  if (val.maskClickable !== undefined) {
    defaultProps.maskClickable = val.maskClickable
  }
}
