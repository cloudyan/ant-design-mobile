/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import { getIconColor, getIconStyle } from './helper';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const IconCreditLevel: FunctionComponent<Props> = ({ size, color, style: _style, className='', ...rest }) => {
  const style = getIconStyle(_style)

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'em'} height={size + 'em'} className={`svgicon icon-credit-level ${className}`} style={style} {...rest}>
      <path
        d="M679.701333 213.333333a64 64 0 0 1 49.173334 23.04l2.496 3.2 131.136 179.413334a64 64 0 0 1-1.898667 78.016l-2.709333 3.136L554.261333 829.44a64 64 0 0 1-91.349333 2.816l-2.816-2.901333L163.093333 506.282667a64 64 0 0 1-7.296-77.013334l2.282667-3.413333 132.138667-185.642667a64 64 0 0 1 48-26.752l4.138666-0.128h337.344z m0 64H342.357333l-132.138666 185.642667 296.981333 323.093333L810.837333 456.746667 679.701333 277.333333zM640 405.333333v64H384v-64h256z"
        fill={getIconColor(color, 0, '#CACACA')}
      />
    </svg>
  );
};

IconCreditLevel.defaultProps = {
  size: 1,
};

export default IconCreditLevel;
