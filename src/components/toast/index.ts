import { clear, show, config } from './methods'
import './toast.less'

export type { ToastShowProps, ToastHandler } from './methods'

const Toast = {
  show,
  clear,
  config,
}

export default Toast
