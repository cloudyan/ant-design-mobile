import { useInViewport, useIsomorphicLayoutEffect } from 'ahooks'
import classNames from 'classnames'
import type { FC, ReactNode } from 'react'
import React, { useRef, useState } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import {
  PropagationEvent,
  withStopPropagation,
} from '../../utils/with-stop-propagation'
import { pxToNumber } from './tool'

const classPrefix = `adm-overflow`

export type OverflowViewportProps = {
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
  justify: 'end',
  rows: 1, // 推荐至少两行
  content: '',
  expandText: '...', // 展开
  collapseText: '', // 收起
  stopPropagationForActionButtons: [],
  onContentClick: () => {},
  onExpandClick: () => {},
  defaultExpanded: false,
}

// 实现思路
// 使用 observer 元素是否显示在视图中 inViewport，来判断内容是否超出
// 非展开状态时：如果超出，则显示更多；未超出则不显示更多
// 展开状态时：有配置收起，则显示收起

// 问题：如果内容是个 block，监听元素则被换行了
// 解决方案：使用定位解决

/**
 * Overflow 超出省略，展开更多
 * @description 内容支持富文本、组件等
 */
export const OverflowViewport: FC<OverflowViewportProps> = p => {
  const props = mergeProps(defaultProps, p)
  const rootRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const expandElRef = useRef<HTMLAnchorElement>(null)
  const collapseElRef = useRef<HTMLAnchorElement>(null)
  const [maxHeight, setMaxHeight] = useState<number>(0)
  // const [contentHeight, setContentHeight] = useState<number>(0)

  const ovserverRef = useRef(null)
  const [inViewport] = useInViewport(ovserverRef) // 是否超出

  const [expanded, setExpanded] = useState(props.defaultExpanded) // 是否展开

  // 根据行数动态计算出最大高度，而不是通过用户设置
  function calcEllipsised() {
    const root = rootRef.current
    if (!root) return
    root.style.display = 'block'
    const originStyle = window.getComputedStyle(root)

    // 根据行数和其他样式属性计算新元素的最大高度
    // 计算规则 行高 * (行数+0.5) + padding-top + padding-bottom
    const lineHeight = pxToNumber(originStyle.lineHeight)
    const calcMaxHeight =
      lineHeight * props.rows +
      pxToNumber(originStyle.paddingTop) +
      pxToNumber(originStyle.paddingBottom)

    setMaxHeight(Math.round(calcMaxHeight))
  }

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
        className={classNames(`${classPrefix}-link`, `${classPrefix}-shadow`)}
        ref={expandElRef}
        onClick={() => {
          setExpanded(true)
          props.onExpandClick(true)
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
        className={classNames(`${classPrefix}-link`)}
        ref={collapseElRef}
        onClick={() => {
          setExpanded(false)
          props.onExpandClick(false)
        }}
      >
        {props.collapseText}
      </a>
    )

  return withNativeProps(
    props,
    <div
      ref={rootRef}
      className={classNames(classPrefix, `${classPrefix}-viewport`)}
      style={
        {
          // height: expanded ? 'auto' : maxHeight,
          // maxHeight: expanded ? 'none' : maxHeight,
        }
      }
      data-viewport={inViewport}
      onClick={e => {
        if (e.target === e.currentTarget) {
          props.onContentClick(e)
        }
      }}
    >
      <div
        className={`${classPrefix}-viewport-content`}
        ref={contentRef}
        style={{
          maxHeight: expanded ? 'none' : maxHeight,
          // maxHeight: expanded ? 'none' : contentHeight,
        }}
      >
        <span className={`${classPrefix}-viewport-inline`}>
          {props.content}
          <div
            ref={ovserverRef}
            className={`${classPrefix}-viewport-observer`}
          ></div>
        </span>
      </div>
      <div
        className={classNames(`${classPrefix}-viewport-btns`, {
          [`${classPrefix}-justify-${props.justify}`]: !!props.justify,
        })}
      >
        <div
          className={classNames({
            [`${classPrefix}-less`]: expanded,
            [`${classPrefix}-more`]: !expanded,
          })}
        >
          {expanded
            ? collapseActionElement
            : !inViewport && expandActionElement}
        </div>
      </div>
    </div>
  )
}
