import { WhiteSpace, WingBlank, Button } from 'antd-mobile';
import * as React from 'react';
import { View } from 'react-native';

export default class BasicWhiteSpaceExample extends React.Component<any, any> {
  render() {
    return (
      <View>
        <WhiteSpace size="xs" />
        <WingBlank>
          <Button type="primary">��������xs</Button>
        </WingBlank>
        <WhiteSpace size="xs" />
        <View style={{
          borderBottomColor: '#108ee9',
          borderBottomWidth: 0.5,
        }}/>
        <WhiteSpace size="sm" />
        <WingBlank>
          <Button type="primary">��������sm</Button>
        </WingBlank>
        <WhiteSpace size="sm" />
        <View style={{
          borderBottomColor: '#108ee9',
          borderBottomWidth: 0.5,
        }}/>
        <WhiteSpace size="md" />
        <WingBlank>
          <Button type="primary">��������md(Ĭ��)</Button>
        </WingBlank>
        <WhiteSpace size="md" />
        <View style={{
          borderBottomColor: '#108ee9',
          borderBottomWidth: 0.5,
        }}/>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Button type="primary">��������lg</Button>
        </WingBlank>
        <WhiteSpace size="lg" />
        <View style={{
          borderBottomColor: '#108ee9',
          borderBottomWidth: 0.5,
        }}/>
        <WhiteSpace size="xl" />
        <WingBlank>
          <Button type="primary">��������xl</Button>
        </WingBlank>
        <WhiteSpace size="xl" />
        <View style={{
          borderBottomColor: '#108ee9',
          borderBottomWidth: 0.5,
        }}/>
      </View>
    );
  }
}
