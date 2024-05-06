import React from 'react'
import { Steps } from 'antd-mobile'
import { DemoBlock } from 'demos'
import {
  CheckCircleFill,
  ClockCircleFill,
  HandPayCircleOutline,
} from 'antd-mobile-icons'

const { Step } = Steps

export default () => {
  const stepsData = [
    {
      title: '第一步',
      icon: <CheckCircleFill />,
    },
    {
      title: '第二步',
      icon: <ClockCircleFill />,
    },
    {
      title: '第三步',
      icon: <HandPayCircleOutline />,
    },
    {
      title: '第四步',
      icon: <HandPayCircleOutline />,
    },
  ]

  const steps = stepsData.map((step, index) => (
    <Step key={index} title={step.title} icon={step.icon} />
  ))

  return (
    <>
      <DemoBlock title='步骤控制'>
        <Steps
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
