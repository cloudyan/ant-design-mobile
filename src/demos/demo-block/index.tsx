import React from 'react'
import type { FC, ReactNode } from 'react'
import styles from './index.less'
import { NativeProps } from '../../utils/native-props'

type Props = {
  title: string
  height?: number
  padding?: string
  background?: string
  children?: ReactNode
} & NativeProps

export const DemoBlock: FC<Props> = props => {
  return (
    <div className={styles.demoBlock}>
      <div className={styles.title}>{props.title}</div>
      <div
        className={styles.main}
        style={{
          padding: props.padding,
          height: props.height,
          background: props.background,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}

DemoBlock.defaultProps = {
  padding: '12px 12px',
  background: 'var(--adm-color-background)',
}
