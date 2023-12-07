import { useIsomorphicLayoutEffect } from 'ahooks'
import classNames from 'classnames'
import type { FC, ReactNode } from 'react'
import React, { useRef, useState } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { useResizeEffect } from '../../utils/use-resize-effect'
import { mergeProps } from '../../utils/with-default-props'
import {
  PropagationEvent,
  withStopPropagation,
} from '../../utils/with-stop-propagation'

const classPrefix = `adm-overflow`

export type OverflowProps = {
  content: ReactNode
  justify?: 'end' | 'center'
  rows?: number
  expandText?: ReactNode
  collapseText?: ReactNode
  stopPropagationForActionButtons?: PropagationEvent[]
  onContentClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  defaultExpanded?: boolean
} & NativeProps<
  '--overflow-background' | '--more-background' | '--less-background'
>

const defaultProps = {
  justify: 'end',
  align: 'center',
  rows: 1,
  content: '',
  expandText: '更多', // 展开
  collapseText: '收起', // 收起
  stopPropagationForActionButtons: [],
  onContentClick: () => {},
  defaultExpanded: false,
}

/**
 * 排版超出因此，展开收起（内容不仅仅支持文字，还支持富文本、组件等）
 * 简单模式，纯 css 实现
 * float 模式
 * 加强模式
 */
export const Overflow: FC<OverflowProps> = p => {
  const props = mergeProps(defaultProps, p)
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const expandElRef = useRef<HTMLAnchorElement>(null)
  const collapseElRef = useRef<HTMLAnchorElement>(null)
  const [maxHeight, setMaxHeight] = useState<number>(0)
  const [contentHeight, setContentHeight] = useState<number>()

  const [expanded, setExpanded] = useState(props.defaultExpanded) // 是否展开
  // const [exceeded, setExceeded] = useState(false) // 是否超出

  /**
   * 根据指定行数，计算截断后的文本内容（计算省略内容）
   *
   * @return {void} 此函数不返回任何值。
   */
  function calcEllipsised() {
    const root = rootRef.current
    if (!root) return
    root.style.display = 'block'
    const originStyle = window.getComputedStyle(root)
    if (contentRef.current) {
      const contentStyle = window.getComputedStyle(contentRef.current)
      setContentHeight(Math.floor(pxToNumber(contentStyle.height)))
    }

    // 根据行数和其他样式属性计算新元素的最大高度
    // 计算规则 行高 * (行数+0.5) + padding-top + padding-bottom
    const lineHeight = pxToNumber(originStyle.lineHeight)
    const calcMaxHeight = Math.floor(
      lineHeight * props.rows +
        pxToNumber(originStyle.paddingTop) +
        pxToNumber(originStyle.paddingBottom)
    )
    setMaxHeight(calcMaxHeight)
  }

  useResizeEffect(calcEllipsised, rootRef)

  // 同步渲染
  useIsomorphicLayoutEffect(() => {
    calcEllipsised()
  }, [props.rows])

  // 展开按钮
  const expandActionElement =
    !!props.expandText &&
    withStopPropagation(
      props.stopPropagationForActionButtons,
      <a
        ref={expandElRef}
        onClick={() => {
          setExpanded(true)
        }}
      >
        {props.expandText}
      </a>
    )

  // 收起按钮
  const collapseActionElement =
    !!props.collapseText &&
    withStopPropagation(
      props.stopPropagationForActionButtons,
      <a
        ref={collapseElRef}
        onClick={() => {
          setExpanded(false)
        }}
      >
        {props.collapseText}
      </a>
    )

  return withNativeProps(
    props,
    <div
      ref={rootRef}
      className={classPrefix}
      style={{
        height: expanded ? 'auto' : maxHeight,
      }}
      onClick={e => {
        if (e.target === e.currentTarget) {
          props.onContentClick(e)
        }
      }}
    >
      <div
        className={`${classPrefix}-inner`}
        style={{
          height: contentHeight,
          maxHeight: expanded ? 'none' : maxHeight - 1,
        }}
      >
        <div className={`${classPrefix}-content`} ref={contentRef}>
          {props.content}
        </div>
        <div
          className={classNames(`${classPrefix}-btns`, {
            [`${classPrefix}-justify-${props.justify}`]: !!props.justify,
          })}
        >
          <div
            className={classNames({
              [`${classPrefix}-less`]: expanded,
              [`${classPrefix}-more`]: !expanded,
            })}
          >
            {expanded ? collapseActionElement : expandActionElement}
          </div>
        </div>
      </div>
    </div>
  )
}

function pxToNumber(value: string | null): number {
  if (!value) return 0
  const match = value.match(/^\d*(\.\d*)?/)
  return match ? Number(match[0]) : 0
}
