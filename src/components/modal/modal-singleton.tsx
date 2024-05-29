// 使用函数式控制显示，支持单例
import { show } from './show'

// 按 name 实现单例import { Modal } from '@zafe/fiui'
function isFunction(fn: any) {
  return typeof fn === 'function'
}

export class ModalSingleton {
  private static instances: Record<string, ModalSingleton> = {}
  private handler: any

  private constructor() {}

  public static getInstance(name: string): ModalSingleton {
    if (!ModalSingleton.instances[name]) {
      ModalSingleton.instances[name] = new ModalSingleton()
    }
    return ModalSingleton.instances[name]
  }

  public show(props: any) {
    this.close()
    this.handler = show(props)
  }

  public close() {
    if (this.handler && isFunction(this.handler.close)) {
      this.handler.close()
      this.handler = null
    }
  }
}
