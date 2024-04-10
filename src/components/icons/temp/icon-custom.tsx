import React from 'react'
import type { FC, ReactNode } from 'react'
import { NativeProps, withNativeProps } from '../../../utils/native-props'

const classPrefix = 'adm-icon-custom'

export type IconCustomProps = { children?: ReactNode } & NativeProps

const defaultProps = {}

export interface IconCustomRef {
  // start: () => void
  // pause: () => void
  // reset: () => void
}

export const IconCustom: FC<IconCustomProps> = props =>
  withNativeProps(
    props,
    <div className={classPrefix}>
      <div className={`${classPrefix}-content`}>{props.children}</div>
    </div>
  )