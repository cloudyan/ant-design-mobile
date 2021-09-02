import React, {
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { ElementProps } from '../../utils/element-props'
import { mergeProps } from '../../utils/with-default-props'
import classNames from 'classnames'
import { SwiperItem } from './swiper-item'
import { devWarning } from '../../utils/dev-log'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { bound } from '../../utils/rubberband'
import { PageIndicator } from './page-indicator'
import { staged } from 'staged-components'

export type SwiperRef = {
  swipeTo: (index: number) => void
  swipeNext: () => void
  swipePrev: () => void
}

export type SwiperProps = {
  defaultIndex?: number
  allowTouchMove?: boolean
  autoplay?: boolean
  autoplayInterval?: number
  loop?: boolean
  onIndexChange?: (index: number) => void
  children?: ReactElement[]
} & ElementProps<'--height' | '--width'>

const defaultProps = {
  defaultIndex: 0,
  allowTouchMove: true,
  autoplay: false,
  autoplayInterval: 3000,
  loop: true,
}

export const Swiper = forwardRef(
  staged<SwiperProps, SwiperRef>((p, ref) => {
    const props = mergeProps(defaultProps, p)

    const { validChildren, count } = useMemo(() => {
      let count = 0
      const validChildren = React.Children.map(props.children, child => {
        if (!React.isValidElement(child)) return null
        if (child.type !== SwiperItem) {
          devWarning(
            'Swiper',
            'The children of `Swiper` must be `Swiper.Item` components.'
          )
          return null
        }
        count++
        return child
      })
      return {
        validChildren,
        count,
      }
    }, [props.children])

    if (count === 0) {
      devWarning('Swiper', '`Swiper` needs at least one child.')
      return null
    }

    return () => {
      let loop = props.loop
      if (count === 1 && loop) {
        devWarning(
          'Swiper',
          '`Swiper` needs at least two children to enable loop.'
        )
        loop = false
      }
      const trackRef = useRef<HTMLDivElement>(null)
      function getWidth() {
        const track = trackRef.current
        if (!track) return 0
        return track.offsetWidth
      }

      const [current, setCurrent] = useState(props.defaultIndex)

      const draggingRef = useRef(false)

      const [{ x }, api] = useSpring(() => ({
        x: bound(current, 0, count - 1) * -100,
        config: { tension: 200, friction: 30 },
        onRest: () => {
          if (draggingRef.current) return
          const rawX = x.get()
          const totalWidth = 100 * count
          const standardX = modulus(rawX, totalWidth)
          if (standardX === rawX) return
          api.start({
            x: standardX,
            immediate: true,
          })
        },
      }))

      const bind = useDrag(
        state => {
          const width = getWidth()
          if (!width) return
          const [mx] = state.movement
          if (state.last) {
            draggingRef.current = false
            const index = Math.round((mx + state.vxvy[0] * 100) / width)
            swipeTo(index)
          } else {
            draggingRef.current = true
            api.start({
              x: (mx * 100) / width,
              immediate: true,
            })
          }
        },
        {
          transform: ([x, y]) => [-x, y],
          initial: () => {
            const width = getWidth()
            return [(x.get() / 100) * width, 0]
          },
          bounds: () => {
            if (loop) return {}
            const width = getWidth()
            return {
              left: 0,
              right: (count - 1) * width,
            }
          },
          rubberband: true,
          axis: 'x',
          experimental_preventWindowScrollY: true,
        }
      )

      function swipeTo(index: number) {
        if (loop) {
          const i = modulus(index, count)
          setCurrent(i)
          props.onIndexChange?.(i)
          api.start({
            x: index * 100,
          })
        } else {
          const i = bound(index, 0, count - 1)
          setCurrent(i)
          props.onIndexChange?.(i)
          api.start({
            x: i * 100,
          })
        }
      }

      function swipeNext() {
        swipeTo(Math.round(x.get() / 100) + 1)
      }

      function swipePrev() {
        swipeTo(Math.round(x.get() / 100) - 1)
      }

      useImperativeHandle(ref, () => ({
        swipeTo,
        swipeNext,
        swipePrev,
      }))

      const { autoplay, autoplayInterval } = props
      useEffect(() => {
        if (!autoplay) return
        const interval = window.setInterval(() => {
          swipeNext()
        }, autoplayInterval)
        return () => {
          window.clearInterval(interval)
        }
      }, [autoplay, autoplayInterval])

      return (
        <div
          className={classNames('adm-swiper', props.className)}
          style={props.style}
        >
          <div
            className={classNames('adm-swiper-track', {
              'adm-swiper-track-allow-touch-move': props.allowTouchMove,
            })}
            ref={trackRef}
            {...(props.allowTouchMove ? bind() : {})}
          >
            {React.Children.map(validChildren, (child, index) => {
              return (
                <animated.div
                  className='adm-swiper-slide'
                  style={{
                    x: x.to(x => {
                      let position = -x + index * 100
                      if (loop) {
                        const totalWidth = count * 100
                        position =
                          modulus(position + totalWidth / 2, totalWidth) -
                          totalWidth / 2
                      }
                      return `${position}%`
                    }),
                    left: `-${index * 100}%`,
                  }}
                >
                  {child}
                </animated.div>
              )
            })}
          </div>
          <div className='adm-swiper-indicator'>
            <PageIndicator total={count} current={current} />
          </div>
        </div>
      )
    }
  })
)

function modulus(value: number, division: number) {
  const remainder = value % division
  return remainder < 0 ? remainder + division : remainder
}
