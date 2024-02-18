import { canUseDom } from './can-use-dom'

export type Numeric = number | string

export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

export function isPromise(obj: unknown): obj is Promise<unknown> {
  return (
    !!obj && typeof obj === 'object' && typeof (obj as any).then === 'function'
  )
}

export function isDate(val: unknown): val is Date {
  return (
    Object.prototype.toString.call(val) === '[object Date]' &&
    !Number.isNaN((val as Date).getTime())
  )
}

export function isDateString(val: unknown): val is string {
  if (typeof val !== 'string') return false
  const dateRegex = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/
  return dateRegex.test(val)
}

// https://regexp.deepjs.cn/
export function isMobile(value: string): boolean {
  value = value.replace(/[^-|\d]/g, '')
  return (
    /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
  )
}

export function isNumeric(val: any): val is Numeric {
  return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)
}

export function isAndroid(): boolean {
  return canUseDom ? /android/.test(navigator.userAgent.toLowerCase()) : false
}

export function isIOS(): boolean {
  return canUseDom
    ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
    : false
}
