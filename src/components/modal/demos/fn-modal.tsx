import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { Button, Modal } from 'antd-mobile'
import { CloseOutline } from 'antd-mobile-icons'
// 使用 useId hook，如果 react 低于 18 版本，可以 `@reach/auto-id` 替代
// import { useId } from 'react'
// import { useId } from '@reach/auto-id'

import './fn-modal.less'

// 逻辑封装在内部，通过函数式调用
interface IAlertOptions {
  type: '01' | '02'
}
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
// const prefixCls = useId()
// import { createStyles, css } from 'antd-style';
// const injectStyle = `${prefixCls} {}`
export const fnShow = (options: IAlertOptions) => {
  const { type } = options
  const data = types[type]

  const close = () => {
    modalHandler.close()
  }
  const onConfirm = () => {
    modalHandler.close()
    console.log('去借款')
  }
  // 自定义关闭按钮，怎么触发关闭动作？通过 handler 关闭
  const content = (
    <>
      <div className='custom-close'>
        <CloseOutline onClick={close} />
      </div>
      {data.content}
      {/* <Button color='primary' block onClick={close}>
        我知道了
      </Button> */}
    </>
  )

  // 支持插入 style 样式表，方便设置样式，为了避免冲突，统一加 useId 做类前缀(该方案不好，直接使用 className 即可)
  // 问题：
  // 1. alert 不会返回 handler，需要使用 show 方法
  // 2. 多次调用会展示多个弹窗，期望能支持单例，多次调用还是一个
  const modalHandler = Modal.show({
    // singleton, // 支持单例
    className: 'fn-modal', // 需要自定义类约束样式范围
    // bodyStyle: style,
    // title: '', // data.title,
    content: content,
    showCloseButton: true,
    // onConfirm: () => {
    //   console.log('onConfirm')
    // },
    onClose: () => {
      console.log('onClose')
    },
    closeOnAction: true,
    actions: [
      {
        key: 'confirm',
        text: '我知道了',
        primary: true,
        onClick: onConfirm,
      },
    ],
  })
}

export const fnAlert = (options: IAlertOptions) => {
  const { type } = options
  const data = types[type]
  // 自定义关闭按钮，怎么触发关闭动作？通过 handler 关闭
  const close = () => {
    console.log('点击无效果')
  }
  const content = (
    <>
      <div className='custom-close'>
        <CloseOutline onClick={close} />
      </div>
      {data.content}
    </>
  )

  // alert 无法操作控制器对象 handler
  const modalHandler = Modal.alert({
    className: 'fn-modal', // 需要自定义类约束样式范围
    // bodyStyle: style,
    // title: '', // data.title,
    content: content,
    showCloseButton: true,
    // closeOnAction: true, // 不支持
    onConfirm: () => {
      console.log('onConfirm')
    },
    onClose: () => {
      console.log('onClose')
    },
  })
}

// modal 声明式结合 ref 使用
// 1. 不要滥用 ref。
// 2. 如果可以通过 prop 实现，那就不应该使用 ref。
export const ModalRef = forwardRef((props, ref) => {
  const modalRef = useRef(null)
  const [visible, setVisible] = useState(false)

  const onConfirm = () => {
    setVisible(false)
    console.log('onConfirm')
  }

  useImperativeHandle(ref, () => ({
    show: () => {
      // modalRef.current.focus();
      setVisible(true)
    },
    close: () => {
      setVisible(false)
    },
  }))

  return (
    <>
      <Modal
        {...props}
        className='ref-modal'
        visible={visible}
        content='人在天边月上明'
        // closeOnAction
        // maskStyle={{ opacity: 0.4, backgroundColor: 'red' }}
        onClose={() => {
          setVisible(false)
        }}
        actions={[
          {
            key: 'confirm',
            text: '我知道了',
            onClick: onConfirm,
          },
        ]}
      />
    </>
  )
})