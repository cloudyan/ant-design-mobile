import { sleep } from 'antd-mobile/es/utils/sleep'
import { basicColumns } from './columns-data'

export async function mockRequest({ delay }: { delay: number }) {
  await sleep(delay)
  return basicColumns
}
