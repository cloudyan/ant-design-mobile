import * as React from 'react'
const SvgCalendarOutline = props => {
  props = {
    ...props,
    fill: 'currentColor',
  }
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={200}
      height={200}
      className='calendar-outline_svg__icon'
      viewBox='0 0 1024 1024'
      {...props}
    >
      <path d='M234.667 213.333h57.706v63.979l-57.706.021V384h554.666V277.333h-55.232v-64h55.232a64 64 0 0 1 64 64v512a64 64 0 0 1-64 64H234.667a64 64 0 0 1-64-64v-512a64 64 0 0 1 64-64M789.333 448H234.667v341.333h554.666zm-384 192v64H298.667v-64zm160 0v64H458.667v-64zm160 0v64H618.667v-64zm-320-128v64H298.667v-64zm160 0v64H458.667v-64zm160 0v64H618.667v-64zm-27.605-341.333v106.666h-64.021V170.667h64zm-104.17 42.666v64l-160.62-.021v-63.979zm-197.014-42.666v106.666h-64V170.667z' />
    </svg>
  )
}
export default SvgCalendarOutline
