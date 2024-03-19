import React, { ReactNode } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

type numericProp = [number, string]
// type makeNumericProp = <T>(defaultVal: T) => ({
//   type: numericProp,
//   default: typeof defaultVal,
// })

export type StickyProps = {
  zIndex?: numericProp
  position?: 'top' | 'bottom'
  container?: ReactNode
  offsetTop?: number // makeNumericProp(0)
  offsetBottom?: number // makeNumericProp(0)
  children?: ReactNode
} & NativeProps

const classPrefix = `adm-sticky`

const defaultProps = {
  position: 'top',
}

// css sticky 兼容性良好
// https://caniuse.com/?search=sticky
export const Sticky = (p: StickyProps) => {
  const props = mergeProps(defaultProps, p)

  // const offset = useMemo(() =>
  //   unitToPx(props.position === 'top' ? props.offsetTop : props.offsetBottom),
  // );

  return withNativeProps(
    props,
    <>
      <div className={`${classPrefix}`} style={props.style}>
        <div className={`${classPrefix}-content`}>{props.children}</div>
      </div>
    </>
  )
}
