/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import { getIconColor, getIconStyle } from './helper';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const IconClose: FunctionComponent<Props> = ({ size, color, style: _style, className='', ...rest }) => {
  const style = getIconStyle(_style)

  return (
    <svg viewBox="0 0 1045 1024" width={size + 'em'} height={size + 'em'} className={`svgicon icon-close ${className}`} style={style} {...rest}>
      <path
        d="M282.517333 213.376l-45.354666 45.162667L489.472 512 237.162667 765.461333l45.354666 45.162667L534.613333 557.354667l252.096 253.269333 45.354667-45.162667-252.288-253.44 252.288-253.482666-45.354667-45.162667L534.613333 466.624l-252.096-253.226667z"
        fill={getIconColor(color, 0, '#CACACA')}
      />
    </svg>
  );
};

IconClose.defaultProps = {
  size: 1,
};

export default IconClose;
