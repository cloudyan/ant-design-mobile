import React, { useMemo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useIsomorphicLayoutEffect } from 'ahooks'
import runes from 'runes2'
import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { useResizeEffect } from '../../utils/use-resize-effect'
import {
  PropagationEvent,
  withStopPropagation,
} from '../../utils/with-stop-propagation'

const classPrefix = `adm-ellipsis`

// 取中间数
function getMiddle([x, y]: [number, number], mathFn: (x: number) => number) {
  // 避免溢出，将 (x+y)/2 改为 x + (y-x)/2
  return x + mathFn((y - x) / 2)
}

export type EllipsisProps = {
  content: string
  direction?: 'start' | 'end' | 'middle'
  rows?: number
  expandText?: ReactNode
  collapseText?: ReactNode
  stopPropagationForActionButtons?: PropagationEvent[]
  onContentClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  defaultExpanded?: boolean
} & NativeProps

const defaultProps = {
  direction: 'end',
  rows: 1,
  expandText: '',
  content: '',
  collapseText: '',
  stopPropagationForActionButtons: [],
  onContentClick: () => {},
  defaultExpanded: false,
}

type EllipsisedValue = {
  leading?: string
  tailing?: string
}

export const Ellipsis: FC<EllipsisProps> = p => {
  const props = mergeProps(defaultProps, p)
  const rootRef = useRef<HTMLDivElement>(null)
  const expandElRef = useRef<HTMLAnchorElement>(null)
  const collapseElRef = useRef<HTMLAnchorElement>(null)

  const [ellipsised, setEllipsised] = useState<EllipsisedValue>({}) // 是否要省略
  const [expanded, setExpanded] = useState(props.defaultExpanded) // 是否展开
  const [exceeded, setExceeded] = useState(false) // 是否超出

  // TODO: 不支持富文本或 React 组件
  // 若要支持，需要换个实现思路：天然的因内容会超出容器，布局会受到影响
  // 被影响的元素，可以用来做标记，可以重新封装一个组件 Overflow
  if (typeof props.content !== 'string') {
    throw new Error('Ellipsis only supports string content')
  }
  // 有效划分字符串（props.content 仅支持 string）
  const chars = useMemo(() => runes(props.content), [props.content])
  function getSubString(start: number, end: number) {
    return chars.slice(start, end).join('')
  }

  /**
   * 根据指定行数，计算截断后的文本内容（计算省略内容）
   *
   * @return {void} 此函数不返回任何值。
   */
  function calcEllipsised() {
    const root = rootRef.current
    if (!root) return

    const originDisplay = root.style.display
    root.style.display = 'block'

    const originStyle = window.getComputedStyle(root)
    const container = document.createElement('div')

    // 这里 Array.prototype.slice.apply 不同于 Object.keys()
    const styleNames: string[] = Array.prototype.slice.apply(originStyle)
    styleNames.forEach(name => {
      container.style.setProperty(name, originStyle.getPropertyValue(name))
    })

    // 恢复 root 元素的原始显示样式
    root.style.display = originDisplay

    // 将新元素的高度、最小高度、最大高度、文本溢出、行数限制和现实样式设置为特定值
    container.style.height = 'auto'
    container.style.minHeight = 'auto'
    container.style.maxHeight = 'auto'
    container.style.textOverflow = 'clip'
    container.style.webkitLineClamp = 'unset'
    container.style.display = 'block'

    // 根据行数和其他样式属性计算新元素的最大高度
    // 计算规则 行高 * (行数+0.5) + padding-top + padding-bottom
    const lineHeight = pxToNumber(originStyle.lineHeight)
    const maxHeight = Math.floor(
      lineHeight * (props.rows + 0.5) +
        pxToNumber(originStyle.paddingTop) +
        pxToNumber(originStyle.paddingBottom)
    )

    // 将新元素的文本内容设置为提供的文本
    container.innerText = props.content
    document.body.appendChild(container)

    // 检查新元素的高度是否小于或等于最大高度
    if (container.offsetHeight <= maxHeight) {
      setExceeded(false)
    } else {
      // 如果高度超过最大高度，则将 exceeded 是否超出状态设置为 true，
      // 然后使用二分搜索并根据指定方向（开始、中间或末尾）查找对应的省略文本。
      setExceeded(true)
      const end = props.content.length

      // 折叠元素
      const collapseEl =
        typeof props.collapseText === 'string'
          ? props.collapseText
          : collapseElRef.current?.innerHTML
      // 展开元素
      const expandEl =
        typeof props.expandText === 'string'
          ? props.expandText
          : expandElRef.current?.innerHTML
      // 展开/折叠按钮
      const actionText = expanded ? collapseEl : expandEl

      // 计算省略内容（头部省略或尾部省略时）
      function check(left: number, right: number): EllipsisedValue {
        // 递归终止条件
        if (right - left <= 1) {
          if (props.direction === 'end') {
            return {
              leading: getSubString(0, left) + '...',
            }
          } else {
            return {
              tailing: '...' + getSubString(right, end),
            }
          }
        }

        // 二分搜索
        const middle = getMiddle([left, right], Math.round)
        if (props.direction === 'end') {
          container.innerHTML = getSubString(0, middle) + '...' + actionText
        } else {
          container.innerHTML = actionText + '...' + getSubString(middle, end)
        }

        if (container.offsetHeight <= maxHeight) {
          // 未超出，继续向末端方向查找
          if (props.direction === 'end') {
            return check(middle, right)
          } else {
            return check(left, middle)
          }
        } else {
          // 否则，则向起始端方向查找
          if (props.direction === 'end') {
            return check(left, middle)
          } else {
            return check(middle, right)
          }
        }
        // 上面判断逻辑的重构版本
        // const [start, end] = props.direction === 'end' ? [middle, right] : [left, middle]
        // return container.offsetHeight <= maxHeight
        //   ? check(start, end)
        //   : check(end, start)
      }

      // 计算省略内容（中间省略时）
      function checkMiddle(
        leftPart: [number, number],
        rightPart: [number, number]
      ): EllipsisedValue {
        // 递归终止条件
        if (
          leftPart[1] - leftPart[0] <= 1 &&
          rightPart[1] - rightPart[0] <= 1
        ) {
          return {
            leading: getSubString(0, leftPart[0]) + '...',
            tailing: '...' + getSubString(rightPart[1], end),
          }
        }

        const leftPartMiddle = getMiddle(leftPart, Math.floor) // 向下取整
        const rightPartMiddle = getMiddle(rightPart, Math.ceil) // 向上取整

        container.innerHTML =
          getSubString(0, leftPartMiddle) +
          '...' +
          actionText +
          '...' +
          getSubString(rightPartMiddle, end)

        // 二分查找，第一次是超出的（不超出不会走二分查找逻辑）
        if (container.offsetHeight <= maxHeight) {
          // 未超出，则向中间方向取值（超出时，使用一次二分，可能就不超出了，所以向中间方向取值）
          return checkMiddle(
            [leftPartMiddle, leftPart[1]],
            [rightPart[0], rightPartMiddle]
          )
        } else {
          // 超出，向两边方向取值
          return checkMiddle(
            [leftPart[0], leftPartMiddle],
            [rightPartMiddle, rightPart[1]]
          )
        }
      }

      // 中间值
      const middle = getMiddle([0, end], Math.round)

      // 获取到省略内容
      const ellipsised =
        props.direction === 'middle'
          ? checkMiddle([0, middle], [middle, end])
          : check(0, end)
      setEllipsised(ellipsised)
    }
    document.body.removeChild(container)
  }

  useResizeEffect(calcEllipsised, rootRef)

  // 同步渲染
  useIsomorphicLayoutEffect(() => {
    calcEllipsised()
  }, [
    props.content,
    props.direction,
    props.rows,
    props.expandText,
    props.collapseText,
  ])

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

  const renderContent = () => {
    // 不超出，直接渲染全部内容
    if (!exceeded) return props.content

    if (expanded) {
      // 展开时，显示全部内容和折叠操作按钮
      return (
        <>
          {props.content}
          {collapseActionElement}
        </>
      )
    }
    // 非展开时，显示省略内容和展开操作按钮
    return (
      <>
        {ellipsised.leading}
        {expandActionElement}
        {ellipsised.tailing}
      </>
    )
  }

  return withNativeProps(
    props,
    <div
      ref={rootRef}
      className={classPrefix}
      onClick={e => {
        if (e.target === e.currentTarget) {
          props.onContentClick(e)
        }
      }}
    >
      {renderContent()}
    </div>
  )
}

function pxToNumber(value: string | null): number {
  if (!value) return 0
  const match = value.match(/^\d*(\.\d*)?/)
  return match ? Number(match[0]) : 0
}
