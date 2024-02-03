import React, { useEffect, useState } from 'react'
import { InfiniteScroll, PullToRefresh, List } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'

const GetPullToRefreshlData = (props: { itemKey: string }) => {
  const { itemKey } = props
  function getNextData() {
    const ret: string[] = []
    for (let i = 0; i < 100; i += 1) {
      ret.push(`${i}`)
    }
    return ret
  }
  const [data, setData] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true)
  const loadMore = async () => {
    const append = await getNextData()
    setData([...data, ...append])
    setHasMore(append.length > 0)
  }

  useEffect(() => {
    setData([])
    getNextData()
  }, [itemKey])

  return (
    <div style={{ height: '100vh', overflowY: 'scroll' }}>
      <PullToRefresh
        key={itemKey}
        onRefresh={async () => {
          await sleep(1000)
          setData([...getNextData(), ...data])
        }}
      >
        <List>
          {data.map((item: any, index: number) => (
            <List.Item key={index}>
              {item}-{index}
            </List.Item>
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  )
}

export default GetPullToRefreshlData
