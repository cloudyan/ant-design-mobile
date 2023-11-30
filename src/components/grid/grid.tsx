import { mergeProps } from '../../utils/with-default-props'
import React from 'react'
import type { FC, ReactNode, CSSProperties } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { toCSSLength } from '../../utils/to-css-length'

const classPrefix = `adm-grid`

export type GridProps = {
  columns: number
  gap?: number | string | [number | string, number | string]
  children?: ReactNode
} & NativeProps<'--gap' | '--gap-vertical' | '--gap-horizontal'>

// 支持控制列 columns
// 暂不支持控制行 rows，放不下时横向滚动？
// 术语：金刚位： “金刚区"是banner下方的功能入口导航区域，通常以“图标+文字”的宫格导航的形式出现
export const Grid: FC<GridProps> = props => {
  const style: GridProps['style'] & Record<'--columns', string> = {
    '--columns': props.columns.toString(),
  }
  const { gap } = props
  if (gap !== undefined) {
    if (Array.isArray(gap)) {
      style['--gap-horizontal'] = toCSSLength(gap[0])
      style['--gap-vertical'] = toCSSLength(gap[1])
    } else {
      style['--gap'] = toCSSLength(gap)
    }
  }

  return withNativeProps(
    props,
    <div className={classPrefix} style={style}>
      {props.children}
    </div>
  )
}

export type GridItemProps = {
  span?: number
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children?: ReactNode
} & NativeProps

type GridItemStyle = CSSProperties &
  Record<'--item-span', GridItemProps['span']>

export const GridItem: FC<GridItemProps> = p => {
  const props = mergeProps({ span: 1 }, p)

  const itemStyle: GridItemStyle = {
    '--item-span': props.span,
  }
  return withNativeProps(
    props,
    <div
      className={`${classPrefix}-item`}
      style={itemStyle}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}
