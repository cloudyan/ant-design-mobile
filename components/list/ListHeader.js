import React, { PropTypes, Text } from 'react-native';
const THEMES = require('./style/index.ios').ThemesList;

export default class Header extends React.Component {
  render() {
    return (<Text style={THEMES.Header}>{this.props.children}</Text>);
  }
});
