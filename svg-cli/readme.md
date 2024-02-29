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
