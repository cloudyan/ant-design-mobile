/**
 * Returns the nearest number in the array to the target number.
 *
 * @param {number[]} arr - The array of numbers.
 * @param {number} target - The target number.
 * @return {number} The nearest number to the target.
 */
export function nearest(arr: number[], target: number) {
  return arr.reduce((pre, cur) => {
    return Math.abs(pre - target) < Math.abs(cur - target) ? pre : cur
  })
}
