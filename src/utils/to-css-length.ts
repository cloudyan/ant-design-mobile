/**
 * 将一个值转换为CSS长度。
 * 如果为数字，转为 px 单位的CSS长度，否则不变
 * @param {string | number} val - 要转换的值。
 * @return {string} 转换后的CSS长度。
 */
export function toCSSLength(val: string | number) {
  return typeof val === 'number' ? `${val}px` : val
}
