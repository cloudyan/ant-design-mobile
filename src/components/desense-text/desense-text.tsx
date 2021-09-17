import React, { FC } from 'react'
import classnames from 'classnames'
import { NativeProps, withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import Icon from '@ant-design/icons'
import { IconEye } from '../icons/icon-eye'
import { IconEyeClose } from '../icons/icon-eye-close'
import { useNewControllableValue } from '../../utils/use-controllable-value'

const classPrefix = 'adm-desense-text'

export type DesenseTextProps = {
  desense?: boolean
  defaultDesense?: boolean
  text?: React.ReactNode
  desenseText?: React.ReactNode
  onChange?: (v: boolean) => void
} & NativeProps

const defaultProps = {
  defaultDesense: true,
}

export const DesenseText: FC<DesenseTextProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { text, desenseText } = props

  const [isDesense, setIsDesense] = useNewControllableValue<boolean>({
    value: props.desense,
    defaultValue: props.defaultDesense,
    onChange: props.onChange,
  })
  return withNativeProps(
    props,
    <span className={classPrefix}>
      {isDesense ? desenseText : text}
      <a
        className={classnames(`${classPrefix}-icon-wrap`, 'adm-plain-anchor')}
        onClick={() => {
          setIsDesense(!isDesense)
        }}
      >
        <Icon component={isDesense ? IconEyeClose : IconEye} />
      </a>
    </span>
  )
}
