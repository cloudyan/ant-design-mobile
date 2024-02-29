import React from 'react'
import type { FC, ReactNode } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = 'adm-x-component'

export type XComponentProps = { children?: ReactNode } & NativeProps

const defaultProps = {}

export interface XComponentRef {
  // start: () => void
  // pause: () => void
  // reset: () => void
}

export const XComponent: FC<XComponentProps> = p => {
  const props = mergeProps(defaultProps, p)

  return withNativeProps(
    props,
    <div className={classPrefix}>
      <div className={`${classPrefix}-content`}>{props.children}</div>
    </div>
  )
}
