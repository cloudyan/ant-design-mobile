export const sleep = (time: number, ...rest: any) =>
  new Promise(resolve => setTimeout(resolve, time, ...rest))
