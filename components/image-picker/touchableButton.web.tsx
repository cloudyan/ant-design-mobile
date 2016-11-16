import React from 'react';
import assign from 'object-assign';
import splitObject from '../_util/splitObject';
import touchableFeedback from '../_util/touchableFeedback';

class TouchableButton extends React.Component<any, any> {
  render() {
    const [{ children, className, prefixCls, touchFeedback, activeStyle }, restProps] =
      splitObject(this.props, ['children', 'className', 'prefixCls', 'touchFeedback', 'activeStyle']);

    let style = assign({}, this.props.style);
    if (touchFeedback) {
      style = assign(style, activeStyle);
    }

    return (
      <div {...restProps}
        style={style}
        className={touchFeedback ?
          `${className} ${prefixCls}-active` : `${className}`}
      >
        {children}
      </div>
    );
  }
};

export default touchableFeedback<{
  prefixCls?: string;
  className?: string;
  style?: Object;
  onClick?: (e: any) => void;
}>(TouchableButton);
