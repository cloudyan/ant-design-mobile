import React from 'react'
import type { FC, ReactNode } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = 'adm-icon'

export type IconBaseProps = { children?: ReactNode } & NativeProps

const defaultProps = {}

export interface IconBaseRef {
  // start: () => void
  // pause: () => void
  // reset: () => void
}

export const IconBase: FC<IconBaseProps> = props =>
  withNativeProps(
    props,
    <div className={classPrefix}>
      <div className={`${classPrefix}-content`}>{props.children}</div>
    </div>
  )
