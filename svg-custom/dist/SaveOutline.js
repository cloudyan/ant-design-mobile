import * as React from 'react'
const SvgSaveOutline = props => {
  props = {
    ...props,
    fill: 'currentColor',
  }
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={200}
      height={200}
      className='save-outline_svg__icon'
      viewBox='0 0 1024 1024'
      {...props}
    >
      <path d='m683.84 170.667 169.493 174.037v444.63a64 64 0 0 1-64 64H234.667a64 64 0 0 1-64-64V234.666a64 64 0 0 1 64-64zM320 234.645l-85.333.022v554.666l85.333-.021V533.333h384v255.979l85.333.021V370.731L704 283.093V384H320zm320 362.688H384v191.979h256zm-42.667 64v64H426.667v-64zM640 234.667H384V320h256z' />
    </svg>
  )
}
export default SvgSaveOutline
