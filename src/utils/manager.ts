// 1. 优先级队列
// 2. 弹窗管理器
// 3. 返回拦截

interface Window {
  isZaf?: boolean // 添加可选属性
}

// 设计目的
// 1. 多弹窗管理，支持优先级，支持级联控制
// 2. 支持全局弹窗管理
// 3. 触发：依次判断条件，触发符合条件的优先级最高的弹窗

// 优先级队列 PriorityQueue，继承自 MinHeap
interface PriorityQueueItem {
  priority: number
  [any: string]: any
}
class PriorityQueue {
  heapContainer: any[]
  constructor() {
    this.heapContainer = []
  }

  sort() {
    // 优先级排序（降序）
    this.heapContainer.sort((a, b) => a.priority - b.priority)
  }

  peek() {
    if (this.heapContainer.length === 0) {
      return null
    }

    return this.heapContainer[0]
  }

  isEmpty() {
    return this.heapContainer.length === 0
  }

  add(item: PriorityQueueItem) {
    const temp = this.find(item)
    if (temp) {
      throw new Error(`priority: ${item.priority} already exists`)
    }
    this.heapContainer.push(item)
    // 校验，如果已存在相同优先级，则报错
    this.sort()
    return this
  }

  remove(item: PriorityQueueItem) {
    const index = this.heapContainer.findIndex(
      it => it.priority === item.priority
    )
    if (index !== -1) {
      this.heapContainer.splice(index, 1)
    }
    return this
  }

  find(item: PriorityQueueItem) {
    return this.heapContainer.find(it => it.priority === item.priority)
  }

  clear() {
    this.heapContainer = []
    return this
  }
}

// DialogManager
// 弹窗管理器，按路由来管理
class DialogManager {
  private static instances: Record<string, DialogManager> = {}
  containers: any[]
  constructor(route: string = location.pathname) {
    this.containers = []
  }

  public static getInstance(name: string): DialogManager {
    if (!DialogManager.instances[name]) {
      DialogManager.instances[name] = new DialogManager()
    }
    return DialogManager.instances[name]
  }

  add = () => {}
  remove = () => {}

  shift = () => {}

  show = () => {}

  isEmpty = (): boolean => {
    return this.containers.length === 0
  }

  clear = () => {}
}

// BackIntercept
// 返回拦截，一个 webview 仅支持设置一次，设置多次会覆盖，需要约束管理
// 因 webview 没法直接管理，所以按路由管理
class BackIntercept {
  inited: boolean
  handleFnName: string
  dialogManager: DialogManager
  constructor(page = '') {
    this.handleFnName = `back_event_callback_${page}`
    this.inited = false
    this.dialogManager = new DialogManager(page)
    this.init()
  }

  init = () => {
    if (this.inited) return
    this.inited = true
  }

  clear = () => {}

  callback = () => {
    if (!this.dialogManager.isEmpty()) {
      this.dialogManager.show()
    } else {
      this.back()
    }
  }

  back = () => {}
}
