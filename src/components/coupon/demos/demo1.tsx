import React from 'react'
import { Button, Coupon } from 'antd-mobile'
import { DemoBlock, lorem } from 'demos'

// 常用字段，全铺平即可
// 可参考的优惠券字段
const couponData = {
  name: '优惠券名称',
  value: 150,
  disabled: false,
  chosen: false,
  currency: '¥',

  // 通用券
  valueDesc: '150',
  unitDesc: '元',
  // 满减券
  // 折扣券
  // valueDesc: '8.8',
  // unitDesc: '折',
  type: 1, // 券类型
  typeText: '满减', // 券类型

  // 使用条件
  condition: '无门槛\n最多优惠12元',
  description: '满5元可用，最高可减12元',
  // 不可用原因
  reason: '优惠券不可用原因',

  startDate: '2021-05-10 18:29:49',
  endDate: '2029-06-11 18:29:49',
  status: 1, // 券状态
  statusText: '', // 券状态
  tag: '', // 券 tag 标识 新用户专享
}

const coupons = [
  {
    id: 1,
    ...couponData,
    // 通用券/满减券
    name: '150元',
    nameDesc: '减息券',
    preValue: '优惠',
    valueDesc: '550',
    unitDesc: '元',

    // 使用条件
    today: true,
    condition: '无门槛\n最多优惠12元',
    description: '满5元可用，最高可减12元',
  },
  {
    id: 2,
    ...couponData,
    name: '第2期利息',
    nameDesc: '免息券',
    // 折扣券
    preValue: '优惠',
    valueDesc: '8.8',
    unitDesc: '折',
    tag: '618嘉年华',
    chosen: true,
  },
  {
    id: 3,
    ...couponData,
    disabled: true,
    status: 2,
    statusText: '已占用',
    reason: '优惠券不可用原因',
  },
  {
    id: 4,
    ...couponData,
    disabled: true,
    divider: false,
    reason: '优惠券不可用原因',
  },
]

export default () => {
  const items = coupons.map(item => {
    return <Coupon key={item.id} {...item}></Coupon>
  })

  return (
    <>
      <DemoBlock title='基础用法'>
        {items}

        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            padding: '12px',
          }}
        >
          <Button color='primary' block>
            使用优惠券
          </Button>
        </div>
      </DemoBlock>
    </>
  )
}
