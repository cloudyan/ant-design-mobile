import React, { useState } from 'react'
import { Form, Input } from 'antd-mobile'
import { DemoBlock } from 'demos'
import styles from './demo2.less'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useSetState } from 'ahooks'

export default () => {
  const [visible, setVisible] = useState(false)
  const [phone, setPhone] = useState('')
  const [state, setState] = useSetState({
    username: '',
    phone: '',
    email: '',
    password: '',
    code: '',
  })

  const onPhoneChange = (val: string) => {
    const formatedValue = val.trim()
    console.log(
      `onPhoneChange: %c${val}%c${formatedValue}`,
      'background: red',
      'background: green'
    )
    setPhone(v => {
      return formatedValue
    })
  }

  console.log('phone', phone)

  return (
    <>
      <DemoBlock title='带校验的输入框' padding='0'>
        <Form layout='horizontal'>
          {/* <Form.Item label='用户名' name='username'>
            <Input placeholder='请输入用户名' clearable />
          </Form.Item> */}
          <Form.Item label='手机号' name='phone'>
            <Input
              value={phone}
              onChange={onPhoneChange}
              placeholder='请输入手机号'
              clearable
            />
          </Form.Item>
          {/* <Form.Item label='邮箱' name='email'>
            <Input placeholder='请输入密码' clearable type='password' />
          </Form.Item> */}
          {/* <Form.Item
            label='密码'
            name='password'
            extra={
              <div className={styles.eye}>
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            }
          >
            <Input
              placeholder='请输入密码'
              clearable
              type={visible ? 'text' : 'password'}
            />
          </Form.Item> */}
          {/* <Form.Item
            label='短信验证码'
            extra={
              <div className={styles.extraPart}>
                <a>发送验证码</a>
              </div>
            }
          >
            <Input placeholder='请输入验证码' clearable />
          </Form.Item> */}
        </Form>
      </DemoBlock>

      <DemoBlock title='带校验的输入框' padding='0'>
        <input />
      </DemoBlock>
    </>
  )
}
