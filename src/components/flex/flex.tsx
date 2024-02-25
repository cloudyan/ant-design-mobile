import React from 'react'
import type { FC, ReactNode } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = 'adm-flex'

export type FlexProps = { children?: ReactNode } & NativeProps

const defaultProps = {}

export interface FlexRef {
  // start: () => void
  // pause: () => void
  // reset: () => void
}

export const Flex: FC<FlexProps> = props =>
  withNativeProps(
    props,
    <div className={classPrefix}>
      <div className={`${classPrefix}-content`}>{props.children}</div>
    </div>
  )
