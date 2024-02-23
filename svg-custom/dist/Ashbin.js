import * as React from 'react'
const SvgAshbin = props => {
  props = {
    ...props,
    fill: 'currentColor',
  }
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={200}
      height={200}
      className='ashbin_svg__icon'
      viewBox='0 0 1024 1024'
      {...props}
    >
      <path d='m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93zm139.307 19.818v298.667h-64V414.485zm117.013 0v298.667h-64V414.485zM181.333 288h640v64h-640zm453.483-106.667v64h-256v-64z' />
    </svg>
  )
}
export default SvgAshbin
