import classNames from 'classnames'
import type { FC, ReactNode } from 'react'
import React, { useState } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { PropagationEvent } from '../../utils/with-stop-propagation'

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
  defaultExpanded?: boolean
} & NativeProps<
  '--overflow-background' | '--more-background' | '--less-background'
>

const defaultProps = {
  mode: 'css',
  justify: 'end',
  rows: 2,
  content: '',
  expandText: '...', // 展开
  collapseText: '', // 收起
  stopPropagationForActionButtons: [],
  onContentClick: () => {},
  defaultExpanded: false,
}

// 实现原理
// 利用 css 属性实现
// 不知道是否溢出，所以无法实现交互

/**
 * css 实现展示更多（暂不支持交互? 无交互怎么看详细内容）
 * @description 内容支持富文本、组件等
 * @example
 *  <Overflow mode='css' content={content} />
 * @description 无交互时，推荐使用内置类样式实现
 * @example
 *  .max-line-1
 *  .max-line-2
 *  .max-line-3
 */
export const OverflowCss: FC<OverflowProps> = p => {
  const props = mergeProps(defaultProps, p)
  const [expanded, setExpanded] = useState(props.defaultExpanded) // 是否展开

  const rootStyle = {
    WebkitLineClamp: expanded ? 'none' : props.rows,
    // other styles
  }

  return withNativeProps(
    props,
    <div
      className={classNames(classPrefix, `${classPrefix}-${props.mode}`)}
      style={rootStyle}
      onClick={e => {
        if (e.target === e.currentTarget) {
          props.onContentClick(e)
        }
      }}
    >
      {props.content}
    </div>
  )
}
