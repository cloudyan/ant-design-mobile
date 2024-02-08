import React from 'react'
import type { FC, ReactNode } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = 'adm-x-component'

export type XComponentProps = { children?: ReactNode } & NativeProps

const defaultProps = {}

export interface XComponentRef {
  // start: () => void
  // pause: () => void
  // reset: () => void
}

export const XComponent: FC<XComponentProps> = props =>
  withNativeProps(
    props,
    <div className={classPrefix}>
      <div className={`${classPrefix}-content`}>{props.children}</div>
    </div>
  )
