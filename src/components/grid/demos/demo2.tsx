import React from 'react'
import { Grid } from 'antd-mobile'
import { DemoBlock } from 'demos'

import './demo2.less'

export default () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

  const numberKeyboard = []

  return (
    <div className='grid-demo'>
      <p>
        <a
          href='https://www.w3.org/TR/css3-grid-layout/'
          target='_blank'
          rel='noopener noreferrer'
        >
          https://www.w3.org/TR/css3-grid-layout/
        </a>
      </p>

      <DemoBlock title='数字键盘'>
        <div className='block'>
          <div className='kit-grid kit-grid-number'>
            <div className='kit-grid-item'>7</div>
            <div className='kit-grid-item'>8</div>
            <div className='kit-grid-item'>9</div>
            <div className='kit-grid-item'>4</div>
            <div className='kit-grid-item'>5</div>
            <div className='kit-grid-item'>6</div>
            <div className='kit-grid-item'>1</div>
            <div className='kit-grid-item'>2</div>
            <div className='kit-grid-item'>3</div>
            <div className='kit-grid-item a0'>0</div>
            <div className='kit-grid-item dot'>.</div>
            <div className='kit-grid-item del'>Del</div>
            <div className='kit-grid-item ac'>AC</div>
          </div>
        </div>
      </DemoBlock>

      <DemoBlock title='数字键盘'>
        <div className='block'>
          <div className='kit-grid kit-grid-tpl'>
            <div className='kit-grid-item a9'>9</div>
            <div className='kit-grid-item a7'>7</div>
            <div className='kit-grid-item a8'>8</div>
            <div className='kit-grid-item a6'>6</div>
            <div className='kit-grid-item a5'>5</div>
            <div className='kit-grid-item a4'>4</div>
            <div className='kit-grid-item a3'>3</div>
            <div className='kit-grid-item a2'>2</div>
            <div className='kit-grid-item a1'>1</div>
            <div className='kit-grid-item a0'>0</div>
            <div className='kit-grid-item dot'>.</div>
            <div className='kit-grid-item del'>Del</div>
            <div className='kit-grid-item ac'>AC</div>
          </div>
        </div>
      </DemoBlock>

      <DemoBlock title='计算器面板'>
        <div className='block'>
          <div className='kit-grid kit-grid-tpl calculator'>
            <div className='kit-grid-item a9'>9</div>
            <div className='kit-grid-item a7'>7</div>
            <div className='kit-grid-item a8'>8</div>
            <div className='kit-grid-item a6'>6</div>
            <div className='kit-grid-item a5'>5</div>
            <div className='kit-grid-item a4'>4</div>
            <div className='kit-grid-item a3'>3</div>
            <div className='kit-grid-item a2'>2</div>
            <div className='kit-grid-item a1'>1</div>
            <div className='kit-grid-item a0'>0</div>
            <div className='kit-grid-item dot'>.</div>
            <div className='kit-grid-item del'>Del</div>
            <div className='kit-grid-item ac'>AC</div>
            <div className='kit-grid-item addition'>+</div>
            <div className='kit-grid-item subtraction'>-</div>
            <div className='kit-grid-item multiplication'>x</div>
            <div className='kit-grid-item division'>/</div>
            <div className='kit-grid-item percentage'>%</div>
            <div className='kit-grid-item equal'>=</div>
            {/* <!-- <div className="kit-grid-item reverse">+/-</div> --> */}
          </div>
        </div>
      </DemoBlock>
    </div>
  )
}
