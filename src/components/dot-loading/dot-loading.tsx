import React, { memo } from 'react'
import classNames from 'classnames'
import { mergeProps } from '../../utils/with-default-props'
import { NativeProps, withNativeProps } from '../../utils/native-props'

const classPrefix = `adm-dot-loading`

const colorRecord: Record<string, string> = {
  default: 'var(--adm-color-weak)',
  primary: 'var(--adm-color-primary)',
  white: 'var(--adm-color-white)',
}

export type DotLoadingProps = {
  // 为啥要加上 `& {}`
  // https://github.com/ant-design/ant-design-mobile/pull/4227
  // string & {} 是个比较 [hack](https://stackoverflow.com/questions/61047551/typescript-union-of-string-and-string-literals) 的方式，
  // 能真正推导出 literal 和 string 的联合类型，使用时会有 literal 枚举值的提示（如下图），一石二鸟。
  // 不加 & {} 的话，color 推导出来的类型会丢失字符串枚举值，和直接声明为 string 类型没啥区别。
  // eslint-disable-next-line ban-types
  color?: 'default' | 'primary' | 'white' | (string & {})
} & NativeProps

const defaultProps = {
  color: 'default',
}

export const DotLoading = memo<DotLoadingProps>(p => {
  const props = mergeProps(defaultProps, p)
  return withNativeProps(
    props,
    <div
      style={{
        color: colorRecord[props.color] ?? props.color,
      }}
      className={classNames('adm-loading', classPrefix)}
    >
      <svg
        height='1em'
        viewBox='0 0 100 40'
        style={{ verticalAlign: '-0.125em' }}
      >
        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g transform='translate(-100.000000, -71.000000)'>
            <g transform='translate(95.000000, 71.000000)'>
              <g transform='translate(5.000000, 0.000000)'>
                {[0, 1, 2].map(i => (
                  <rect
                    key={i}
                    fill='currentColor'
                    x={20 + i * 26}
                    y='16'
                    width='8'
                    height='8'
                    rx='2'
                  >
                    <animate
                      attributeName='y'
                      from='16'
                      to='16'
                      dur='2s'
                      begin={`${i * 0.2}s`}
                      repeatCount='indefinite'
                      values='16; 6; 26; 16; 16'
                      keyTimes='0; 0.1; 0.3; 0.4; 1'
                    />
                  </rect>
                ))}
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
})
