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

type Dialog = {
  id: string // 唯一标识
  name: string // 中文名称备注用途
  priority: number // 优先级
  displayed?: boolean // 是否已展示
  show: () => void // 展示弹窗
  hide?: () => void // 隐藏弹窗
  condition?: Function | null // 展示条件 如果不设置默认为 true
  keep?: boolean // 弹出后是否还要保留
}

type SearchDialogParam = Partial<Dialog> & { id: string }

function isFunction(fn: any) {
  return typeof fn === 'function'
}

// 弹窗管理器，按路由来管理
// 功能列表
//    1. 挽留弹窗有多个，展示条件是异步的，且有优先级要求，需要管理优先级 DialogManager
//    2. ~~移除此逻辑：弹窗支持控制是否依次展示，第一次触发，展示优先级为 1 的弹窗，第二次触发，展示优先级为 2 的弹窗，依次进行~~
//    2. 挽留弹窗展示后，再次点击挽留弹窗，直接退出（不再展示优先级更低的弹窗）调整原因如下
//        1 产品期望如此，2 H5 挽留弹窗遮罩未覆盖返回按钮，无法阻止用户继续点击
//    3. 弹窗支持控制当前弹窗是否还需要重复展示
//    4. 支持兼容 zaf.setCloseController 场景的老逻辑优先级管理（避免干扰返回拦截的控制）
//    5. 支持全局挽留弹窗的管理
class DialogManager {
  containers: Dialog[]
  constructor(route: string) {
    this.containers = []
  }

  find = (dialog: SearchDialogParam): Dialog | undefined => {
    return this.containers.find(item => {
      return item.id === dialog.id || item.priority === dialog.priority
    })
  }

  // 优先级排序
  sort = () => {
    this.containers.sort((a, b) => a.priority - b.priority)
  }

  add = (dialog: Dialog) => {
    // 报错会终止后续程序，弹窗因触发条件复杂，又使用场景也很复杂，导致测试环境不容易验证到
    // 所以这里报错改为 error 日志
    Object.assign(dialog, { displayed: false })
    if (!dialog.id) {
      console.error('dialog id is required')
    }
    const result = this.find(dialog)
    // 同一个路由上，弹窗的 id 及 priority 要唯一，会日志报错
    if (result) {
      console.log('add dialog', dialog)
      console.error(`dialog id or priority already exists, will be covered`)
      // 已存在会覆盖处理（作为全新的弹窗）
      Object.assign(result, dialog)
    } else {
      // 否则新增
      this.containers.push(dialog)
    }
    this.sort()
    return this
  }

  // 操作所有弹窗
  remove = (dialog: SearchDialogParam) => {
    const index = this.containers.findIndex(item => {
      return item.id === dialog.id || item.priority === dialog.priority
    })
    if (index !== -1) {
      this.containers.splice(index, 1)
    }
    return this
  }

  shift = (bool?: boolean) => {
    if (bool) {
      return this.containers.shift()
    }
    const dialogs = this.containers.filter(dialog => this.getCondition(dialog))
    if (dialogs.length === 0) return
    const dialog = dialogs[0]
    this.remove(dialog)
    return dialog
  }

  show = (dialog?: SearchDialogParam) => {
    if (this.containers.length === 0) return false
    let operDialog
    const dialogs = this.containers.filter(dialog => this.getCondition(dialog))
    if (!dialog) {
      if (dialogs.length === 0) return false
      operDialog = dialogs[0]
    } else {
      const result = this.find(dialog)
      if (result && this.getCondition(result)) {
        operDialog = result
      }
    }

    console.log('挽留弹窗队列', operDialog, dialogs, this.containers)
    if (operDialog) {
      if (isFunction(operDialog.show)) {
        operDialog.show()
        // 1. 当前弹窗弹出后，依据用户操作控制是否还需要保留，默认false（要保留，可通过 keep 和 remove 实现）
        // 2. ~~当前弹窗触发后，是否继续触发下一级弹窗~~（通过 dialogManager.show() 控制）
        // 3. 因 H5 遮罩层未覆盖返回按钮，所以取消触发下一级弹窗（即取消 2 的行为，最多展示一次弹窗，之后再点击返回，直接退出）
        if (!operDialog.keep) {
          // 为了便于弹窗显示后还能控制弹窗，这里不移除
          Object.assign(operDialog, { displayed: true })
          // this.remove(operDialog);
        }

        // 弹窗展示后，就清除所有弹窗
        this.clear()
      }
      return true // 有弹窗展示返回 true
    }
  }

  hide = (dialog: SearchDialogParam) => {
    const operDialog = this.find(dialog)
    if (operDialog && isFunction(operDialog.hide)) {
      operDialog?.hide()
    }
  }

