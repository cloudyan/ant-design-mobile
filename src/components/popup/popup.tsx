import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useIsomorphicLayoutEffect, useUnmountedRef } from 'ahooks'
import classNames from 'classnames'
import type { FC, PropsWithChildren } from 'react'
import React, { useRef, useState } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { renderToContainer } from '../../utils/render-to-container'
import { ShouldRender } from '../../utils/should-render'
import { useInnerVisible } from '../../utils/use-inner-visible'
import { useLockScroll } from '../../utils/use-lock-scroll'
import { mergeProps } from '../../utils/with-default-props'
import { withStopPropagation } from '../../utils/with-stop-propagation'
import { useConfig } from '../config-provider'
import Mask from '../mask'
import { defaultPopupBaseProps, PopupBaseProps } from './popup-base-props'

const classPrefix = `adm-popup`

export type PopupProps = PopupBaseProps &
  PropsWithChildren<{
    position?: 'bottom' | 'top' | 'left' | 'right'
    closeOnSwipe?: boolean
  }> &
  NativeProps<'--z-index'>

const defaultProps = {
  ...defaultPopupBaseProps,
  closeOnSwipe: false,
  position: 'bottom',
}

export const Popup: FC<PopupProps> = p => {
  const { locale, popup: componentConfig = {} } = useConfig()
  const props = mergeProps(defaultProps, componentConfig, p)

  const bodyCls = classNames(
    `${classPrefix}-body`,
    props.bodyClassName,
    `${classPrefix}-body-position-${props.position}`
  )

  const [active, setActive] = useState(props.visible)
  const ref = useRef<HTMLDivElement>(null)

  useLockScroll(ref, props.disableBodyScroll && active ? 'strict' : false)
  useIsomorphicLayoutEffect(() => {
    if (props.visible) {
      setActive(true)
    }
  }, [props.visible])

  const unmountedRef = useUnmountedRef()
  const { percent } = useSpring({
    percent: props.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30,
    },
    onRest: () => {
      if (unmountedRef.current) return
      setActive(props.visible)
      if (props.visible) {
        props.afterShow?.()
      } else {
        props.afterClose?.()
      }
    },
  })

  // TODO: useDrag 上下滑动关闭？无效果啊
  const bind = useDrag(
    ({ swipe: [, swipeY] }) => {
      if (!props.closeOnSwipe) return
      if (
        (swipeY === 1 && props.position === 'bottom') ||
        (swipeY === -1 && props.position === 'top')
      ) {
        props.onClose?.()
      }
    },
    {
      axis: 'y',
      enabled: ['top', 'bottom'].includes(props.position),
    }
  )

  // 保持状态一致
  // TODO: 直接写赋值不行吗，active && props.visible 变更都会触发 rerender，有问题吗？
  const maskVisible = useInnerVisible(active && props.visible)

  const node = withStopPropagation(
    props.stopPropagation,
    withNativeProps(
      props,
      <div
        className={classPrefix}
        onClick={props.onClick}
        style={{
          display: active ? undefined : 'none',
          touchAction: ['top', 'bottom'].includes(props.position)
            ? 'none'
            : 'auto',
        }}
        {...bind()}
      >
        {props.mask && (
          <Mask
            visible={maskVisible}
            forceRender={props.forceRender}
            destroyOnClose={props.destroyOnClose}
            onMaskClick={e => {
              props.onMaskClick?.(e)
              if (props.closeOnMaskClick) {
                props.onClose?.()
              }
            }}
            className={props.maskClassName}
            style={props.maskStyle}
            disableBodyScroll={false}
            stopPropagation={props.stopPropagation}
          />
        )}
        <animated.div
          className={bodyCls}
          style={{
            ...props.bodyStyle,
            pointerEvents: percent.to(v => (v === 0 ? 'unset' : 'none')),
            transform: percent.to(v => {
              // 惰性计算
              const map = {
                bottom: `translate(0, ${v}%)`,
                top: `translate(0, -${v}%)`,
                left: `translate(-${v}%, 0)`,
                right: `translate(${v}%, 0)`,
              }
              return map[props.position] || 'none'
            }),
          }}
          ref={ref}
        >
          {props.showCloseButton && (
            <a
              className={classNames(
                `${classPrefix}-close-icon`,
                'adm-plain-anchor'
              )}
              onClick={() => {
                props.onClose?.()
              }}
              role='button'
              aria-label={locale.common.close}
            >
              {props.closeIcon}
            </a>
          )}
          {props.children}
        </animated.div>
      </div>
    )
  )

  return (
    <ShouldRender
      active={active}
      forceRender={props.forceRender}
      destroyOnClose={props.destroyOnClose}
    >
      {renderToContainer(props.getContainer, node)}
    </ShouldRender>
  )
}
