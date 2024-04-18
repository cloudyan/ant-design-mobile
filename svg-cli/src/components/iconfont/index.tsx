/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import IconAshbin from './IconAshbin';
import IconClose from './IconClose';
import IconCreditLevel from './IconCreditLevel';
export { default as IconAshbin } from './IconAshbin';
export { default as IconClose } from './IconClose';
export { default as IconCreditLevel } from './IconCreditLevel';

export type IconNames = 'icon-ashbin' | 'icon-close' | 'icon-credit-level';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-ashbin':
      return <IconAshbin {...rest} />;
    case 'icon-close':
      return <IconClose {...rest} />;
    case 'icon-credit-level':
      return <IconCreditLevel {...rest} />;

  }

  return null;
};

export default IconFont;
