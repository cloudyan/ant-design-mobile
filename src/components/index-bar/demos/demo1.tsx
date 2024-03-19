import React from 'react'
import { IndexBar, List } from 'antd-mobile'
import { lorem } from 'demos'

const getRandomList = (min: number, max: number): string[] => {
  // unicorn/no-new-array: Do not use `new Array(singleArgument)`
  // return new Array(Math.floor(Math.random() * (max - min) + min)).fill('')
  const n = Math.floor(Math.random() * (max - min) + min)
  return Array.from({ length: n })
}

const charCodeOfA = 'A'.charCodeAt(0)
const groups = Array(26)
  .fill('')
  .map((_, i) => ({
    title: String.fromCharCode(charCodeOfA + i),
    items: getRandomList(3, 10).map(() => lorem.generateWords(2)),
  }))

export default () => {
  return (
    <div style={{ height: window.innerHeight }}>
      <IndexBar>
        {groups.map(group => {
          const { title, items } = group
          return (
            <IndexBar.Panel
              index={title}
              title={`标题${title}`}
              key={`标题${title}`}
            >
              <List>
                {items.map((item, index) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List>
            </IndexBar.Panel>
          )
        })}
      </IndexBar>
    </div>
  )
}
