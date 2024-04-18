/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import { getIconColor, getIconStyle } from './helper';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const IconAshbin: FunctionComponent<Props> = ({ size, color, style: _style, className='', ...rest }) => {
  const style = getIconStyle(_style)

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'em'} height={size + 'em'} className={`svgicon icon-ashbin ${className}`} style={style} {...rest}>
      <path
        d="M341.013333 394.666667l27.754667 393.450666h271.829333l27.733334-393.450666h64.106666L704.426667 792.618667a64 64 0 0 1-63.829334 59.498666H368.768a64 64 0 0 1-63.829333-59.52L276.885333 394.666667h64.128z m139.306667 19.818666v298.666667h-64v-298.666667h64z m117.013333 0v298.666667h-64v-298.666667h64zM181.333333 288h640v64h-640v-64z m453.482667-106.666667v64h-256v-64h256z"
        fill={getIconColor(color, 0, '#CACACA')}
      />
    </svg>
  );
};

IconAshbin.defaultProps = {
  size: 1,
};

export default IconAshbin;
