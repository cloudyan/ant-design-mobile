export function pxToNumber(value: string | null): number {
  if (!value) return 0
  const match = value.match(/^\d*(\.\d*)?/)
  return match ? Number(match[0]) : 0
}

export function toFixed(num: number, precision: number = 2) {
  return parseInt((Math.round(num * 100) / 100).toFixed(precision))
}
