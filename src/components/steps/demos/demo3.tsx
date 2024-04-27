import React from 'react'
import { Button, Space, Steps, SpinLoading } from 'antd-mobile'
import { DemoBlock } from 'demos'
import {
  UndoOutline,
  CheckCircleFill,
  ClockCircleFill,
  HandPayCircleOutline,
} from 'antd-mobile-icons'

const { Step } = Steps

export default () => {
  const stepsData = [
    {
      title: '第一步',
      icon: <CheckCircleFill style={{ backgroundColor: '#fff' }} />,
    },
    {
      title: '第二步',
      icon: <ClockCircleFill style={{ backgroundColor: '#fff' }} />,
    },
    {
      title: '第三步',
      icon: <HandPayCircleOutline style={{ backgroundColor: '#fff' }} />,
    },
  ]

  const steps = stepsData.map((step, index) => (
    <Step key={index} title={step.title} icon={step.icon} />
  ))

  return (
    <>
      <DemoBlock title='步骤控制'>
        <Steps
          direction='vertical'
          current={2}
          style={{
            '--title-font-size': '17px',
            '--description-font-size': '15px',
            '--indicator-margin-right': '12px',
            '--icon-size': '22px',
          }}
        >
          {steps}
        </Steps>
      </DemoBlock>
    </>
  )
}
