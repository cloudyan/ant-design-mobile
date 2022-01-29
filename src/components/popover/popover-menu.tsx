import React, {
  forwardRef,
  ReactElement,
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import classNames from 'classnames'
import { Popover, PopoverProps, PopoverRef } from './popover'

const classPrefix = `adm-popover-menu`

export type Action = {
  text: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  key?: string
  onClick?: () => void
  [key: string]: any
}

export type PopoverMenuProps<T> = Omit<PopoverProps, 'content'> & {
  actions: T[]
  onAction?: (text: T) => void
}

export const PopoverMenu = forwardRef<PopoverRef, PopoverMenuProps<Action>>(
  (props, ref) => {
    const innerRef = useRef<PopoverRef>(null)
    useImperativeHandle(ref, () => innerRef.current!, [])

    const onClick = useCallback(
      (e: Action) => {
        const { onAction } = props
        if (onAction) {
          onAction(e)
        }
        innerRef.current?.hide()
      },
      [props.onAction]
    )

    const overlay = useMemo(() => {
      return (
        <div className={`${classPrefix}-list`}>
          <div className={`${classPrefix}-list-inner`}>
            {props.actions.map((action, index) => (
              <a
                key={action.key ?? index}
                className={classNames(
                  `${classPrefix}-item`,
                  'adm-plain-anchor',
                  action.disabled && `${classPrefix}-item-disabled`
                )}
                onClick={() => {
                  if (action.disabled) return
                  onClick(action)
                  action.onClick?.()
                }}
              >
                {action.icon && (
                  <div className={`${classPrefix}-item-icon`}>
                    {action.icon}
                  </div>
                )}
                <div className={`${classPrefix}-item-text`}>{action.text}</div>
              </a>
            ))}
          </div>
        </div>
      )
    }, [props.actions, onClick])

    return (
      <Popover
        ref={innerRef}
        {...props}
        className={classNames(classPrefix, props.className)}
        overlayClassName={classNames(classPrefix, props.overlayClassName)}
        content={overlay}
      >
        {props.children}
      </Popover>
    )
  }
) as <T extends Action = Action>(
  props: PopoverMenuProps<T> & { ref?: Ref<PopoverRef> }
) => ReactElement
