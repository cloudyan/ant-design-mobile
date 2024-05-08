// promise 工具类
// - pollingRace 轮询竞争
// - pLimit 控并发请求
// - pAll
// - pAny
// - pTry
// - pDeferred
// - pRetry
// - pTimeout
// - pSome

export const sleep = (ms: number, ...rest: any) =>
  new Promise(resolve => setTimeout(resolve, ms, ...rest))

// 诉求：单接口轮询
// 1. 并发轮询请求，每间隔 N 秒，请求一次（不必等请求返回）
// 2. 支持轮询控制，轮询最大次数、轮询超时结束时间、轮询时间间隔、自定义轮询结束条件
type Task = () => any | Promise<any>
type Tasks = Array<Task>

interface PollingRaceOptions {
  concurrency?: 1 | 2 | 3 // 并行数，默认 1，(过大会导致阻塞 HTTP/1.1 并发请求)
  timeout: number // 轮询超时结束时间
  maxTimes: number // 轮询最大次数
  interval: number // 轮询时间间隔
  request: () => Promise<any> // 请求函数
  resolved: (res: any) => boolean // 轮询结束条件
}

// 单接口轮询，一个解析为满足条件的第一个请求结果的Promise，或者在超时时间到达时拒绝错误
export function pollingRace(options: PollingRaceOptions) {
  const {
    concurrency = 2,
    interval = 1000,
    maxTimes,
    timeout,
    request,
    resolved,
  } = options

  return new Promise((resolve, reject) => {
    const result = <any>[]
    const len = maxTimes
    let currentIndex = 0
    let resolveCount = 0
    let isOver = false

    function next(index: number): any {
      const task: Task = request
      Promise.resolve(task())
        .then(res => {
          result[index] = res
          resolveCount++
          if (resolved(res)) {
            isOver = true
            resolve(res)
          }
        })
        .catch(err => {
          result[index] = err
          resolveCount++
        })
        .finally(() => {
          // resolveCount === len 时轮询请求全部结束
          // 此处我们什么都不做
          if (currentIndex < len) {
            goNext(1)
          }
        })
    }

    function goNext(i: number) {
      const index = currentIndex++
      setTimeout(() => {
        if (isOver) return
        next(index)
      }, interval * i)
    }

    for (let i = 0; i < concurrency && i < len; i++) {
      goNext(i)
    }

    if (timeout > 0) {
      setTimeout(() => {
        isOver = true
        reject({
          message: 'timeout',
          value: timeout,
          result,
        })
      }, timeout)
    }
  })
}

type Mapper = (res: any, index: number) => any
/**
 * 有限并发执行一组任务。
 *
 * @param {Tasks} [promiseTasks=[]] - 要执行的任务数组。每个任务都是返回Promise的函数。
 * @param {number} concurrency - 可以并发执行的最大Promise数量。
 * @param {Function} mapper - 请求结果处理函数，返回处理后的数据
 * @return {Promise<any[]>} 一个Promise，解析为结果数组，顺序与原始任务相同。
 */
export function pLimit(
  tasks: Tasks = [],
  mapper: Mapper = (res: any, index: number) => res,
  concurrency: number
) {
  const cloneTasks = Array.from(tasks)
  return new Promise((resolve, reject) => {
    const result: any[] = []
    const len = cloneTasks.length
    let currentIndex = 0
    let resolveCount = 0

    function next() {
      const index = currentIndex++
      const task = cloneTasks[index]
      Promise.resolve(task())
        .then(res => mapper(res, index))
        .then(res => {
          result[index] = res
          resolveCount++
        })
        .catch(err => {
          result[index] = err
          resolveCount++
        })
        .finally(() => {
          if (resolveCount === len) resolve(result)
          if (currentIndex < len) next()
        })
    }

    for (let i = 0; i < concurrency && i < len; i++) {
      next()
    }
  })
}

type GenericFunction = (...args: any[]) => any

type Step = {
  [key: string]: any
}
type Steps = Array<Step>

export class GenStep {
  steps: Steps = []
  _queue: any[] = []
  current = 0
  constructor(steps: Steps) {
    this.steps = steps
    setTimeout(() => {
      this.next()
    }, 0)
  }

  addTask(fn: GenericFunction, ms = 0, first = false) {
    const task: GenericFunction = () => {
      setTimeout(() => {
        fn && fn()
        this.next()
      }, ms)
    }
    if (first) {
      this._queue.unshift(task)
    } else {
      this._queue.push(task)
    }
    return this
  }

  sleep(ms: number) {
    this.addTask(() => {}, ms)
    return this
  }

  next() {
    const fn = this._queue.shift()
    fn && fn()
  }
}

export class PollingStep extends GenStep {
  constructor(steps: Steps) {
    super(steps)
  }

  showStep(current: number) {
    this.addTask(() => {
      this.current = current
      if (!this.steps[this.current]) {
        this.steps[this.current] = {}
      }
    })
    return this
  }

  showIcon(status: string) {
    this.addTask(() => {
      if (!this.steps[this.current]) {
        this.steps[this.current] = {}
      }
      this.steps[this.current].icon = status
    })
    return this
  }
  showTitle(title: string) {
    this.addTask(() => {
      if (!this.steps[this.current]) {
        this.steps[this.current] = {}
      }
      this.steps[this.current].title = title
    })
    return this
  }
}
