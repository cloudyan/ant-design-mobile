import type { FC, ReactNode } from 'react'
import React from 'react'
import { NativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { PropagationEvent } from '../../utils/with-stop-propagation'

import { OverflowCss } from './css'
import { OverflowFloat } from './float'
import { OverflowViewport } from './viewport'

const classPrefix = `adm-overflow`

export type OverflowProps = {
  mode?: 'css' | 'float' | 'viewport'
  rows?: number
  content: ReactNode
  justify?: 'end' | 'center'
  expandText?: ReactNode
  collapseText?: ReactNode
  stopPropagationForActionButtons?: PropagationEvent[]
  onContentClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onExpandClick?: (bool: boolean) => void
  defaultExpanded?: boolean
} & NativeProps<
  '--overflow-background' | '--more-background' | '--less-background'
>

const defaultProps = {
  mode: 'viewport',
  justify: 'end',
  rows: 1,
  content: '',
  expandText: '...', // 展开
  collapseText: '', // 收起
  stopPropagationForActionButtons: [],
  onContentClick: () => {},
  onExpandClick: () => {},
  defaultExpanded: false,
}

/**
 * Overflow 超出省略，展开更多
 * @description 内容支持富文本、组件等
 */
export const Overflow: FC<OverflowProps> = p => {
  const { mode, ...props } = mergeProps(defaultProps, p)

  switch (mode) {
    case 'viewport':
      return <OverflowViewport {...props} />
    case 'float':
      return <OverflowFloat {...props} />
    case 'css':
      return <OverflowCss {...props} />
  }
}
