import React from 'react';

interface DatePickerProps {
  defaultDate: any;
  value?: any;
  format?: (x: any) => void;
  cols?: number;
  mode?: string;
  extra?: string;
  children?: any;
  minDate?: any;
  maxDate?: any;
  locale?: any;
  /** rn only */
  triggerTypes?: string;
  styles?: any;
  /** web only */
  prefixCls?: string;
  pickerPrefixCls?: string;
  popupPrefixCls?: string;
  dismissText?: string|React.ReactElement<any>; // React.ReactElement only for web
  okText?: string|React.ReactElement<any>; // React.ReactElement only for web
}

export default DatePickerProps;
