/* eslint no-console:0 */
import React, { PropTypes } from 'react';
import PopupCascader from 'rmc-cascader/lib/Popup';
import treeFilter from 'array-tree-filter';

function getDefaultProps() {
  const defaultFormat = (values) => {
    return values.join(',');
  };
  return {
    prefixCls: 'am-picker',
    pickerPrefixCls: 'am-picker-picker',
    popupPrefixCls: 'am-picker-popup',
    format: defaultFormat,
    style: { left: 0, bottom: 0 },
    cols: 3,
    value: [],
    extra: '请选择',
    okText: '确定',
    dismissText: '取消',
    title: '',
  };
}

export default class Picker extends React.Component {
  static propTypes = {
    format: PropTypes.func,
  }

  static defaultProps = getDefaultProps()

  getSel = () => {
    const value = this.props.value || [];
    const treeChildren = treeFilter(this.props.data, (c, level) => {
      return c.value === value[level];
    });
    return this.props.format(treeChildren.map((v) => {
      return v.label;
    }));
  }
  render() {
    const { data, value, okText, dismissText, title, extra } = this.props;
    const extraProps = {
      extra: this.getSel() || extra,
    };
    const childEl = React.cloneElement(this.props.children, extraProps);
    return (<PopupCascader
      WrapComponent="div"
      popupTransitionName="am-slide-fade"
      maskTransitionName="am-fade"
      data={data}
      value={value}
      dismissText={dismissText}
      title={title}
      okText={okText}
      {...this.props} >{childEl}</PopupCascader>);
  }
}
