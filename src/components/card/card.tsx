import { FC, ReactNode } from 'react'
import React from 'react'
import classNames from 'classnames'
import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = `adm-card`

export type CardProps = {
  title?: ReactNode
  extra?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onBodyClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  onHeaderClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
} & NativeProps

export const Card: FC<CardProps> = props => {
  const renderHeader = () => {
    if (!(props.title || props.extra)) {
      return null
    }
    return (
      <div
        className={classNames(`${classPrefix}-header`)}
        onClick={props.onHeaderClick}
      >
        <div className={`${classPrefix}-header-title`}>{props.title}</div>
        {props.extra}
      </div>
    )
  }

  const renderBody = () => {
    if (!props.children) {
      return null
    }
    return (
      <div className={`${classPrefix}-body`} onClick={props.onBodyClick}>
        {props.children}
      </div>
    )
  }

  return withNativeProps(
    props,
    <div className={classPrefix} onClick={props.onClick}>
      {renderHeader()}
      {renderBody()}
    </div>
  )
}
