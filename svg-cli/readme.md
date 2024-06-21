# Icon 组件

自定义 antd-mobile-icons 组件

在 iconfont 平台做管理，可以选中需要的图标，批量下载到本地，然后通过工具自动转换为 React 组件

```bash
npm install @svgr/cli --save-dev
./node_modules/.bin/svgr -h
./node_modules/.bin/svgr ./source -d ./dist

svgr ./source -d ./dist
```

SVG 的图标，有可能 `fill="currentColor"` 不规范，因为 fill 的复杂性，所以不方便批量替换 currentColor，需要制作时注意。

常用参数

- `--ignore-existing` 忽略已存在的文件

```bash
npx @svgr/cli --template my-template.js ./source -d ./dist
```

## 生成 svg sprites

部分华为 Android 手机，这种后置的 ajax 请求 SVG 写入方式无法呈现小图标，如果在页面头部一开始就有 SVG 文件代码资源，则没有此问题，图标不会显示不出来。

要修复此方法，可以把 SVG 资源作为一个 JS 资源载入，例如，命名一个名叫 sprite.js，里面代码大致如下：

```js
// sprite.js
var SVG = '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-l" viewBox="0 0 8 16"><path d="M.146 7.646a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7v.708l7-7a.5.5 0 0 0-.708-.708l-7 7z"/></symbol><symbol id="icon-arrow-r" viewBox="0 0 7 12"><path d="M6.146 6.354v-.708l-5.5 5.5a.5.5 0 0 0 .708.708l5.5-5.5a.5.5 0 0 0 0-.708l-5.5-5.5a.5.5 0 1 0-.708.708l5.5 5.5z"/></symbol></svg>';
document.body.insertAdjacentHTML("afterBegin", '' + SVG + '');
```

<script src="sprite.js"></script>

## 基于 iconfont 生成本地 React 组件

发现已经有网友开放了 cli 工具: [react-iconfont-cli](https://www.npmjs.com/package/react-iconfont-cli)

不过略有些问题，具体参见：https://juejin.cn/post/7356625386631381027

1. svg 图标不应该使用 block 内联样式，应改为 inline-block
2. 扩大点击区域，增加 human 类名
3. 关于生成 React 组件，使用 size 属性控制 svg 的宽高
   1. 默认单位改为 em，并支持附加公共样式，如 svgicon
   2. 如要控制 icon 图标大小，可使用 style 熟悉设置 fontSize 来实现

上述问题，已经处理，详细参见 [react-iconfont-cli2](https://www.npmjs.com/package/react-iconfont-cli2)

解决了以下问题

- [x] svg 默认 width 和 height 改为 `1em`
- [x] svg 默认 viewBox 不处理, iconfont 的 viewBox 为 `0 0 1024 1024`
- [x] svg 默认 fill 属性值改为 `#CACACA`
- [x] 修改配置 trim_icon_prefix 默认值改为 `''`, 这样生成的组件名称由 iconfont 平台控制
- [x] 新增配置 default_style, 默认配置 `{verticalAlign: '-0.125em', fill: 'currentColor'}`
- [x] 新增配置 default_class_name, 用于配置 svg 的统一css 类名，默认值 `'svgicon'`
- [x] svg 新增 className 属性, 格式为 `${default_class_name} ${iconId}` ，如 `svgicon icon-xxx`

本地开发

```bash
pnpm i react-iconfont-cli2 -D
# 初始化
npx iconfont-init

# 生成配置文件 iconfont.json，示例如下
# 配置配置 symbol_url

# 开始生成React标准组件
npx iconfont-h5

# 测试验证
npm test
```

生成的配置示例如下

```json
{
    "symbol_url": "//at.alicdn.com/t/c/font_4509746_fvvx6l350yb.js",
    "use_typescript": true,
    "save_dir": "./src/components/iconfont",
    "trim_icon_prefix": "",
    "default_class_name": "svgicon",
    "default_style": {
        "verticalAlign": "-0.125em",
        "fill": "currentColor"
    },
    "unit": "em",
    "default_icon_size": 1
}
```

扩展的样式

```css
.svgicon {
  display: inline-block !important;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.125em;
  font-size: 16px;
}
/* 优化点击区域 */
.human {
  position: relative;
}
.human:before {
  content: '';
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
}
```

## 基于 iconfont 生成本地 svg 文件

## 通过 webpack 直接引用 svg
