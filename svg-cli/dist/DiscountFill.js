import * as React from 'react'
const SvgDiscountFill = props => {
  props = {
    ...props,
    fill: 'currentColor',
  }
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={200}
      height={195.98}
      className='discount-fill_svg__icon'
      viewBox='0 0 1045 1024'
      {...props}
    >
      <path d='m599.253 134.72 220.843 23.808a64 64 0 0 1 56.79 56.768l23.786 220.843a64 64 0 0 1-18.368 52.096l-371.37 371.349a64 64 0 0 1-90.518 0l-244.608-244.63a64 64 0 0 1 0-90.495l371.35-371.35a64 64 0 0 1 52.117-18.389zm53.099 142.613a96 96 0 1 0 0 192 96 96 0 0 0 0-192m0 64a32 32 0 1 1 0 64 32 32 0 0 1 0-64' />
    </svg>
  )
}
export default SvgDiscountFill
