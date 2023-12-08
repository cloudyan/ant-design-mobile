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
import { pxToNumber, toFixed } from './tool'

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
  mode: 'float',
  justify: 'end',
  rows: 1, // 推荐至少两行
  content: '',
  expandText: '...', // 展开
  collapseText: '', // 收起
  stopPropagationForActionButtons: [],
  onContentClick: () => {},
  defaultExpanded: false,
}

// 实现思路
// 利用 float 浮动特性实现

/**
 * Overflow 超出省略，展开更多
 * @description 内容支持富文本、组件等
 */
export const OverflowFloat: FC<OverflowProps> = p => {
  const props = mergeProps(defaultProps, p)
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const expandElRef = useRef<HTMLAnchorElement>(null)
  const collapseElRef = useRef<HTMLAnchorElement>(null)
  const [maxHeight, setMaxHeight] = useState<number>(0)
  const [contentHeight, setContentHeight] = useState<number>(0)

  const [expanded, setExpanded] = useState(props.defaultExpanded) // 是否展开
  // const [exceeded, setExceeded] = useState(false) // 是否超出

  /**
   * 根据指定行数，计算截断后的文本内容（计算省略内容）
   * @return {void} 此函数不返回任何值。
   * @tip 注意：处理边界差 0.x 像素的情况
   * 针对 A 的做处理
   *  展开时 A高度-1，确保 B 高度超出 A，此时 C 展示为收起（在下一行）
   *  收起时 A高度+1，确保 B 高度不超出 A，此时 C 展示为更多（悬浮在文字上）
   * 当 B 高于 A 时，C 会被隐藏（无更多）
   */
  function calcEllipsised() {
    const root = rootRef.current
    if (!root) return
    root.style.display = 'block'
    const originStyle = window.getComputedStyle(root)

    const content = contentRef.current
    if (content) {
      const contentStyle = window.getComputedStyle(content)
      setContentHeight(toFixed(pxToNumber(contentStyle.height)))
    }

    // 根据行数和其他样式属性计算新元素的最大高度
    // 计算规则 行高 * (行数+0.5) + padding-top + padding-bottom
    const lineHeight = pxToNumber(originStyle.lineHeight)
    const calcMaxHeight =
      lineHeight * props.rows +
      pxToNumber(originStyle.paddingTop) +
      pxToNumber(originStyle.paddingBottom)

    setMaxHeight(calcMaxHeight)
  }

  useResizeEffect(calcEllipsised, rootRef)

  // 同步渲染
  useIsomorphicLayoutEffect(() => {
    calcEllipsised()
  }, [props.rows, props.content, props.expandText, props.collapseText])

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
      className={classNames(classPrefix, `${classPrefix}-${props.mode}`)}
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
        className={`${classPrefix}-float-inner`}
        style={{
          height: contentHeight,
          maxHeight: expanded ? 'none' : maxHeight,
        }}
      >
        <div
          role='A'
          className={`${classPrefix}-float-shadow`}
          style={{
            height: expanded ? contentHeight - 1 : contentHeight + 1,
            maxHeight: expanded ? 'none' : maxHeight,
          }}
        ></div>
        <div
          role='B'
          className={`${classPrefix}-float-content`}
          ref={contentRef}
        >
          {props.content}
        </div>
        <div
          role='C'
          className={classNames(`${classPrefix}-float-btns`, {
            [`${classPrefix}-justify-${props.justify}`]: !!props.justify,
          })}
        >
          <div
            className={classNames({
              [`${classPrefix}-float-less`]: expanded,
              [`${classPrefix}-float-more`]: !expanded,
            })}
          >
            {expanded ? collapseActionElement : expandActionElement}
          </div>
        </div>
      </div>
    </div>
  )
}
