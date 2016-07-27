interface TextAreaItemProps {
  /** web only */
  prefixCls?: string;
  /** web only */
  prefixListCls?: string;
  /** web only */
  className?: string;
  style?: React.CSSProperties;
  type?: 'hasLine';
  title?: React.ReactNode;
  /** web only */
  name?: string;
  value?: string;
  placeholder?: string;
  clear?: boolean;
  rows?: number;
  count?: number;
  onChange?: Function;
  onBlur?: Function;
  onFocus?: Function;
  error?: boolean;
  onErrorClick?: Function;
  autoHeight?: boolean;
  editable?: boolean;
  labelNumber?: number;
  /** rn only */
  keyboardType?: string;
}

export default TextAreaItemProps;
