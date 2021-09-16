import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { useNewControllableValue } from '../../utils/use-controllable-value'
import { CloseCircleFilled } from '@ant-design/icons'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'

const classPrefix = `adm-input`

type NativeInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type EnterKeyHintProps = NativeInputProps extends { enterKeyHint?: unknown }
  ? {
      enterKeyHint?: NativeInputProps['enterKeyHint']
    }
  : {}

export type InputProps = Pick<
  NativeInputProps,
  | 'maxLength'
  | 'autoComplete'
  | 'pattern'
  | 'type'
  | 'onFocus'
  | 'onBlur'
  | 'autoCapitalize'
  | 'autoCorrect'
> &
  EnterKeyHintProps & {
    value?: string
    defaultValue?: string
    onChange?: (val: string) => void
    placeholder?: string
    disabled?: boolean
    readOnly?: boolean
    clearable?: boolean
    onClear?: () => void
    id?: string
  } & NativeProps<
    '--font-size' | '--color' | '--placeholder-color' | '--disabled-color'
  >

const defaultProps = {
  defaultValue: '',
}

export type InputRef = {
  clear: () => void
  focus: () => void
  blur: () => void
}

export const Input = forwardRef<InputRef, InputProps>((p, ref) => {
  const props = mergeProps(defaultProps, p)
  const {
    clearable,
    onClear,
    className,
    style,
    defaultValue: outerDefaultValue,
    value: outerValue,
    onChange: outerOnChange,
    ...inputProps
  } = props
  const [value, setValue] = useNewControllableValue(props)
  const [hasFocus, setHasFocus] = useState(false)
  const nativeInputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue('')
    },
    focus: () => {
      nativeInputRef.current?.focus()
    },
    blur: () => {
      nativeInputRef.current?.blur()
    },
  }))

  return withNativeProps(
    props,
    <div className={`${classPrefix}-wrapper`}>
      <input
        ref={nativeInputRef}
        className={classPrefix}
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
        onFocus={e => {
          setHasFocus(true)
          props.onFocus?.(e)
        }}
        onBlur={e => {
          setHasFocus(false)
          props.onBlur?.(e)
        }}
        id={props.id}
        placeholder={props.placeholder}
        disabled={props.disabled}
        readOnly={props.readOnly}
        maxLength={props.maxLength}
        autoComplete={props.autoComplete}
        enterKeyHint={props.enterKeyHint}
        pattern={props.pattern}
        type={props.type}
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
      />
      {props.clearable && !!value && hasFocus && (
        <div
          className={`${classPrefix}-clear`}
          onMouseDown={e => {
            e.preventDefault()
          }}
          onClick={() => {
            setValue('')
            props.onClear?.()
          }}
        >
          <CloseCircleFilled />
        </div>
      )}
    </div>
  )
})
