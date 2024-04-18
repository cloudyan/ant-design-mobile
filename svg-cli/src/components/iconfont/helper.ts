/* tslint:disable */
/* eslint-disable */
import { CSSProperties } from 'react';

export const getIconColor = (color: string | string[] | undefined, index: number, defaultColor: string) => {
  return color
    ? (
      typeof color === 'string'
        ? color
        : color[index] || defaultColor
    )
    : defaultColor;
};

/**
 * @param {object | undefined} style
 * @return {object}
 */
export const getIconStyle = (style: CSSProperties | undefined) => {
  const DEFAULT_STYLE: CSSProperties = {"verticalAlign":"-0.125em","fill":"currentColor"}
  return {...DEFAULT_STYLE, ...style} as CSSProperties
};
