import React from 'react'
import classNames from 'classnames'
import type { FC, ReactNode } from 'react'
import { mergeProps } from '../../utils/with-default-props'
import Image from '../image'
import { NativeProps } from '../../utils/native-props'
import CenterPopup, { CenterPopupProps } from '../center-popup'
import AutoCenter from '../auto-center'
import { Action, DialogActionButton } from './dialog-action-button'

export type DialogProps = Pick<
  CenterPopupProps,
  | 'afterClose'
  | 'afterShow'
  | 'bodyClassName'
  | 'bodyStyle'
  | 'destroyOnClose'
  | 'disableBodyScroll'
  | 'forceRender'
  | 'getContainer'
  | 'maskClassName'
  | 'maskStyle'
  | 'stopPropagation'
  | 'visible'
> & {
  image?: string
  header?: ReactNode
  title?: ReactNode
  content?: ReactNode
  actions?: (Action | Action[])[]
  onAction?: (action: Action, index: number) => void | Promise<void>
  onClose?: () => void
  closeOnAction?: boolean
  closeOnMaskClick?: boolean
} & NativeProps

const defaultProps = {
  actions: [] as Action[],
  closeOnAction: false,
  closeOnMaskClick: false,
  getContainer: null,
}

export const Dialog: FC<DialogProps> = p => {
  const props = mergeProps(defaultProps, p)

  const element = (
    <>
      {!!props.image && (
        <div className={cls('image-container')}>
          <Image src={props.image} alt='dialog header image' width='100%' />
        </div>
      )}
      {!!props.header && (
        <div className={cls('header')}>
          <AutoCenter>{props.header}</AutoCenter>
        </div>
      )}
      {!!props.title && <div className={cls('title')}>{props.title}</div>}
      <div
        className={classNames(
          cls('content'),
          !props.content && cls('content-empty')
        )}
      >
        {typeof props.content === 'string' ? (
          <AutoCenter>{props.content}</AutoCenter>
        ) : (
          props.content
        )}
      </div>
      <div className={cls('footer')}>
        {props.actions.map((row, index) => {
          const actions = Array.isArray(row) ? row : [row]
          return (
            <div className={cls('action-row')} key={index}>
              {actions.map((action, index) => (
                <DialogActionButton
                  key={action.key}
                  action={action}
                  onAction={async () => {
                    // TIP: 当 Promise.all 中有异常(throw error or reject)时
                    await Promise.all([
                      action.onClick?.(),
                      props.onAction?.(action, index),
                    ])
                    // 上述代码 reject，后面的代码就不再执行了
                    // console.log('Dialog onAction', 'call')
                    if (props.closeOnAction) {
                      // 此处 onClose 方法
                      // 命令式调用，是 renderImperatively 中添加的，外部可不传入
                      // 声明式调用，则外部外部定义传入，可控组件
                      props.onClose?.()
                    }
                  }}
                />
              ))}
            </div>
          )
        })}
      </div>
    </>
  )

  return (
    <CenterPopup
      className={classNames(cls(), props.className)}
      style={props.style}
      afterClose={props.afterClose}
      afterShow={props.afterShow}
      onMaskClick={
        props.closeOnMaskClick
          ? () => {
              props.onClose?.()
            }
          : undefined
      }
      visible={props.visible}
      getContainer={props.getContainer}
      bodyStyle={props.bodyStyle}
      bodyClassName={classNames(
        cls('body'),
        props.image && cls('with-image'),
        props.bodyClassName
      )}
      maskStyle={props.maskStyle}
      maskClassName={props.maskClassName}
      stopPropagation={props.stopPropagation}
      disableBodyScroll={props.disableBodyScroll}
      destroyOnClose={props.destroyOnClose}
      forceRender={props.forceRender}
      role='dialog'
      aria-label={props['aria-label']}
    >
      {element}
    </CenterPopup>
  )
}

function cls(name: string = '') {
  return 'adm-dialog' + (name && '-') + name
}
