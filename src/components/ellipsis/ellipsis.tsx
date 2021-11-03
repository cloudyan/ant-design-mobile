import React, { FC, useRef, useState } from 'react'
import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { useResizeEffect } from '../../utils/use-resize-effect'

const classPrefix = `adm-ellipsis`

export type EllipsisProps = {
  content: string
  direction?: 'start' | 'end' | 'middle'
  rows?: number
} & NativeProps

const defaultProps = {
  direction: 'end',
  rows: 1,
}

export const Ellipsis: FC<EllipsisProps> = p => {
  const props = mergeProps(defaultProps, p)
  const rootRef = useRef<HTMLDivElement>(null)

  const [ellipsised, setEllipsised] = useState<string>('')

  useResizeEffect(() => {
    const root = rootRef.current
    if (!root) return
    const originStyle = window.getComputedStyle(root)
    const container = document.createElement('div')
    const styleNames: string[] = Array.prototype.slice.apply(originStyle)
    styleNames.forEach(name => {
      container.style.setProperty(name, originStyle.getPropertyValue(name))
    })
    container.style.position = 'fixed'
    container.style.left = '999999px'
    container.style.top = '999999px'
    container.style.zIndex = '-1000'
    container.style.height = 'auto'
    container.style.minHeight = 'auto'
    container.style.maxHeight = 'auto'
    container.style.textOverflow = 'clip'
    container.style.whiteSpace = 'normal'
    container.style.webkitLineClamp = 'unset'
    container.style.webkitBoxOrient = 'unset'
    container.style.display = 'block'
    const lineHeight = pxToNumber(originStyle.lineHeight)
    const maxHeight = Math.floor(
      lineHeight * props.rows +
        pxToNumber(originStyle.paddingTop) +
        pxToNumber(originStyle.paddingBottom)
    )

    container.innerText = props.content
    document.body.appendChild(container)

    if (container.offsetHeight <= maxHeight) {
      setEllipsised(props.content)
    } else {
      const end = props.content.length

      function check(left: number, right: number): string {
        if (right - left <= 1) {
          if (props.direction === 'end') {
            return props.content.slice(0, left) + '...'
          } else {
            return '...' + props.content.slice(right, end)
          }
        }
        const middle = Math.round((left + right) / 2)
        if (props.direction === 'end') {
          container.innerText = props.content.slice(0, middle) + '...'
        } else {
          container.innerText = '...' + props.content.slice(middle, end)
        }
        if (container.offsetHeight <= maxHeight) {
          if (props.direction === 'end') {
            return check(middle, right)
          } else {
            return check(left, middle)
          }
        } else {
          if (props.direction === 'end') {
            return check(left, middle)
          } else {
            return check(middle, right)
          }
        }
      }

      function checkMiddle(
        leftPart: [number, number],
        rightPart: [number, number]
      ): string {
        if (
          leftPart[1] - leftPart[0] <= 1 &&
          rightPart[1] - rightPart[0] <= 1
        ) {
          return (
            props.content.slice(0, leftPart[0]) +
            '...' +
            props.content.slice(rightPart[1], end)
          )
        }
        const leftPartMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2)
        const rightPartMiddle = Math.floor((rightPart[0] + rightPart[1]) / 2)
        container.innerText =
          props.content.slice(0, leftPartMiddle) +
          '...' +
          props.content.slice(rightPartMiddle, end)
        if (container.offsetHeight <= maxHeight) {
          return checkMiddle(
            [leftPartMiddle, leftPart[1]],
            [rightPart[0], rightPartMiddle]
          )
        } else {
          return checkMiddle(
            [leftPart[0], leftPartMiddle],
            [rightPartMiddle, rightPart[1]]
          )
        }
      }

      const middle = Math.floor((0 + end) / 2)
      setEllipsised(
        props.direction === 'middle'
          ? checkMiddle([0, middle], [middle, end])
          : check(0, end)
      )
    }
    document.body.removeChild(container)
  }, rootRef)

  return withNativeProps(
    props,
    <div ref={rootRef} className={classPrefix}>
      {ellipsised}
    </div>
  )
}

function pxToNumber(value: string | null): number {
  if (!value) return 0
  const match = value.match(/^\d*(\.\d*)?/)
  return match ? Number(match[0]) : 0
}
