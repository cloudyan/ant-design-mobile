import * as React from 'react'
const SvgProductFill = props => {
  props = {
    ...props,
    fill: 'currentColor',
  }
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={200}
      height={200}
      className='product-fill_svg__icon'
      viewBox='0 0 1024 1024'
      {...props}
    >
      <path d='m170.667 353.579 314.666 135.253v395.307l-276.65-122.816a64 64 0 0 1-38.016-58.518zm682.666-8.171v357.397a64 64 0 0 1-38.016 58.496L549.333 879.403v-393.92l304-140.096zM537.984 139.52l277.333 123.157a63.74 63.74 0 0 1 24.15 18.71l-324.758 150.4-334.72-143.872a63.77 63.77 0 0 1 28.694-25.238L486.016 139.52a64 64 0 0 1 51.968 0' />
    </svg>
  )
}
export default SvgProductFill
