import { withDefaultProps } from '../../utils/with-default-props'
import React, { FC } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { toCSSLength } from '../../utils/to-css-length'

const classPrefix = `adm-grid`

export type GridProps = {
  columns: number
  gap?: number | string | [number | string, number | string]
} & NativeProps<'--gap' | '--gap-vertical' | '--gap-horizontal'>

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
} & NativeProps

type GridItemStyle = React.CSSProperties &
  Record<'--item-span', GridItemProps['span']>

export const GridItem = withDefaultProps({
  span: 1,
})<GridItemProps>(props => {
  const itemStyle: GridItemStyle = {
    '--item-span': props.span,
  }
  return withNativeProps(
    props,
    <div className={`${classPrefix}-item`} style={itemStyle}>
      {props.children}
    </div>
  )
})
