import React, { FC, useContext } from 'react'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import classNames from 'classnames'
import { CheckOutlined } from '@ant-design/icons'
import { CheckboxGroupContext } from './group-context'
import { useNewControllableValue } from '../../utils/use-controllable-value'
import { mergeProps } from '../../utils/with-default-props'
import { devWarning } from '../../utils/dev-log'

const classPrefix = `adm-checkbox`

export type CheckboxValue = string | number

export type CheckboxProps = {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  value?: CheckboxValue
  indeterminate?: boolean
  block?: boolean
  id?: string
  icon?: (checked: boolean, indeterminate: boolean) => React.ReactNode
} & NativeProps

const defaultProps = {
  defaultChecked: false,
  indeterminate: false,
}

export const Checkbox: FC<CheckboxProps> = p => {
  const groupContext = useContext(CheckboxGroupContext)

  if (groupContext !== null) {
    if (p.checked !== undefined) {
      devWarning(
        'Checkbox',
        'When used with `Checkbox.Group`, the `checked` prop of `Checkbox` will not work.'
      )
    }
    if (p.defaultChecked !== undefined) {
      devWarning(
        'Checkbox',
        'When used with `Checkbox.Group`, the `defaultChecked` prop of `Checkbox` will not work.'
      )
    }
  }

  const props = mergeProps(defaultProps, p)

  let [checked, setChecked] = useNewControllableValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange,
  })
  let disabled = props.disabled

  const { value } = props
  if (groupContext && value !== undefined) {
    checked = groupContext.value.includes(value)
    setChecked = (checked: boolean) => {
      if (checked) {
        groupContext.check(value)
      } else {
        groupContext.uncheck(value)
      }
      props.onChange?.(checked)
    }
    disabled = disabled || groupContext.disabled
  }

  const renderIcon = () => {
    if (props.icon) {
      return (
        <div className={`${classPrefix}-custom-icon`}>
          {props.icon(checked, props.indeterminate)}
        </div>
      )
    }

    return (
      <div className={`${classPrefix}-icon`}>
        <CheckOutlined className={`${classPrefix}-icon-checked`} />
        <div className={`${classPrefix}-indeterminate-checked`} />
      </div>
    )
  }

  return withNativeProps(
    props,
    <label
      className={classNames(classPrefix, {
        [`${classPrefix}-checked`]: checked,
        [`${classPrefix}-indeterminate`]: props.indeterminate,
        [`${classPrefix}-disabled`]: disabled,
        [`${classPrefix}-block`]: props.block,
      })}
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={e => {
          setChecked(e.target.checked)
        }}
        onClick={e => {
          e.stopPropagation()
          e.nativeEvent.stopImmediatePropagation()
        }}
        disabled={disabled}
        id={props.id}
      />

      {renderIcon()}
      {props.children && (
        <div className={`${classPrefix}-content`}>{props.children}</div>
      )}
    </label>
  )
}