  // 展示条件
  getCondition = (dialog: Dialog) => {
    if (dialog.displayed === true) {
      return false
    }
    if (isFunction(dialog.condition)) {
      return dialog.condition()
    }
    return true
  }

  // 更新弹窗配置信息，
  update = (dialog: SearchDialogParam) => {
    const result = this.find({ id: dialog.id })
    if (result) {
      Object.assign(result, dialog)
    }
    this.sort()
  }

  // 是否有符合展示的弹窗
  isEmpty = (bool?: boolean): boolean => {
    if (bool) {
      return this.containers.length === 0
    }
    const dialogs = this.containers.filter(dialog => this.getCondition(dialog))
    return dialogs.length === 0
  }

  clear = () => {
    this.containers = []
  }
}

// 返回拦截，一个 webview 仅支持设置一次，设置多次会覆盖，需要约束管理
// 因 webview 没法直接管理，所以按路由管理
// 功能列表
//    1. 按路由来管理返回拦截，包含弹窗管理器
//    2. 触发时，调用弹窗管理器的 show 方法
//    3. zaf.setCloseController 需要统一在此处管理，不能其他处使用
// 可以按照路由级别进行迁移改造
// 使用时，通过 init 和 reset 控制初始化和还原重置
let uniqueId = 0
class BackIntercept {
  pagesMap = new Map()
  constructor() {}
  init = () => {
    this.reset() // 初始化先重置
    const currentPage = this.getCurrentPage()
    // if (currentPage.inited) return;
    currentPage.inited = true
    if (window.isZaf) {
      const fnName: string = currentPage.handleFnName
      window[fnName] = async () => {
        this.callback()
      }

      // 可以改写 setCloseController 获取上一次调用的设置
      zaf.setCloseController({
        triggerClose: `window.${currentPage.handleFnName}()`,
        functionType: '1',
      })
    } else {
      // 效果，需要 devtool 使用 history.back（不是所有 back 都支持）
      window.addEventListener('popstate', this.callback)
      window.addEventListener('unload', this.reset)
      if (window.history.state?.type !== 'retain-popup') {
        // 如果当前堆栈是弹窗的，则不会继续压栈
        const state = {
          type: 'retain-popup',
          url: window.location.href,
          time: Date.now(),
        }
        window.history.pushState(state, '', window.location.hash)
      }
    }
  }

  callback = () => {
    const currentPage = this.getCurrentPage()
    if (currentPage.displayed) {
      this.back()
    }
    const hasShow = currentPage.dialogManager.show()
    if (hasShow) {
      currentPage.displayed = true
    } else {
      this.back()
    }
  }

  getCurrentPage = () => {
    const route = location.pathname.split('/').join('_')
    let currentPage = this.pagesMap.get(route)
    if (!currentPage) {
      currentPage = {
        inited: false,
        displayed: false, // 一个页面，弹窗展示一次后，就不再弹任何弹窗了
        route: route,
        handleFnName: `back_event_callback_${uniqueId++}`,
        dialogManager: new DialogManager(route),
      }
      this.pagesMap.set(route, currentPage)
    }
    return currentPage
  }

  back = () => {
    if (window.isZaf) {
      zaf.navigateBack()
    } else {
      history.back()
    }
  }

  clear = () => {
    this.reset()
  }

  reset = () => {
    const currentPage = this.getCurrentPage()
    currentPage.dialogManager.clear()
    currentPage.inited = false // 需要重新初始化
    currentPage.displayed = false
    if (window.isZaf) {
      if (version.gte('2.4.0')) {
        // clear()
      } else {
        zaf.setCloseController({
          triggerClose: '',
          functionType: '1',
        })
      }
    } else {
      window.removeEventListener('popstate', this.callback)
      window.addEventListener('unload', this.reset)

      // 释放history堆栈
      if (window.history.state?.type === 'retain-popup') {
        if (process.env.NODE_ENV !== 'development') {
          // 热更新时以及老逻辑会有问题，暂不处理
          // window.history.back()
        }
      }
    }
  }

  // add 时按需 init
  add = (dialog: Dialog) => {
    const currentPage = this.getCurrentPage()
    if (!currentPage.inited) {
      this.init()
    }
    currentPage.dialogManager.add(dialog)
  }

  remove = (dialog: SearchDialogParam) => {
    const currentPage = this.getCurrentPage()
    currentPage.dialogManager.remove(dialog)
  }

  show = (dialog?: SearchDialogParam) => {
    const currentPage = this.getCurrentPage()
    // 需要返回值
    return currentPage.dialogManager.show(dialog)
  }
  hide = (dialog?: SearchDialogParam) => {
    const currentPage = this.getCurrentPage()
    currentPage.dialogManager.hide(dialog)
  }
}

export const backIntercept = new BackIntercept()
