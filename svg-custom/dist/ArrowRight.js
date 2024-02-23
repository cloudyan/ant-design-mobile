import * as React from 'react'
const SvgArrowRight = props => {
  props = {
    ...props,
    fill: 'currentColor',
  }
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={200}
      height={200}
      className='arrow-right_svg__icon'
      viewBox='0 0 1024 1024'
      {...props}
    >
      <path d='M593.45 512.128 360.065 278.613l45.29-45.226 278.614 278.762-278.635 278.464-45.226-45.269z' />
    </svg>
  )
}
export default SvgArrowRight
