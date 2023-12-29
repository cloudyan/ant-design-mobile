import React from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

export type StickyProps = {
  position?: 'top' | 'bottom'
  offsetTop?: number
  offsetBottom?: number
  children?: React.ReactNode
} & NativeProps

const classPrefix = `adm-sticky`

const defaultProps = {
  position: 'top',
}

// css sticky 兼容性良好
// https://caniuse.com/?search=sticky
export const Sticky = (p: StickyProps) => {
  const props = mergeProps(defaultProps, p)

  return withNativeProps(
    props,
    <>
      <div className={`${classPrefix}`}>
        <div className={`${classPrefix}-content`}>{props.children}</div>
      </div>
    </>
  )
}
