import React, { useState, useRef } from 'react'
import { render, testA11y, fireEvent } from 'testing'
import Calendar, { CalendarRef } from '..'
import dayjs from 'dayjs'
import MockDate from 'mockdate'

const classPrefix = `adm-calendar`

// mock today
MockDate.set(new Date('2023-05-22'))

const mixDate: Date = new Date('2023-05-01')
const maxDate: Date = new Date('2023-05-31')
const singleDate: Date = new Date('2023-05-03')
const rangeDate: [Date, Date] = [new Date('2023-05-04'), new Date('2023-05-07')]

describe('Calendar', () => {
  test('a11y', async () => {
    await testA11y(<Calendar />)
  })

  test('single mode', async () => {
    const fn = jest.fn()
    const { container, getByText, getAllByText } = render(
      <Calendar
        selectionMode='single'
        defaultValue={singleDate}
        min={mixDate}
        max={maxDate}
        usePopup={false}
        onChange={fn}
      />
    )

    expect(container).toMatchSnapshot()
    const dateEl = getAllByText(15)[0]
    fireEvent.click(dateEl)
    expect(dateEl.parentElement).toHaveClass(`${classPrefix}-cell-selected`)
    expect(fn).toBeCalled()
  })

  test('range mode', async () => {
    const fn = jest.fn()
    const { container, getByText } = render(
      <Calendar
        selectionMode='range'
        min={mixDate}
        max={maxDate}
        usePopup={false}
        defaultValue={rangeDate}
        onChange={fn}
      />
    )

    expect(container).toMatchSnapshot()
    const [startEl, endEl] = [getByText(20), getByText(26)]
    fireEvent.click(startEl)
    fireEvent.click(endEl)
    expect(
      document.querySelectorAll(`.${classPrefix}-cell-selected`).length
    ).toBe(7)
    expect(fn.mock.calls[1][0].map((d: Date) => d.toDateString())).toEqual([
      'Sat May 20 2023',
      'Fri May 26 2023',
    ])
  })

  test('jump to a day', async () => {
    const App = () => {
      const ref = useRef<CalendarRef>(null)
      return (
        <>
          <button
            onClick={() => {
              ref.current?.jumpTo({ year: 2021, month: 1 })
            }}
          >
            jumpTo
          </button>
          <button
            onClick={() => {
              ref.current?.jumpToToday()
            }}
          >
            jumpToToday
          </button>
          <Calendar usePopup={false} selectionMode='single' ref={ref} />
        </>
      )
    }
    const { container, getByText } = render(<App />)

    fireEvent.click(getByText('jumpTo'))
    expect(container).toMatchSnapshot()

    fireEvent.click(getByText('jumpToToday'))
    expect(container).toMatchSnapshot()
  })

  test('week start on Monday', async () => {
    const { container } = render(
      <Calendar
        min={mixDate}
        max={maxDate}
        usePopup={false}
        weekStartsOn='Monday'
      />
    )
    expect(container).toMatchSnapshot()
  })

  test(`can't allow to clear`, async () => {
    const { getByText } = render(
      <Calendar
        selectionMode='single'
        min={mixDate}
        max={maxDate}
        usePopup={false}
        allowClear={false}
      />
    )

    const dateEl = getByText(16)
    fireEvent.click(dateEl)
    fireEvent.click(dateEl)
    expect(dateEl.parentElement).toHaveClass(`${classPrefix}-cell-selected`)
  })

  test('custom top', async () => {
    const today = dayjs()
    const { container } = render(
      <Calendar
        min={mixDate}
        max={maxDate}
        usePopup={false}
        renderTop={date => {
          if (dayjs(date).isSame(today, 'day')) return '今天'
          if (date.getDay() === 0 || date.getDay() === 6) {
            return '周末'
          }
        }}
      />
    )
    expect(container).toMatchSnapshot()
  })

  test('custom date', () => {
    render(
      <Calendar
        min={mixDate}
        max={maxDate}
        usePopup={false}
        renderDate={date => {
          return <div className='custom-cell'>{dayjs(date).date()}</div>
        }}
      />
    )
    expect(document.getElementsByClassName('custom-cell').length).toBe(31)
  })

  test('custom bottom', () => {
    render(
      <Calendar
        min={mixDate}
        max={maxDate}
        usePopup={false}
        renderDate={date => {
          return <div className='custom-cell'>{dayjs(date).date()}</div>
        }}
      />
    )
    expect(document.getElementsByClassName('custom-cell').length).toBe(31)
  })
})
