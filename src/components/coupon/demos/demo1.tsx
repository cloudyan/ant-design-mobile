import React from 'react'
import { Button, Coupon } from 'antd-mobile'
import { DemoBlock, lorem } from 'demos'

// 常用字段，全铺平即可
// 可参考的优惠券字段
const couponData = {
  nameBefore: '',
  name: '优惠券名称',
  nameAfter: '',
  // 通用券 满减券 折扣券
  valueBefore: '', // 优惠
  value: 150, // 350 8.8
  valueAfter: '', // 元 折

  // 使用条件
  condition: '无门槛\n最多优惠12元',
  startDate: '2021-05-10 18:29:49',
  endDate: '2029-06-11 18:29:49',

  // 描述或不可用原因
  description: '满5元可用，最高可减12元',
  reason: '优惠券不可用原因',

  tag: '', // 券 tag 标识 新用户专享
  type: 1, // 券类型
  typeText: '满减', // 券类型
  status: 1, // 券状态
  statusText: '', // 券状态

  chosen: false,
  disabled: false,
}

const coupons = [
  {
    id: 1,
    ...couponData,
    // 通用券/满减券
    name: '150元',
    nameAfter: '减息券',
    valueBefore: '优惠',
    value: '550',
    valueAfter: '元',

    // 使用条件
    today: true,
    condition: '无门槛\n最多优惠12元',
    description: '满5元可用，最高可减12元',
  },
  {
    id: 2,
    ...couponData,
    name: '第2期利息',
    nameAfter: '免息券',
    // 折扣券
    valueBefore: '优惠',
    value: '8.8',
    valueAfter: '折',
    tag: '618嘉年华',
    chosen: true,
  },
  {
    id: 3,
    ...couponData,
    used: true,
    status: 2,
    statusText: '已占用',
    reason: '优惠券不可用原因',
  },
  {
    id: 4,
    ...couponData,
    disabled: true,
    // divider: false,
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
