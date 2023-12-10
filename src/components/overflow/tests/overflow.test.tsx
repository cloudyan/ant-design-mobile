import React from 'react'
import { fireEvent, render, testA11y } from 'testing'
import Overflow from '..'

const classPrefix = `adm-overflow`
const content =
  '蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。'

const lineHeight = 19.5

describe('Overflow', () => {
  const originGetComputedStyle = window.getComputedStyle

  beforeAll(() => {
    window.getComputedStyle = el => {
      const style = originGetComputedStyle(el)
      style.lineHeight = `${lineHeight}px`
      return style
    }
  })

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get() {
        if (this.innerHTML.includes('...')) {
          const row = Math.ceil(
            // the width of '...' is equal to a Chinese char
            (this.innerHTML.replace(/\.\.\./g, '中').length / content.length) *
              4
          )
          return lineHeight * row
        }
        return lineHeight * 4
      },
    })
  })

  afterAll(() => {
    window.getComputedStyle = originGetComputedStyle
  })

  test('a11y', async () => {
    await testA11y(<Overflow content={content} />)
  })

  test('direction end', () => {
    const { getByTestId } = render(
      <Overflow content={content} data-testid='overflow' />
    )
    expect(getByTestId('overflow')).toMatchSnapshot()
  })

  test('multi line', () => {
    const { getByTestId } = render(
      <Overflow content={content} rows={3} data-testid='overflow' />
    )
    expect(getByTestId('overflow')).toMatchSnapshot()
  })

  test('expand and collapse', () => {
    const { getByTestId, getByText } = render(
      <Overflow
        content={content}
        expandText='expand'
        collapseText='collapse'
        data-testid='overflow'
      />
    )

    fireEvent.click(getByText('expand'))
    expect(getByTestId('overflow')).toMatchSnapshot()
    fireEvent.click(getByText('collapse'))
    expect(getByTestId('overflow')).toMatchSnapshot()
  })

  test('content click', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <Overflow
        content={content}
        data-testid='overflow'
        onContentClick={onClick}
      />
    )

    fireEvent.click(getByTestId('overflow'))
    expect(onClick).toBeCalled()
  })
})
