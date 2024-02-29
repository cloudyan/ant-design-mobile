# Icon 图标

Icon 图标组件，支持自定义

推荐参考：https://ant.design/components/icon-cn

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

iconfont 最多支持一次下载 100 个图标，可通过工具对下载的内容 iconfont.svg 进行分割导出独立的 svg 图标。

## 何时使用

iconfont 管理平台主要面向 UI 和 FE，提供这样一个工作流：

- UI 负责把 icon 上传到平台，通过不同的“大库”区分业务线，形成一个 icon 池；
- 而 FE 则根据项目需要，从 icon 池中挑选 icon，生成项目，导出外链，下载引入到本地项目中使用。

- 设计师 UI
  - icon 池（每个业务一个 Icon 素材池）
- 前端开发 FE（前端项目 Icon 一般分两个库）

  - 公共库，跟随基础组件库迭代管理，更标准化
  - 业务库，跟随业务项目迭代管理，更灵活

- https://juejin.cn/post/6979874524934176805

## 示例

svgr 加载

<code src="./demos/demo1.tsx"></code>

IconCustom

<code src="./demos/demo2.tsx"></code>

## icon 自定义

讨论： https://github.com/ant-design/antd-mobile-icons/issues/4

1. 可以用 svgr playground 手动转：https://react-svgr.com/playground/
   1. webpack 配置文档 https://react-svgr.com/docs/webpack/
2. 使用 Umi 内置的 svgr 功能把 svg 文件引入为 React 组件
   1. https://umijs.org/docs/api/config#svgr

```js
// webpack 配置
module.exports = {
  module: {
    rules: [
      // 示例 import Svg from './star.svg'
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
}

module.exports = {
  module: {
    rules: [
      // 示例 import svg from './star.svg?url'
      // {
      //   test: /\.svg$/i,
      //   type: 'asset',
      //   resourceQuery: /url/, // *.svg?url
      // },

      // 示例 import Svg from './star.svg'
      // {
      //   test: /\.svg$/i,
      //   issuer: /\.[jt]sx?$/, // 限定 svgr 适用文件类型的范围
      //   resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
      //   use: ['@svgr/webpack'],
      // },
    ],
  },
}

// 与 url-loader 一起使用
// import starUrl, { ReactComponent as Star } from './star.svg'
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

通过命令行自定义 antd-mobile-icons 组件

图标在 iconfont 平台做管理，可以选中需要的图标，批量下载到本地，然后通过工具自动转换为 React 组件

```bash
npm install @svgr/cli --save-dev
./node_modules/.bin/svgr -h
./node_modules/.bin/svgr ./source -d ./dist

svgr ./source -d ./dist
```

```json
{
  "scripts": {
    "svgr": "svgr ./source -d ./dist",
    "start": "webpack serve --config ./webpack.config.js --mode development"
  }
}
```

默认 iconfont 下载的图标，有可能 `fill="currentColor"` 属性不规范，通过 [template](https://react-svgr.com/docs/custom-templates/) 无法批量完成处理，此问题只能制作图标时注意规范。

- 方案详见 https://www.robinwieruch.de/react-svg-icon-components/

以下为命令行批量将 svg 转为 React 组件模板

```js
// my-template.js 示例
// npx @svgr/cli --template my-template.js -- my-icon.svg
const template = (variables, context) => {
  const { imports, interfaces, componentName, props, jsx, exports } = variables
  const { tpl, options } = context

  // console.log(jsx)

  return tpl`
${imports}

${interfaces}

const ${componentName} = (${props}) => {
  props = { ...props, fill: 'currentColor' };
  return ${jsx};
};

export default ${componentName};
`
}

module.exports = template

```

### 使用 webpack

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

## 最终设计

可以借助 iconfont 平台辅助管理项目图标，但考虑到容灾，我们将图标保存在项目中，通过脚本在构建时生成 symbol 临时文件，引入项目，以本地图标文件为准。

项目中通过 IconSvg 组件配置 type 使用对应 Icon。

## 关于 SVG 图标

使用 SVG 图标替换了原先的 font 图标，有以下优势：

- 完全离线化使用，不需要从 CDN 下载字体文件，图标不会因为网络问题呈现方块，也无需字体文件本地部署。
- SVG 是矢量的，在低端设备上 SVG 有更好的清晰度。
- 支持多色图标。
- 对于内建图标的更换可以提供更多 API，而不需要进行样式覆盖。

更多讨论可参考：[#10353](https://github.com/ant-design/ant-design/issues/10353)。

更多参考：

- [使用 SVG 交付 Octicon](https://github.com/blog/2112-delivering-octicons-with-svg)
- [内联 SVG 与图标字体](https://css-tricks.com/icon-fonts-vs-svg/)
- [说真的，不要使用图标字体](https://cloudfour.com/thinks/seriously-dont-use-icon-fonts/)
