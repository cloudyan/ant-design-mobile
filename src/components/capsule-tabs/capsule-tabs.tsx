import React, { isValidElement, useRef } from 'react'
import type { FC, ReactNode, ReactElement } from 'react'
import classNames from 'classnames'
import { animated } from '@react-spring/web'
import ScrollMask from '../scroll-mask'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { usePropsValue } from '../../utils/use-props-value'
import { useResizeEffect } from '../../utils/use-resize-effect'
import { useTabListScroll } from '../../utils/use-tab-list-scroll'
import { ShouldRender } from '../../utils/should-render'
import { traverseReactNode } from '../../utils/traverse-react-node'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `adm-capsule-tabs`

export type CapsuleTabProps = {
  title: ReactNode
  disabled?: boolean
  forceRender?: boolean
  destroyOnClose?: boolean
  children?: ReactNode
} & NativeProps

export const CapsuleTab: FC<CapsuleTabProps> = () => null

export type CapsuleTabsProps = {
  wrap?: boolean
  activeKey?: string | null
  defaultActiveKey?: string | null
  onChange?: (key: string) => void
  children?: ReactNode
} & NativeProps

const defaultProps = {
  wrap: false,
}

export const CapsuleTabs: FC<CapsuleTabsProps> = p => {
  const props = mergeProps(defaultProps, p)
  const tabListContainerRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const keyToIndexRecord: Record<string, number> = {}
  let firstActiveKey: string | null = null

  const panes: ReactElement<CapsuleTabProps>[] = []

  traverseReactNode(props.children, (child, index) => {
    if (!isValidElement<CapsuleTabProps>(child)) return
    const key = child.key
    if (typeof key !== 'string') return
    if (index === 0) {
      firstActiveKey = key
    }
    const length = panes.push(child)
    keyToIndexRecord[key] = length - 1
  })

  const [activeKey, setActiveKey] = usePropsValue({
    value: props.activeKey,
    defaultValue: props.defaultActiveKey ?? firstActiveKey,
    onChange: v => {
      if (v === null) return
      props.onChange?.(v)
    },
  })

  const { scrollLeft, animate } = useTabListScroll(
    tabListContainerRef,
    keyToIndexRecord[activeKey as string]
  )

  useResizeEffect(() => {
    animate(true)
  }, rootRef)

  const classes = classNames(`${classPrefix}-tab-list`, {
    [`${classPrefix}-tab-list-wrap`]: props.wrap,
  })

  return withNativeProps(
    props,
    <div className={classPrefix} ref={rootRef}>
      <div className={`${classPrefix}-header`}>
        <ScrollMask scrollTrackRef={tabListContainerRef} />
        <animated.div
          className={classes}
          ref={tabListContainerRef}
          scrollLeft={scrollLeft}
        >
          {panes.map(pane =>
            withNativeProps(
              pane.props,
              <div key={pane.key} className={`${classPrefix}-tab-wrapper`}>
                <div
                  onClick={() => {
                    const { key } = pane
                    if (pane.props.disabled) return
                    if (key === undefined || key === null) {
                      return
                    }
                    setActiveKey(key.toString())
                  }}
                  className={classNames(`${classPrefix}-tab`, {
                    [`${classPrefix}-tab-active`]: pane.key === activeKey,
                    [`${classPrefix}-tab-disabled`]: pane.props.disabled,
                  })}
                >
                  {pane.props.title}
                </div>
              </div>
            )
          )}
        </animated.div>
      </div>
      {panes.map(pane => {
        if (pane.props.children === undefined) {
          return null
        }
        const active = pane.key === activeKey
        return (
          <ShouldRender
            key={pane.key}
            active={active}
            forceRender={pane.props.forceRender}
            destroyOnClose={pane.props.destroyOnClose}
          >
            <div
              className={`${classPrefix}-content`}
              style={{ display: active ? 'block' : 'none' }}
            >
              {pane.props.children}
            </div>
          </ShouldRender>
        )
      })}
    </div>
  )
}
