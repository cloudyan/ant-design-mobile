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
