// List
import React from 'react';
import { View, Text } from 'react-native';
import Item from './ListItem';
import { ListProps } from './ListPropTypes';
import theme from './style/index';
const THEMES = theme.ThemesList;

export default class List extends React.Component<ListProps, any> {
  static Item = Item;

  render() {
    let { children, style, renderHeader, renderFooter } = this.props;

    let headerDom = null;
    let footerDom = null;

    if (renderHeader) {
      let content = renderHeader();
      if (typeof content === 'string') {
        content = <Text style={THEMES.Header}>{content}</Text>;
      }
      headerDom = <View>{content}</View>;
    }
    if (renderFooter) {
      let content = renderFooter();
      if (typeof content === 'string') {
        content = <Text style={THEMES.Footer}>{content}</Text>;
      }
      footerDom = <View>{content}</View>;
    }

    const count = React.Children.count(children);
    return (<View {...this.props} style={[style]}>
      {headerDom}
      <View style={THEMES.Body}>
        {
          React.Children.map(children, (item: any, index) => {
            if (index === count - 1) {
              return React.cloneElement(item, { last: true });
            } else {
              return item;
            }
          })
        }
      </View>
      {footerDom}
    </View>);
  }
}
