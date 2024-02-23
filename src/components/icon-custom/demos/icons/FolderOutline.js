import * as React from 'react'
const SvgFolderOutline = props => {
  props = {
    ...props,
    fill: 'currentColor',
  }
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={200}
      height={200}
      className='folder-outline_svg__icon'
      viewBox='0 0 1024 1024'
      {...props}
    >
      <path d='M460.65 192a64 64 0 0 1 62.486 50.133L526.229 256h263.104a64 64 0 0 1 64 64v448a64 64 0 0 1-64 64H234.667a64 64 0 0 1-64-64V256a64 64 0 0 1 64-64zm0 64H234.668v512h554.666V426.667h-290.73zm286.017 384v64H277.333v-64zm42.666-320H540.437l9.494 42.667h239.402z' />
    </svg>
  )
}
export default SvgFolderOutline
