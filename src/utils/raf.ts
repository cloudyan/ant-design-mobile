import { canUseDom } from './can-use-dom'

export function raf(fn: FrameRequestCallback): number {
  return canUseDom ? requestAnimationFrame(fn) : -1
}

export function cancelRaf(id: number) {
  if (canUseDom) {
    cancelAnimationFrame(id)
  }
}

// double raf for animation
export function doubleRaf(fn: FrameRequestCallback): void {
  raf(() => raf(fn))
}
