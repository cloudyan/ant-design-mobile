import * as React from 'react'
const SvgProductOutline = props => {
  props = {
    ...props,
    fill: 'currentColor',
  }
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={200}
      height={200}
      className='product-outline_svg__icon'
      viewBox='0 0 1024 1024'
      {...props}
    >
      <path d='m537.984 139.52 277.333 123.179a64 64 0 0 1 38.016 58.496v381.61a64 64 0 0 1-38.016 58.496L537.984 884.46a64 64 0 0 1-51.968 0L208.683 761.3a64 64 0 0 1-38.016-58.496v-381.61a64 64 0 0 1 38.016-58.496L486.016 139.54a64 64 0 0 1 51.968 0zM234.667 381.44v321.365l250.666 111.318v-325.27zm554.666 2.304-240 102.827v322.816l240-106.582zM512 198.037 245.419 316.416l269.29 115.413 266.518-114.24z' />
    </svg>
  )
}
export default SvgProductOutline
