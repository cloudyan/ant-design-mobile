import React, { FC, useState } from 'react'
import { useThrottleFn } from 'ahooks'
import classNames from 'classnames'
import Button from '../button'
import { NativeProps, withNativeProps } from '../../utils/native-props'

export type Action = {
  key: string | number
  text: string
  disabled?: boolean
  danger?: boolean
  bold?: boolean
  onClick?: () => void | Promise<void>
} & NativeProps

export const DialogActionButton: FC<{
  action: Action
  onAction: () => void | Promise<void>
}> = props => {
  const { action } = props

  const [loading, setLoading] = useState(false)

  const { run: handleClick } = useThrottleFn(
    async () => {
      setLoading(true)
      try {
        await action.onClick?.()
        await props.onAction?.()
      } catch (e) {
        setLoading(false)
        throw e
      }
      setLoading(false)
    },
    {
      wait: 200,
      trailing: false,
      leading: true,
    }
  )

  return withNativeProps(
    props.action,
    <Button
      key={action.key}
      onClick={handleClick}
      className={classNames('adm-dialog-button', {
        'adm-dialog-button-bold': action.bold,
      })}
      fill='none'
      block
      color={action.danger ? 'danger' : 'primary'}
      loading={loading}
      disabled={action.disabled}
    >
      {action.text}
    </Button>
  )
}
