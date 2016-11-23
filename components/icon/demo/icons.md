---
order: 0
title: 基本
---


````jsx
import { Icon } from 'antd-mobile';

const icons = [
  'check', 'check-circle', 'check-circle-o',
  'cross', 'cross-circle', 'cross-circle-o',
  'down', 'left', 'right', 'ellipsis', 'loading', 'koubei-o', 'koubei',
];
/* eslint global-require: 0 */

class IconItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: false,
    };
  }
  render() {
    return (<div>
      {
        icons.map((item) => (
          <span key={item} className="icon-item-wrap" onClick={() => this.setState({ first: !this.state.first })}>
            <Icon type={this.state.first ? icons[100] : item} />
            <span className="icon-item">{item}</span>
          </span>
        ))
      }
      <div>
        <span>自定义图标:</span> <Icon type={require('./reload.svg')} />
      </div>
    </div>);
  }
}

ReactDOM.render(<IconItems />, mountNode);
````

````css
.icon-item-wrap {
  width: 1.5rem;
  text-align: center;
  display: inline-block;
  margin-bottom: 0.24rem;
}
.icon-item {
	display: block;
}
````
