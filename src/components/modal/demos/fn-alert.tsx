import { Modal } from 'antd-mobile'
// 使用 useId hook，如果 react 低于 18 版本，可以 `@reach/auto-id` 替代
import { useId } from 'react'
// import { useId } from '@reach/auto-id'

import './fn-alert.less'

// 逻辑封装在内部，通过函数式调用
interface IAlertOptions {
  type: '01' | '02'
}
export const fnAlert = (options: IAlertOptions) => {
  const { type } = options
  // const prefixCls = useId()

  const types = {
    '01': {
      title: '标题 1',
      content: '内容 1',
    },
    '02': {
      title: '标题 2',
      content: '内容 2',
    },
  }

  // import { createStyles, css } from 'antd-style';
  // const injectStyle = `${prefixCls} {}`

  const data = types[type]

  const style = {
    backgroundImage: 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
    // backgroundColor: 'rgba(255, 0, 0, 0.1)',
  }

  // 支持插入 style 样式表，方便设置样式，为了避免冲突，统一加 useId 做类前缀
  Modal.alert({
    className: 'alert-fn', // 需要自定义类约束样式范围
    // bodyStyle: style,
    // title: '', // data.title,
    content: data.content,
    onConfirm: () => {
      console.log('onConfirm')
    },
    onClose: () => {
      console.log('onClose')
    },
  })
}
