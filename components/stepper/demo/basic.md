---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

数字输入框。


````jsx
import { List, Stepper } from 'antd-mobile';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 3,
      val1: 2,
    };
  }
  onChange = (val) => {
    // console.log(val);
    this.setState({ val });
  }
  onChange1 = (val1) => {
    // console.log(val);
    this.setState({ val1 });
  }
  render() {
    return (
      <List renderHeader={() => '演示'}>
        <List.Item extra={
          <Stepper
            style={{ width: '100%', minWidth: '2rem' }}
            showNumber max={10} min={1} value={this.state.val} onChange={this.onChange}
          />}
          wrap
        >
        显示数值(默认使用 TouchEvent, for Mobile)
        </List.Item>
        <List.Item extra={
          <Stepper
            style={{ width: '100%', minWidth: '2rem' }}
            showNumber max={10} min={1} value={this.state.val1} onChange={this.onChange1}
            useTouch={false}
          />}
          wrap
        >
        显示数值(使用 MouseEvent, for PC)
        </List.Item>
        <List.Item extra={
          <Stepper
            style={{ width: '100%', minWidth: '2rem' }}
            showNumber max={10} min={1} defaultValue={3} disabled
          />}
        >
        禁用
        </List.Item>
      </List>
    );
  }
}
ReactDOM.render(<Demo />, mountNode);
````
