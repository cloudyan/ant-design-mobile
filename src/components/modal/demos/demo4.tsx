import React, { useRef } from 'react'
import { Button, Modal, Space, Toast, Divider } from 'antd-mobile'
import { DemoBlock, DemoDescription, sleep } from 'demos'
import { fnShow, fnAlert, ModalRef, modalFn } from './fn-modal'

// 如何避免
export default () => {
  const modalRef = useRef(null)
  return (
    <>
      <DemoBlock title='封装函数式复用'>
        <Space direction='vertical' block>
          <Button
            block
            onClick={() => fnShow({ type: '01' })}
            style={{ position: 'relative', zIndex: 1500 }}
          >
            show 弹窗 1
          </Button>
          <Button
            block
            onClick={() => fnAlert({ type: '02' })}
            style={{ position: 'relative', zIndex: 1500 }}
          >
            alert 弹窗 2
          </Button>
          <Button
            block
            onClick={() => modalFn()}
            style={{ position: 'relative', zIndex: 1500 }}
          >
            modal 弹窗 3
          </Button>
        </Space>
      </DemoBlock>

      <DemoBlock title='Modal Ref'>
        {/* 更新 */}
        <Space>
          <Button block onClick={() => modalRef.current?.show()}>
            显示
          </Button>
          <Button block onClick={() => modalRef.current?.close()}>
            关闭
          </Button>
          <ModalRef ref={modalRef} />
        </Space>
      </DemoBlock>
    </>
  )
}
