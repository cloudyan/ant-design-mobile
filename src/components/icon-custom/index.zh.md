# IconCustom 自定义

Icon 自定义

## iconfont

- https://www.iconfont.cn/

1. 使用 iconfont.cn 做 icon 图标的管理
   1. [图标绘制](https://www.iconfont.cn/help/detail)
   2. 存储为 svg 格式（建议使用存储为 svg，不要使用导出为 svg）
2. 解决 iconfont.cn 的产物做图标的使用
   1. [代码使用](https://www.iconfont.cn/help/detail?helptype=code)

### iconfont 平台管理及使用

统一标准

1. [图标绘制](https://www.iconfont.cn/help/detail)
   1. 统一 svg 纯色图标（注意边线风格等一致）
   2. 画布统一正方形
   3. 存储为 svg 格式（建议使用存储为 svg，不要使用导出为 svg）
2. iconfont 配置规范
   1. 改 FontClass 前缀为 `${FontFamily}-`
   2. FontFamily 命名为 `xxfont` 格式
3. 代码使用，参见以下示例
   1. font-class 方式
   2. symbol 方式

```html
<!-- 拷贝项目下面生成的fontclass代码 -->
<!-- font-class 方式引用 -->
<i class="xxfont xxfont-select"></i>

<!-- symbol 方式引用 -->
<svg class="xxfont" aria-hidden="true">
  <use xlink:href="#xxfont-select"></use>
</svg>
```

## 何时使用

Icon 图标集合，一般分两个库来管理

1. 公共库，跟随基础组件库迭代管理，更标准化
2. 业务库，跟随业务项目迭代管理，更灵活

## 示例

<code src="./demos/demo1.tsx"></code>

## icon 自定义

讨论： https://github.com/ant-design/antd-mobile-icons/issues/4

1. 可以用 svgr playground 手动转：https://react-svgr.com/playground/
   1. https://react-svgr.com/docs/webpack/
2. 使用 Umi 内置的 svgr 功能把 svg 文件引入为 React 组件
   1. https://umijs.org/docs/api/config#svgr

```js
// webpack 配置
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
}
```

svgr 支持如下方式使用 React svg 组件

```jsx
import starUrl, { ReactComponent as Star } from './star.svg'

const App = () => (
  <div>
    <img src={starUrl} alt="star" />
    <Star />
  </div>
)
```

### 命令行

解决方案：详见 https://www.robinwieruch.de/react-svg-icon-components/

```bash
npm install @svgr/cli --save-dev
svgr -d src/Icons/ assets/
```

```json
{
  "scripts": {
    "svgr": "svgr -d src/Icons/ assets/",
    "start": "webpack serve --config ./webpack.config.js --mode development"
  }
}
```

使用 webpack

```bash
npm install @svgr/webpack --save-dev
```

webpack 配置

```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  ...
};
```
