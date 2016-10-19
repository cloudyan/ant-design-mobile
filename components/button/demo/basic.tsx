/* tslint:disable:no-unused-variable */
import React from 'react';
/* tslint:enable:no-unused-variable */
import { View } from 'react-native';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

/* tslint:disable:no-console */
export default () => (
  <View>
    <WhiteSpace />
    <WingBlank>
      <Button touchFeedback={false}>default button</Button>
    </WingBlank>

    <WhiteSpace />
    <WingBlank style={{
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <Button type="primary" onClick={e => console.log(e)}>primary button</Button>
      <Button type="primary" size="small">primary small button</Button>
    </WingBlank>

    <WhiteSpace />
    <WingBlank>
      <Button type="ghost">ghost button</Button>
    </WingBlank>

    <WhiteSpace />
    <WingBlank>
      <Button type="warning">warning button</Button>
    </WingBlank>

    <WhiteSpace />
    <WingBlank>
      <Button disabled>default disable button</Button>
    </WingBlank>

    <WhiteSpace />
    <WingBlank>
      <Button type="primary" disabled>primary disable button</Button>
    </WingBlank>

    <WhiteSpace />
    <WingBlank>
      <Button type="ghost" disabled>ghost disable button</Button>
    </WingBlank>
  </View>
);
