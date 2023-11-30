/**
 * 生成一个整数数组，从给定的起始数到结束数（包括）。
 *
 * @param {number} from - 起始数。
 * @param {number} to - 结束数。
 * @return {number[]} 从起始数到结束数的整数数组。
 *
 * @example
 * generateIntArray(1, 5); // [1, 2, 3, 4, 5]
 * generateIntArray(10, 15); // [10, 11, 12, 13, 14, 15]
 */
export function generateIntArray(from: number, to: number) {
  const array: number[] = []
  for (let i = from; i <= to; i++) {
    array.push(i)
  }
  return array
}
