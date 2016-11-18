import React from 'react';

interface NoticeBarPropsType {
  mode?: 'closable' | 'link';
  onClick?: () => void;
  icon?: React.Element;
  style?: {};
  /* web only */
  className?: string;
  prefixCls?: string;
}

export default NoticeBarPropsType;
