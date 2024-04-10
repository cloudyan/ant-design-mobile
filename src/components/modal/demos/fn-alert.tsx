import { Modal } from 'antd-mobile'

// 逻辑封装在内部，通过函数式调用
interface IAlertOptions {
  type: '01' | '02'
}
export const fnAlert = (options: IAlertOptions) => {
  const { type } = options

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

  const data = types[type]

  const style = {
    backgroundImage: 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
    // backgroundColor: 'rgba(255, 0, 0, 0.1)',
  }

  Modal.alert({
    bodyStyle: style,
    title: data.title,
    content: data.content,
    onConfirm: () => {
      console.log('onConfirm')
    },
    onClose: () => {
      console.log('onClose')
    },
  })
}
